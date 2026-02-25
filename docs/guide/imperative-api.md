# Imperative API

Access the editor programmatically via a Vue template ref. The editor exposes **18 methods** via `defineExpose`.

## Setup

```vue
<script setup>
import { ref } from 'vue'
import { EmailEditor } from '@lab2view/vue-email-editor'
import '@lab2view/vue-email-editor/style.css'

const editor = ref()
</script>

<template>
  <EmailEditor ref="editor" />
</template>
```

Then call methods on `editor.value`:

```ts
const mjml = editor.value.getMjml()
```

## Export Methods

### `getDocument()`

Returns the current `EmailDocument` tree.

```ts
const doc = editor.value.getDocument()
console.log(doc.body.children.length) // Number of sections
```

### `setDocument(doc)`

Replaces the entire document.

```ts
import { createDefaultDocument } from '@lab2view/vue-email-editor'
editor.value.setDocument(createDefaultDocument())
```

### `getMjml()`

Returns the document serialized as an MJML string.

```ts
const mjml = editor.value.getMjml()
// <mjml><mj-head>...</mj-head><mj-body>...</mj-body></mjml>
```

### `getHtml()`

Returns the compiled HTML, ready to send as email.

```ts
const html = editor.value.getHtml()
// Full HTML with inline styles, tables, etc.
```

### `getDesignJson()`

Returns the persisted design format for saving.

```ts
const json = editor.value.getDesignJson()
// { _editor: 'mesagoo-email-editor', _version: 1, document: {...} }
localStorage.setItem('draft', JSON.stringify(json))
```

### `loadTemplate(doc)`

Loads an `EmailDocument`, replacing the current content and resetting history.

```ts
const saved = JSON.parse(localStorage.getItem('draft'))
if (saved) {
  editor.value.loadTemplate(saved.document)
}
```

## History Methods

### `undo()` / `redo()`

```ts
editor.value.undo()
editor.value.redo()
```

### `canUndo()` / `canRedo()`

```ts
if (editor.value.canUndo()) {
  editor.value.undo()
}
```

## Selection Methods

### `selectNode(nodeId)`

Programmatically select a node.

```ts
editor.value.selectNode('abc123')
```

### `getSelectedNode()`

Returns the currently selected node, or `null`.

```ts
const node = editor.value.getSelectedNode()
if (node) {
  console.log(node.type, node.attributes)
}
```

### `clearSelection()`

Deselects the current node.

```ts
editor.value.clearSelection()
```

## Manipulation Methods

### `deleteNode(nodeId)`

Remove a node from the document.

```ts
const selected = editor.value.getSelectedNode()
if (selected) {
  editor.value.deleteNode(selected.id)
}
```

### `duplicateNode(nodeId)`

Clone a node. Returns the new node's ID, or `null` if duplication failed.

```ts
const newId = editor.value.duplicateNode('abc123')
if (newId) {
  editor.value.selectNode(newId)
}
```

### `insertBlock(block, parentId, index?)`

Insert a block definition into a parent node.

```ts
import { createText } from '@lab2view/vue-email-editor'

editor.value.insertBlock(
  {
    id: 'my-text',
    label: 'My Text',
    category: 'content',
    icon: 'Type',
    factory: () => createText('<p>Hello</p>'),
  },
  'column-id',
  0,
)
```

### `updateNodeAttribute(nodeId, key, value)`

Change a single MJML attribute on a node.

```ts
editor.value.updateNodeAttribute('node-id', 'background-color', '#ff0000')
editor.value.updateNodeAttribute('node-id', 'padding', '20px 40px')
```

## Event Methods

### `on(event, handler)` / `off(event, handler)`

Subscribe and unsubscribe from editor events. See the [Events guide](/guide/events) for all available events.

```ts
const onChange = ({ document }) => console.log('changed')
editor.value.on('editor:change', onChange)

// Later:
editor.value.off('editor:change', onChange)
```

## TypeScript

The full API is typed via the `EmailEditorAPI` interface:

```ts
import type { EmailEditorAPI } from '@lab2view/vue-email-editor'

const editor = ref<InstanceType<typeof EmailEditor> & EmailEditorAPI>()
```
