<script setup lang="ts">
import { ref, inject, computed, defineAsyncComponent } from 'vue'
import EIcon from './internal/EIcon.vue'
import EditorToolbar from './toolbar/EditorToolbar.vue'
import EditorCanvas from './canvas/EditorCanvas.vue'
import EditorSidebar from './sidebar/EditorSidebar.vue'
import { EMAIL_DOCUMENT_KEY } from '../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS } from '../labels'
import { DEVICE_PRESETS } from '../constants'

const CodeEditor = defineAsyncComponent(() => import('./code/CodeEditor.vue'))

defineProps<{
  label?: string
  required?: boolean
}>()

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const doc = inject(EMAIL_DOCUMENT_KEY)!

const isFullscreen = ref(false)
const activeView = ref<'visual' | 'code'>('visual')
const initError = ref('')
const activeDeviceIndex = ref(0)

const canvasWidth = computed(() => DEVICE_PRESETS[activeDeviceIndex.value].width)

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function toggleCodeView() {
  activeView.value = activeView.value === 'visual' ? 'code' : 'visual'
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
    >
      <!-- ═══ TOP TOOLBAR ═══ -->
      <EditorToolbar
        :is-fullscreen="isFullscreen"
        :active-view="activeView"
        :active-device-index="activeDeviceIndex"
        @toggle-fullscreen="toggleFullscreen"
        @toggle-code-view="toggleCodeView"
        @update:active-device-index="activeDeviceIndex = $event"
      />

      <!-- ═══ MAIN AREA ═══ -->
      <div class="ebb-main">
        <!-- Canvas (visual editor) -->
        <EditorCanvas v-show="activeView === 'visual'" :canvas-width="canvasWidth" />

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
  color: #374151;
  margin-bottom: 8px;
}

html[data-theme='dark'] .ebb-label {
  color: #e5e7eb;
}

.ebb-label__required {
  color: #ef4444;
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
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #f9fafb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  min-height: 500px;
}

html[data-theme='dark'] .ebb-shell {
  border-color: #374151;
  background: #111827;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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


</style>
