<script setup lang="ts">
import { ref, inject, watch, computed, onBeforeUnmount, defineAsyncComponent } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_SELECTION_KEY, EMAIL_EDITOR_CONFIG_KEY } from '../../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS } from '../../labels'
import { PLUGIN_REGISTRY_KEY } from '../../injection-keys'
import BlocksPanel from './BlocksPanel.vue'
import PropertiesPanel from './PropertiesPanel.vue'
import LayersPanel from './LayersPanel.vue'

const AiChatPanel = defineAsyncComponent(() => import('./AiChatPanel.vue'))

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const selection = inject(EMAIL_SELECTION_KEY)!
const config = inject(EMAIL_EDITOR_CONFIG_KEY)!
const pluginRegistry = inject(PLUGIN_REGISTRY_KEY, undefined)

interface TabDef {
  id: string
  label: string
  icon: string
}

const hasAiChat = computed(
  () => !!config.aiProvider?.generateTemplate || !!config.aiProvider?.generateTemplateStream,
)

const tabs = computed<TabDef[]>(() => {
  const base: TabDef[] = [
    { id: 'blocks', label: labels.blocks, icon: 'LayoutGrid' },
    { id: 'properties', label: labels.styles, icon: 'Paintbrush' },
    { id: 'layers', label: labels.layers, icon: 'Layers' },
  ]

  if (hasAiChat.value) {
    base.push({ id: 'ai', label: labels.ai_chat, icon: 'Sparkles' })
  }

  // Append plugin sidebar panels
  if (pluginRegistry?.sidebarPanels.value) {
    for (const panel of pluginRegistry.sidebarPanels.value) {
      base.push({ id: panel.id, label: panel.label, icon: panel.icon })
    }
  }

  return base
})

const activeTab = ref('blocks')

// Auto-switch to properties when a node is newly selected
watch(
  () => selection.selectedNodeId.value,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      activeTab.value = 'properties'
    }
  },
)

function switchTab(tabId: string) {
  activeTab.value = tabId
}

// ─── Resizable sidebar ───
const MIN_WIDTH = 260
const MAX_WIDTH = 600
const sidebarWidth = ref(300)
const isResizing = ref(false)

function onResizeStart(e: PointerEvent) {
  e.preventDefault()
  isResizing.value = true
  const startX = e.clientX
  const startWidth = sidebarWidth.value

  function onPointerMove(ev: PointerEvent) {
    // Sidebar is on the right, so moving left = wider
    const delta = startX - ev.clientX
    sidebarWidth.value = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + delta))
  }

  function onPointerUp() {
    isResizing.value = false
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
  }

  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
}

onBeforeUnmount(() => {
  isResizing.value = false
})
</script>

<template>
  <div
    class="ebb-sidebar"
    :class="{ 'ebb-sidebar--resizing': isResizing }"
    :style="{ width: sidebarWidth + 'px' }"
    role="region"
    aria-label="Sidebar"
  >
    <!-- Resize handle -->
    <div class="ebb-sidebar__resize-handle" @pointerdown="onResizeStart"></div>

    <!-- Tab buttons -->
    <div class="ebb-sidebar__tabs" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :id="`ebb-tab-${tab.id}`"
        class="ebb-sidebar__tab"
        :class="{
          'ebb-sidebar__tab--active': activeTab === tab.id,
          'ebb-sidebar__tab--ai': tab.id === 'ai',
        }"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`ebb-tabpanel-${tab.id}`"
        @click="switchTab(tab.id)"
      >
        <EIcon :name="tab.icon" :size="16" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab content -->
    <div class="ebb-sidebar__content">
      <div id="ebb-tabpanel-blocks" role="tabpanel" aria-labelledby="ebb-tab-blocks" :hidden="activeTab !== 'blocks'">
        <BlocksPanel v-show="activeTab === 'blocks'" />
      </div>
      <div id="ebb-tabpanel-properties" role="tabpanel" aria-labelledby="ebb-tab-properties" :hidden="activeTab !== 'properties'">
        <PropertiesPanel v-show="activeTab === 'properties'" />
      </div>
      <div id="ebb-tabpanel-layers" role="tabpanel" aria-labelledby="ebb-tab-layers" :hidden="activeTab !== 'layers'">
        <LayersPanel v-show="activeTab === 'layers'" />
      </div>
      <div v-if="hasAiChat" id="ebb-tabpanel-ai" role="tabpanel" aria-labelledby="ebb-tab-ai" :hidden="activeTab !== 'ai'">
        <AiChatPanel v-show="activeTab === 'ai'" />
      </div>
      <!-- Plugin sidebar panels -->
      <template v-if="pluginRegistry?.sidebarPanels.value">
        <div
          v-for="panel in pluginRegistry.sidebarPanels.value"
          :key="panel.id"
          :id="`ebb-tabpanel-${panel.id}`"
          role="tabpanel"
          :aria-labelledby="`ebb-tab-${panel.id}`"
          :hidden="activeTab !== panel.id"
        >
          <component :is="panel.component" v-show="activeTab === panel.id" />
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.ebb-sidebar {
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-left: 1px solid #e5e7eb;
}

.ebb-sidebar--resizing {
  user-select: none;
}

html[data-theme='dark'] .ebb-sidebar {
  background: #1f2937;
  border-left-color: #374151;
}

/* ─── Resize handle ─── */
.ebb-sidebar__resize-handle {
  position: absolute;
  top: 0;
  left: -3px;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  z-index: 10;
}

.ebb-sidebar__resize-handle:hover,
.ebb-sidebar--resizing .ebb-sidebar__resize-handle {
  background: var(--ee-primary);
  opacity: 0.4;
}

.ebb-sidebar__tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

html[data-theme='dark'] .ebb-sidebar__tabs {
  border-bottom-color: #374151;
}

.ebb-sidebar__tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 0;
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ebb-sidebar__tab:hover {
  color: #374151;
  background: #f9fafb;
}

html[data-theme='dark'] .ebb-sidebar__tab:hover {
  color: #d1d5db;
  background: #111827;
}

.ebb-sidebar__tab--active {
  color: var(--ee-primary);
  border-bottom-color: var(--ee-primary);
}

.ebb-sidebar__tab--active:hover {
  color: var(--ee-primary);
}

.ebb-sidebar__content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.ebb-sidebar__content > [role="tabpanel"] {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.ebb-sidebar__content > [role="tabpanel"][hidden] {
  display: none;
}

.ebb-sidebar__content::-webkit-scrollbar {
  width: 4px;
}

.ebb-sidebar__content::-webkit-scrollbar-track {
  background: transparent;
}

.ebb-sidebar__content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}
</style>
