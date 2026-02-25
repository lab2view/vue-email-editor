<script setup lang="ts">
import { inject, computed } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_DOCUMENT_KEY, EMAIL_SELECTION_KEY } from '../../injection-keys'
import { PROPERTY_MAP, getNodeTypeLabelKey } from '../../properties/property-definitions'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS, type EditorLabels } from '../../labels'
import { findNode } from '../../utils/tree'
import type { PropertyDefinition, EmailNodeType } from '../../types'
import { CONTENT_NODE_TYPES } from '../../types'
import { FONT_OPTIONS } from '../../constants'
import PropertyGroup from './properties/PropertyGroup.vue'

const doc = inject(EMAIL_DOCUMENT_KEY)!
const selection = inject(EMAIL_SELECTION_KEY)!
const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)

function resolveLabel(key: string): string {
  return (labels as EditorLabels)[key as keyof EditorLabels] ?? key
}

const selectedNode = computed(() => selection.selectedNode.value)

// Breadcrumb: ancestor path from body → ... → selected node
const breadcrumb = computed(() => {
  const path = selection.selectedNodePath.value
  if (path.length <= 1) return []
  return path.map((id) => {
    const node = findNode(doc.document.value.body, id)
    return {
      id,
      label: node ? resolveLabel(getNodeTypeLabelKey(node.type)) : id,
      isCurrent: id === selection.selectedNodeId.value,
    }
  })
})

function navigateTo(id: string) {
  selection.selectNode(id)
}

const properties = computed<PropertyDefinition[]>(() => {
  if (!selectedNode.value) return []
  return PROPERTY_MAP[selectedNode.value.type as EmailNodeType] || []
})

// Group properties by their `group` field
const groupedProperties = computed(() => {
  const groups: Record<string, PropertyDefinition[]> = {}
  for (const prop of properties.value) {
    if (!groups[prop.group]) groups[prop.group] = []
    groups[prop.group].push(prop)
  }
  return groups
})

const nodeLabel = computed(() => {
  if (!selectedNode.value) return ''
  return resolveLabel(getNodeTypeLabelKey(selectedNode.value.type))
})

const isContentNode = computed(() => {
  if (!selectedNode.value) return false
  return CONTENT_NODE_TYPES.includes(selectedNode.value.type)
})

function onPropertyChange(key: string, value: string) {
  if (!selectedNode.value) return
  doc.updateNodeAttribute(selectedNode.value.id, key, value)
}

function onContentChange(value: string) {
  if (!selectedNode.value) return
  doc.updateNodeContent(selectedNode.value.id, value)
}

function clearSelection() {
  selection.clearSelection()
}

// ─── Global styles (shown when no node selected) ───

const bodyBg = computed(() => doc.document.value.body.attributes['background-color'] || '#ffffff')
const defaultFont = computed(() => {
  const styles = doc.document.value.headAttributes.defaultStyles
  return styles['mj-all']?.['font-family'] || styles['mj-text']?.['font-family'] || ''
})
const defaultTextColor = computed(() => {
  const styles = doc.document.value.headAttributes.defaultStyles
  return styles['mj-all']?.color || styles['mj-text']?.color || '#000000'
})
const previewText = computed(() => doc.document.value.headAttributes.previewText || '')

function onBodyBgChange(value: string) {
  doc.updateNodeAttribute(doc.document.value.body.id, 'background-color', value)
}

function onDefaultFontChange(value: string) {
  doc.updateHeadStyle('mj-all', 'font-family', value)
}

function onDefaultTextColorChange(value: string) {
  doc.updateHeadStyle('mj-all', 'color', value)
}

function onPreviewTextChange(value: string) {
  doc.updatePreviewText(value)
}
</script>

