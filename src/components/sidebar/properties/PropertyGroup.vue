<script setup lang="ts">
import { inject, ref } from 'vue'
import type { PropertyDefinition, EmailNode } from '../../../types'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS, type EditorLabels } from '../../../labels'
import { EMAIL_EDITOR_CONFIG_KEY } from '../../../injection-keys'
import EIcon from '../../internal/EIcon.vue'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp']
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

const props = defineProps<{
  label: string
  properties: PropertyDefinition[]
  node: EmailNode
}>()

const emit = defineEmits<{
  update: [key: string, value: string]
}>()

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const config = inject(EMAIL_EDITOR_CONFIG_KEY, undefined)
const isExpanded = ref(true)
const uploadingKey = ref<string | null>(null)
const uploadError = ref<string | null>(null)
const dragOverKey = ref<string | null>(null)
const fileInputs = ref<Record<string, HTMLInputElement | null>>({})

function setFileInputRef(key: string) {
  return (el: unknown) => { fileInputs.value[key] = el as HTMLInputElement | null }
}

function triggerFileInput(key: string) {
  fileInputs.value[key]?.click()
}

function resolveLabel(key: string): string {
  return (labels as EditorLabels)[key as keyof EditorLabels] ?? key
}

function getValue(key: string): string {
  return props.node.attributes[key] || ''
}

function isValidImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return resolveLabel('image_invalid_type')
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return resolveLabel('image_max_size')
  }
  return null
}

async function handleImageUpload(key: string, file: File) {
  if (!config?.onImageUpload) return
  const error = isValidImageFile(file)
  if (error) {
    uploadError.value = error
    setTimeout(() => { uploadError.value = null }, 3000)
    return
  }
  uploadingKey.value = key
  uploadError.value = null
  try {
    const result = await config.onImageUpload(file)
    emit('update', key, result.url)
  } catch {
    uploadError.value = resolveLabel('image_upload_error')
    setTimeout(() => { uploadError.value = null }, 3000)
  } finally {
    uploadingKey.value = null
  }
}

function onFileInput(key: string, event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) handleImageUpload(key, file)
  input.value = '' // Reset so same file can be re-selected
}

function onDrop(key: string, event: DragEvent) {
  event.preventDefault()
  dragOverKey.value = null
  const file = event.dataTransfer?.files[0]
  if (file) handleImageUpload(key, file)
}

function onDragOver(key: string, event: DragEvent) {
  event.preventDefault()
  dragOverKey.value = key
}

function onDragLeave(key: string) {
  if (dragOverKey.value === key) dragOverKey.value = null
}

async function browseAssets(key: string) {
  if (!config?.onBrowseAssets) return
  const url = await config.onBrowseAssets()
  if (url) emit('update', key, url)
}
</script>

