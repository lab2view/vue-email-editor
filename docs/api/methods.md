# API Methods

All methods are accessed via a template ref on the `<EmailEditor>` component.

```vue
<script setup>
const editor = ref()
// editor.value.getMjml()
</script>

<template>
  <EmailEditor ref="editor" />
</template>
```

## Export

| Method | Returns | Description |
|--------|---------|-------------|
| `getDocument()` | `EmailDocument` | Get the current document tree |
| `setDocument(doc)` | `void` | Replace the entire document |
| `getMjml()` | `string` | Serialize as MJML string |
| `getHtml()` | `string` | Get compiled HTML output |
| `getDesignJson()` | `EmailDesignJson` | Get the persisted design format |
| `loadTemplate(doc)` | `void` | Load an EmailDocument, resetting history |

## History

| Method | Returns | Description |
|--------|---------|-------------|
| `undo()` | `void` | Undo the last change |
| `redo()` | `void` | Redo the last undone change |
| `canUndo()` | `boolean` | Whether undo is available |
| `canRedo()` | `boolean` | Whether redo is available |

## Selection

| Method | Returns | Description |
|--------|---------|-------------|
| `selectNode(nodeId)` | `void` | Select a node by its ID |
| `getSelectedNode()` | `EmailNode \| null` | Get the currently selected node |
| `clearSelection()` | `void` | Deselect the current node |

## Manipulation

| Method | Returns | Description |
|--------|---------|-------------|
| `deleteNode(nodeId)` | `void` | Remove a node from the document |
| `duplicateNode(nodeId)` | `NodeId \| null` | Clone a node, returns new ID |
| `insertBlock(block, parentId, index?)` | `NodeId \| null` | Insert a block definition |
| `updateNodeAttribute(nodeId, key, value)` | `void` | Update a single MJML attribute |

## Events

| Method | Returns | Description |
|--------|---------|-------------|
| `on(event, handler)` | `void` | Subscribe to an editor event |
| `off(event, handler)` | `void` | Unsubscribe from an event |

## TypeScript Interface

```ts
interface EmailEditorAPI {
  getDocument: () => EmailDocument
  setDocument: (doc: EmailDocument) => void
  getMjml: () => string
  getHtml: () => string
  getDesignJson: () => EmailDesignJson
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  selectNode: (nodeId: NodeId) => void
  getSelectedNode: () => EmailNode | null
  clearSelection: () => void
  deleteNode: (nodeId: NodeId) => void
  duplicateNode: (nodeId: NodeId) => NodeId | null
  insertBlock: (block: BlockDefinition, parentId: NodeId, index?: number) => NodeId | null
  updateNodeAttribute: (nodeId: NodeId, key: string, value: string) => void
  loadTemplate: (template: EmailDocument) => void
  on: <K extends keyof EditorEventMap>(event: K, handler: (payload: EditorEventMap[K]) => void) => void
  off: <K extends keyof EditorEventMap>(event: K, handler: (payload: EditorEventMap[K]) => void) => void
}
```
