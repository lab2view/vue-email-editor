<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import type { BlockDefinition } from '../../../types'
import { EMAIL_DRAG_DROP_KEY } from '../../../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS, type EditorLabels } from '../../../labels'
import BlockPreview from './BlockPreview.vue'

const props = defineProps<{ block: BlockDefinition }>()
const dragDrop = inject(EMAIL_DRAG_DROP_KEY)!
const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)

const displayLabel = computed(() =>
  (labels as EditorLabels)[props.block.label as keyof EditorLabels] ?? props.block.label
)
const isDragging = ref(false)

function onDragStart(e: DragEvent) {
  if (!e.dataTransfer) return
  e.dataTransfer.effectAllowed = 'copy'
  e.dataTransfer.setData('text/plain', props.block.id)

  // Create a custom ghost preview
  const ghost = document.createElement('div')
  ghost.style.cssText = 'position:fixed;top:-9999px;left:-9999px;display:flex;align-items:center;gap:8px;padding:8px 14px;background:#fff;border:2px solid #01A8AB;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.15);font-size:12px;font-weight:600;color:#1f2937;white-space:nowrap;z-index:9999;pointer-events:none;'
  ghost.textContent = displayLabel.value
  document.body.appendChild(ghost)
  e.dataTransfer.setDragImage(ghost, 0, 0)
  // Clean up ghost after a tick
  requestAnimationFrame(() => document.body.removeChild(ghost))

  dragDrop.startDrag({ type: 'new-block', block: props.block })
  isDragging.value = true
}

function onDragEnd() {
  dragDrop.endDrag()
  isDragging.value = false
}
</script>

<template>
  <div
    class="ebb-block-card"
    :class="{ 'ebb-block-card--dragging': isDragging }"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <div class="ebb-block-card__preview">
      <BlockPreview :block-id="block.id" />
    </div>
    <span class="ebb-block-card__label" :title="displayLabel">{{ displayLabel }}</span>
  </div>
</template>

<style>
.ebb-block-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 4px 5px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: grab;
  transition: all 0.15s ease;
  background: #ffffff;
}

html[data-theme='dark'] .ebb-block-card {
  border-color: #374151;
  background: #1f2937;
}

.ebb-block-card:hover {
  border-color: var(--ee-primary);
  background: #f0fdfd;
  box-shadow: 0 2px 8px rgba(1, 168, 171, 0.1);
}

html[data-theme='dark'] .ebb-block-card:hover {
  background: #0d3d3e;
}

.ebb-block-card:active {
  cursor: grabbing;
  transform: scale(0.96);
}

.ebb-block-card--dragging {
  opacity: 0.4;
  border-color: var(--ee-primary);
  background: rgba(1, 168, 171, 0.05);
  transform: scale(0.95);
}

.ebb-block-card__preview {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  background: #f9fafb;
}

html[data-theme='dark'] .ebb-block-card__preview {
  background: #111827;
}

.ebb-block-card__label {
  font-size: 10px;
  font-weight: 500;
  color: #374151;
  text-align: center;
  line-height: 1.2;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

html[data-theme='dark'] .ebb-block-card__label {
  color: #d1d5db;
}
</style>
