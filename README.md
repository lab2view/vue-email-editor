# @lab2view/vue-email-editor

A professional, extensible drag-and-drop email editor built with **Vue 3** and **MJML**. Design responsive HTML emails visually with 43 pre-built blocks, a plugin system, full i18n support, and a complete imperative API.

## Screenshots

| Blocks & Layout | Ready-made Templates |
|:---:|:---:|
| ![Blocks panel with layout and content blocks](src/assets/capture_blocs_layouts_1.png) | ![Ready-made composite blocks](src/assets/capture_blocs_ready_made_1.png) |

| Property Editing | Layers Panel |
|:---:|:---:|
| ![Image properties and styling](src/assets/capture_blocs_styes_image_1.png) | ![Document tree layers view](src/assets/capture_layers_1.png) |

## Features

### Visual Drag & Drop Builder
- Intuitive block-based editor with live preview
- Drag blocks from the sidebar onto the canvas
- Reorder and nest elements with visual drop indicators
- Responsive preview in Desktop, Tablet, and Mobile modes
- Iframe-isolated canvas for accurate email rendering

### 43 Pre-built Blocks

| Category | Count | Examples |
|----------|-------|---------|
| **Layout** | 6 | 1-4 columns, sidebar left/right |
| **Content** | 7 | Text, Image, Button, Divider, Spacer, Social, Hero |
| **Composite** | 30 | Header, Hero Banner, Pricing, Testimonial, FAQ, Product Card, Footer, and more |

