/**
 * Type definitions for the @lab2view/email-editor package.
 *
 * The data model mirrors the MJML document structure for straightforward
 * serialization: EmailDocument -> MJML string -> HTML.
 */

import type { Component, Ref } from 'vue'
import type { EditorLabels } from './labels'

// ─── Node ID ────────────────────────────────────────────────────

/** Unique identifier for each node in the document tree (nanoid 8 chars) */
export type NodeId = string

// ─── Node Types ─────────────────────────────────────────────────

export type EmailNodeType =
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

/** Node types that can contain rich HTML content */
export const CONTENT_NODE_TYPES: EmailNodeType[] = ['mj-text', 'mj-button']

/** Node types that are structural containers */
export const CONTAINER_NODE_TYPES: EmailNodeType[] = [
  'mj-body',
  'mj-section',
  'mj-column',
  'mj-hero',
  'mj-wrapper',
  'mj-social',
]

/** Node types that are self-closing (no children, no htmlContent) */
export const SELF_CLOSING_NODE_TYPES: EmailNodeType[] = ['mj-divider', 'mj-spacer', 'mj-image']

// ─── Core Node ──────────────────────────────────────────────────

export interface EmailNode {
  id: NodeId
  type: EmailNodeType
  /** MJML attributes as string key-value pairs */
  attributes: Record<string, string>
  /** Child nodes (sections in body, columns in section, etc.) */
  children: EmailNode[]
  /** Inner HTML content — only for mj-text and mj-button */
  htmlContent?: string
  /** Optional conditional display rule */
  condition?: ConditionalRule
}

// ─── Document (top-level) ───────────────────────────────────────

export interface EmailDocument {
  /** Schema version for future migrations */
  version: 1
  /** Global styles applied to <mj-head> */
  headAttributes: EmailHeadAttributes
  /** The mj-body root node */
  body: EmailNode
}

export interface EmailHeadAttributes {
  /** <mj-attributes> default styles per tag */
  defaultStyles: Record<string, Record<string, string>>
  /** <mj-font> declarations */
  fonts: Array<{ name: string; href: string }>
  /** <mj-preview> text */
  previewText: string
}

// ─── Design JSON (persisted) ────────────────────────────────────

/** The shape of designJson emitted and received by the editor */
export interface EmailDesignJson {
  /** Discriminator to distinguish from old GrapesJS data */
  _editor: 'mesagoo-email-editor'
  _version: 1
  document: EmailDocument
}

/** Type guard for detecting new editor format vs old GrapesJS */
export function isNewEditorJson(data: unknown): data is EmailDesignJson {
  return !!data && typeof data === 'object' && (data as Record<string, unknown>)?._editor === 'mesagoo-email-editor'
}

// ─── Block Definitions ──────────────────────────────────────────

export type BlockCategory = string

export interface BlockDefinition {
  id: string
  /** Label key (resolved via EditorLabels) or raw display string */
  label: string
  category: BlockCategory
  /** Lucide icon name */
  icon: string
  /** Factory returning node(s) to insert */
  factory: () => EmailNode | EmailNode[]
}

export interface BlockCategoryDefinition {
  id: string
  /** Label key (resolved via EditorLabels) or raw display string */
  label: string
  /** Lucide icon name */
  icon: string
  /** Sort order (lower = first) */
  order?: number
}

// ─── Property Panel ─────────────────────────────────────────────

export type PropertyType =
  | 'text'
  | 'number'
  | 'color'
  | 'select'
  | 'padding'
  | 'alignment'
  | 'url'
  | 'image'
  | 'toggle'

export interface PropertyDefinition {
  /** The MJML attribute name */
  key: string
  /** Display label (i18n key) */
  label: string
  type: PropertyType
  defaultValue?: string
  /** For 'select' type */
  options?: Array<{ label: string; value: string }>
  /** For 'number' type */
  min?: number
  max?: number
  step?: number
  unit?: string
  /** Group heading in the panel */
  group: string
}

// ─── Device Presets ─────────────────────────────────────────────

export interface DevicePreset {
  name: string
  label: string
  icon: string
  width: number
}

// ─── Drag & Drop ────────────────────────────────────────────────

export type DragSource =
  | { type: 'new-block'; block: BlockDefinition }
  | { type: 'existing-node'; nodeId: NodeId }

export type DropPosition = 'before' | 'after' | 'inside'

export interface DropTarget {
  nodeId: NodeId
  position: DropPosition
}

// ─── Iframe Messages ────────────────────────────────────────────

