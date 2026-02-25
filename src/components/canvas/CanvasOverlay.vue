<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_DOCUMENT_KEY, EMAIL_SELECTION_KEY, EMAIL_DRAG_DROP_KEY, EMAIL_EDITOR_CONFIG_KEY } from '../../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS, type EditorLabels } from '../../labels'
import type { ConditionalRule } from '../../types'
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
const dragDrop = inject(EMAIL_DRAG_DROP_KEY)!
const config = inject(EMAIL_EDITOR_CONFIG_KEY, undefined)
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

function onDragHandleStart(e: DragEvent) {
  if (!props.selectedNodeId || !e.dataTransfer) return
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', props.selectedNodeId)

  // Ghost preview for canvas drag
  const ghost = document.createElement('div')
  ghost.style.cssText = 'position:fixed;top:-9999px;left:-9999px;display:flex;align-items:center;gap:6px;padding:6px 12px;background:#01A8AB;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.2);font-size:11px;font-weight:600;color:#fff;white-space:nowrap;z-index:9999;pointer-events:none;'
  ghost.textContent = selectedNodeType.value
  document.body.appendChild(ghost)
  e.dataTransfer.setDragImage(ghost, 0, 0)
  requestAnimationFrame(() => document.body.removeChild(ghost))

  dragDrop.startDrag({ type: 'existing-node', nodeId: props.selectedNodeId })
}

function onDragHandleEnd() {
  dragDrop.endDrag()
}

// ─── Conditional Content ───

const showConditionPanel = ref(false)
const mergeTags = computed(() => config?.mergeTags ?? [])
const hasMergeTags = computed(() => mergeTags.value.length > 0)

const selectedNodeCondition = computed(() => {
  if (!props.selectedNodeId) return undefined
  const node = findNode(doc.document.value.body, props.selectedNodeId)
  return node?.condition
})

const hasCondition = computed(() => !!selectedNodeCondition.value)

function toggleConditionPanel() {
  showConditionPanel.value = !showConditionPanel.value
}

function addCondition() {
  if (!props.selectedNodeId || mergeTags.value.length === 0) return
  const firstTag = mergeTags.value[0]
  doc.updateNodeCondition(props.selectedNodeId, {
    variable: firstTag.value,
    operator: 'exists',
  })
}

function updateCondition(updates: Partial<ConditionalRule>) {
  if (!props.selectedNodeId || !selectedNodeCondition.value) return
  doc.updateNodeCondition(props.selectedNodeId, {
    ...selectedNodeCondition.value,
    ...updates,
  })
}

function removeCondition() {
  if (!props.selectedNodeId) return
  doc.updateNodeCondition(props.selectedNodeId, undefined)
  showConditionPanel.value = false
}

const OPERATORS: Array<{ value: ConditionalRule['operator']; labelKey: string }> = [
  { value: 'equals', labelKey: 'condition_equals' },
  { value: 'not_equals', labelKey: 'condition_not_equals' },
  { value: 'contains', labelKey: 'condition_contains' },
  { value: 'not_contains', labelKey: 'condition_not_contains' },
  { value: 'exists', labelKey: 'condition_exists' },
  { value: 'not_exists', labelKey: 'condition_not_exists' },
]

