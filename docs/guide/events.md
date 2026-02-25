# Events

The editor emits typed events for real-time notifications of all user actions.

## Subscribing to Events

Use the imperative API via template ref:

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { EmailEditor } from '@lab2view/vue-email-editor'
import '@lab2view/vue-email-editor/style.css'

const editor = ref()

onMounted(() => {
  editor.value.on('editor:change', ({ document }) => {
    console.log('Document changed')
    autoSave(document)
  })

  editor.value.on('node:selected', ({ nodeId, node }) => {
    console.log(`Selected: ${node.type} (${nodeId})`)
  })
})
</script>

<template>
  <EmailEditor ref="editor" />
</template>
```

## All Events

### `editor:ready`

Fired once when the editor is fully initialized.

```ts
editor.value.on('editor:ready', ({ document }) => {
  console.log('Editor ready with', countNodes(document.body), 'nodes')
})
```

| Field | Type | Description |
|-------|------|-------------|
| `document` | `EmailDocument` | The initial document |

### `editor:change`

Fired on every document change (edits, deletes, moves, attribute changes).

```ts
editor.value.on('editor:change', ({ document }) => {
  debouncedSave(document)
})
```

| Field | Type | Description |
|-------|------|-------------|
| `document` | `EmailDocument` | The updated document |

### `node:selected`

Fired when a node is selected (by click or API).

| Field | Type | Description |
|-------|------|-------------|
| `nodeId` | `NodeId` | Selected node ID |
| `node` | `EmailNode` | The selected node |

### `node:deselected`

Fired when the current selection is cleared.

| Field | Type | Description |
|-------|------|-------------|
| `nodeId` | `NodeId` | Previously selected node ID |

### `node:deleted`

Fired when a node is removed from the document.

| Field | Type | Description |
|-------|------|-------------|
| `nodeId` | `NodeId` | Deleted node ID |

### `node:moved`

Fired when a node changes position in the tree.

| Field | Type | Description |
|-------|------|-------------|
| `nodeId` | `NodeId` | Moved node ID |
| `fromParentId` | `NodeId` | Original parent |
| `toParentId` | `NodeId` | New parent |

### `node:duplicated`

Fired when a node is cloned.

| Field | Type | Description |
|-------|------|-------------|
| `originalId` | `NodeId` | Source node ID |
| `newId` | `NodeId` | Cloned node ID |

### `block:dropped`

Fired when a block from the panel is dropped onto the canvas.

| Field | Type | Description |
|-------|------|-------------|
| `blockId` | `string` | Block definition ID |
| `parentId` | `NodeId` | Target parent node |

### `history:undo`

Fired after an undo operation.

| Field | Type | Description |
|-------|------|-------------|
| `canUndo` | `boolean` | Whether more undos are available |
| `canRedo` | `boolean` | Whether redo is available |

### `history:redo`

Fired after a redo operation.

| Field | Type | Description |
|-------|------|-------------|
| `canUndo` | `boolean` | Whether undo is available |
| `canRedo` | `boolean` | Whether more redos are available |

### `property:changed`

Fired when a node attribute is updated via the properties panel.

| Field | Type | Description |
|-------|------|-------------|
| `nodeId` | `NodeId` | Affected node ID |
| `key` | `string` | Attribute name |
| `value` | `string` | New attribute value |

## Unsubscribing

```ts
const handler = ({ document }) => { /* ... */ }

// Subscribe
editor.value.on('editor:change', handler)

// Unsubscribe
editor.value.off('editor:change', handler)
```
