<script setup lang="ts">
import { ref } from 'vue'
import EIcon from '../../internal/EIcon.vue'
import type { BlockDefinition } from '../../../types'
import BlockCard from './BlockCard.vue'

const props = defineProps<{
  label: string
  icon: string
  blocks: BlockDefinition[]
  /** Force 2-column grid (for categories with long labels like composites) */
  columns?: 2 | 3
}>()

const isExpanded = ref(true)
</script>

<template>
  <div class="ebb-block-category">
    <button class="ebb-block-category__header" @click="isExpanded = !isExpanded">
      <EIcon :name="icon" :size="14" />
      <span class="ebb-block-category__label">{{ label }}</span>
      <span class="ebb-block-category__count">{{ blocks.length }}</span>
      <EIcon
        :name="isExpanded ? 'ChevronDown' : 'ChevronRight'"
        :size="14"
        class="ebb-block-category__chevron"
      />
    </button>
    <div
      v-show="isExpanded"
      class="ebb-block-category__grid"
      :class="{ 'ebb-block-category__grid--2col': props.columns === 2 }"
    >
      <BlockCard v-for="block in blocks" :key="block.id" :block="block" />
    </div>
  </div>
</template>

<style>
.ebb-block-category {
  border-bottom: 1px solid #e5e7eb;
}

html[data-theme='dark'] .ebb-block-category {
  border-color: #374151;
}

.ebb-block-category__header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: #fafafa;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  transition: background 0.1s ease;
}

html[data-theme='dark'] .ebb-block-category__header {
  color: #d1d5db;
  background: #111827;
}

.ebb-block-category__header:hover {
  background: #f3f4f6;
}

html[data-theme='dark'] .ebb-block-category__header:hover {
  background: #1f2937;
}

.ebb-block-category__label {
  flex: 1;
  text-align: left;
}

.ebb-block-category__count {
  font-size: 10px;
  font-weight: 500;
  color: #9ca3af;
  background: #f3f4f6;
  border-radius: 10px;
  padding: 1px 7px;
}

html[data-theme='dark'] .ebb-block-category__count {
  background: #1f2937;
}

.ebb-block-category__chevron {
  color: #9ca3af;
}

.ebb-block-category__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  padding: 8px 10px 10px;
}

.ebb-block-category__grid--2col {
  grid-template-columns: repeat(2, 1fr);
}
</style>
