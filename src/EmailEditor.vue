<script setup lang="ts">
/**
 * EmailEditor — Root component for the Mesagoo email editor.
 *
 * Composes all composables, provides them to descendants, and handles
 * the external props/emits contract matching the old GrapesJS editor.
 */
import { provide, watch, onMounted, toRef, computed } from 'vue'
import type { EmailDesignJson, ThemeConfig, Plugin, EmailEditorAPI, EmailNode, NodeId, ImageUploadHandler, BrowseAssetsHandler, MergeTag, AiProvider } from './types'
import { isNewEditorJson } from './types'
import { useEmailDocument } from './composables/useEmailDocument'
import { useEmailSelection } from './composables/useEmailSelection'
import { useEmailDragDrop } from './composables/useEmailDragDrop'
import { useEmailKeyboard } from './composables/useEmailKeyboard'
import { useEmailEvents } from './composables/useEmailEvents'
import { usePluginRegistry } from './composables/usePluginRegistry'
import { findNode } from './utils/tree'
import { documentToMjml } from './serializer/json-to-mjml'
import {
  EMAIL_DOCUMENT_KEY,
  EMAIL_SELECTION_KEY,
  EMAIL_DRAG_DROP_KEY,
  EMAIL_EVENTS_KEY,
  PLUGIN_REGISTRY_KEY,
  EMAIL_EDITOR_CONFIG_KEY,
} from './injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS, type EditorLabels } from './labels'
import EditorShell from './components/EditorShell.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    designJson?: Record<string, unknown> | null
    variables?: string[]
    labels?: Partial<EditorLabels>
    label?: string
    required?: boolean
    theme?: Partial<ThemeConfig>
    plugins?: Plugin[]
    onImageUpload?: ImageUploadHandler
    onBrowseAssets?: BrowseAssetsHandler
    mergeTags?: MergeTag[]
    aiProvider?: AiProvider
  }>(),
  {
    label: '',
    required: false,
    designJson: null,
    variables: () => [],
    theme: undefined,
    plugins: () => [],
    onImageUpload: undefined,
    onBrowseAssets: undefined,
    mergeTags: () => [],
    aiProvider: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:compiledHtml': [html: string]
  'update:designJson': [data: Record<string, unknown>]
}>()

// ─── Event System & Plugin Registry ───

const events = useEmailEvents()
const pluginRegistry = usePluginRegistry()

// ─── Composables ───

// Guard: ignore designJson watch when the change comes from our own emission
let selfEmittedDesignJson = false

const doc = useEmailDocument({
  onMjmlChange: (mjml) => emit('update:modelValue', mjml),
  onHtmlChange: (html) => emit('update:compiledHtml', html),
  onDesignJsonChange: (data) => {
    selfEmittedDesignJson = true
    emit('update:designJson', data as unknown as Record<string, unknown>)
  },
  events,
})

const selection = useEmailSelection(doc.document, events)
const dragDrop = useEmailDragDrop()
useEmailKeyboard(doc, selection)

// ─── Provide to descendants ───

provide(EMAIL_DOCUMENT_KEY, doc)
provide(EMAIL_SELECTION_KEY, selection)
provide(EMAIL_DRAG_DROP_KEY, dragDrop)
provide(EMAIL_EVENTS_KEY, events)
provide(PLUGIN_REGISTRY_KEY, pluginRegistry)
provide(EMAIL_EDITOR_CONFIG_KEY, {
  variables: toRef(props, 'variables'),
  onImageUpload: props.onImageUpload,
  onBrowseAssets: props.onBrowseAssets,
  mergeTags: props.mergeTags,
  aiProvider: props.aiProvider,
})

// Merge user-provided labels with defaults
const mergedLabels = computed<EditorLabels>(() => ({
  ...DEFAULT_LABELS,
  ...props.labels,
}))
provide(EMAIL_LABELS_KEY, mergedLabels.value)

// ─── Initialize from props ───

doc.loadFromProps(props.modelValue, props.designJson)

onMounted(async () => {
  // Initialize plugins before emitting editor:ready
  if (props.plugins.length > 0) {
    const pluginContext: import('./types').PluginContext = {
      registerBlock: pluginRegistry.registerBlock,
      registerBlockCategory: pluginRegistry.registerBlockCategory,
      registerPropertyEditor: pluginRegistry.registerPropertyEditor,
      registerToolbarAction: pluginRegistry.registerToolbarAction,
      registerSidebarPanel: pluginRegistry.registerSidebarPanel,
      on: events.on,
      off: events.off,
      labels: mergedLabels,
    }
    for (const plugin of props.plugins) {
      try {
        await plugin(pluginContext)
      } catch (err) {
        console.error('[EmailEditor] Plugin initialization error:', err)
      }
    }
  }

  doc.triggerEmit()
  events.emit('editor:ready', { document: doc.document.value })
})

// ─── Watch external prop changes ───

watch(
  () => props.designJson,
  (newJson) => {
    // Skip if this change came from our own emission (prevents infinite loop)
    if (selfEmittedDesignJson) {
      selfEmittedDesignJson = false
      return
    }
    if (!newJson) return
    // Only reload if it's a new-format JSON (language switch in parent)
    if (isNewEditorJson(newJson)) {
      doc.loadFromProps(props.modelValue, newJson)
      doc.triggerEmit()
    }
  },
)

// ─── Imperative API (defineExpose) ───

const api: EmailEditorAPI = {
  getDocument: () => doc.document.value,
  setDocument: (newDoc) => doc.replaceDocument(newDoc),

  getMjml: () => documentToMjml(doc.document.value),
  getHtml: () => doc.compiledHtml.value,
  getDesignJson: () => ({
    _editor: 'mesagoo-email-editor' as const,
    _version: 1 as const,
    document: doc.document.value,
  }),

  undo: () => doc.history.undo(),
  redo: () => doc.history.redo(),
  canUndo: () => doc.history.canUndo.value,
  canRedo: () => doc.history.canRedo.value,

  selectNode: (nodeId: NodeId) => selection.selectNode(nodeId),
  getSelectedNode: () => selection.selectedNode.value,
  clearSelection: () => selection.clearSelection(),

  deleteNode: (nodeId: NodeId) => doc.deleteNode(nodeId),
  duplicateNode: (nodeId: NodeId) => doc.duplicateNode(nodeId),
  insertBlock: (block, parentId, index) => {
    const result = block.factory()
    const nodes = Array.isArray(result) ? result : [result]
    if (nodes.length === 0) return null
    const firstNode = nodes[0]
    doc.insertNode(parentId, index ?? 0, firstNode)
    for (let i = 1; i < nodes.length; i++) {
      doc.insertNodesAfter(nodes[i - 1].id, [nodes[i]])
    }
    events.emit('block:dropped', { blockId: block.id, parentId })
    return firstNode.id
  },
  updateNodeAttribute: (nodeId, key, value) => doc.updateNodeAttribute(nodeId, key, value),

  loadTemplate: (template) => doc.replaceDocument(template),

  on: (event, handler) => events.on(event, handler),
  off: (event, handler) => events.off(event, handler),
}

defineExpose(api)
</script>

<template>
  <EditorShell :label="label" :required="required" :theme="theme" />
</template>
