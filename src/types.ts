/**
 * Type definitions for the Mesagoo Email Editor.
 *
 * The data model mirrors the MJML document structure for straightforward
 * serialization: EmailDocument -> MJML string -> HTML.
 */

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

export type BlockCategory = 'layout' | 'content' | 'composite' | 'variable'

export interface BlockDefinition {
  id: string
  label: string
  category: BlockCategory
  /** Lucide icon name */
  icon: string
  /** Factory returning node(s) to insert */
  factory: () => EmailNode | EmailNode[]
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
