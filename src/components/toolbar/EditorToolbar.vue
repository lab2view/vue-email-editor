<script setup lang="ts">
import { inject } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { DEVICE_PRESETS } from '../../constants'
import { EMAIL_DOCUMENT_KEY } from '../../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS } from '../../labels'

const props = defineProps<{
  isFullscreen: boolean
  activeView: 'visual' | 'code'
  activeDeviceIndex: number
  isDarkPreview: boolean
}>()

const emit = defineEmits<{
  'toggle-fullscreen': []
  'toggle-code-view': []
  'toggle-dark-preview': []
  'update:activeDeviceIndex': [index: number]
}>()

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const doc = inject(EMAIL_DOCUMENT_KEY)!

function setDevice(index: number) {
  emit('update:activeDeviceIndex', index)
}

function undo() {
  doc.history.undo()
  doc.triggerEmit()
}

function redo() {
  doc.history.redo()
  doc.triggerEmit()
}
</script>

<template>
  <div class="ebb-toolbar" role="toolbar" :aria-label="labels.editor_title">
    <!-- Left: Device switcher -->
    <div class="ebb-toolbar__left">
      <div class="ebb-toolbar__device-group" role="radiogroup" :aria-label="labels.desktop">
        <button
          v-for="(device, i) in DEVICE_PRESETS"
          :key="device.name"
          class="ebb-toolbar__device-btn"
          :class="{ 'ebb-toolbar__device-btn--active': activeDeviceIndex === i }"
          role="radio"
          :aria-checked="activeDeviceIndex === i"
          :title="device.name"
          @click="setDevice(i)"
        >
          <EIcon :name="device.icon" :size="16" />
          <span class="ebb-toolbar__device-label">{{ device.name }}</span>
        </button>
      </div>
    </div>

    <!-- Center: Title -->
    <div class="ebb-toolbar__title">
      {{ labels.editor_title }}
    </div>

    <!-- Right: Undo/Redo + Code + Fullscreen -->
    <div class="ebb-toolbar__group">
      <button
        class="ebb-toolbar__action-btn"
        :class="{ 'ebb-toolbar__action-btn--disabled': !doc.history.canUndo.value }"
        :disabled="!doc.history.canUndo.value"
        :aria-disabled="!doc.history.canUndo.value"
        :title="labels.undo"
        :aria-label="labels.undo"
        @click="undo"
      >
        <EIcon name="Undo2" :size="16" />
      </button>
      <button
        class="ebb-toolbar__action-btn"
        :class="{ 'ebb-toolbar__action-btn--disabled': !doc.history.canRedo.value }"
        :disabled="!doc.history.canRedo.value"
        :aria-disabled="!doc.history.canRedo.value"
        :title="labels.redo"
        :aria-label="labels.redo"
        @click="redo"
      >
        <EIcon name="Redo2" :size="16" />
      </button>
      <div class="ebb-toolbar__divider"></div>
      <button
        class="ebb-toolbar__action-btn"
        :class="{ 'ebb-toolbar__action-btn--active': isDarkPreview }"
        :aria-pressed="isDarkPreview"
        :title="labels.dark_mode_preview"
        :aria-label="labels.dark_mode_preview"
        @click="emit('toggle-dark-preview')"
      >
        <EIcon :name="isDarkPreview ? 'Sun' : 'Moon'" :size="16" />
      </button>
      <button
        class="ebb-toolbar__action-btn"
        :class="{ 'ebb-toolbar__action-btn--active': activeView === 'code' }"
        :aria-pressed="activeView === 'code'"
        :title="labels.code"
        :aria-label="labels.code"
        @click="emit('toggle-code-view')"
      >
        <EIcon name="Code" :size="16" />
      </button>
      <div class="ebb-toolbar__divider"></div>
      <button
        class="ebb-toolbar__action-btn"
        :aria-pressed="isFullscreen"
        :title="labels.fullscreen"
        :aria-label="labels.fullscreen"
        @click="emit('toggle-fullscreen')"
      >
        <EIcon :name="isFullscreen ? 'Minimize2' : 'Maximize2'" :size="16" />
      </button>
    </div>
  </div>
</template>

<style>
.ebb-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 12px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

html[data-theme='dark'] .ebb-toolbar {
  background: #1f2937;
  border-bottom-color: #374151;
}

.ebb-toolbar__left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ebb-toolbar__group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.ebb-toolbar__device-group {
  display: flex;
  align-items: center;
  gap: 1px;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 3px;
}

html[data-theme='dark'] .ebb-toolbar__device-group {
  background: #111827;
}

.ebb-toolbar__device-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ebb-toolbar__device-label {
  font-size: 11px;
  font-weight: 500;
}

.ebb-toolbar__device-btn:hover {
  color: #374151;
  background: rgba(0, 0, 0, 0.04);
}

html[data-theme='dark'] .ebb-toolbar__device-btn:hover {
  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.06);
}

.ebb-toolbar__device-btn--active {
  background: #ffffff;
  color: var(--ee-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

html[data-theme='dark'] .ebb-toolbar__device-btn--active {
  background: #374151;
  color: var(--ee-primary);
}

.ebb-toolbar__title {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  letter-spacing: -0.01em;
}

html[data-theme='dark'] .ebb-toolbar__title {
  color: #d1d5db;
}

.ebb-toolbar__action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ebb-toolbar__action-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

html[data-theme='dark'] .ebb-toolbar__action-btn:hover {
  background: #374151;
  color: #f3f4f6;
}

.ebb-toolbar__action-btn--active {
  background: rgba(1, 168, 171, 0.12);
  color: var(--ee-primary);
}

.ebb-toolbar__action-btn--disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

.ebb-toolbar__divider {
  width: 1px;
  height: 20px;
  background: #e5e7eb;
  margin: 0 6px;
}

html[data-theme='dark'] .ebb-toolbar__divider {
  background: #374151;
}
</style>
