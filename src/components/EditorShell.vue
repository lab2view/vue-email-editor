<script setup lang="ts">
import { ref, inject, computed, defineAsyncComponent } from 'vue'
import EIcon from './internal/EIcon.vue'
import EditorToolbar from './toolbar/EditorToolbar.vue'
import EditorCanvas from './canvas/EditorCanvas.vue'
import EditorSidebar from './sidebar/EditorSidebar.vue'
import { EMAIL_DOCUMENT_KEY } from '../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS } from '../labels'
import { DEVICE_PRESETS } from '../constants'
import type { ThemeConfig } from '../types'
import { DEFAULT_THEME } from '../types'

const CodeEditor = defineAsyncComponent(() => import('./code/CodeEditor.vue'))

const props = defineProps<{
  label?: string
  required?: boolean
  theme?: Partial<ThemeConfig>
}>()

const themeStyles = computed(() => {
  const t = { ...DEFAULT_THEME, ...props.theme }
  return {
    '--ee-primary': t.primaryColor,
    '--ee-primary-hover': t.primaryHover,
    '--ee-primary-active': t.primaryActive,
    '--ee-border': t.borderColor,
    '--ee-border-hover': t.borderColorHover,
    '--ee-bg': t.backgroundColor,
    '--ee-bg-hover': t.backgroundHover,
    '--ee-bg-active': t.backgroundActive,
    '--ee-text-primary': t.textPrimary,
    '--ee-text-secondary': t.textSecondary,
    '--ee-text-muted': t.textMuted,
    '--ee-canvas-bg': t.canvasBg,
    '--ee-canvas-border': t.canvasBorder,
    '--ee-selection': t.selectionColor,
    '--ee-hover': t.hoverColor,
    '--ee-drop-indicator': t.dropIndicatorColor,
    '--ee-sidebar-bg': t.sidebarBg,
    '--ee-sidebar-border': t.sidebarBorder,
    '--ee-panel-header-bg': t.panelHeaderBg,
    '--ee-toolbar-bg': t.toolbarBg,
    '--ee-toolbar-border': t.toolbarBorder,
    '--ee-success': t.successColor,
    '--ee-warning': t.warningColor,
    '--ee-error': t.errorColor,
    '--ee-font-family': t.fontFamily,
    '--ee-font-size': t.fontSize,
    '--ee-border-radius': t.borderRadius,
  }
})

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const doc = inject(EMAIL_DOCUMENT_KEY)!

const isFullscreen = ref(false)
const activeView = ref<'visual' | 'code'>('visual')
const initError = ref('')
const activeDeviceIndex = ref(0)
const isDarkPreview = ref(false)

const canvasWidth = computed(() => DEVICE_PRESETS[activeDeviceIndex.value].width)

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function toggleCodeView() {
  activeView.value = activeView.value === 'visual' ? 'code' : 'visual'
}

function toggleDarkPreview() {
  isDarkPreview.value = !isDarkPreview.value
}
</script>

<template>
  <div class="email-body-editor">
    <label v-if="label" class="ebb-label">
      {{ label }}
      <span v-if="required" class="ebb-label__required">*</span>
    </label>

    <div v-if="initError" class="ebb-alert">
      <EIcon name="AlertTriangle" :size="18" />
      <div>
        <strong>{{ labels.init_error }}</strong>
        <p>{{ initError }}</p>
      </div>
    </div>

    <div
      v-show="!initError"
      class="ebb-shell"
      :class="{ 'ebb-shell--fullscreen': isFullscreen }"
      :style="themeStyles"
      role="application"
      :aria-label="labels.editor_title"
    >
      <!-- Skip link for keyboard users -->
      <a href="#ebb-canvas-region" class="ebb-sr-only ebb-sr-only--focusable">
        {{ labels.editor_title }}
      </a>

      <!-- ═══ TOP TOOLBAR ═══ -->
      <EditorToolbar
        :is-fullscreen="isFullscreen"
        :active-view="activeView"
        :active-device-index="activeDeviceIndex"
        :is-dark-preview="isDarkPreview"
        @toggle-fullscreen="toggleFullscreen"
        @toggle-code-view="toggleCodeView"
        @toggle-dark-preview="toggleDarkPreview"
        @update:active-device-index="activeDeviceIndex = $event"
      />

      <!-- ═══ MAIN AREA ═══ -->
      <div class="ebb-main">
        <!-- Canvas (visual editor) -->
        <EditorCanvas v-show="activeView === 'visual'" :canvas-width="canvasWidth" :dark-preview="isDarkPreview" />

        <!-- Code view (CodeMirror) -->
        <CodeEditor v-if="activeView === 'code'" />

        <!-- Right Sidebar -->
        <EditorSidebar />
      </div>
    </div>
  </div>
</template>

<style>
/* ═══════════════════════════════════════════════════════════════
   EMAIL BODY BUILDER — Immersive Shell
   ═══════════════════════════════════════════════════════════════ */

.ebb-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--ee-text-primary, #374151);
  margin-bottom: 8px;
}

.ebb-label__required {
  color: var(--ee-error, #ef4444);
}

.ebb-alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  background: #fef2f2;
  color: #991b1b;
  font-size: 13px;
  margin-bottom: 12px;
}

html[data-theme='dark'] .ebb-alert {
  background: #450a0a;
  border-color: #7f1d1d;
  color: #fca5a5;
}

.ebb-alert p {
  margin: 4px 0 0;
  font-size: 12px;
}

.ebb-shell {
  border: 1px solid var(--ee-border, #e5e7eb);
  border-radius: 12px;
  overflow: hidden;
  background: var(--ee-panel-header-bg, #f9fafb);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  min-height: 500px;
  font-family: var(--ee-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  font-size: var(--ee-font-size, 13px);
}

.ebb-shell--fullscreen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  height: 100vh;
  border-radius: 0;
  border: none;
}

/* ═══ MAIN ═══ */
.ebb-main {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* ═══ Screen reader only ═══ */
.ebb-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.ebb-sr-only--focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 8px 16px;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  background: var(--ee-primary);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  z-index: 100;
}
</style>