<template>
  <div v-if="selectedNode" class="ebb-properties">
    <!-- Header -->
    <div class="ebb-properties__header">
      <span class="ebb-properties__type">{{ nodeLabel }}</span>
      <button class="ebb-properties__close" :aria-label="resolveLabel('close')" @click="clearSelection">
        <EIcon name="X" :size="14" />
      </button>
    </div>

    <!-- Breadcrumb navigation -->
    <div v-if="breadcrumb.length > 1" class="ebb-properties__breadcrumb">
      <template v-for="(crumb, i) in breadcrumb" :key="crumb.id">
        <span v-if="i > 0" class="ebb-properties__breadcrumb-sep">/</span>
        <button
          class="ebb-properties__breadcrumb-item"
          :class="{ 'ebb-properties__breadcrumb-item--active': crumb.isCurrent }"
          @click="navigateTo(crumb.id)"
        >
          {{ crumb.label }}
        </button>
      </template>
    </div>

    <!-- Content editor (for text/button nodes) -->
    <div v-if="isContentNode" class="ebb-properties__content-group">
      <label class="ebb-properties__label">{{ resolveLabel('content_label') }}</label>
      <textarea
        class="ebb-properties__textarea"
        :value="selectedNode.htmlContent || ''"
        rows="4"
        @input="onContentChange(($event.target as HTMLTextAreaElement).value)"
      ></textarea>
    </div>

    <!-- Property groups -->
    <PropertyGroup
      v-for="(props, groupName) in groupedProperties"
      :key="groupName"
      :label="resolveLabel(String(groupName))"
      :properties="props"
      :node="selectedNode"
      @update="onPropertyChange"
    />
  </div>

  <!-- Global styles (no node selected) -->
  <div v-else class="ebb-global-styles">
    <div class="ebb-global-styles__header">
      <EIcon name="Globe" :size="16" />
      <span>{{ resolveLabel('global_styles') }}</span>
    </div>

    <!-- Preview text -->
    <div class="ebb-global-styles__section">
      <div class="ebb-global-styles__section-title">
        <EIcon name="Eye" :size="13" />
        <span>{{ resolveLabel('inbox_preview') }}</span>
      </div>
      <div class="ebb-global-styles__field">
        <label class="ebb-global-styles__label">{{ resolveLabel('preview_text') }}</label>
        <input
          type="text"
          class="ebb-global-styles__input"
          :value="previewText"
          :placeholder="resolveLabel('preview_text_placeholder')"
          @input="onPreviewTextChange(($event.target as HTMLInputElement).value)"
        />
        <p class="ebb-global-styles__hint">{{ resolveLabel('preview_text_hint') }}</p>
      </div>
    </div>

    <!-- Colors -->
    <div class="ebb-global-styles__section">
      <div class="ebb-global-styles__section-title">
        <EIcon name="Palette" :size="13" />
        <span>{{ resolveLabel('colors') }}</span>
      </div>

      <div class="ebb-global-styles__field">
        <label class="ebb-global-styles__label">{{ resolveLabel('email_background') }}</label>
        <div class="ebb-global-styles__color-row">
          <input
            type="color"
            class="ebb-global-styles__color-input"
            :value="bodyBg"
            :aria-label="resolveLabel('email_background')"
            @input="onBodyBgChange(($event.target as HTMLInputElement).value)"
          />
          <input
            type="text"
            class="ebb-global-styles__input ebb-global-styles__input--short"
            :value="bodyBg"
            @change="onBodyBgChange(($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <div class="ebb-global-styles__field">
        <label class="ebb-global-styles__label">{{ resolveLabel('text_color') }}</label>
        <div class="ebb-global-styles__color-row">
          <input
            type="color"
            class="ebb-global-styles__color-input"
            :value="defaultTextColor"
            :aria-label="resolveLabel('text_color')"
            @input="onDefaultTextColorChange(($event.target as HTMLInputElement).value)"
          />
          <input
            type="text"
            class="ebb-global-styles__input ebb-global-styles__input--short"
            :value="defaultTextColor"
            @change="onDefaultTextColorChange(($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
    </div>

    <!-- Typography -->
    <div class="ebb-global-styles__section">
      <div class="ebb-global-styles__section-title">
        <EIcon name="Type" :size="13" />
        <span>{{ resolveLabel('typography') }}</span>
      </div>

      <div class="ebb-global-styles__field">
        <label class="ebb-global-styles__label">{{ resolveLabel('default_font') }}</label>
        <select
          class="ebb-global-styles__select"
          :value="defaultFont"
          @change="onDefaultFontChange(($event.target as HTMLSelectElement).value)"
        >
          <option value="">{{ resolveLabel('font_default') }}</option>
          <option v-for="font in FONT_OPTIONS" :key="font.value" :value="font.value">
            {{ font.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="ebb-global-styles__tip">
      <EIcon name="MousePointer" :size="14" />
      <span>{{ resolveLabel('select_element_hint') }}</span>
    </div>
  </div>
</template>

<style>
.ebb-properties {
  padding: 0;
}

.ebb-properties__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

html[data-theme='dark'] .ebb-properties__header {
  background: #111827;
  border-bottom-color: #374151;
}

.ebb-properties__type {
  font-size: 13px;
  font-weight: 600;
  color: var(--ee-primary);
}

.ebb-properties__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 4px;
}

.ebb-properties__close:hover {
  background: #f3f4f6;
  color: #374151;
}

.ebb-properties__content-group {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
}

html[data-theme='dark'] .ebb-properties__content-group {
  border-bottom-color: #374151;
}

.ebb-properties__label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

html[data-theme='dark'] .ebb-properties__label {
  color: #9ca3af;
}

.ebb-properties__textarea {
  width: 100%;
  padding: 8px;
  font-size: 12px;
  font-family: monospace;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  resize: vertical;
  box-sizing: border-box;
}

html[data-theme='dark'] .ebb-properties__textarea {
  background: #1f2937;
  border-color: #374151;
  color: #d1d5db;
}

.ebb-properties__textarea:focus {
  outline: none;
  border-color: var(--ee-primary);
  box-shadow: 0 0 0 2px rgba(1, 168, 171, 0.1);
}

/* ── Global Styles Panel ── */
.ebb-global-styles {
  padding: 0;
}

.ebb-global-styles__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 13px;
  font-weight: 600;
  color: var(--ee-primary);
}