<template>
  <div class="ebb-prop-group">
    <button class="ebb-prop-group__header" @click="isExpanded = !isExpanded">
      <span>{{ label }}</span>
      <EIcon :name="isExpanded ? 'ChevronDown' : 'ChevronRight'" :size="14" />
    </button>
    <div v-show="isExpanded" class="ebb-prop-group__body">
      <div v-for="prop in properties" :key="prop.key" class="ebb-prop-group__field">
        <label class="ebb-prop-group__label">{{ resolveLabel(prop.label) }}</label>

        <!-- Color picker -->
        <div v-if="prop.type === 'color'" class="ebb-prop-group__color">
          <input
            type="color"
            :value="getValue(prop.key) || prop.defaultValue || '#000000'"
            class="ebb-prop-group__color-input"
            :aria-label="resolveLabel(prop.label)"
            @input="emit('update', prop.key, ($event.target as HTMLInputElement).value)"
          />
          <input
            type="text"
            :value="getValue(prop.key)"
            :placeholder="prop.defaultValue"
            class="ebb-prop-group__text-input"
            @change="emit('update', prop.key, ($event.target as HTMLInputElement).value)"
          />
        </div>

        <!-- Select -->
        <select
          v-else-if="prop.type === 'select'"
          :value="getValue(prop.key)"
          class="ebb-prop-group__select"
          @change="emit('update', prop.key, ($event.target as HTMLSelectElement).value)"
        >
          <option value="">—</option>
          <option
            v-for="opt in prop.options"
            :key="opt.value"
            :value="opt.value"
          >
            {{ resolveLabel(opt.label) }}
          </option>
        </select>

        <!-- Number -->
        <div v-else-if="prop.type === 'number'" class="ebb-prop-group__number">
          <input
            type="number"
            :value="parseInt(getValue(prop.key)) || ''"
            :min="prop.min"
            :max="prop.max"
            :step="prop.step || 1"
            :placeholder="prop.defaultValue"
            class="ebb-prop-group__text-input"
            @change="emit('update', prop.key, ($event.target as HTMLInputElement).value + (prop.unit || ''))"
          />
          <span v-if="prop.unit" class="ebb-prop-group__unit">{{ prop.unit }}</span>
        </div>

        <!-- Alignment -->
        <div v-else-if="prop.type === 'alignment'" class="ebb-prop-group__alignment">
          <button
            v-for="al in ['left', 'center', 'right']"
            :key="al"
            class="ebb-prop-group__align-btn"
            :class="{ 'ebb-prop-group__align-btn--active': getValue(prop.key) === al }"
            @click="emit('update', prop.key, al)"
          >
            <EIcon
              :name="al === 'left' ? 'AlignLeft' : al === 'center' ? 'AlignCenter' : 'AlignRight'"
              :size="14"
            />
          </button>
        </div>

        <!-- Toggle -->
        <div v-else-if="prop.type === 'toggle'" class="ebb-prop-group__toggle">
          <button
            class="ebb-prop-group__toggle-btn"
            :class="{ 'ebb-prop-group__toggle-btn--active': getValue(prop.key) === 'full-width' }"
            @click="emit('update', prop.key, getValue(prop.key) ? '' : 'full-width')"
          >
            {{ getValue(prop.key) ? resolveLabel('toggle_yes') : resolveLabel('toggle_no') }}
          </button>
        </div>

        <!-- Padding (simplified: single text input) -->
        <input
          v-else-if="prop.type === 'padding'"
          type="text"
          :value="getValue(prop.key)"
          placeholder="ex: 10px 20px"
          class="ebb-prop-group__text-input"
          @change="emit('update', prop.key, ($event.target as HTMLInputElement).value)"
        />

        <!-- Image upload -->
        <div v-else-if="prop.type === 'image'" class="ebb-prop-group__image">
          <!-- Preview -->
          <div v-if="getValue(prop.key)" class="ebb-prop-group__image-preview">
            <img :src="getValue(prop.key)" :alt="resolveLabel('prop_src')" class="ebb-prop-group__image-thumb" />
            <div class="ebb-prop-group__image-actions">
              <button
                v-if="config?.onImageUpload"
                class="ebb-prop-group__image-btn"
                :title="resolveLabel('image_change')"
                @click="triggerFileInput(prop.key)"
              >
                <EIcon name="Upload" :size="12" />
              </button>
              <button
                v-if="config?.onBrowseAssets"
                class="ebb-prop-group__image-btn"
                :title="resolveLabel('image_browse')"
                @click="browseAssets(prop.key)"
              >
                <EIcon name="FolderOpen" :size="12" />
              </button>
              <button
                class="ebb-prop-group__image-btn ebb-prop-group__image-btn--danger"
                :title="resolveLabel('image_remove')"
                @click="emit('update', prop.key, '')"
              >
                <EIcon name="Trash2" :size="12" />
              </button>
            </div>
          </div>

          <!-- Drop zone (no image set, upload available) -->
          <div
            v-else-if="config?.onImageUpload"
            class="ebb-prop-group__image-dropzone"
            :class="{
              'ebb-prop-group__image-dropzone--active': dragOverKey === prop.key,
              'ebb-prop-group__image-dropzone--uploading': uploadingKey === prop.key,
            }"
            @click="triggerFileInput(prop.key)"
            @drop="onDrop(prop.key, $event)"
            @dragover="onDragOver(prop.key, $event)"
            @dragleave="onDragLeave(prop.key)"
          >
            <EIcon v-if="uploadingKey === prop.key" name="Loader2" :size="20" class="ebb-prop-group__image-spinner" />
            <EIcon v-else name="ImagePlus" :size="20" />
            <span class="ebb-prop-group__image-drop-text">
              {{ uploadingKey === prop.key ? resolveLabel('image_uploading') : resolveLabel('image_drop_hint') }}
            </span>
          </div>

          <!-- URL text input (always shown for manual URL entry) -->
          <div class="ebb-prop-group__image-url">
            <input
              type="text"
              :value="getValue(prop.key)"
              placeholder="https://..."
              class="ebb-prop-group__text-input"
              @change="emit('update', prop.key, ($event.target as HTMLInputElement).value)"
            />
            <button
              v-if="config?.onBrowseAssets && !getValue(prop.key)"
              class="ebb-prop-group__image-browse-btn"
              :title="resolveLabel('image_browse')"
              @click="browseAssets(prop.key)"
            >
              <EIcon name="FolderOpen" :size="14" />
            </button>
          </div>

          <!-- Hidden file input -->
          <input
            :ref="setFileInputRef(prop.key)"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp"
            style="display: none"
            @change="onFileInput(prop.key, $event)"
          />

          <!-- Error message -->
          <div v-if="uploadError && (uploadingKey === prop.key || uploadingKey === null)" class="ebb-prop-group__image-error">
            {{ uploadError }}
          </div>
        </div>

        <!-- Text / URL (fallback) -->
        <input
          v-else
          type="text"
          :value="getValue(prop.key)"
          :placeholder="prop.defaultValue || ''"
          class="ebb-prop-group__text-input"
          @change="emit('update', prop.key, ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.ebb-prop-group {
  border-bottom: 1px solid #f3f4f6;
}

