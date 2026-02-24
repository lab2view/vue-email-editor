<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_EDITOR_CONFIG_KEY } from '../../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS } from '../../labels'
import { getBlocksByCategory } from '../../blocks/block-definitions'
import BlockCategory from './blocks/BlockCategory.vue'
import TemplatesPanel from './TemplatesPanel.vue'

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const config = inject(EMAIL_EDITOR_CONFIG_KEY)!
const searchQuery = ref('')
const showTemplates = ref(false)

const categories = computed(() => {
  const vars = config.variables?.value ?? []
  const all = getBlocksByCategory(vars)

  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return all

  return all
    .map((cat) => ({
      ...cat,
      blocks: cat.blocks.filter((b) => b.label.toLowerCase().includes(q)),
    }))
    .filter((cat) => cat.blocks.length > 0)
})

function onTemplateApplied() {
  showTemplates.value = false
}
</script>

<template>
  <div class="ebb-blocks-panel">
    <!-- Search -->
    <div class="ebb-blocks-panel__search">
      <EIcon name="Search" :size="14" />
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="labels.search_blocks"
        class="ebb-blocks-panel__search-input"
      />
      <button
        v-if="searchQuery"
        class="ebb-blocks-panel__search-clear"
        @click="searchQuery = ''"
      >
        <EIcon name="X" :size="12" />
      </button>
    </div>

    <!-- Starter templates (collapsible) -->
    <div class="ebb-blocks-panel__templates">
      <button class="ebb-blocks-panel__templates-toggle" @click="showTemplates = !showTemplates">
        <EIcon :name="showTemplates ? 'ChevronDown' : 'ChevronRight'" :size="14" />
        <EIcon name="LayoutTemplate" :size="14" />
        <span>Modèles de départ</span>
      </button>
      <TemplatesPanel v-if="showTemplates" @applied="onTemplateApplied" />
    </div>

    <!-- Block categories -->
    <div class="ebb-blocks-panel__list">
      <BlockCategory
        v-for="cat in categories"
        :key="cat.category"
        :label="cat.label"
        :icon="cat.icon"
        :blocks="cat.blocks"
        :columns="cat.category === 'content' ? 3 : 2"
      />

      <!-- Empty search state -->
      <div v-if="categories.length === 0 && searchQuery" class="ebb-blocks-panel__empty">
        <EIcon name="SearchX" :size="24" />
        <p>Aucun bloc trouvé pour "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>

<style>
.ebb-blocks-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ebb-blocks-panel__search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin: 8px 12px;
  background: #f3f4f6;
  border-radius: 8px;
  color: #9ca3af;
  flex-shrink: 0;
}

html[data-theme='dark'] .ebb-blocks-panel__search {
  background: #111827;
}

.ebb-blocks-panel__search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 12px;
  color: #374151;
  outline: none;
}

html[data-theme='dark'] .ebb-blocks-panel__search-input {
  color: #d1d5db;
}

.ebb-blocks-panel__search-input::placeholder {
  color: #9ca3af;
}

.ebb-blocks-panel__search-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  background: #d1d5db;
  color: #ffffff;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}

html[data-theme='dark'] .ebb-blocks-panel__search-clear {
  background: #4b5563;
}

.ebb-blocks-panel__list {
  flex: 1;
  overflow-y: auto;
  mask-image: linear-gradient(to bottom, black calc(100% - 24px), transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 24px), transparent 100%);
}

.ebb-blocks-panel__list::-webkit-scrollbar {
  width: 4px;
}

.ebb-blocks-panel__list::-webkit-scrollbar-track {
  background: transparent;
}

.ebb-blocks-panel__list::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

html[data-theme='dark'] .ebb-blocks-panel__list::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.ebb-blocks-panel__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 20px;
  color: #9ca3af;
  text-align: center;
}

.ebb-blocks-panel__empty p {
  font-size: 12px;
  margin: 0;
}

.ebb-blocks-panel__templates {
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 4px;
}

html[data-theme='dark'] .ebb-blocks-panel__templates {
  border-bottom-color: #374151;
}

.ebb-blocks-panel__templates-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}

html[data-theme='dark'] .ebb-blocks-panel__templates-toggle {
  color: #d1d5db;
}

.ebb-blocks-panel__templates-toggle:hover {
  background: #f9fafb;
}

html[data-theme='dark'] .ebb-blocks-panel__templates-toggle:hover {
  background: #111827;
}
</style>