html[data-theme='dark'] .ebb-global-styles__header {
  background: #111827;
  border-bottom-color: #374151;
}

.ebb-global-styles__section {
  border-bottom: 1px solid #f3f4f6;
  padding: 0;
}

html[data-theme='dark'] .ebb-global-styles__section {
  border-bottom-color: #1f2937;
}

.ebb-global-styles__section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  background: #fafafa;
}

html[data-theme='dark'] .ebb-global-styles__section-title {
  background: #111827;
  color: #9ca3af;
}

.ebb-global-styles__field {
  padding: 8px 16px 12px;
}

.ebb-global-styles__label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 4px;
}

html[data-theme='dark'] .ebb-global-styles__label {
  color: #9ca3af;
}

.ebb-global-styles__hint {
  font-size: 10px;
  color: #9ca3af;
  margin: 4px 0 0;
  line-height: 1.4;
}

.ebb-global-styles__input {
  width: 100%;
  padding: 7px 10px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s ease;
}

html[data-theme='dark'] .ebb-global-styles__input {
  background: #1f2937;
  border-color: #374151;
  color: #d1d5db;
}

.ebb-global-styles__input:focus {
  border-color: var(--ee-primary);
  box-shadow: 0 0 0 2px rgba(1, 168, 171, 0.1);
}

.ebb-global-styles__input--short {
  flex: 1;
}

.ebb-global-styles__select {
  width: 100%;
  padding: 7px 10px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
}

html[data-theme='dark'] .ebb-global-styles__select {
  background: #1f2937;
  border-color: #374151;
  color: #d1d5db;
}

.ebb-global-styles__select:focus {
  border-color: var(--ee-primary);
}

.ebb-global-styles__color-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.ebb-global-styles__color-input {
  width: 36px;
  height: 36px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 2px;
  cursor: pointer;
  background: transparent;
  flex-shrink: 0;
}

html[data-theme='dark'] .ebb-global-styles__color-input {
  border-color: #374151;
}

.ebb-global-styles__color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.ebb-global-styles__color-input::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

.ebb-global-styles__tip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  color: #9ca3af;
  font-size: 11px;
  line-height: 1.4;
}

.ebb-properties__breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  padding: 6px 16px;
  border-bottom: 1px solid #f3f4f6;
}

html[data-theme='dark'] .ebb-properties__breadcrumb {
  border-bottom-color: #374151;
}

.ebb-properties__breadcrumb-sep {
  font-size: 10px;
  color: #d1d5db;
}

html[data-theme='dark'] .ebb-properties__breadcrumb-sep {
  color: #4b5563;
}

.ebb-properties__breadcrumb-item {
  font-size: 11px;
  color: #6b7280;
  background: none;
  border: none;
  padding: 2px 6px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.ebb-properties__breadcrumb-item:hover {
  background: #f3f4f6;
  color: #111827;
}

html[data-theme='dark'] .ebb-properties__breadcrumb-item:hover {
  background: #374151;
  color: #f3f4f6;
}

.ebb-properties__breadcrumb-item--active {
  color: var(--ee-primary);
  font-weight: 600;
}
</style>
