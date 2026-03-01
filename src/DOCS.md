# Mesagoo Email Editor — Complete Technical Documentation

> **Purpose of this document**: Provide every detail a maintainer needs to modify,
> debug, or extend this editor without introducing regressions. Every architectural
> decision, data flow, invariant, and subtlety is documented here. Read this
> before touching any file.

---

## Table of Contents

1. [High-Level Architecture](#1-high-level-architecture)
2. [Data Model](#2-data-model)
3. [Rendering Pipeline](#3-rendering-pipeline)
4. [File Map](#4-file-map)
5. [Type System (types.ts)](#5-type-system)
6. [Composables — State Management](#6-composables)
7. [Serializers](#7-serializers)
8. [Utilities](#8-utilities)
9. [Injection Keys & Provide/Inject Wiring](#9-injection-keys)
10. [Components](#10-components)
11. [Blocks & Starter Templates](#11-blocks--starter-templates)
12. [Properties System](#12-properties-system)
13. [Iframe Bridge Protocol](#13-iframe-bridge-protocol)
14. [Drag & Drop System](#14-drag--drop-system)
15. [Inline Text Editing](#15-inline-text-editing)
16. [Undo / Redo](#16-undo--redo)
17. [Code View (CodeMirror)](#17-code-view)
18. [Migration from GrapesJS](#18-migration-from-grapesjs)
19. [CSS Conventions](#19-css-conventions)
20. [Invariants & Rules That Must Never Be Broken](#20-invariants--rules)
21. [Known Limitations](#21-known-limitations)
22. [Common Maintenance Scenarios](#22-common-maintenance-scenarios)
23. [AI Template Generation](#23-ai-template-generation)

---

## 1. High-Level Architecture

```
                            ┌──────────────────────────────────────────┐
                            │           EmailEditor.vue                │
                            │  (root: creates composables, provides)   │
                            └────────────────┬─────────────────────────┘
                                             │ provide()
                 ┌───────────────────────────┬┴──────────────┬──────────────────┐
                 ▼                           ▼               ▼                  ▼
       EMAIL_DOCUMENT_KEY          EMAIL_SELECTION_KEY  EMAIL_DRAG_DROP_KEY  EMAIL_EDITOR_CONFIG_KEY
       (useEmailDocument)          (useEmailSelection)  (useEmailDragDrop)  ({ variables: Ref })
                 │                           │               │
                 └───────────────────────────┴───────────────┘
                                             │ inject()
                            ┌────────────────┴─────────────────────────┐
                            │           EditorShell.vue                 │
                            │  (layout: toolbar + main area)           │
                            └─────┬─────────┬──────────────┬───────────┘
                                  │         │              │
                          EditorToolbar   EditorCanvas   EditorSidebar
                                          │ (iframe)     ├── BlocksPanel
                                          │              ├── PropertiesPanel
                                          CanvasOverlay  └── LayersPanel
                                          InlineTextEditor
```

**Key principle**: The editor works on a **JSON document tree** that mirrors MJML
structure. Every user action mutates this tree. The tree is then serialized to an
MJML string, compiled to HTML via `mjml-browser`, and rendered in an isolated
`<iframe>`. The iframe uses `postMessage` to communicate clicks, hovers, and
drag events back to the Vue layer.

**No global store**. All state is scoped to the `EmailEditor.vue` instance via
composables + `provide/inject`. This means multiple editor instances on the same
page would each have independent state.

---

## 2. Data Model

### 2.1 EmailNode

Every element in the email is an `EmailNode`:

```typescript
interface EmailNode {
  id: NodeId                        // nanoid(8), e.g. "a1b2c3d4"
  type: EmailNodeType               // "mj-section", "mj-text", etc.
  attributes: Record<string, string> // MJML attributes: padding, color, etc.
  children: EmailNode[]             // nested nodes
  htmlContent?: string              // inner HTML — ONLY for mj-text and mj-button
}
```

### 2.2 Node type categories

| Category | Types | Behavior |
|----------|-------|----------|
| **Container** | `mj-body`, `mj-section`, `mj-column`, `mj-hero`, `mj-wrapper`, `mj-social` | Have `children`. Never have `htmlContent`. |
| **Content** | `mj-text`, `mj-button` | Have `htmlContent` (rich HTML). `children` is always `[]`. |
| **Self-closing** | `mj-divider`, `mj-spacer`, `mj-image` | No `children`, no `htmlContent`. Rendered as `<tag ... />`. |
| **Special** | `mj-social-element` | Child of `mj-social`. Has attributes only (`name`, `href`). |
| **Raw** | `mj-raw` | `htmlContent` is raw HTML passed through. |

**INVARIANT**: A `mj-text` or `mj-button` node must NEVER have children.
A `mj-section` node must ONLY contain `mj-column` children.
A `mj-body` node must ONLY contain `mj-section`, `mj-wrapper`, or `mj-hero` children.

### 2.3 EmailDocument

```typescript
interface EmailDocument {
  version: 1
  headAttributes: {
    defaultStyles: Record<string, Record<string, string>>  // <mj-attributes> tag defaults
    fonts: Array<{ name: string; href: string }>            // <mj-font> declarations
    previewText: string                                      // <mj-preview> content
  }
  body: EmailNode  // root node, type === "mj-body"
}
```

### 2.4 Persisted format (EmailDesignJson)

This is what gets saved to the database in the `body.design` field:

```typescript
interface EmailDesignJson {
  _editor: 'mesagoo-email-editor'   // discriminator — MUST be this exact string
  _version: 1
  document: EmailDocument
}
```

The `_editor` field distinguishes this format from the old GrapesJS `design_json`.
The migration logic depends on this field. **Never change or remove it.**

### 2.5 Node hierarchy (valid MJML structure)

```
mj-body
  ├── mj-section (or mj-wrapper, mj-hero)
  │     ├── mj-column
  │     │     ├── mj-text
  │     │     ├── mj-image
  │     │     ├── mj-button
  │     │     ├── mj-divider
  │     │     ├── mj-spacer
  │     │     ├── mj-social
  │     │     │     └── mj-social-element
  │     │     └── mj-raw
  │     └── mj-column
  └── mj-section
```

---

## 3. Rendering Pipeline

Every time the document changes, this sequence fires (debounced 300ms):

```
User action (click property, drag block, type text, undo, etc.)
  │
  ▼
history.commit()               ← snapshot BEFORE mutation (for undo)
  │
  ▼
Mutate document.value          ← direct mutation of the reactive ref
  │
  ▼
emitChanges()                  ← debounced 300ms via useDebounceFn
  │
  ▼
doEmit() {
  1. documentToMjml(doc)       → MJML string     → emit('update:modelValue', mjml)
  2. compileMjml(mjml)         → HTML string      → emit('update:compiledHtml', html)
  3. wrap in EmailDesignJson   → design object    → emit('update:designJson', data)
  4. compiledHtml.value = html
}
  │
  ▼
watch(compiledHtml) triggers   → EditorCanvas.updateIframe()
  │
  ▼
iframe.srcdoc = fullHtml       ← HTML + bridge script injected
  │
  ▼
Bridge script annotates nodes  → postMessage('ebb:ready')
```

**CRITICAL**: The debounce (300ms) means rapid mutations are batched. During the
batch window, the document is already mutated (properties panel shows correct
values) but the iframe is not yet updated. This is by design for performance.

**CRITICAL**: `triggerEmit()` bypasses the debounce and runs `doEmit()` immediately.
It is called on mount and on language switch to ensure first render is instant.

---

## 4. File Map

```
email-editor/
│
├── DOCS.md                          ← This file
├── index.ts                         ← Public exports: EmailEditor component + types
├── types.ts                         ← All TypeScript interfaces and type guards
├── constants.ts                     ← Device presets, font options, brand color
├── injection-keys.ts                ← 4 InjectionKey symbols for provide/inject
├── EmailEditor.vue                  ← Root component (composes hooks, provides, handles props)
│
├── composables/
│   ├── useEmailDocument.ts          ← Core state: document ref, mutations, emission pipeline
│   ├── useEmailHistory.ts           ← Undo/redo via useManualRefHistory + manual redo stack
│   ├── useEmailSelection.ts         ← Selected/hovered node tracking
│   ├── useEmailDragDrop.ts          ← Drag source/target state container
│   ├── useEmailIframeSync.ts        ← Iframe content update + postMessage bridge
│   └── useEmailKeyboard.ts          ← Global keyboard shortcuts
│
├── serializer/
│   ├── json-to-mjml.ts             ← EmailDocument → MJML string (injects css-class IDs)
│   ├── mjml-to-json.ts             ← MJML string → EmailDocument (strips css-class IDs)
│   └── node-factory.ts             ← Factory functions for creating typed nodes with defaults
│
├── utils/
│   ├── id.ts                        ← createId() → nanoid(8)
│   └── tree.ts                      ← Tree operations: find, remove, move, clone, walk
│
├── properties/
│   └── property-definitions.ts      ← PROPERTY_MAP: node type → editable properties
│
├── blocks/
│   ├── block-definitions.ts         ← Master registry: getAllBlocks(), getBlocksByCategory()
│   ├── layout-blocks.ts            ← 6 layout blocks (1-col through sidebar)
│   ├── content-blocks.ts           ← 7 content blocks (text, image, button, etc.)
│   ├── composite-blocks.ts         ← 30 pre-designed composite modules
│   ├── variable-blocks.ts          ← Dynamic blocks from template variables
│   └── starter-templates.ts        ← 8 complete email starter templates
│
└── components/
    ├── EditorShell.vue              ← Main layout: toolbar + canvas/code + sidebar
    │
    ├── toolbar/
    │   └── EditorToolbar.vue        ← Device switcher, undo/redo, code toggle, fullscreen
    │
    ├── canvas/
    │   ├── EditorCanvas.vue         ← Iframe rendering, postMessage handling, drag/drop logic
    │   ├── CanvasOverlay.vue        ← Selection/hover outlines, floating toolbar, drop indicator
    │   ├── InlineTextEditor.vue     ← TipTap overlay for editing mj-text/mj-button content
    │   └── InlineToolbar.vue        ← Formatting toolbar for inline editor (bold, link, color...)
    │
    ├── sidebar/
    │   ├── EditorSidebar.vue        ← 3-tab container (Blocks, Properties, Layers)
    │   ├── BlocksPanel.vue          ← Block library with search + template picker
    │   ├── PropertiesPanel.vue      ← Node property editor + global styles
    │   ├── LayersPanel.vue          ← Document tree view
    │   ├── TemplatesPanel.vue       ← Starter template picker with confirmation dialog
    │   ├── blocks/
    │   │   ├── BlockCard.vue        ← Draggable block card
    │   │   ├── BlockCategory.vue    ← Collapsible category with grid of cards
    │   │   └── BlockPreview.vue     ← SVG schematic thumbnail for each block type
    │   └── properties/
    │       └── PropertyGroup.vue    ← Collapsible group of property inputs
    │
    └── code/
        └── CodeEditor.vue           ← CodeMirror 6 MJML editor with bidirectional sync
```

---

## 5. Type System

**File**: `types.ts`

### Node identification

```typescript
type NodeId = string  // Always nanoid(8) — 8 alphanumeric characters
```

### Node types

```typescript
type EmailNodeType =
  | 'mj-body' | 'mj-section' | 'mj-column' | 'mj-text' | 'mj-image'
  | 'mj-button' | 'mj-divider' | 'mj-spacer' | 'mj-social'
  | 'mj-social-element' | 'mj-hero' | 'mj-raw' | 'mj-wrapper'
```

### Classification arrays (used by serializers and components)

```typescript
CONTENT_NODE_TYPES = ['mj-text', 'mj-button']              // Have htmlContent
CONTAINER_NODE_TYPES = ['mj-body', 'mj-section', 'mj-column', 'mj-hero', 'mj-wrapper', 'mj-social']
SELF_CLOSING_NODE_TYPES = ['mj-divider', 'mj-spacer', 'mj-image']
```

**WARNING**: If you add a new node type, you MUST add it to the correct
classification array. The serializer uses these arrays to decide how to render
each node. A node missing from all arrays will be treated as a container.

### Drag & drop types

```typescript
type DragSource =
  | { type: 'new-block'; block: BlockDefinition }    // dragging from sidebar
  | { type: 'existing-node'; nodeId: NodeId }         // dragging existing node (future)

type DropPosition = 'before' | 'after' | 'inside'

interface DropTarget {
  nodeId: NodeId
  position: DropPosition
}
```

### Iframe message types

```typescript
type IframeMessage =
  | { type: 'ebb:select'; nodeId: string; rect: DOMRect }
  | { type: 'ebb:deselect' }
  | { type: 'ebb:hover'; nodeId: string; rect: DOMRect }
  | { type: 'ebb:hover-end' }
  | { type: 'ebb:dblclick'; nodeId: string; rect: DOMRect }
  | { type: 'ebb:drag-over'; nodeId: string; position: DropPosition; rect: DOMRect }
  | { type: 'ebb:drop'; nodeId: string; position: DropPosition }
  | { type: 'ebb:hit-test-result'; nodeId: string | null; position?: DropPosition; rect?: DOMRect; isDrop: boolean }
  | { type: 'ebb:height'; height: number }
  | { type: 'ebb:ready' }
```

All messages are prefixed with `ebb:`. The parent window listener filters by this
prefix — any message without it is ignored.

### Type guard for migration

```typescript
function isNewEditorJson(data: unknown): data is EmailDesignJson
// Returns true if data._editor === 'mesagoo-email-editor'
```

---

## 6. Composables

### 6.1 useEmailDocument

**File**: `composables/useEmailDocument.ts`
**Created by**: `EmailEditor.vue`
**Provided via**: `EMAIL_DOCUMENT_KEY`

This is the central composable. It owns the document, history, and emission pipeline.

**Constructor options**:
```typescript
useEmailDocument({
  onMjmlChange: (mjml: string) => void       // called with MJML string
  onHtmlChange: (html: string) => void        // called with compiled HTML
  onDesignJsonChange: (data: EmailDesignJson) => void  // called with design JSON
})
```

**Reactive state**:
| Name | Type | Description |
|------|------|-------------|
| `document` | `Ref<EmailDocument>` | The core document tree |
| `compiledHtml` | `Ref<string>` | Last compiled HTML output |
| `isCompiling` | `Ref<boolean>` | True during MJML compilation |
| `history` | `UseEmailHistoryReturn` | Undo/redo interface |

**Mutation methods** (all follow the pattern: `commit() → mutate → emitChanges()`):

| Method | Signature | Behavior |
|--------|-----------|----------|
| `updateNodeAttribute` | `(nodeId, key, value)` | Sets attribute. Empty string or undefined → deletes the key. |
| `updateNodeContent` | `(nodeId, htmlContent)` | Sets `htmlContent` on mj-text/mj-button. |
| `updateHeadStyle` | `(tag, key, value)` | Sets default style in `<mj-attributes>`. Empty → deletes. |
| `updatePreviewText` | `(text)` | Sets `headAttributes.previewText`. |
| `insertNode` | `(parentId, index, newNode)` | Inserts node at index (clamped to valid range). |
| `insertNodesAfter` | `(refNodeId, nodes)` | Inserts array of nodes after the reference node in its parent. |
| `deleteNode` | `(nodeId)` | Removes node from tree. |
| `moveNodeTo` | `(nodeId, newParentId, newIndex)` | Removes then re-inserts at new location. |
| `moveNodeUp` | `(nodeId) → boolean` | Swaps with previous sibling. Returns false if already first. |
| `moveNodeDown` | `(nodeId) → boolean` | Swaps with next sibling. Returns false if already last. |
| `duplicateNode` | `(nodeId) → NodeId \| null` | Deep clones (fresh IDs!) and inserts after original. Returns new root ID. |
| `replaceDocument` | `(newDoc)` | Replaces entire document (used by starter templates). |

**Initialization**:
| Method | Signature | Behavior |
|--------|-----------|----------|
| `loadFromProps` | `(mjml, designJson)` | Loads document from props. Priority: designJson (if new format) > mjml (parsed) > default document. |
| `triggerEmit` | `()` | Forces immediate emission (no debounce). Returns promise. |

**CRITICAL INVARIANT**: Every mutation method calls `history.commit()` BEFORE
mutating. If you add a new mutation method, you MUST follow this pattern.

### 6.2 useEmailHistory

**File**: `composables/useEmailHistory.ts`
**Created by**: `useEmailDocument` internally

**Implementation details**:
- Uses VueUse's `useManualRefHistory` with capacity 50 and `cloneDeep` from lodash.
- VueUse does NOT expose redo, so redo is implemented manually via a separate
  `undoStack: EmailDocument[]` array.
- `commit()` clears the redo stack (new action invalidates redo history).
- `undo()` pushes current state to `undoStack` then calls `rawUndo()`.
- `redo()` calls `rawCommit()` to save current, then pops from `undoStack` and
  assigns to `document.value`.

**Return interface**:
```typescript
{
  commit: () => void         // snapshot BEFORE mutation
  undo: () => void
  redo: () => void
  canUndo: Ref<boolean>      // history.length > 1
  canRedo: Ref<boolean>      // undoStack.length > 0
}
```

**WARNING**: The `canRedo` computed uses a manually tracked `undoStack` array
that is NOT reactive (plain `let undoStack: EmailDocument[] = []`). The computed
`canRedoComputed` is returned instead, which IS reactive because it reads
`undoStack.length`. However — `undoStack` is a plain JS array, so Vue does NOT
track pushes/pops on it. The current implementation works because `canRedoComputed`
is evaluated AFTER the method that modifies `undoStack` completes, and the
toolbar's `:disabled` binding triggers a re-render. If you move to a different
reactivity pattern, verify that redo button enable/disable still works correctly.

### 6.3 useEmailSelection

**File**: `composables/useEmailSelection.ts`
**Created by**: `EmailEditor.vue`
**Provided via**: `EMAIL_SELECTION_KEY`

```typescript
{
  selectedNodeId: Ref<NodeId | null>
  hoveredNodeId: Ref<NodeId | null>
  selectedNode: computed<EmailNode | null>     // resolved from document tree
  selectedNodePath: computed<NodeId[]>          // [body, ..., parent, self]
  selectNode: (nodeId: NodeId | null) => void
  selectParent: () => void                      // selects path[length-2]
  hoverNode: (nodeId: NodeId | null) => void
  clearSelection: () => void                    // clears both selected and hovered
}
```

**Path format**: `getAncestorPath` returns `[bodyId, sectionId, columnId, nodeId]`.
`selectParent()` selects `path[path.length - 2]`. It only works if `path.length >= 2`.

### 6.4 useEmailDragDrop

**File**: `composables/useEmailDragDrop.ts`
**Created by**: `EmailEditor.vue`
**Provided via**: `EMAIL_DRAG_DROP_KEY`

Pure state container with no logic:

```typescript
{
  isDragging: Ref<boolean>
  dragSource: Ref<DragSource | null>
  dropTarget: Ref<DropTarget | null>
  startDrag: (source: DragSource) => void     // sets isDragging + source
  updateDropTarget: (target | null) => void   // updates target continuously
  endDrag: () => void                          // resets all to initial
}
```

### 6.5 useEmailIframeSync

**File**: `composables/useEmailIframeSync.ts`

**NOTE**: This composable exists in the codebase but is NOT currently used by
`EmailEditor.vue`. The iframe management is handled directly inside
`EditorCanvas.vue` which inlines the bridge script and manages `srcdoc` directly.
The composable file remains as a reference implementation.

### 6.6 useEmailKeyboard

**File**: `composables/useEmailKeyboard.ts`
**Created by**: `EmailEditor.vue`
**Returns**: `void` (side-effect only)

Adds a global `keydown` listener on `document` in `onMounted`, removes in `onBeforeUnmount`.

**Shortcuts**:
| Keys | Action |
|------|--------|
| `Ctrl/Cmd + Z` | `doc.history.undo()` |
| `Ctrl/Cmd + Shift + Z` or `Ctrl/Cmd + Y` | `doc.history.redo()` |
| `Delete` or `Backspace` (with selection) | `selection.clearSelection()` then `doc.deleteNode(nodeId)` |
| `Escape` | `selection.clearSelection()` |

**Exclusions** — shortcuts are IGNORED when the event target is:
- An `<input>` or `<textarea>` element
- A `contentEditable` element
- Inside `.ebb-inline-editor` (TipTap overlay)
- Inside `.ebb-code-editor` (CodeMirror wrapper)
- Inside `.cm-editor` (CodeMirror internal)

**CRITICAL**: Delete clears selection BEFORE deleting. If you reverse this order,
the computed `selectedNode` will try to find a deleted node and return null,
but the selectedNodeId will still be set, causing a stale reference.

---

## 7. Serializers

### 7.1 json-to-mjml.ts — Document → MJML

**Function**: `documentToMjml(doc: EmailDocument): string`

Produces a complete `<mjml>` string with `<mj-head>` and `<mj-body>`.

**Node ID injection** (the most critical detail):

Every node gets `css-class="ebb-node-{id}"` injected into its attributes during
serialization. This is how the iframe's bridge script maps compiled HTML elements
back to document nodes.

```
Document node: { id: "a1b2c3d4", type: "mj-text", attributes: {} }
MJML output:   <mj-text css-class="ebb-node-a1b2c3d4">...</mj-text>
```

If the node already has a `css-class` attribute (user-defined), the editor class
is APPENDED: `css-class="user-class ebb-node-a1b2c3d4"`.

**Serialization rules by node category**:
- Self-closing: `<mj-divider css-class="ebb-node-xxx" padding="..." />`
- Content: `<mj-text css-class="ebb-node-xxx">\n  {htmlContent}\n</mj-text>`
- Container: `<mj-section css-class="ebb-node-xxx">\n  {children}\n</mj-section>`

**Head serialization**:
- `fonts` → `<mj-font name="..." href="..." />`
- `previewText` → `<mj-preview>text</mj-preview>`
- `defaultStyles` → `<mj-attributes><mj-text color="..." /><mj-section padding="..." /></mj-attributes>`

**Escaping**: Attribute values are HTML-escaped (`&`, `"`, `<`, `>`). htmlContent
is NOT escaped (it's raw HTML by design).

### 7.2 mjml-to-json.ts — MJML → Document

**Function**: `mjmlToDocument(mjmlSource: string): EmailDocument`

Used in two scenarios:
1. **Migration**: Loading old GrapesJS templates (only MJML string available).
2. **Code view sync**: User edits MJML in CodeMirror, parsed back to document.

**Parsing strategy**:
1. Try `DOMParser.parseFromString(mjml, 'text/xml')` (strict XML).
2. If XML parse error detected (`<parsererror>`), fall back to
   `DOMParser.parseFromString(mjml, 'text/html')` (lenient HTML parser).
3. If both fail, return `createDefaultDocument()`.

**css-class stripping**: During parsing, any class matching `ebb-node-*` is
stripped from the `css-class` attribute. This prevents ID accumulation when
doing a round-trip (serialize → parse → serialize).

**Fresh IDs**: Every parsed node gets a NEW `createId()`. Old IDs from css-class
names are NOT reused. This means a code-view round-trip regenerates all node IDs,
which clears the selection (expected behavior).

**Valid node types**: Only tags listed in the `MJML_NODE_TYPES` Set are processed.
Unknown tags are skipped (their children are lost). If you add a new MJML tag to
`EmailNodeType`, you MUST also add it to `MJML_NODE_TYPES` in this file.

### 7.3 node-factory.ts — Node Creation

Every factory generates a node with a fresh `createId()` and sensible MJML defaults.

| Factory | Default attributes |
|---------|--------------------|
| `createBody()` | `background-color: #f4f4f4` |
| `createSection()` | `background-color: #ffffff`, `padding: 20px 0` |
| `createColumn()` | (none) |
| `createText()` | `font-size: 14px`, `font-family: Helvetica...`, `color: #555555`, `padding: 10px 25px` |
| `createImage()` | `src: placeholder URL`, `alt: Image`, `padding: 10px 25px` |
| `createButton()` | `background-color: #01A8AB`, `color: #ffffff`, `border-radius: 6px`, `inner-padding: 12px 30px` |
| `createDivider()` | `border-color: #e5e7eb`, `border-width: 1px`, `padding: 15px 25px` |
| `createSpacer()` | `height: 20px` |
| `createSocial()` | 3 default elements (Facebook, Twitter, Instagram), `icon-size: 30px`, `mode: horizontal` |
| `createHero()` | `mode: fixed`, `background-height: 400px`, `background-color: #1a1a2e` |

`createDefaultDocument()` returns a document with one section containing a title,
description text, and a button.

---

## 8. Utilities

### 8.1 id.ts

```typescript
createId(): string  // nanoid(8)
```

All node IDs in the system come from this function. 8 characters provides
sufficient collision resistance for documents with hundreds of nodes.

### 8.2 tree.ts

All functions operate on `EmailNode` trees. They mutate in place (except `cloneSubtree`).

| Function | Signature | Behavior |
|----------|-----------|----------|
| `findNode` | `(root, nodeId) → EmailNode \| null` | Depth-first search. |
| `findParent` | `(root, nodeId) → EmailNode \| null` | Returns the node whose `children` contains the target. |
| `getAncestorPath` | `(root, nodeId) → NodeId[]` | Returns `[rootId, ..., parentId, nodeId]`. Empty if not found. |
| `removeNode` | `(root, nodeId) → boolean` | Splices node from parent's children. Returns success. |
| `moveNode` | `(root, nodeId, newParentId, index) → boolean` | Removes then inserts. Index is clamped. |
| `cloneSubtree` | `(node) → EmailNode` | Deep clone with **fresh IDs for every node**. |
| `walkTree` | `(root, visitor) → void` | Depth-first traversal, calls visitor for each node. |
| `getNodeIndex` | `(root, nodeId) → number` | Index within parent's children. -1 if not found. |

**INVARIANT**: `cloneSubtree` MUST generate fresh IDs. If IDs were shared between
the original and clone, the tree operations would break (findNode would return
the wrong one).

---

## 9. Injection Keys

**File**: `injection-keys.ts`

Four `Symbol`-based `InjectionKey`s:

| Key | Provided type | Used by |
|-----|---------------|---------|
| `EMAIL_DOCUMENT_KEY` | `UseEmailDocumentReturn` | Almost all components |
| `EMAIL_SELECTION_KEY` | `UseEmailSelectionReturn` | Canvas, Overlay, Sidebar, Layers |
| `EMAIL_DRAG_DROP_KEY` | `UseEmailDragDropReturn` | Canvas, BlockCard |
| `EMAIL_EDITOR_CONFIG_KEY` | `{ variables: Ref<string[]> }` | BlocksPanel |

**RULE**: `inject()` calls in components use `!` (non-null assertion) because
the editor guarantees these are always provided by `EmailEditor.vue`. If a
component is used outside the editor tree, it will throw at runtime.

---

## 10. Components

### 10.1 EmailEditor.vue (Root)

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `modelValue` | `string` | MJML source string |
| `designJson` | `Record<string, unknown> \| null` | Persisted design JSON |
| `variables` | `string[]` | Template variable names (e.g., `['name', 'email']`) |
| `label` | `string` | Optional form field label |
| `required` | `boolean` | Shows red asterisk |

**Emits**:
| Event | Payload | When |
|-------|---------|------|
| `update:modelValue` | `string` | MJML string changes |
| `update:compiledHtml` | `string` | Compiled HTML changes |
| `update:designJson` | `Record<string, unknown>` | Design JSON changes |

**Circular update guard**: When the editor emits `update:designJson`, the parent
may bind it back to the `designJson` prop, triggering the watcher. The
`selfEmittedDesignJson` flag prevents this from reloading the document:

```
emit → parent updates prop → watcher fires → selfEmittedDesignJson is true → skip → reset flag
```

**External prop change handling**: The watcher on `props.designJson` only reloads
if `isNewEditorJson(newJson)` returns true. This handles language switching in
the parent (different designJson per language).

### 10.2 EditorShell.vue

Layout component. Contains:
- `EditorToolbar` (fixed at top)
- Main flex area:
  - `EditorCanvas` (visible when `activeView === 'visual'`)
  - `CodeEditor` (async-loaded, visible when `activeView === 'code'`)
  - `EditorSidebar` (always visible, 300px width)

**State**:
- `isFullscreen` — toggles `position: fixed; inset: 0; z-index: 9999`
- `activeView` — `'visual' | 'code'`
- `activeDeviceIndex` — index into `DEVICE_PRESETS` (0=Desktop 600px, 1=Tablet 480px, 2=Mobile 320px)
- `canvasWidth` — computed from `DEVICE_PRESETS[activeDeviceIndex].width`

**Height**: `calc(100vh - 180px)` with `min-height: 500px`. In fullscreen: `100vh`.

### 10.3 EditorToolbar.vue

**Left**: Device switcher (3 buttons: Monitor/Tablet/Smartphone icons) + Undo/Redo buttons.
**Center**: Title text.
**Right**: Code view toggle + Fullscreen toggle.

Undo/redo buttons call `doc.history.undo()` / `doc.history.redo()` AND then
`doc.triggerEmit()` to immediately update the iframe (bypassing debounce).

### 10.4 EditorCanvas.vue

The most complex component. Manages the iframe, overlay, drag-and-drop, and
inline editing.

**Iframe content generation**: Builds a complete HTML document containing:
1. `<meta>` charset and viewport tags
2. `<style>` for body, hover outlines, and drag prevention
3. The compiled HTML from `doc.compiledHtml.value`
4. An inline `<script>` (the bridge script — see section 13)

Sets this as `iframe.srcdoc`.

**postMessage handler**: Listens on `window` for messages prefixed with `ebb:`.
Routes them to appropriate handlers:
- `ebb:ready` → marks iframe as ready
- `ebb:height` → updates iframe auto-height
- `ebb:select` → updates selection
- `ebb:deselect` → clears selection
- `ebb:hover` / `ebb:hover-end` → updates hover state
- `ebb:dblclick` → opens inline text editor
- `ebb:hit-test-result` → processes drag-and-drop hit test results

**Drag overlay**: When `dragDrop.isDragging` is true, a transparent overlay is
rendered ABOVE the iframe. This overlay intercepts drag events (which cannot
cross iframe boundaries). On `dragover`, it sends hit-test requests to the
iframe via postMessage. On `drop`, it processes the final hit-test result.

**Drop handling logic**: See section 14.

### 10.5 CanvasOverlay.vue

Renders visual feedback on top of the iframe:
- **Hover outline**: 1px dashed teal border (hidden when hovering the selected node)
- **Selection outline**: 2px solid teal border with a floating toolbar:
  - Select parent (ArrowUp icon) — only if path depth >= 3
  - Node type label (e.g., "Texte", "Section")
  - Move up/down (ChevronUp/ChevronDown) — only if not first/last sibling
  - Duplicate (Copy icon)
  - Delete (Trash2 icon, red hover)
- **Drop indicator**: During drag, shows a 2px teal line with dots on each end
  (for `before`/`after`) or a highlighted area (for `inside`).
- **Drag active zone**: Pulsing dashed border around the entire canvas during drag.

All overlays use `pointer-events: none` except the toolbar buttons (`pointer-events: auto`).
All toolbar button clicks use `@click.stop` to prevent the click from propagating
to the canvas and changing selection.

### 10.6 InlineTextEditor.vue

Overlay for editing `htmlContent` of mj-text and mj-button nodes.

Triggered by `ebb:dblclick` from the iframe bridge.

**Implementation**:
- Renders a TipTap editor positioned to match the node's bounding rect in the iframe
- TipTap extensions: StarterKit (headings 1-4), Link, TextStyle, Color, TextAlign, Underline
- Floating `InlineToolbar` above the editor
- Backdrop catches outside clicks → saves and closes
- Escape key → saves and closes

**CRITICAL**: The editor position is based on the `DOMRect` from the iframe
message. This rect is relative to the iframe viewport, which matches the overlay
coordinate space because the overlay and iframe share the same parent container.

### 10.7 InlineToolbar.vue

Formatting toolbar for the TipTap inline editor:
- Bold, Italic, Underline, Strikethrough
- Link (prompts for URL), Unlink (when link active)
- Align Left/Center/Right
- Color picker (hidden `<input type="color">` behind Palette icon)

Uses `@mousedown.prevent` on the toolbar to prevent the TipTap editor from losing
focus when clicking toolbar buttons.

### 10.8 EditorSidebar.vue

Three tabs: Blocks (LayoutGrid), Styles/Properties (Paintbrush), Layers (Layers).

**Auto-switch behavior**: Watches `selection.selectedNodeId`. When a node is newly
selected (was null, now has value), automatically switches to the Properties tab.

### 10.9 BlocksPanel.vue

- Search input with live filtering (matches against `block.label`)
- Collapsible starter templates section (`TemplatesPanel`)
- Block categories (`BlockCategory` components), each containing a grid of `BlockCard`s
- Empty state when search yields no results
- Injects `EMAIL_EDITOR_CONFIG_KEY` to get `variables` for dynamic variable blocks

### 10.10 PropertiesPanel.vue

Two modes depending on selection:

**Node selected**:
- Header with node type label (teal background) and close button
- Breadcrumb navigation showing ancestor path (clickable to navigate up)
- Content textarea (only for mj-text and mj-button — edits `htmlContent`)
- Property groups (`PropertyGroup` components) organized by `group` field

**No selection (global styles)**:
- Preview text input
- Body background color picker
- Default text color picker
- Default font family selector

### 10.11 LayersPanel.vue

Tree view of the document structure with 3 nesting levels:
- **Sections** (top level, collapsible)
- **Columns** (nested under sections, collapsible)
- **Content nodes** (nested under columns)

Each row shows: expand toggle (if children), type icon (color-coded), label
(section number, column number, or content preview text), and action buttons
(move up/down, delete) on hover.

Click selects the node. Mouseenter/mouseleave triggers hover highlighting in the
canvas. Synchronizes with `selection.selectedNodeId` for active highlighting.

### 10.12 TemplatesPanel.vue

Grid of 8 starter template cards. Each shows an icon (in the template's accent
color), label, and description.

**Confirmation dialog**: Clicking a template shows a modal warning that replacing
the document will lose all current content. Uses `<Teleport to="body">` to render
the modal above everything. Applying calls `doc.replaceDocument(template.factory())`.

### 10.13 CodeEditor.vue

CodeMirror 6 editor for direct MJML editing.

**Extensions**: line numbers, active line highlight, default keymap, tab indentation,
XML language support (`@codemirror/lang-xml`), oneDark theme.

**Bidirectional sync**:
- **Document → editor**: A watcher on `doc.document.value` serializes to MJML and
  updates the CodeMirror content. Uses an `ignoreNextUpdate` flag to prevent
  the update from triggering a parse-back.
- **Editor → document**: An `EditorView.updateListener` detects user edits. On
  each edit, it parses the MJML via `mjmlToDocument()` and replaces the document.
  Sets `ignoreNextUpdate = true` to prevent the watcher from overwriting the editor.

**WARNING**: A code-view round-trip (edit MJML → parse → new document) regenerates
all node IDs. This means selection is lost when switching from code view to
visual view after editing. This is expected behavior.

---

## 11. Blocks & Starter Templates

### Block definition structure

```typescript
interface BlockDefinition {
  id: string                              // unique identifier, e.g. "layout-2-col"
  label: string                           // display name, e.g. "2 colonnes"
  category: 'layout' | 'content' | 'composite' | 'variable'
  icon: string                            // lucide-vue-next icon name
  factory: () => EmailNode | EmailNode[]  // creates fresh node(s) with new IDs
}
```

**CRITICAL**: The `factory` function MUST return fresh nodes with new IDs on every
call. Never cache or reuse factory results. Some factories return an ARRAY of
nodes (e.g., `composite-image-grid` returns 2 sections, `composite-order-summary`
returns 4 sections).

### Block categories

| Category | Count | Source file |
|----------|-------|-------------|
| Layout | 6 | `layout-blocks.ts` — 1-col through 4-col, sidebar-left, sidebar-right |
| Content | 7 | `content-blocks.ts` — text, image, button, divider, spacer, social, hero |
| Composite | 30 | `composite-blocks.ts` — pre-designed modules (headers, CTAs, pricing, etc.) |
| Variable | dynamic | `variable-blocks.ts` — one block per template variable |

### Starter templates

8 complete `EmailDocument` factories in `starter-templates.ts`:
blank, newsletter, promotion, welcome, order-confirmation, event, notification, password-reset.

Each returns a full document with head attributes and a complete body tree.

---

## 12. Properties System

**File**: `properties/property-definitions.ts`

### PROPERTY_MAP

```typescript
Partial<Record<EmailNodeType, PropertyDefinition[]>>
```

Maps each node type to its editable properties. Each property has:

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | MJML attribute name (e.g., `background-color`, `padding`) |
| `label` | `string` | Display label (currently in French) |
| `type` | `PropertyType` | Input widget type |
| `group` | `string` | Grouping heading in the panel |
| `options` | `Array<{label, value}>` | For `select` type |
| `min`, `max`, `step`, `unit` | `number`, `string` | For `number` type |
| `defaultValue` | `string` | Placeholder/default |

### Property types and their widgets

| Type | Widget | Behavior |
|------|--------|----------|
| `color` | Color picker + text input | Both update the same attribute |
| `select` | `<select>` dropdown | Options from `options` array |
| `number` | Number input + unit label | Value emitted with unit appended (e.g., `"14px"`) |
| `alignment` | 3-button toggle (left/center/right) | Emits `"left"`, `"center"`, or `"right"` |
| `toggle` | On/Off button | Emits `"full-width"` or `""` (empty to delete attribute) |
| `padding` | Text input | Free-form (e.g., `"10px 25px"`) |
| `text` | Text input | Free-form string |
| `url` | Text input | Free-form URL |
| `image` | Text input | Free-form image URL |

### getNodeTypeLabel

Returns a French label for each node type (used in overlay toolbar and properties
panel header). E.g., `'mj-text' → 'Texte'`, `'mj-section' → 'Section'`.

---

## 13. Iframe Bridge Protocol

The iframe contains an inline `<script>` injected by `EditorCanvas.vue`.
This script runs inside the iframe's execution context and communicates with
the parent via `window.parent.postMessage()`.

### Initialization sequence

1. Script runs: iterates all elements with `class` containing `ebb-node-*`.
2. Extracts node ID from class name, sets `data-node-id` attribute.
3. **Propagates down**: For each annotated element, walks its structural children
   (`table`, `tbody`, `tr`, `td`, `div`) and copies the `data-node-id` to them
   — UNLESS they already have their own `data-node-id`. This ensures that
   clicking on empty space inside a table cell (generated by MJML compilation)
   still resolves to the correct node.
4. Sets up event listeners (click, dblclick, mouseover, mouseout).
5. Sets up MutationObserver for height reporting.
6. Posts `{ type: 'ebb:ready' }`.

### Messages: iframe → parent

| Message | Trigger | Data |
|---------|---------|------|
| `ebb:ready` | Script initialized | (none) |
| `ebb:height` | Content height changed | `{ height: number }` |
| `ebb:select` | Click on annotated element | `{ nodeId, rect }` |
| `ebb:deselect` | Click on non-annotated area | (none) |
| `ebb:hover` | Mouseover annotated element | `{ nodeId, rect }` |
| `ebb:hover-end` | Mouseout to non-annotated area | (none) |
| `ebb:dblclick` | Double-click annotated element | `{ nodeId, rect }` |
| `ebb:hit-test-result` | Response to hit-test request | `{ nodeId, position, rect, isDrop }` |

### Messages: parent → iframe

| Message | Trigger | Data |
|---------|---------|------|
| `ebb:hit-test` | Drag over canvas overlay | `{ x, y, isDrop }` |

### Column refinement

When a user clicks on a section (which contains multiple columns), the bridge
script refines the selection to the specific column under the cursor:

1. Check if the clicked element has child elements with class `mj-column-*`.
2. If yes, iterate columns and find the one whose bounding rect contains the
   click's X coordinate.
3. If no exact match, find the nearest column by center distance.
4. Return the column's `data-node-id` instead of the section's.

This same refinement applies to hit-test results during drag-and-drop.

### Height reporting

A `MutationObserver` watches `document.body` for changes (childList, subtree,
attributes). On any mutation, it reports `document.documentElement.scrollHeight`
to the parent. A `resize` listener also reports height. The parent uses this to
set `iframe.style.height`, creating an auto-sizing iframe with no scrollbar.

---

## 14. Drag & Drop System

### Flow overview

```
1. User drags BlockCard from sidebar
   → BlockCard.onDragStart → dragDrop.startDrag({ type: 'new-block', block })
   → isDragging becomes true

2. EditorCanvas shows transparent drag overlay above iframe

3. User moves mouse over overlay
   → onOverlayDragOver → sendHitTest(e, isDrop=false)
   → parent posts ebb:hit-test to iframe with (x, y) relative to iframe
   → iframe does elementFromPoint(x, y) → finds annotated element
   → iframe refines to column if needed
   → iframe determines position ('before'/'after') based on midY
   → iframe posts ebb:hit-test-result back to parent
   → parent updates dropIndicatorRect + dropIndicatorPosition
   → CanvasOverlay renders drop indicator

4. User releases mouse
   → onOverlayDrop → sendHitTest(e, isDrop=true)
   → Same sequence but with isDrop=true
   → handleDrop(targetNodeId, position)
   → Insert or move node
   → dragDrop.endDrag()
```

### Drop logic (insertNodesAtTarget)

The drop logic is the most nuanced part. It determines WHERE to insert based on
what is being dragged and what it's being dropped on:

| Dragged | Dropped on | Result |
|---------|-----------|--------|
| Section-level node(s) | Section | Insert before/after that section |
| Section-level node(s) | Content inside column | Walk up to find nearest section, insert relative to it |
| Section-level node(s) | Body | Append to body's children |
| Content node(s) | Section | Route to first column, append at end |
| Content node(s) | Column | Append at end of column's children |
| Content node(s) | Content node | Insert as sibling (before/after based on drop position) |

**Section-level types**: `mj-section`, `mj-wrapper`, `mj-hero`.

**INVARIANT**: Content nodes must never be direct children of `mj-body` or
`mj-section`. They must always be inside `mj-column`. The drop logic enforces this.

### Moving existing nodes (moveExistingNode)

Same logic as insertion but uses `doc.moveNodeTo()` instead of `doc.insertNode()`.
The node is removed from its current position and re-inserted at the target.

---

## 15. Inline Text Editing

Triggered by double-clicking a `mj-text` or `mj-button` node in the iframe.

### Flow

1. Iframe bridge sends `ebb:dblclick` with `nodeId` and `rect`.
2. `EditorCanvas.openInlineEditor` checks if node is a content type.
3. Sets `inlineEditNodeId`, `inlineEditContent`, `inlineEditRect`.
4. `InlineTextEditor` renders, positioned to overlay the iframe element.
5. TipTap editor initialized with `htmlContent`.
6. User edits text with rich formatting.
7. On close (Escape or backdrop click):
   - `onInlineSave(html)` calls `doc.updateNodeContent(nodeId, html)`
   - `onInlineClose()` resets inline edit state

### TipTap extensions

- `StarterKit` (paragraphs, headings 1-4, bold, italic, strike, lists, blockquote, code, hard break)
- `Link` (openOnClick disabled — clicking selects, not follows)
- `TextStyle` + `Color` (text color)
- `TextAlign` (left, center, right)
- `Underline`

### Positioning

The editor overlay is positioned using the `rect` prop (DOMRect from the iframe).
Since the overlay and iframe share the same parent container (`.ebb-canvas__iframe-wrapper`),
the rect coordinates map directly.

---

## 16. Undo / Redo

### Strategy

**Snapshot-based** using VueUse's `useManualRefHistory` with `lodash.cloneDeep`.
Every mutation snapshots the ENTIRE document before modifying it.

- Capacity: 50 snapshots maximum.
- Clone function: `cloneDeep` (deep copy of entire EmailDocument tree).
- Redo: manually managed via a plain array `undoStack`.

### Sequence

```
User clicks a property input
  → updateNodeAttribute(nodeId, key, value)
    → history.commit()           // cloneDeep of current doc → pushed to history
    → mutate document.value      // actual change
    → emitChanges()              // debounced 300ms

User presses Ctrl+Z
  → history.undo()
    → push current doc to undoStack (cloneDeep)
    → rawUndo() restores previous snapshot
  → triggerEmit()               // immediate emit to update iframe

User presses Ctrl+Shift+Z
  → history.redo()
    → rawCommit() saves current state
    → pop from undoStack → assign to document.value
  → triggerEmit()
```

### When new actions clear redo

`commit()` clears the `undoStack`. This means: once the user makes a new change
after undoing, the redo history is lost. This is standard behavior matching every
text editor.

---

## 17. Code View

### Activation

Toggled via the `</>` button in the toolbar. Switches `activeView` between
`'visual'` and `'code'`. The CodeEditor is loaded asynchronously
(`defineAsyncComponent`), so CodeMirror JS is not bundled until first use.

### Bidirectional sync mechanism

Two sync directions with a guard flag to prevent infinite loops:

**Direction 1: Document → CodeMirror** (watcher):
```
document.value changes
  → watcher fires
  → if ignoreNextUpdate → skip, reset flag
  → serialize doc to MJML via documentToMjml()
  → compare with current editor content
  → if different → update editor content
```

**Direction 2: CodeMirror → Document** (update listener):
```
User types in editor
  → EditorView.updateListener fires
  → if not a user edit (docChanged=false) → skip
  → parse MJML via mjmlToDocument()
  → set ignoreNextUpdate = true
  → doc.replaceDocument(parsed)
```

### Important consequences

- Editing in code view regenerates ALL node IDs (because `mjmlToDocument` creates fresh IDs).
- Selection is lost when switching from code to visual view after edits.
- Invalid MJML in the editor does not crash — parse errors are silently ignored
  and the document is not updated until valid MJML is entered.

---

## 18. Migration from GrapesJS

### Detection

```typescript
function isNewEditorJson(data: unknown): data is EmailDesignJson {
  return !!data && typeof data === 'object'
    && (data as Record<string, unknown>)?._editor === 'mesagoo-email-editor'
}
```

### Loading logic (in loadFromProps)

```typescript
if (designJson && isNewEditorJson(designJson)) {
  // New format: use designJson.document directly
  document.value = designJson.document
} else if (mjml && mjml.trim()) {
  // Old format or no designJson: parse the MJML string
  document.value = mjmlToDocument(mjml)
} else {
  // Empty: default document
  document.value = createDefaultDocument()
}
```

Old GrapesJS `design_json` values do NOT have `_editor: 'mesagoo-email-editor'`,
so they fall through to the MJML parsing path. The MJML body string is always
available as a fallback.

### What happens to old templates

When an old GrapesJS template is loaded:
1. The old `design_json` is ignored (not parseable by this editor).
2. The MJML `body` string is parsed via `mjmlToDocument()`.
3. A new document tree is created with fresh IDs.
4. On first save, the new `EmailDesignJson` format is emitted.
5. From this point on, the template uses the new format.

---

## 19. CSS Conventions

### Namespace

All CSS classes are prefixed with `ebb-` (Email Body Builder). This prevents
collisions with the parent application's Tailwind classes.

### Key classes

| Class | Element |
|-------|---------|
| `.ebb-shell` | Root editor container |
| `.ebb-shell--fullscreen` | Fullscreen mode modifier |
| `.ebb-main` | Flex container (canvas + sidebar) |
| `.ebb-canvas` | Canvas wrapper with dotted background |
| `.ebb-canvas__iframe-wrapper` | Iframe + overlay container |
| `.ebb-canvas__iframe` | The actual iframe |
| `.ebb-canvas__drag-overlay` | Transparent overlay for drag events |
| `.ebb-overlay` | Selection/hover/drop overlay container |
| `.ebb-overlay__hover` | Hover outline |
| `.ebb-overlay__selection` | Selection outline |
| `.ebb-overlay__toolbar` | Floating toolbar on selection |
| `.ebb-overlay__drop-indicator` | Drop position indicator line |

### Dark theme

Dark theme is supported via:
```css
html[data-theme='dark'] .ebb-component { /* dark styles */ }
```

### Dimensions

- Sidebar: fixed 300px width
- Toolbar: 48px height
- Canvas: fills remaining space
- Iframe: auto-height from content, width from device preset
- Shell height: `calc(100vh - 180px)`, min 500px

---

## 20. Invariants & Rules That Must Never Be Broken

These rules are critical to the editor's correctness. Breaking any of them will
cause bugs, data corruption, or crashes.

### Data model invariants

1. **Every node MUST have a unique ID**. Never reuse IDs across nodes, even
   temporarily. Use `createId()` for all new nodes.

2. **`mj-body` is always the root**. `document.body.type` must be `'mj-body'`.
   Never delete or replace it with a different type.

3. **Content nodes (`mj-text`, `mj-button`) must have `children: []`**.
   They use `htmlContent` for their content, not children.

4. **Self-closing nodes (`mj-divider`, `mj-spacer`, `mj-image`) have neither
   `children` nor `htmlContent`**. Both should be empty/undefined.

5. **`mj-section` direct children must be `mj-column` only**. The MJML spec
   requires this. Breaking it produces invalid MJML that won't compile.

6. **`mj-body` direct children must be `mj-section`, `mj-wrapper`, or `mj-hero`
   only**. Same reason.

### Mutation invariants

7. **Always call `history.commit()` BEFORE mutating `document.value`**.
   This is what makes undo work. If you mutate first, the snapshot captures
   the already-mutated state.

8. **Never mutate `document.value` outside of `useEmailDocument` methods**.
   All mutations must go through the composable to ensure history + emission.

9. **`emitChanges()` must be called after every mutation**. The debounced
   function batches them, but it must be triggered.

### Serialization invariants

10. **`css-class` injection must use the format `ebb-node-{id}`**. The bridge
    script and the MJML-to-JSON parser both depend on this exact prefix.

11. **`mjml-to-json` must strip `ebb-node-*` classes**. Otherwise, re-serialized
    MJML accumulates duplicate classes on every round-trip.

12. **`cloneSubtree` must generate fresh IDs for ALL cloned nodes**. Sharing
    IDs between original and clone breaks `findNode`.

### Iframe invariants

13. **The `data-node-id` attribute is the ONLY way the iframe identifies nodes**.
    It is set by the bridge script from `ebb-node-*` CSS classes. If the
    class injection (rule 10) is broken, the entire iframe interaction breaks.

14. **The bridge script propagates `data-node-id` downward** through structural
    elements (table, tbody, tr, td, div). This ensures clicks on empty areas
    inside MJML-generated table cells resolve to the correct node.

15. **All postMessage types MUST start with `ebb:`**. The parent's message
    listener filters by this prefix.

### Type system invariants

16. **If you add a new `EmailNodeType`, update ALL of these**:
    - `types.ts`: Add to the union type and the correct classification array.
    - `serializer/mjml-to-json.ts`: Add to `MJML_NODE_TYPES` Set.
    - `serializer/node-factory.ts`: Add a factory function.
    - `properties/property-definitions.ts`: Add to `PROPERTY_MAP` and `getNodeTypeLabel`.
    - `components/canvas/EditorCanvas.vue`: Update bridge script if needed.
    - `blocks/`: Add a block definition if it should appear in the sidebar.
    - `components/sidebar/LayersPanel.vue`: Add icon and color for the type.
    - `components/sidebar/blocks/BlockPreview.vue`: Add SVG preview.

17. **The `_editor: 'mesagoo-email-editor'` discriminator must NEVER change**.
    Changing it breaks migration detection for all existing templates.

---

## 21. Known Limitations

1. **No image upload in editor**: Image URLs must be entered manually. An image
   gallery (using the existing `MessageTemplateService.uploadTemplateImage()` API)
   is planned for Phase 2.

2. **No column resize by dragging**: Column widths can only be changed via the
   properties panel text input. Visual drag-to-resize is a Phase 2 feature.

3. **No copy/paste between nodes**: Ctrl+C/Ctrl+V is not implemented. Only
   duplicate (which inserts adjacent to the original) is available.

4. **Code view round-trip regenerates IDs**: Editing in code view and switching
   back to visual view loses selection because all node IDs are regenerated.

5. **Redo stack is not reactive**: The redo button enable/disable may not update
   instantly in all edge cases (see useEmailHistory notes in section 6.2).

6. **No collaborative editing**: The editor assumes a single user. Concurrent
   edits to the same template will overwrite each other.

7. **Property labels are in French**: The `PROPERTY_MAP` labels and
   `getNodeTypeLabel` function use hardcoded French strings, not i18n keys.

8. **No validation of MJML structure**: The editor does not prevent creating
   invalid MJML structures (e.g., nesting a section inside a column). The MJML
   compiler will produce errors or unexpected output in these cases.

---

## 22. Common Maintenance Scenarios

### Adding a new MJML node type

Follow rule 16 above. Checklist:
1. Add to `EmailNodeType` union and correct classification array in `types.ts`.
2. Add to `MJML_NODE_TYPES` in `mjml-to-json.ts`.
3. Create factory function in `node-factory.ts`.
4. Add property definitions in `property-definitions.ts`.
5. Add block definition in the appropriate `blocks/*.ts` file.
6. Register in `block-definitions.ts`.
7. Add SVG preview in `BlockPreview.vue`.
8. Add icon and color in `LayersPanel.vue`.

### Adding a new property to an existing node type

1. Add `PropertyDefinition` to the node's array in `PROPERTY_MAP`.
2. That's it. The property will automatically appear in the correct group in
   `PropertiesPanel.vue` and changes will flow through `updateNodeAttribute`.

### Adding a new block

1. Create a factory function that returns `EmailNode | EmailNode[]`.
2. Add a `BlockDefinition` object to the appropriate blocks file.
3. If it's a new file, register it in `block-definitions.ts`.
4. Add SVG preview in `BlockPreview.vue` (match by block ID).

### Adding a new starter template

1. Add a `StarterTemplate` object to `starter-templates.ts`.
2. The factory must return a complete `EmailDocument` with fresh IDs.
3. It will automatically appear in `TemplatesPanel.vue`.

### Changing the emission debounce timing

In `useEmailDocument.ts`, change the `300` in:
```typescript
const emitChanges = useDebounceFn(async () => { await doEmit() }, 300)
```
Lower = more responsive but more MJML compilations. Higher = fewer compilations
but more delay before the iframe updates.

### Debugging iframe communication

1. Open browser DevTools.
2. In Console, filter by `ebb:` to see postMessage traffic.
3. In the iframe's Elements panel, look for `data-node-id` attributes.
4. If nodes are not selectable, check that `ebb-node-*` classes exist in the
   compiled HTML (view iframe source).
5. If classes exist but `data-node-id` is missing, the bridge script annotation
   failed — check for JS errors in the iframe's console.

### Debugging undo/redo

1. Add a `console.log` in `useEmailHistory.commit()` to see when snapshots are taken.
2. Check `history.value.length` to see how many snapshots exist.
3. Verify that `commit()` is called BEFORE the mutation, not after.

---

## 23. AI Template Generation

The AI subsystem lets users generate complete email templates from natural language
descriptions via a chat interface. It follows a BYOAI (Bring Your Own AI) pattern:
the host application provides an `AiProvider` implementation, and the editor handles
the chat UI, system prompt, response parsing, preview, and iterative refinement.

### 23.1 File Map

| File | Purpose |
|------|---------|
| `src/types.ts` (lines 339–369) | `AiProvider`, `AiChatMessage`, `AiAttachment` type definitions |
| `src/ai/system-prompt.ts` | `buildTemplateSystemPrompt()` — generates the system prompt with schema, design rules, examples, and merge tags |
| `src/ai/parse-ai-response.ts` | `parseAiTemplateResponse()` — extracts and validates `EmailDocument` JSON from raw AI output; `AiParseError` class |
| `src/composables/useAiChat.ts` | `useAiChat()` composable — manages messages, streaming, auto-retry, preview compilation, apply/discard |
| `src/components/sidebar/AiChatPanel.vue` | Chat UI component — messages list, input with attachments, preview iframe, apply/discard actions |
| `src/ai/index.ts` | Barrel re-exports for the `ai/` module |

### 23.2 Data Flow

```
User message
    │
    ▼
useAiChat.sendMessage(text, attachments?)
    │
    ├── Builds system prompt (buildTemplateSystemPrompt)
    ├── Injects current template as context (lastGeneratedTemplate or editor document)
    ├── Calls aiProvider.generateTemplateStream() or aiProvider.generateTemplate()
    │
    ▼
Raw AI response string
    │
    ├── looksLikeJson() heuristic
    │   ├── true  → parseAiTemplateResponse()
    │   │           ├── extractJson() — tries: direct parse, code fences, bracket-counted extraction
    │   │           ├── validateDocument() — checks version, body.type, node types; auto-fills missing fields
    │   │           ├── regenerateIds() — replaces all node IDs with fresh nanoid(8)
    │   │           └── Returns EmailDocument
    │   │
    │   │   On AiParseError → auto-retry: asks AI to re-send raw JSON
    │   │
    │   └── false → Conversation mode: display text as assistant message
    │
    ▼
lastGeneratedTemplate = parsed EmailDocument
    │
    ├── documentToMjml(doc) → MJML string
    ├── compileMjml(mjml)   → { html }
    └── previewHtml = html  → displayed in <iframe srcdoc="...">
```

### 23.3 System Prompt Architecture

`buildTemplateSystemPrompt(options?)` generates a ~400-line prompt including:

1. **Absolute rules** — image sources (picsum.photos only), color requirements, minimum section count, font declarations, section title patterns
2. **Operating modes** — Conversation (ask questions), Generation (output JSON only), Refinement (modify existing template)
3. **Image/document attachment handling** — instructions for analyzing visual references
4. **Design system** — 8 color palettes, typography hierarchy, image dimensions, layout patterns
5. **JSON schema reference** — complete `EmailDocument` / `EmailNode` type definitions and MJML rendering rules
6. **Complete example** — a 10-section marketing newsletter with all patterns demonstrated
7. **Merge tags** — if provided, listed for the AI to use in templates
8. **Output format reminder** — strict rules for JSON-only or text-only responses

Customizable via `promptPrefix` and `promptSuffix` options.

### 23.4 Response Parsing

`parseAiTemplateResponse(raw)` uses multiple strategies to extract valid JSON:

1. Direct `JSON.parse` (with auto-repair for trailing commas, truncated output)
2. Extract from markdown code fences (````json ... ````)
3. Bracket-counted extraction from arbitrary positions in the text

Auto-repair handles:
- Trailing commas before `}` or `]`
- Single-line `//` comments
- Truncated JSON (unclosed brackets/braces are auto-closed)
- Missing `version`, `headAttributes`, `children` fields

All node IDs are regenerated with `createId()` (nanoid 8 chars) to prevent
conflicts with existing editor nodes.

### 23.5 useAiChat Composable

```ts
function useAiChat(
  aiProvider: AiProvider,
  document: Ref<EmailDocument>,
  replaceDocument: (doc: EmailDocument) => void,
  options?: UseAiChatOptions,
): UseAiChatReturn
```

**Options:**
- `mergeTags?: MergeTag[]` — passed to system prompt
- `promptPrefix?: string` — prepended to system prompt
- `promptSuffix?: string` — appended to system prompt

**Returned state:**
- `messages: Ref<AiChatMessage[]>` — conversation history
- `isGenerating: Ref<boolean>` — loading state
- `error: Ref<string | null>` — last error message
- `lastGeneratedTemplate: Ref<EmailDocument | null>` — pending template (not yet applied)
- `previewHtml: Ref<string>` — compiled HTML for iframe preview
- `streamBuffer: Ref<string>` — real-time stream output

**Returned actions:**
- `sendMessage(text, attachments?)` — send user message and trigger AI
- `applyTemplate()` — load `lastGeneratedTemplate` into editor via `replaceDocument()`
- `discardTemplate()` — clear pending template without applying
- `clearConversation()` — reset all state
- `retry()` — resend last failed message

**Key invariants:**
- Refinement context: when a previewed template exists (`lastGeneratedTemplate`), it is sent to the AI as `CURRENT_PREVIEW_TEMPLATE_JSON` — not the editor document. This ensures iterative refinement works correctly.
- Auto-retry: if `parseAiTemplateResponse` throws `AiParseError`, the composable automatically sends a follow-up message asking the AI to re-send raw JSON, then tries parsing again.
- Streaming: if `generateTemplateStream` is available, it is preferred over `generateTemplate`. Chunks are concatenated in `streamBuffer` for real-time display.

### 23.6 AiChatPanel.vue

The sidebar panel component. Key features:

- **Messages list** — square messages with colored left border (primary for user, gray for assistant)
- **Preview toggle** — Chat/Preview tabs appear when a template is generated; Preview activates automatically
- **Iframe preview** — `<iframe srcdoc="..." sandbox="allow-same-origin">` showing compiled email HTML
- **Apply/Discard actions** — text-only actions (no buttons) separated by a vertical line
- **Input row** — capsule-shaped textarea with image attachment support (ImagePlus icon)
- **Streaming indicator** — spinner and "Generating..." text during AI calls
- **Error state** — error message with retry action

### 23.7 Maintenance Notes

- **Adding new node types**: Update `VALID_NODE_TYPES` set in `parse-ai-response.ts` and
  the JSON schema section in `system-prompt.ts`.
- **Changing the system prompt**: Always test with multiple AI models (Claude, GPT-4, etc.)
  since different models respond differently to prompt structure.
- **Preview compilation**: Uses the same `documentToMjml` + `compileMjml` pipeline as the
  main editor. Any changes to the serializer affect previews too.
- **Chat labels**: All UI strings use `EditorLabels` keys prefixed with `ai_chat_`. See
  `labels.ts` for the full list.

---

## Appendix: External Dependencies

| Package | Used for | Where |
|---------|----------|-------|
| `nanoid` | Node ID generation | `utils/id.ts` |
| `lodash` (cloneDeep) | Deep cloning for undo/redo | `useEmailHistory.ts` |
| `@vueuse/core` | `useManualRefHistory`, `useDebounceFn` | `useEmailHistory.ts`, `useEmailDocument.ts` |
| `mjml-browser` | MJML → HTML compilation | `@/composables/useMjmlCompiler.ts` (external) |
| `@tiptap/vue-3` + extensions | Inline rich text editing | `InlineTextEditor.vue` |
| `@codemirror/view`, `@codemirror/state` | Code editor | `CodeEditor.vue` |
| `@codemirror/lang-xml` | MJML syntax highlighting | `CodeEditor.vue` |
| `@codemirror/theme-one-dark` | Editor theme | `CodeEditor.vue` |
| `lucide-vue-next` (via BaseIcon) | Icons throughout UI | All components |

---

*Last updated: 2026-03-01*