### Rich Text Editing
Powered by [TipTap](https://tiptap.dev), with inline formatting:
- Bold, Italic, Underline, Strikethrough
- Text alignment (left, center, right)
- Text color picker
- Link insertion and editing

### MJML-Powered Rendering
- Real-time MJML to HTML compilation via [mjml-browser](https://github.com/mjmlio/mjml)
- 13 supported MJML node types
- Export as MJML, compiled HTML, or design JSON
- Legacy GrapesJS format detection for migration

### Undo / Redo
- Full history with keyboard shortcuts (`Ctrl+Z` / `Ctrl+Shift+Z`)
- Reactive `canUndo` / `canRedo` state

### Property Editing
- 40+ editable MJML attributes across 11 property types
- Color pickers, padding controls, alignment selectors
- Global styles panel (email background, default font, preview text)
- Custom fonts support

---

## Installation

```bash
npm install @lab2view/vue-email-editor
```

**Peer dependencies:**
```bash
npm install vue@^3.4 mjml-browser@^4.15
```

## Quick Start

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { EmailEditor, FR_LABELS } from '@lab2view/vue-email-editor'

const editorRef = ref()
const mjml = ref('')
const html = ref('')
const designJson = ref()
</script>

<template>
  <EmailEditor
    ref="editorRef"
    v-model="mjml"
    :design-json="designJson"
    :labels="FR_LABELS"
    @update:compiled-html="html = $event"
    @update:design-json="designJson = $event"
  />
</template>
```

## Theming

Customize the editor appearance with the `theme` prop:

```vue
<EmailEditor
  :theme="{
    primaryColor: '#7C3AED',
    primaryHover: '#6D28D9',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
  }"
/>
```

### Available Theme Properties

| Property | Default | Description |
|----------|---------|-------------|
| `primaryColor` | `#01A8AB` | Main accent color |
| `primaryHover` | `#018F91` | Hover state |
| `primaryActive` | `#017375` | Active/pressed state |
| `backgroundColor` | `#ffffff` | Panel backgrounds |
| `borderColor` | `#e5e7eb` | Border color |
| `textPrimary` | `#1f2937` | Primary text |
| `textSecondary` | `#6b7280` | Secondary text |
| `canvasBg` | `#e5e7eb` | Canvas background |
| `selectionColor` | `#01A8AB` | Selected node outline |
| `fontFamily` | System stack | UI font family |
| `fontSize` | `13px` | UI font size |
| `borderRadius` | `6px` | UI border radius |

See `ThemeConfig` in [src/types.ts](src/types.ts) for the full list of 25 properties.

## Internationalization (i18n)

The editor ships with English defaults and a complete French translation. Pass custom labels via the `labels` prop:

```vue
<script setup>
import { EmailEditor, FR_LABELS } from '@lab2view/vue-email-editor'
</script>

<!-- French UI -->
<EmailEditor :labels="FR_LABELS" />

<!-- Custom labels (partial override) -->
<EmailEditor :labels="{ editor_title: 'Mein Editor', undo: 'Ruckgangig' }" />
```

175+ label keys cover all UI elements: toolbar, sidebar tabs, block names, property labels, option values, and status messages. See `EditorLabels` in [src/labels.ts](src/labels.ts).

## Imperative API

Access the editor programmatically via template ref:

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { EmailEditor } from '@lab2view/vue-email-editor'

const editor = ref()

onMounted(() => {
  // Export
  const mjml = editor.value.getMjml()
  const html = editor.value.getHtml()
  const json = editor.value.getDesignJson()

  // History
  editor.value.undo()
  editor.value.redo()

  // Selection
  editor.value.selectNode('node-id')
  const selected = editor.value.getSelectedNode()
  editor.value.clearSelection()

  // Manipulation
  editor.value.deleteNode('node-id')
  editor.value.duplicateNode('node-id')
  editor.value.updateNodeAttribute('node-id', 'color', '#ff0000')

  // Events
  editor.value.on('editor:change', ({ document }) => {
    console.log('Document changed', document)
  })
})
</script>
```

### Full API Reference

| Method | Returns | Description |
|--------|---------|-------------|
| `getDocument()` | `EmailDocument` | Current document tree |
| `setDocument(doc)` | `void` | Replace entire document |
| `getMjml()` | `string` | Export as MJML string |
| `getHtml()` | `string` | Export as compiled HTML |
| `getDesignJson()` | `EmailDesignJson` | Export persisted format |
| `undo()` | `void` | Undo last change |
| `redo()` | `void` | Redo last undone change |
| `canUndo()` | `boolean` | Whether undo is available |
| `canRedo()` | `boolean` | Whether redo is available |
| `selectNode(id)` | `void` | Select a node by ID |
| `getSelectedNode()` | `EmailNode \| null` | Get selected node |
| `clearSelection()` | `void` | Deselect current node |
| `deleteNode(id)` | `void` | Remove a node |
| `duplicateNode(id)` | `NodeId \| null` | Clone a node |
| `insertBlock(block, parentId, index?)` | `NodeId \| null` | Insert a block |
| `updateNodeAttribute(id, key, value)` | `void` | Update an attribute |
| `loadTemplate(doc)` | `void` | Load an EmailDocument |
| `on(event, handler)` | `void` | Subscribe to event |
| `off(event, handler)` | `void` | Unsubscribe from event |

## Events

Subscribe to editor events for real-time notifications:

```ts
editor.value.on('node:selected', ({ nodeId, node }) => {
  console.log('Selected:', node.type)
})

editor.value.on('editor:change', ({ document }) => {
  // Auto-save
  saveToServer(document)
})
```

| Event | Payload | Trigger |
|-------|---------|---------|
| `editor:ready` | `{ document }` | Editor initialized |
| `editor:change` | `{ document }` | Any document change |
| `node:selected` | `{ nodeId, node }` | Node selected |
| `node:deselected` | `{ nodeId }` | Selection cleared |
| `node:deleted` | `{ nodeId }` | Node removed |
| `node:moved` | `{ nodeId, fromParentId, toParentId }` | Node repositioned |
| `node:duplicated` | `{ originalId, newId }` | Node cloned |
| `block:dropped` | `{ blockId, parentId }` | Block added from panel |
| `history:undo` | `{ canUndo, canRedo }` | Undo performed |
| `history:redo` | `{ canUndo, canRedo }` | Redo performed |
| `property:changed` | `{ nodeId, key, value }` | Attribute updated |

## Plugin System

Extend the editor with custom blocks, property editors, toolbar actions, and sidebar panels:

```ts
import type { Plugin } from '@lab2view/vue-email-editor'
import { createText } from '@lab2view/vue-email-editor'

const myPlugin: Plugin = (ctx) => {
  // Add a custom block
  ctx.registerBlock({
    id: 'custom-banner',
    label: 'Custom Banner',
    category: 'content',
    icon: 'Sparkles',
    factory: () => createText('<h1>My Custom Block</h1>', {
      align: 'center',
      'font-size': '24px',
    }),
  })

  // Add a new block category
  ctx.registerBlockCategory({
    id: 'my-category',
    label: 'My Blocks',
    icon: 'Package',
    order: 50,
  })

  // Add a toolbar button
  ctx.registerToolbarAction({
    id: 'save',
    label: 'Save',
    icon: 'Save',
    handler: () => console.log('Saving...'),
    position: 'right',
  })

  // Listen to events
  ctx.on('editor:change', ({ document }) => {
    console.log('Auto-saving...')
  })
}
```

```vue
<EmailEditor :plugins="[myPlugin]" />
```

### Plugin Context API

| Method | Description |
|--------|-------------|
| `registerBlock(block)` | Add a custom block to the blocks panel |
| `registerBlockCategory(category)` | Define a new block category |
| `registerPropertyEditor(type, component)` | Override a property editor component |
| `registerToolbarAction(action)` | Add a button to the toolbar |
| `registerSidebarPanel(panel)` | Add a custom sidebar tab/panel |
| `on(event, handler)` | Subscribe to editor events |
| `off(event, handler)` | Unsubscribe from events |
| `labels` | Reactive reference to current labels |

## Exports

The package provides 35+ exports for advanced usage:

```ts
// Component
import { EmailEditor } from '@lab2view/vue-email-editor'

// Labels & i18n
import { DEFAULT_LABELS, FR_LABELS } from '@lab2view/vue-email-editor'

// Types
import type {
  EmailDocument, EmailNode, EmailDesignJson, EmailEditorAPI,
  Plugin, PluginContext, ThemeConfig, EditorEventMap,
  BlockDefinition, PropertyDefinition,
} from '@lab2view/vue-email-editor'

// Serialization
import { compileMjml, documentToMjml, mjmlToDocument } from '@lab2view/vue-email-editor'

// Node factories
import {
  createDefaultDocument, createSection, createColumn,
  createText, createImage, createButton, createDivider,
  createSpacer, createSocial, createHero, createWrapper,
} from '@lab2view/vue-email-editor'

// Tree utilities
import { findNode, findParent, removeNode, moveNode, cloneSubtree } from '@lab2view/vue-email-editor'

// Constants
import {
  DEFAULT_THEME, STATIC_BLOCKS,
  CONTENT_NODE_TYPES, CONTAINER_NODE_TYPES, SELF_CLOSING_NODE_TYPES,
} from '@lab2view/vue-email-editor'
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+D` | Duplicate selected node |
| `Delete` / `Backspace` | Delete selected node |
| `Escape` | Deselect / close inline editor |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | MJML content (v-model) |
| `designJson` | `Record<string, unknown>` | — | Persisted design JSON |
| `variables` | `string[]` | `[]` | Available merge variables |
| `labels` | `Partial<EditorLabels>` | `DEFAULT_LABELS` | i18n label overrides |
| `label` | `string` | — | Form field label |
| `required` | `boolean` | `false` | Form validation flag |
| `theme` | `Partial<ThemeConfig>` | `DEFAULT_THEME` | Visual customization |
| `plugins` | `Plugin[]` | `[]` | Editor extensions |

## Development

```bash
# Type check
npm run typecheck

# Run tests (64 tests)
npm test

# Build library
npm run build
```

## Tech Stack

- **[Vue 3](https://vuejs.org)** — Reactive component framework
- **[MJML](https://mjml.io)** — Email markup language
- **[TipTap](https://tiptap.dev)** — Rich text editing
- **[Lucide](https://lucide.dev)** — Icon system (400+ icons)
- **[VueUse](https://vueuse.org)** — Vue composable utilities
- **[TypeScript](https://www.typescriptlang.org)** — Full type safety
- **[Vite](https://vite.dev)** — Build tooling
- **[Vitest](https://vitest.dev)** — Testing framework

## License

[MIT](LICENSE)
