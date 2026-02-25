<script setup lang="ts">
import { computed, inject } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_DOCUMENT_KEY, EMAIL_SELECTION_KEY } from '../../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS, type EditorLabels } from '../../labels'
import { findNode, findParent } from '../../utils/tree'
import { getNodeTypeLabelKey } from '../../properties/property-definitions'

const props = defineProps<{
  selectedRect: DOMRect | null
  hoveredRect: DOMRect | null
  selectedNodeId: string | null
  hoveredNodeId: string | null
  dropIndicatorRect: DOMRect | null
  dropIndicatorPosition: 'before' | 'after' | 'inside'
  isDragging: boolean
}>()

const doc = inject(EMAIL_DOCUMENT_KEY)!
const selection = inject(EMAIL_SELECTION_KEY)!
const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)

function resolveLabel(key: string): string {
  return (labels as EditorLabels)[key as keyof EditorLabels] ?? key
}

const selectedNodeType = computed(() => {
  if (!props.selectedNodeId) return ''
  const node = findNode(doc.document.value.body, props.selectedNodeId)
  return node ? resolveLabel(getNodeTypeLabelKey(node.type)) : ''
})

const canSelectParent = computed(() => {
  const path = selection.selectedNodePath.value
  // Don't allow selecting mj-body (path[0])
  return path.length >= 3 // [body, section, column] → can select section
})

function onSelectParent() {
  selection.selectParent()
}

function onDelete() {
  if (!props.selectedNodeId) return
  doc.deleteNode(props.selectedNodeId)
  selection.clearSelection()
}

function onDuplicate() {
  if (!props.selectedNodeId) return
  doc.duplicateNode(props.selectedNodeId)
}

const canMoveUp = computed(() => {
  if (!props.selectedNodeId) return false
  const parent = findParent(doc.document.value.body, props.selectedNodeId)
  if (!parent) return false
  const idx = parent.children.findIndex((c) => c.id === props.selectedNodeId)
  return idx > 0
})

const canMoveDown = computed(() => {
  if (!props.selectedNodeId) return false
  const parent = findParent(doc.document.value.body, props.selectedNodeId)
  if (!parent) return false
  const idx = parent.children.findIndex((c) => c.id === props.selectedNodeId)
  return idx >= 0 && idx < parent.children.length - 1
})

function onMoveUp() {
  if (!props.selectedNodeId) return
  doc.moveNodeUp(props.selectedNodeId)
}

function onMoveDown() {
  if (!props.selectedNodeId) return
  doc.moveNodeDown(props.selectedNodeId)
}

const dropIndicatorStyle = computed(() => {
  const rect = props.dropIndicatorRect
  if (!rect) return {} as Record<string, string>
  const pos = props.dropIndicatorPosition
  if (pos === 'inside') {
    return {
      top: rect.top + 'px',
      left: rect.left + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      borderRadius: '4px',
    }
  }
  const y = pos === 'before' ? rect.top : rect.top + rect.height
  return {
    top: y - 1 + 'px',
    left: rect.left + 'px',
    width: rect.width + 'px',
    height: '2px',
  }
})
</script>

