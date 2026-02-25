# Plugins

The plugin system lets you extend the editor with custom blocks, categories, toolbar actions, sidebar panels, and property editors — without modifying the source.

## Creating a Plugin

A plugin is a function that receives a `PluginContext`:

```ts
import type { Plugin } from '@lab2view/vue-email-editor'

const myPlugin: Plugin = (ctx) => {
  // Use ctx to register extensions
}
```

### Register It

```vue
<EmailEditor :plugins="[myPlugin]" />
```

Plugins are initialized **before** the `editor:ready` event fires.

## Adding Custom Blocks

```ts
import type { Plugin } from '@lab2view/vue-email-editor'
import { createText, createImage, createSection, createColumn } from '@lab2view/vue-email-editor'

const brandPlugin: Plugin = (ctx) => {
  // Simple block
  ctx.registerBlock({
    id: 'brand-signature',
    label: 'Signature',
    category: 'content',
    icon: 'PenTool',
    factory: () => createText(`
      <p style="font-size: 14px; color: #666;">
        <strong>John Doe</strong><br/>
        Product Manager at Acme Corp<br/>
        <a href="mailto:john@acme.com">john@acme.com</a>
      </p>
    `),
  })

  // Complex block (section with multiple columns)
  ctx.registerBlock({
    id: 'brand-header',
    label: 'Brand Header',
    category: 'composite',
    icon: 'Layout',
    factory: () => {
      const logo = createImage({
        src: 'https://acme.com/logo.png',
        alt: 'Acme Corp',
        width: '150px',
      })
      const col = createColumn([logo])
      return createSection([col], {
        'background-color': '#1a1a2e',
        padding: '20px 0',
      })
    },
  })
}
```

## Adding Block Categories

```ts
const myPlugin: Plugin = (ctx) => {
  ctx.registerBlockCategory({
    id: 'brand',
    label: 'Brand',
    icon: 'Building',
    order: 5, // Lower = displayed first
  })

  ctx.registerBlock({
    id: 'brand-banner',
    label: 'Brand Banner',
    category: 'brand', // Uses our new category
    icon: 'Flag',
    factory: () => createText('<h1>Welcome to Acme</h1>'),
  })
}
```

## Adding Toolbar Actions

```ts
const savePlugin: Plugin = (ctx) => {
  ctx.registerToolbarAction({
    id: 'save',
    label: 'Save',
    icon: 'Save',
    position: 'right',
    order: 10,
    handler: () => {
      console.log('Saving...')
    },
  })

  ctx.registerToolbarAction({
    id: 'preview',
    label: 'Preview',
    icon: 'Eye',
    position: 'right',
    order: 20,
    handler: () => {
      console.log('Opening preview...')
    },
  })
}
```

## Listening to Events

Plugins receive the full event system:

```ts
const analyticsPlugin: Plugin = (ctx) => {
  ctx.on('editor:change', ({ document }) => {
    // Track changes
    analytics.track('email_edited', {
      nodeCount: countNodes(document.body),
    })
  })

  ctx.on('node:deleted', ({ nodeId }) => {
    console.log(`Node ${nodeId} deleted`)
  })

  ctx.on('block:dropped', ({ blockId, parentId }) => {
    console.log(`Block ${blockId} dropped into ${parentId}`)
  })
}
```

## Async Plugins

Plugins can be async (e.g., to fetch remote block definitions):

```ts
const remoteBlocksPlugin: Plugin = async (ctx) => {
  const response = await fetch('/api/custom-blocks')
  const blocks = await response.json()

  for (const block of blocks) {
    ctx.registerBlock({
      id: block.id,
      label: block.name,
      category: 'custom',
      icon: block.icon || 'Box',
      factory: () => createText(block.defaultHtml),
    })
  }
}
```

## Plugin Context API

| Method | Description |
|--------|-------------|
| `registerBlock(block)` | Add a block to the blocks panel |
| `registerBlockCategory(category)` | Add a new category tab |
| `registerPropertyEditor(type, component)` | Override a property editor for a type |
| `registerToolbarAction(action)` | Add a button to the toolbar |
| `registerSidebarPanel(panel)` | Add a sidebar tab |
| `on(event, handler)` | Listen to editor events |
| `off(event, handler)` | Remove an event listener |
| `labels` | Reactive reference to current `EditorLabels` |

## Multiple Plugins

```vue
<EmailEditor :plugins="[brandPlugin, analyticsPlugin, savePlugin]" />
```

Plugins are executed in order. Duplicate block/category IDs are silently ignored (first registration wins).
