# Exports

The package provides 35+ named exports for advanced usage.

## Component

```ts
import { EmailEditor } from '@lab2view/vue-email-editor'
```

## Labels & i18n

```ts
import { DEFAULT_LABELS, FR_LABELS } from '@lab2view/vue-email-editor'
```

| Export | Type | Description |
|--------|------|-------------|
| `DEFAULT_LABELS` | `EditorLabels` | English labels (all 175+ keys) |
| `FR_LABELS` | `EditorLabels` | French translation |

## Serialization

```ts
import { compileMjml, documentToMjml, mjmlToDocument } from '@lab2view/vue-email-editor'
```

| Export | Signature | Description |
|--------|-----------|-------------|
| `documentToMjml` | `(doc: EmailDocument) => string` | Serialize document to MJML string |
| `mjmlToDocument` | `(mjml: string) => EmailDocument` | Parse MJML string to document |
| `compileMjml` | `(mjml: string) => { html: string }` | Compile MJML to HTML |

## Node Factories

```ts
import {
  createDefaultDocument,
  createSection,
  createColumn,
  createText,
  createImage,
  createButton,
  createDivider,
  createSpacer,
  createSocial,
  createHero,
  createWrapper,
} from '@lab2view/vue-email-editor'
```

| Factory | Description |
|---------|-------------|
| `createDefaultDocument()` | Empty document with body |
| `createSection(children?, attrs?)` | `mj-section` with optional columns |
| `createColumn(children?, attrs?)` | `mj-column` with optional content |
| `createText(html?, attrs?)` | `mj-text` with optional content |
| `createImage(attrs?)` | `mj-image` with src, alt, etc. |
| `createButton(text?, attrs?)` | `mj-button` with label and link |
| `createDivider(attrs?)` | `mj-divider` horizontal line |
| `createSpacer(attrs?)` | `mj-spacer` vertical space |
| `createSocial(elements?, attrs?)` | `mj-social` with social links |
| `createHero(children?, attrs?)` | `mj-hero` full-width section |
| `createWrapper(children?, attrs?)` | `mj-wrapper` section wrapper |

## Tree Utilities

```ts
import { findNode, findParent, removeNode, moveNode, cloneSubtree } from '@lab2view/vue-email-editor'
```

| Utility | Signature | Description |
|---------|-----------|-------------|
| `findNode` | `(root, id) => EmailNode \| null` | Find a node by ID in the tree |
| `findParent` | `(root, id) => EmailNode \| null` | Find the parent of a node |
| `removeNode` | `(root, id) => boolean` | Remove a node from the tree |
| `moveNode` | `(root, id, targetParentId, index) => boolean` | Move a node to a new position |
| `cloneSubtree` | `(node) => EmailNode` | Deep clone a node and all children |

## Constants

```ts
import {
  DEFAULT_THEME,
  STATIC_BLOCKS,
  CONTENT_NODE_TYPES,
  CONTAINER_NODE_TYPES,
  SELF_CLOSING_NODE_TYPES,
} from '@lab2view/vue-email-editor'
```

| Constant | Type | Description |
|----------|------|-------------|
| `DEFAULT_THEME` | `Required<ThemeConfig>` | All 25 theme defaults |
| `STATIC_BLOCKS` | `BlockDefinition[]` | All 43 built-in block definitions |
| `CONTENT_NODE_TYPES` | `EmailNodeType[]` | Types with `htmlContent` |
| `CONTAINER_NODE_TYPES` | `EmailNodeType[]` | Types with `children` |
| `SELF_CLOSING_NODE_TYPES` | `EmailNodeType[]` | Types without content/children |

## Type Guard

```ts
import { isNewEditorJson } from '@lab2view/vue-email-editor'
```

| Export | Description |
|--------|-------------|
| `isNewEditorJson(data)` | Returns `true` if data is `EmailDesignJson` format |

## Types (TypeScript)

All types are importable with `import type`:

```ts
import type {
  EmailDocument,
  EmailNode,
  EmailNodeType,
  NodeId,
  EmailHeadAttributes,
  EmailDesignJson,
  BlockDefinition,
  BlockCategory,
  BlockCategoryDefinition,
  PropertyDefinition,
  PropertyType,
  ThemeConfig,
  Plugin,
  PluginContext,
  EditorEventMap,
  EmailEditorAPI,
  ToolbarAction,
  SidebarPanel,
  DevicePreset,
  DragSource,
  DropTarget,
  DropPosition,
} from '@lab2view/vue-email-editor'
```