const needsValue = computed(() => {
  const op = selectedNodeCondition.value?.operator
  return op !== 'exists' && op !== 'not_exists'
})

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
        <div
          class="ebb-overlay__btn ebb-overlay__drag-handle"
          draggable="true"
          title="Drag to reorder"
          @dragstart="onDragHandleStart"
          @dragend="onDragHandleEnd"
        >
          <EIcon name="GripVertical" :size="12" />
        </div>
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
        <button
          v-if="hasMergeTags"
          class="ebb-overlay__btn"
          :class="{ 'ebb-overlay__btn--condition': hasCondition }"
          :title="hasCondition ? resolveLabel('condition_active') : resolveLabel('condition_add')"
          :aria-label="resolveLabel('condition')"
          @click.stop="hasMergeTags && (hasCondition ? toggleConditionPanel() : addCondition())"
        >
          <EIcon name="Filter" :size="12" />
        </button>
        <button class="ebb-overlay__btn ebb-overlay__btn--danger" :title="resolveLabel('delete_node')" :aria-label="resolveLabel('delete_node')" @click.stop="onDelete">
          <EIcon name="Trash2" :size="12" />
        </button>
      </div>

      <!-- Condition panel popover -->
      <div v-if="showConditionPanel && hasCondition && selectedNodeCondition" class="ebb-condition-panel" @mousedown.stop>
        <div class="ebb-condition-panel__header">
          <EIcon name="Filter" :size="12" />
          <span>{{ resolveLabel('condition') }}</span>
          <button class="ebb-condition-panel__close" @click.stop="showConditionPanel = false">
            <EIcon name="X" :size="10" />
          </button>
        </div>
        <div class="ebb-condition-panel__body">
          <label class="ebb-condition-panel__label">{{ resolveLabel('condition_variable') }}</label>
          <select
            class="ebb-condition-panel__select"
            :value="selectedNodeCondition.variable"
            @change="updateCondition({ variable: ($event.target as HTMLSelectElement).value })"
          >
            <option v-for="tag in mergeTags" :key="tag.value" :value="tag.value">{{ tag.name }}</option>
          </select>
          <label class="ebb-condition-panel__label">{{ resolveLabel('condition_operator') }}</label>
          <select
            class="ebb-condition-panel__select"
            :value="selectedNodeCondition.operator"
            @change="updateCondition({ operator: ($event.target as HTMLSelectElement).value as ConditionalRule['operator'] })"
          >
            <option v-for="op in OPERATORS" :key="op.value" :value="op.value">{{ resolveLabel(op.labelKey) }}</option>
          </select>
          <template v-if="needsValue">
            <label class="ebb-condition-panel__label">{{ resolveLabel('condition_value') }}</label>
            <input
              class="ebb-condition-panel__input"
              type="text"
              :value="selectedNodeCondition.value || ''"
              :placeholder="resolveLabel('condition_value')"
              @input="updateCondition({ value: ($event.target as HTMLInputElement).value })"
            />
          </template>
        </div>
        <button class="ebb-condition-panel__remove" @click.stop="removeCondition">
          <EIcon name="Trash2" :size="10" />
          {{ resolveLabel('condition_remove') }}
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

.ebb-overlay__drag-handle {
  cursor: grab;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  padding-right: 4px;
  margin-right: 2px;
}

.ebb-overlay__drag-handle:active {
  cursor: grabbing;
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
  transition: top 0.1s ease-out, left 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out;
  box-shadow: 0 0 10px rgba(1, 168, 171, 0.5), 0 0 20px rgba(1, 168, 171, 0.2);
  animation: ebb-drop-glow 1s ease-in-out infinite;
}

@keyframes ebb-drop-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(1, 168, 171, 0.4), 0 0 16px rgba(1, 168, 171, 0.15); }
  50% { box-shadow: 0 0 12px rgba(1, 168, 171, 0.6), 0 0 24px rgba(1, 168, 171, 0.3); }
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

/* ─── Condition Button & Panel ─── */
.ebb-overlay__btn--condition {
  background: rgba(251, 191, 36, 0.3);
  color: #fbbf24;
}

.ebb-condition-panel {
  position: absolute;
  top: -28px;
  right: 0;
  transform: translateY(-100%);
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  min-width: 220px;
  pointer-events: auto;
  z-index: 20;
}

.ebb-condition-panel__header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-bottom: 1px solid #374151;
  font-size: 11px;
  font-weight: 600;
  color: #d1d5db;
}

.ebb-condition-panel__close {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 3px;
}

.ebb-condition-panel__close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.ebb-condition-panel__body {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ebb-condition-panel__label {
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ebb-condition-panel__select,
.ebb-condition-panel__input {
  width: 100%;
  padding: 5px 8px;
  font-size: 12px;
  border: 1px solid #374151;
  border-radius: 4px;
  background: #111827;
  color: #d1d5db;
  outline: none;
}

.ebb-condition-panel__select:focus,
.ebb-condition-panel__input:focus {
  border-color: var(--ee-primary, #01A8AB);
}

.ebb-condition-panel__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  padding: 6px;
  border: none;
  border-top: 1px solid #374151;
  background: transparent;
  color: #ef4444;
  font-size: 11px;
  cursor: pointer;
  border-radius: 0 0 8px 8px;
}

.ebb-condition-panel__remove:hover {
  background: rgba(239, 68, 68, 0.1);
}
</style>