html[data-theme='dark'] .ebb-prop-group {
  border-bottom-color: #374151;
}

.ebb-prop-group__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.15s;
}

.ebb-prop-group__header:hover {
  color: #374151;
}

html[data-theme='dark'] .ebb-prop-group__header:hover {
  color: #d1d5db;
}

.ebb-prop-group__body {
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ebb-prop-group__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ebb-prop-group__label {
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
}

html[data-theme='dark'] .ebb-prop-group__label {
  color: #9ca3af;
}

.ebb-prop-group__text-input {
  width: 100%;
  padding: 6px 8px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  box-sizing: border-box;
  transition: border-color 0.15s;
}

html[data-theme='dark'] .ebb-prop-group__text-input {
  background: #1f2937;
  border-color: #374151;
  color: #d1d5db;
}

.ebb-prop-group__text-input:focus {
  outline: none;
  border-color: var(--ee-primary);
  box-shadow: 0 0 0 2px rgba(1, 168, 171, 0.1);
}

.ebb-prop-group__select {
  width: 100%;
  padding: 6px 8px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  box-sizing: border-box;
  cursor: pointer;
}

html[data-theme='dark'] .ebb-prop-group__select {
  background: #1f2937;
  border-color: #374151;
  color: #d1d5db;
}

.ebb-prop-group__select:focus {
  outline: none;
  border-color: var(--ee-primary);
}

.ebb-prop-group__color {
  display: flex;
  gap: 6px;
  align-items: center;
}

.ebb-prop-group__color-input {
  width: 32px;
  height: 32px;
  padding: 2px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  background: none;
  flex-shrink: 0;
}

.ebb-prop-group__number {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ebb-prop-group__unit {
  font-size: 11px;
  color: #9ca3af;
  flex-shrink: 0;
}

.ebb-prop-group__alignment {
  display: flex;
  gap: 2px;
}

.ebb-prop-group__align-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 28px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.15s;
}

.ebb-prop-group__align-btn:first-child {
  border-radius: 6px 0 0 6px;
}

.ebb-prop-group__align-btn:last-child {
  border-radius: 0 6px 6px 0;
}

.ebb-prop-group__align-btn--active {
  background: rgba(1, 168, 171, 0.1);
  border-color: var(--ee-primary);
  color: var(--ee-primary);
}

html[data-theme='dark'] .ebb-prop-group__align-btn {
  background: #1f2937;
  border-color: #374151;
}

html[data-theme='dark'] .ebb-prop-group__align-btn--active {
  background: rgba(1, 168, 171, 0.15);
  border-color: var(--ee-primary);
  color: var(--ee-primary);
}

.ebb-prop-group__toggle-btn {
  padding: 4px 12px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}

.ebb-prop-group__toggle-btn--active {
  background: rgba(1, 168, 171, 0.1);
  border-color: var(--ee-primary);
  color: var(--ee-primary);
}

/* ─── Image Upload ─── */

.ebb-prop-group__image {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ebb-prop-group__image-preview {
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  background: #f9fafb;
}

html[data-theme='dark'] .ebb-prop-group__image-preview {
  border-color: #374151;
  background: #1f2937;
}

.ebb-prop-group__image-thumb {
  display: block;
  width: 100%;
  max-height: 120px;
  object-fit: contain;
  background: repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 50% / 12px 12px;
}

html[data-theme='dark'] .ebb-prop-group__image-thumb {
  background: repeating-conic-gradient(#374151 0% 25%, transparent 0% 50%) 50% / 12px 12px;
}

.ebb-prop-group__image-actions {
  display: flex;
  gap: 4px;
  padding: 4px;
  justify-content: flex-end;
  background: rgba(255, 255, 255, 0.9);
  border-top: 1px solid #e5e7eb;
}

html[data-theme='dark'] .ebb-prop-group__image-actions {
  background: rgba(31, 41, 55, 0.9);
  border-top-color: #374151;
}

.ebb-prop-group__image-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}

html[data-theme='dark'] .ebb-prop-group__image-btn {
  background: #1f2937;
  border-color: #374151;
  color: #9ca3af;
}

.ebb-prop-group__image-btn:hover {
  border-color: var(--ee-primary, #01A8AB);
  color: var(--ee-primary, #01A8AB);
}

.ebb-prop-group__image-btn--danger:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.ebb-prop-group__image-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px 8px;
  border: 2px dashed #d1d5db;
  border-radius: 6px;
  background: #f9fafb;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

html[data-theme='dark'] .ebb-prop-group__image-dropzone {
  border-color: #4b5563;
  background: #111827;
  color: #6b7280;
}

.ebb-prop-group__image-dropzone:hover,
.ebb-prop-group__image-dropzone--active {
  border-color: var(--ee-primary, #01A8AB);
  background: rgba(1, 168, 171, 0.05);
  color: var(--ee-primary, #01A8AB);
}

.ebb-prop-group__image-dropzone--uploading {
  pointer-events: none;
  opacity: 0.7;
}

.ebb-prop-group__image-drop-text {
  font-size: 11px;
  line-height: 1.3;
}

.ebb-prop-group__image-spinner {
  animation: ebb-spin 1s linear infinite;
}

@keyframes ebb-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ebb-prop-group__image-url {
  display: flex;
  gap: 4px;
  align-items: center;
}

.ebb-prop-group__image-url .ebb-prop-group__text-input {
  flex: 1;
}

.ebb-prop-group__image-browse-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}

html[data-theme='dark'] .ebb-prop-group__image-browse-btn {
  background: #1f2937;
  border-color: #374151;
  color: #9ca3af;
}

.ebb-prop-group__image-browse-btn:hover {
  border-color: var(--ee-primary, #01A8AB);
  color: var(--ee-primary, #01A8AB);
}

.ebb-prop-group__image-error {
  font-size: 11px;
  color: #ef4444;
  padding: 2px 0;
}
</style>
