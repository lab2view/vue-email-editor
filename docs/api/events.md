# Events Reference

Events are accessed via the imperative API (`editor.value.on()`), not Vue's `@event` syntax.

## Event Map

```ts
interface EditorEventMap {
  'editor:ready': { document: EmailDocument }
  'editor:change': { document: EmailDocument }
  'node:selected': { nodeId: NodeId; node: EmailNode }
  'node:deselected': { nodeId: NodeId }
  'node:deleted': { nodeId: NodeId }
  'node:moved': { nodeId: NodeId; fromParentId: NodeId; toParentId: NodeId }
  'node:duplicated': { originalId: NodeId; newId: NodeId }
  'block:dropped': { blockId: string; parentId: NodeId }
  'history:undo': { canUndo: boolean; canRedo: boolean }
  'history:redo': { canUndo: boolean; canRedo: boolean }
  'property:changed': { nodeId: NodeId; key: string; value: string }
}
```

## Usage

```ts
// Subscribe
editor.value.on('editor:change', ({ document }) => {
  console.log('Changed')
})

// Unsubscribe
const handler = (payload) => { /* ... */ }
editor.value.on('node:selected', handler)
editor.value.off('node:selected', handler)
```

## Event Descriptions

| Event | When It Fires |
|-------|--------------|
| `editor:ready` | Editor mounted and initialized |
| `editor:change` | Any document mutation |
| `node:selected` | User clicks a node or `selectNode()` is called |
| `node:deselected` | Selection is cleared |
| `node:deleted` | A node is removed |
| `node:moved` | A node changes parent via drag or move up/down |
| `node:duplicated` | A node is cloned |
| `block:dropped` | A block from the sidebar is dropped onto the canvas |
| `history:undo` | Undo is performed |
| `history:redo` | Redo is performed |
| `property:changed` | An attribute is updated via the properties panel |

See the [Events guide](/guide/events) for detailed examples.
