// ─── Component ───
export { default as EmailEditor } from './EmailEditor.vue'

// ─── Core Types ───
export type {
  EmailDocument,
  EmailNode,
  EmailDesignJson,
  EmailNodeType,
  NodeId,
  EmailHeadAttributes,
} from './types'

// ─── Plugin Types ───
export type {
  Plugin,
  PluginContext,
  EditorEventMap,
  ThemeConfig,
  EmailEditorAPI,
  ToolbarAction,
  SidebarPanel,
  BlockCategoryDefinition,
  ImageUploadHandler,
  ImageUploadResult,
  BrowseAssetsHandler,
  MergeTag,
  ConditionalRule,
  AiProvider,
} from './types'

// ─── Block / Property Types ───
export type {
  BlockDefinition,
  BlockCategory,
  PropertyDefinition,
  PropertyType,
} from './types'

// ─── Constants & Values ───
export {
  DEFAULT_THEME,
  isNewEditorJson,
  CONTENT_NODE_TYPES,
  CONTAINER_NODE_TYPES,
  SELF_CLOSING_NODE_TYPES,
} from './types'

// ─── Labels / i18n ───
export type { EditorLabels } from './labels'
export { DEFAULT_LABELS } from './labels'
export { FR_LABELS } from './i18n/fr'

// ─── Serializer ───
export { compileMjml } from './composables/useMjmlCompiler'
export type { MjmlCompilationResult } from './composables/useMjmlCompiler'
export { documentToMjml } from './serializer/json-to-mjml'
export { mjmlToDocument } from './serializer/mjml-to-json'

// ─── Node Factories ───
export {
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
} from './serializer/node-factory'

// ─── Tree Utilities ───
export {
  findNode,
  findParent,
  removeNode,
  moveNode,
  cloneSubtree,
} from './utils/tree'

// ─── Block Definitions ───
export { STATIC_BLOCKS } from './blocks/block-definitions'

// ─── Extensions ───
export { MergeTagExtension } from './extensions/merge-tag'

// ─── ESP Export Presets ───
export type { EspExportOptions, EspExportResult, EspPreset } from './export/esp-presets'
export {
  exportForEsp,
  exportForMailchimp,
  exportForSendGrid,
  exportForBrevo,
  exportForAwsSes,
  exportForPostmark,
  exportForResend,
  ESP_PRESETS,
  MAILCHIMP_PRESET,
  SENDGRID_PRESET,
  BREVO_PRESET,
  AWS_SES_PRESET,
  POSTMARK_PRESET,
  RESEND_PRESET,
} from './export/esp-presets'