<template>
  <div class="ebb-overlay" aria-hidden="true">
    <!-- Hover outline -->
    <div
      v-if="hoveredRect && hoveredNodeId && hoveredNodeId !== selectedNodeId"
      class="ebb-overlay__hover"
      :style="{
        top: hoveredRect.top + 'px',
        left: hoveredRect.left + 'px',
        width: hoveredRect.width + 'px',
        height: hoveredRect.height + 'px',
      }"
    ></div>

    <!-- Selection outline + toolbar -->
    <div
      v-if="selectedRect && selectedNodeId"
      class="ebb-overlay__selection"
      :style="{
        top: selectedRect.top + 'px',
        left: selectedRect.left + 'px',
        width: selectedRect.width + 'px',
        height: selectedRect.height + 'px',
      }"
    >
      <!-- Node toolbar -->
      <div class="ebb-overlay__toolbar" role="toolbar" :aria-label="selectedNodeType">
        <button v-if="canSelectParent" class="ebb-overlay__btn" :title="resolveLabel('select_parent')" :aria-label="resolveLabel('select_parent')" @click.stop="onSelectParent">
          <EIcon name="ArrowUp" :size="12" />
        </button>
        <span class="ebb-overlay__label">{{ selectedNodeType }}</span>
        <span class="ebb-overlay__sep"></span>
        <button v-if="canMoveUp" class="ebb-overlay__btn" :title="resolveLabel('move_up')" :aria-label="resolveLabel('move_up')" @click.stop="onMoveUp">
          <EIcon name="ChevronUp" :size="12" />
        </button>
        <button v-if="canMoveDown" class="ebb-overlay__btn" :title="resolveLabel('move_down')" :aria-label="resolveLabel('move_down')" @click.stop="onMoveDown">
          <EIcon name="ChevronDown" :size="12" />
        </button>
        <span class="ebb-overlay__sep"></span>
        <button class="ebb-overlay__btn" :title="resolveLabel('duplicate_node')" :aria-label="resolveLabel('duplicate_node')" @click.stop="onDuplicate">
          <EIcon name="Copy" :size="12" />
        </button>
        <button class="ebb-overlay__btn ebb-overlay__btn--danger" :title="resolveLabel('delete_node')" :aria-label="resolveLabel('delete_node')" @click.stop="onDelete">
          <EIcon name="Trash2" :size="12" />
        </button>
      </div>
    </div>

    <!-- Drop indicator line -->
    <div
      v-if="isDragging && dropIndicatorRect"
      class="ebb-overlay__drop-indicator"
      :style="dropIndicatorStyle"
    >
      <div v-if="dropIndicatorPosition !== 'inside'" class="ebb-overlay__drop-indicator-dot ebb-overlay__drop-indicator-dot--left"></div>
      <div v-if="dropIndicatorPosition !== 'inside'" class="ebb-overlay__drop-indicator-dot ebb-overlay__drop-indicator-dot--right"></div>
    </div>

    <!-- Drag active zone highlight -->
    <div
      v-if="isDragging"
      class="ebb-overlay__drag-active"
    ></div>
  </div>
</template>

<style>
.ebb-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.ebb-overlay__hover {
  position: absolute;
  border: 1px dashed color-mix(in srgb, var(--ee-hover) 40%, transparent);
  pointer-events: none;
  transition: all 0.1s ease;
}

.ebb-overlay__selection {
  position: absolute;
  border: 2px solid var(--ee-selection);
  pointer-events: none;
}

.ebb-overlay__toolbar {
  position: absolute;
  top: -28px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 2px;
  background: var(--ee-primary);
  border-radius: 4px;
  padding: 2px 4px;
  pointer-events: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.ebb-overlay__label {
  font-size: 10px;
  font-weight: 600;
  color: #ffffff;
  padding: 0 4px;
  white-space: nowrap;
}

.ebb-overlay__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.1s ease;
}

.ebb-overlay__btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.ebb-overlay__btn--danger:hover {
  background: rgba(255, 0, 0, 0.3);
}

.ebb-overlay__sep {
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.25);
  margin: 0 2px;
}

.ebb-overlay__drop-indicator {
  position: absolute;
  background: var(--ee-drop-indicator);
  pointer-events: none;
  z-index: 10;
  transition: top 0.08s ease, left 0.08s ease, width 0.08s ease;
  box-shadow: 0 0 8px rgba(1, 168, 171, 0.4);
}

.ebb-overlay__drop-indicator-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--ee-drop-indicator);
  border: 2px solid #ffffff;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.ebb-overlay__drop-indicator-dot--left {
  left: -4px;
}

.ebb-overlay__drop-indicator-dot--right {
  right: -4px;
}

.ebb-overlay__drag-active {
  position: absolute;
  inset: 0;
  border: 2px dashed rgba(1, 168, 171, 0.25);
  border-radius: 4px;
  pointer-events: none;
  animation: ebb-drag-pulse 1.5s ease-in-out infinite;
}

@keyframes ebb-drag-pulse {
  0%, 100% { border-color: rgba(1, 168, 171, 0.15); }
  50% { border-color: rgba(1, 168, 171, 0.35); }
}
</style>
