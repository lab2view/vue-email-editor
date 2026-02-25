<script setup lang="ts">
import { ref, inject, watch } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_SELECTION_KEY } from '../../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS } from '../../labels'
import BlocksPanel from './BlocksPanel.vue'
import PropertiesPanel from './PropertiesPanel.vue'
import LayersPanel from './LayersPanel.vue'

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const selection = inject(EMAIL_SELECTION_KEY)!

const activeTab = ref<'blocks' | 'properties' | 'layers'>('blocks')

// Auto-switch to properties when a node is newly selected (not on explicit tab click)
watch(
  () => selection.selectedNodeId.value,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      activeTab.value = 'properties'
    }
  },
)

function switchTab(tab: 'blocks' | 'properties' | 'layers') {
  activeTab.value = tab
}
</script>

<template>
  <div class="ebb-sidebar" role="region" aria-label="Sidebar">
    <!-- Tab buttons -->
    <div class="ebb-sidebar__tabs" role="tablist">
      <button
        id="ebb-tab-blocks"
        class="ebb-sidebar__tab"
        :class="{ 'ebb-sidebar__tab--active': activeTab === 'blocks' }"
        role="tab"
        :aria-selected="activeTab === 'blocks'"
        aria-controls="ebb-tabpanel-blocks"
        @click="switchTab('blocks')"
      >
        <EIcon name="LayoutGrid" :size="16" />
        <span>{{ labels.blocks }}</span>
      </button>
      <button
        id="ebb-tab-properties"
        class="ebb-sidebar__tab"
        :class="{ 'ebb-sidebar__tab--active': activeTab === 'properties' }"
        role="tab"
        :aria-selected="activeTab === 'properties'"
        aria-controls="ebb-tabpanel-properties"
        @click="switchTab('properties')"
      >
        <EIcon name="Paintbrush" :size="16" />
        <span>{{ labels.styles }}</span>
      </button>
      <button
        id="ebb-tab-layers"
        class="ebb-sidebar__tab"
        :class="{ 'ebb-sidebar__tab--active': activeTab === 'layers' }"
        role="tab"
        :aria-selected="activeTab === 'layers'"
        aria-controls="ebb-tabpanel-layers"
        @click="switchTab('layers')"
      >
        <EIcon name="Layers" :size="16" />
        <span>{{ labels.layers }}</span>
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
    </div>
  </div>
</template>

<style>
.ebb-sidebar {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-left: 1px solid #e5e7eb;
}

html[data-theme='dark'] .ebb-sidebar {
  background: #1f2937;
  border-left-color: #374151;
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
