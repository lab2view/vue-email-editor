# Types Reference

All types are exported from the package and can be imported:

```ts
import type { EmailDocument, EmailNode, Plugin } from '@lab2view/vue-email-editor'
```

## Core Types

### `EmailDocument`

The root document structure.

```ts
interface EmailDocument {
  version: 1
  headAttributes: EmailHeadAttributes
  body: EmailNode // type: 'mj-body'
}
```

### `EmailNode`

A node in the document tree, mapping directly to an MJML tag.

```ts
interface EmailNode {
  id: NodeId
  type: EmailNodeType
  attributes: Record<string, string>
  children: EmailNode[]
  htmlContent?: string // Only for mj-text, mj-button
}
```

### `EmailNodeType`

```ts
type EmailNodeType =
  | 'mj-body'
  | 'mj-section'
  | 'mj-column'
  | 'mj-text'
  | 'mj-image'
  | 'mj-button'
  | 'mj-divider'
  | 'mj-spacer'
  | 'mj-social'
  | 'mj-social-element'
  | 'mj-hero'
  | 'mj-raw'
  | 'mj-wrapper'
```

### `NodeId`

```ts
type NodeId = string // nanoid 8 chars
```

### `EmailHeadAttributes`

```ts
interface EmailHeadAttributes {
  defaultStyles: Record<string, Record<string, string>>
  fonts: Array<{ name: string; href: string }>
  previewText: string
}
```

### `EmailDesignJson`

The persisted format for saving/loading designs.

```ts
interface EmailDesignJson {
  _editor: 'mesagoo-email-editor'
  _version: 1
  document: EmailDocument
}
```

## Block Types

### `BlockDefinition`

```ts
interface BlockDefinition {
  id: string
  label: string           // Label key or display string
  category: BlockCategory // 'layout' | 'content' | 'composite' | custom
  icon: string            // Lucide icon name
  factory: () => EmailNode | EmailNode[]
}
```

### `BlockCategoryDefinition`

```ts
interface BlockCategoryDefinition {
  id: string
  label: string
  icon: string
  order?: number // Lower = first
}
```

## Property Types

### `PropertyDefinition`

```ts
interface PropertyDefinition {
  key: string           // MJML attribute name
  label: string         // i18n label key
  type: PropertyType
  defaultValue?: string
  options?: Array<{ label: string; value: string }>
  min?: number
  max?: number
  step?: number
  unit?: string
  group: string
}
```

### `PropertyType`

```ts
type PropertyType =
  | 'text'
  | 'number'
  | 'color'
  | 'select'
  | 'padding'
  | 'alignment'
  | 'url'
  | 'image'
  | 'toggle'
```

## Theme Types

### `ThemeConfig`

All 25 properties are optional. See [Theming guide](/guide/theming).

```ts
interface ThemeConfig {
  primaryColor?: string
  primaryHover?: string
  primaryActive?: string
  borderColor?: string
  borderColorHover?: string
  backgroundColor?: string
  backgroundHover?: string
  backgroundActive?: string
  textPrimary?: string
  textSecondary?: string
  textMuted?: string
  canvasBg?: string
  canvasBorder?: string
  selectionColor?: string
  hoverColor?: string
  dropIndicatorColor?: string
  sidebarBg?: string
  sidebarBorder?: string
  panelHeaderBg?: string
  toolbarBg?: string
  toolbarBorder?: string
  successColor?: string
  warningColor?: string
  errorColor?: string
  fontFamily?: string
  fontSize?: string
  borderRadius?: string
}
```

## Plugin Types

### `Plugin`

```ts
type Plugin = (context: PluginContext) => void | Promise<void>
```

### `PluginContext`

```ts
interface PluginContext {
  registerBlock: (block: BlockDefinition) => void
  registerBlockCategory: (category: BlockCategoryDefinition) => void
  registerPropertyEditor: (type: string, component: Component) => void
  registerToolbarAction: (action: ToolbarAction) => void
  registerSidebarPanel: (panel: SidebarPanel) => void
  on: <K extends keyof EditorEventMap>(event: K, handler: (payload: EditorEventMap[K]) => void) => void
  off: <K extends keyof EditorEventMap>(event: K, handler: (payload: EditorEventMap[K]) => void) => void
  labels: Ref<EditorLabels>
}
```

### `ToolbarAction`

```ts
interface ToolbarAction {
  id: string
  label: string
  icon: string
  handler: () => void
  position?: 'left' | 'right'
  order?: number
}
```

### `SidebarPanel`

```ts
interface SidebarPanel {
  id: string
  label: string
  icon: string
  component: Component
  order?: number
}
```

## Event Types

### `EditorEventMap`

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

## AI Types

### `AiProvider`

The AI integration interface. Implement this to connect your AI backend.

```ts
interface AiProvider {
  /** Generate text from a prompt and optional context */
  generateText: (prompt: string, context?: string) => Promise<string>
  /** Generate subject line suggestions from email content */
  generateSubjectLine?: (emailContent: string) => Promise<string[]>
  /** Improve existing text with an instruction */
  improveText?: (text: string, instruction: string) => Promise<string>
  /** Generate a complete email template from a multi-turn conversation */
  generateTemplate?: (messages: AiChatMessage[], systemPrompt: string) => Promise<string>
  /** Streaming variant for real-time feedback */
  generateTemplateStream?: (messages: AiChatMessage[], systemPrompt: string) => AsyncIterable<string>
}
```

### `AiChatMessage`

A message in the AI chat conversation.

```ts
interface AiChatMessage {
  role: 'user' | 'assistant'
  content: string
  /** Optional file attachments (images, documents) for multimodal AI */
  attachments?: AiAttachment[]
}
```

### `AiAttachment`

A file attached to a chat message.

```ts
interface AiAttachment {
  /** MIME type (e.g. 'image/png', 'application/pdf') */
  mimeType: string
  /** Base64-encoded file data */
  data: string
  /** Original file name for display */
  name?: string
}
```

### `MergeTag`

A personalization variable for template insertion.

```ts
interface MergeTag {
  /** Display name, e.g. "First Name" */
  name: string
  /** Template value inserted into HTML, e.g. "{{first_name}}" */
  value: string
  /** Optional category for grouping, e.g. "Contact" */
  category?: string
}
```

### `BuildSystemPromptOptions`

Options for `buildTemplateSystemPrompt()`.

```ts
interface BuildSystemPromptOptions {
  mergeTags?: MergeTag[]
  promptPrefix?: string
  promptSuffix?: string
}
```

### `AiParseError`

Error class thrown when AI response parsing fails.

```ts
class AiParseError extends Error {
  readonly rawResponse?: string
}
```

## Utility Types

### Node Type Constants

```ts
const CONTENT_NODE_TYPES: EmailNodeType[]       // ['mj-text', 'mj-button']
const CONTAINER_NODE_TYPES: EmailNodeType[]     // ['mj-body', 'mj-section', ...]
const SELF_CLOSING_NODE_TYPES: EmailNodeType[]  // ['mj-divider', 'mj-spacer', 'mj-image']
```

### `isNewEditorJson(data)`

Type guard to detect the new editor format vs legacy GrapesJS data.

```ts
function isNewEditorJson(data: unknown): data is EmailDesignJson
```
