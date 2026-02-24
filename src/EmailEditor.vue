<script setup lang="ts">
/**
 * EmailEditor — Root component for the Mesagoo email editor.
 *
 * Composes all composables, provides them to descendants, and handles
 * the external props/emits contract matching the old GrapesJS editor.
 */
import { provide, watch, onMounted, toRef, computed } from 'vue'
import type { EmailDesignJson } from './types'
import { isNewEditorJson } from './types'
import { useEmailDocument } from './composables/useEmailDocument'
import { useEmailSelection } from './composables/useEmailSelection'
import { useEmailDragDrop } from './composables/useEmailDragDrop'
import { useEmailKeyboard } from './composables/useEmailKeyboard'
import {
  EMAIL_DOCUMENT_KEY,
  EMAIL_SELECTION_KEY,
  EMAIL_DRAG_DROP_KEY,
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
  }>(),
  {
    label: '',
    required: false,
    designJson: null,
    variables: () => [],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:compiledHtml': [html: string]
  'update:designJson': [data: Record<string, unknown>]
}>()

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
})

const selection = useEmailSelection(doc.document)
const dragDrop = useEmailDragDrop()
useEmailKeyboard(doc, selection)

// ─── Provide to descendants ───

provide(EMAIL_DOCUMENT_KEY, doc)
provide(EMAIL_SELECTION_KEY, selection)
provide(EMAIL_DRAG_DROP_KEY, dragDrop)
provide(EMAIL_EDITOR_CONFIG_KEY, { variables: toRef(props, 'variables') })

// Merge user-provided labels with defaults
const mergedLabels = computed<EditorLabels>(() => ({
  ...DEFAULT_LABELS,
  ...props.labels,
}))
provide(EMAIL_LABELS_KEY, mergedLabels.value)

// ─── Initialize from props ───

doc.loadFromProps(props.modelValue, props.designJson)

onMounted(() => {
  doc.triggerEmit()
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
</script>

<template>
  <EditorShell :label="label" :required="required" />
</template>