export type IframeMessage =
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

// ─── Editor Event Map ───────────────────────────────────────────

export interface EditorEventMap {
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

// ─── Theme Configuration ────────────────────────────────────────

export interface ThemeConfig {
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

export const DEFAULT_THEME: Required<ThemeConfig> = {
  primaryColor: '#01A8AB',
  primaryHover: '#018F91',
  primaryActive: '#017375',

  borderColor: '#e5e7eb',
  borderColorHover: '#d1d5db',
  backgroundColor: '#ffffff',
  backgroundHover: '#f3f4f6',
  backgroundActive: '#e5e7eb',

  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',

  canvasBg: '#e5e7eb',
  canvasBorder: '#d1d5db',
  selectionColor: '#01A8AB',
  hoverColor: '#01A8AB',
  dropIndicatorColor: '#01A8AB',

  sidebarBg: '#ffffff',
  sidebarBorder: '#e5e7eb',
  panelHeaderBg: '#f9fafb',

  toolbarBg: '#ffffff',
  toolbarBorder: '#e5e7eb',

  successColor: '#10b981',
  warningColor: '#f59e0b',
  errorColor: '#ef4444',

  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '13px',
  borderRadius: '6px',
}

// ─── Toolbar / Sidebar Extensibility ────────────────────────────

export interface ToolbarAction {
  id: string
  label: string
  icon: string
  handler: () => void
  position?: 'left' | 'right'
  order?: number
}

export interface SidebarPanel {
  id: string
  label: string
  icon: string
  component: Component
  order?: number
}

// ─── Plugin System ──────────────────────────────────────────────

export interface PluginContext {
  registerBlock: (block: BlockDefinition) => void
  registerBlockCategory: (category: BlockCategoryDefinition) => void
  registerPropertyEditor: (type: string, component: Component) => void
  registerToolbarAction: (action: ToolbarAction) => void
  registerSidebarPanel: (panel: SidebarPanel) => void
  on: <K extends keyof EditorEventMap>(event: K, handler: (payload: EditorEventMap[K]) => void) => void
  off: <K extends keyof EditorEventMap>(event: K, handler: (payload: EditorEventMap[K]) => void) => void
  labels: Ref<EditorLabels>
}

export type Plugin = (context: PluginContext) => void | Promise<void>

// ─── Merge Tags ─────────────────────────────────────────────────

export interface MergeTag {
  /** Display name, e.g. "First Name" */
  name: string
  /** Template value inserted into HTML, e.g. "{{first_name}}" */
  value: string
  /** Optional category for grouping, e.g. "Contact" */
  category?: string
}

// ─── Conditional Content ────────────────────────────────────────

export interface ConditionalRule {
  /** Merge tag value to check, e.g. "{{plan}}" */
  variable: string
  /** Comparison operator */
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'exists' | 'not_exists'
  /** Value to compare against (not used for exists/not_exists) */
  value?: string
}

// ─── AI Provider ────────────────────────────────────────────────

/** A file attached to a chat message (image, PDF, etc.) */
export interface AiAttachment {
  /** MIME type of the file (e.g. 'image/png', 'application/pdf') */
  mimeType: string
  /** Base64-encoded file data */
  data: string
  /** Original file name for display */
  name?: string
}

export interface AiChatMessage {
  role: 'user' | 'assistant'
  content: string
  /** Optional file attachments (images, documents) for multimodal AI */
  attachments?: AiAttachment[]
}

export interface AiProvider {
  /** Generate text from a prompt and optional context */
  generateText: (prompt: string, context?: string) => Promise<string>
  /** Generate subject line suggestions from email content */
  generateSubjectLine?: (emailContent: string) => Promise<string[]>
  /** Improve existing text with an instruction */
  improveText?: (text: string, instruction: string) => Promise<string>
  /** Generate a complete email template from a multi-turn conversation */
  generateTemplate?: (messages: AiChatMessage[], systemPrompt: string) => Promise<string>
  /** Optional streaming variant for better UX */
  generateTemplateStream?: (messages: AiChatMessage[], systemPrompt: string) => AsyncIterable<string>
}

// ─── Image Upload ───────────────────────────────────────────────

export interface ImageUploadResult {
  /** The URL of the uploaded image */
  url: string
}

export type ImageUploadHandler = (file: File) => Promise<ImageUploadResult>

export type BrowseAssetsHandler = () => Promise<string | null>

// ─── Imperative API (defineExpose) ──────────────────────────────

export interface EmailEditorAPI {
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
