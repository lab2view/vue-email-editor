<script setup lang="ts">
/**
 * LayersPanel — Displays the document structure as an interactive tree.
 * Users can click to select, expand/collapse sections, and delete nodes.
 */
import { inject, computed, ref } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS, type EditorLabels } from '../../labels'
import { EMAIL_DOCUMENT_KEY, EMAIL_SELECTION_KEY } from '../../injection-keys'
import { getNodeTypeLabelKey } from '../../properties/property-definitions'
import type { EmailNode } from '../../types'

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const doc = inject(EMAIL_DOCUMENT_KEY)!
const selection = inject(EMAIL_SELECTION_KEY)!

function resolveLabel(key: string): string {
  return (labels as EditorLabels)[key as keyof EditorLabels] ?? key
}

const body = computed(() => doc.document.value.body)

// Track which nodes are collapsed
const collapsed = ref<Set<string>>(new Set())

function toggle(nodeId: string) {
  const s = new Set(collapsed.value)
  if (s.has(nodeId)) s.delete(nodeId)
  else s.add(nodeId)
  collapsed.value = s
}

function selectNode(nodeId: string, event: MouseEvent) {
  event.stopPropagation()
  selection.selectNode(nodeId)
}

function onDeleteNode(nodeId: string, event: MouseEvent) {
  event.stopPropagation()
  doc.deleteNode(nodeId)
  if (selection.selectedNodeId.value === nodeId) {
    selection.clearSelection()
  }
}

function onMoveUp(nodeId: string, event: MouseEvent) {
  event.stopPropagation()
  doc.moveNodeUp(nodeId)
}

function onMoveDown(nodeId: string, event: MouseEvent) {
  event.stopPropagation()
  doc.moveNodeDown(nodeId)
}

function isFirst(nodeId: string, siblings: EmailNode[]): boolean {
  return siblings.length > 0 && siblings[0].id === nodeId
}

function isLast(nodeId: string, siblings: EmailNode[]): boolean {
  return siblings.length > 0 && siblings[siblings.length - 1].id === nodeId
}

function getIcon(type: string): string {
  const icons: Record<string, string> = {
    'mj-body': 'FileText',
    'mj-section': 'Rows3',
    'mj-column': 'Columns2',
    'mj-text': 'Type',
    'mj-image': 'Image',
    'mj-button': 'MousePointer',
    'mj-divider': 'Minus',
    'mj-spacer': 'Space',
    'mj-social': 'Share2',
    'mj-social-element': 'Globe',
    'mj-hero': 'Star',
    'mj-raw': 'Code',
    'mj-wrapper': 'Box',
  }
  return icons[type] || 'Square'
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    'mj-section': '#6366f1',
    'mj-column': '#8b5cf6',
    'mj-text': '#059669',
    'mj-image': '#d97706',
    'mj-button': '#0ea5e9',
    'mj-divider': '#9ca3af',
    'mj-spacer': '#9ca3af',
    'mj-social': '#ec4899',
    'mj-hero': '#7c3aed',
  }
  return colors[type] || '#6b7280'
}

function getShortLabel(node: EmailNode): string {
  const base = resolveLabel(getNodeTypeLabelKey(node.type))
  // For text, show a snippet
  if (node.type === 'mj-text' && node.htmlContent) {
    const text = node.htmlContent.replace(/<[^>]+>/g, '').trim()
    if (text.length > 20) return text.substring(0, 20) + '…'
    if (text) return text
  }
  // For image, show alt text
  if (node.type === 'mj-image' && node.attributes.alt) {
    return node.attributes.alt
  }
  // For button, show text
  if (node.type === 'mj-button' && node.htmlContent) {
    return node.htmlContent.replace(/<[^>]+>/g, '').trim() || base
  }
  return base
}
</script>

<template>
  <div class="ebb-layers">
    <div class="ebb-layers__header">
      <EIcon name="Layers" :size="13" />
      <span>{{ labels.layers }}</span>
      <span class="ebb-layers__count">{{ body.children.length }}</span>
    </div>

    <!-- Recursive tree -->
    <div class="ebb-layers__tree" role="tree" :aria-label="labels.layers">
      <template v-for="(section, si) in body.children" :key="section.id">
        <!-- Section row -->
        <div
          class="ebb-layers__node"
          :class="{
            'ebb-layers__node--selected': selection.selectedNodeId.value === section.id,
            'ebb-layers__node--hovered': selection.hoveredNodeId.value === section.id,
          }"
          role="treeitem"
          :aria-expanded="section.children.length ? !collapsed.has(section.id) : undefined"
          :aria-selected="selection.selectedNodeId.value === section.id"
          @click="selectNode(section.id, $event)"
          @mouseenter="selection.hoverNode(section.id)"
          @mouseleave="selection.hoverNode(null)"
        >
          <button
            v-if="section.children.length"
            class="ebb-layers__toggle"
            @click.stop="toggle(section.id)"
          >
            <EIcon :name="collapsed.has(section.id) ? 'ChevronRight' : 'ChevronDown'" :size="10" />
          </button>
          <span v-else class="ebb-layers__toggle-spacer"></span>
          <span class="ebb-layers__icon" :style="{ color: getTypeColor(section.type) }">
            <EIcon :name="getIcon(section.type)" :size="12" />
          </span>
          <span class="ebb-layers__label">{{ resolveLabel('section_label') }} {{ si + 1 }}</span>
          <div class="ebb-layers__actions">
            <button
              v-if="!isFirst(section.id, body.children)"
              class="ebb-layers__action-btn"
              :title="resolveLabel('move_up')"
              @click="onMoveUp(section.id, $event)"
            >
              <EIcon name="ChevronUp" :size="10" />
            </button>
            <button
              v-if="!isLast(section.id, body.children)"
              class="ebb-layers__action-btn"
              :title="resolveLabel('move_down')"
              @click="onMoveDown(section.id, $event)"
            >
              <EIcon name="ChevronDown" :size="10" />
            </button>
            <button
              class="ebb-layers__action-btn ebb-layers__action-btn--danger"
              :title="resolveLabel('delete_node')"
              @click="onDeleteNode(section.id, $event)"
            >
              <EIcon name="Trash2" :size="10" />
            </button>
          </div>
        </div>

        <!-- Column level -->
        <template v-if="!collapsed.has(section.id)">
          <template v-for="(col, ci) in section.children" :key="col.id">
            <div
              class="ebb-layers__node ebb-layers__node--indent-1"
              :class="{
                'ebb-layers__node--selected': selection.selectedNodeId.value === col.id,
                'ebb-layers__node--hovered': selection.hoveredNodeId.value === col.id,
              }"
              role="treeitem"
              :aria-expanded="col.children.length ? !collapsed.has(col.id) : undefined"
              :aria-selected="selection.selectedNodeId.value === col.id"
              @click="selectNode(col.id, $event)"
              @mouseenter="selection.hoverNode(col.id)"
              @mouseleave="selection.hoverNode(null)"
            >
              <button
                v-if="col.children.length"
                class="ebb-layers__toggle"
                @click.stop="toggle(col.id)"
              >
                <EIcon :name="collapsed.has(col.id) ? 'ChevronRight' : 'ChevronDown'" :size="10" />
              </button>
              <span v-else class="ebb-layers__toggle-spacer"></span>
              <span class="ebb-layers__icon" :style="{ color: getTypeColor(col.type) }">
                <EIcon :name="getIcon(col.type)" :size="12" />
              </span>
              <span class="ebb-layers__label">{{ resolveLabel('column_label') }} {{ ci + 1 }}</span>
            </div>

            <!-- Content level -->
            <template v-if="!collapsed.has(col.id)">
              <div
                v-for="content in col.children"
                :key="content.id"
                class="ebb-layers__node ebb-layers__node--indent-2"
                :class="{
                  'ebb-layers__node--selected': selection.selectedNodeId.value === content.id,
                  'ebb-layers__node--hovered': selection.hoveredNodeId.value === content.id,
                }"
                role="treeitem"
                :aria-selected="selection.selectedNodeId.value === content.id"
                @click="selectNode(content.id, $event)"
                @mouseenter="selection.hoverNode(content.id)"
                @mouseleave="selection.hoverNode(null)"
              >
                <span class="ebb-layers__toggle-spacer"></span>
                <span class="ebb-layers__icon" :style="{ color: getTypeColor(content.type) }">
                  <EIcon :name="getIcon(content.type)" :size="12" />
                </span>
                <span class="ebb-layers__label">{{ getShortLabel(content) }}</span>
                <div class="ebb-layers__actions">
                  <button
                    v-if="!isFirst(content.id, col.children)"
                    class="ebb-layers__action-btn"
                    :title="resolveLabel('move_up')"
                    @click="onMoveUp(content.id, $event)"
                  >
                    <EIcon name="ChevronUp" :size="10" />
                  </button>
                  <button
                    v-if="!isLast(content.id, col.children)"
                    class="ebb-layers__action-btn"
                    :title="resolveLabel('move_down')"
                    @click="onMoveDown(content.id, $event)"
                  >
                    <EIcon name="ChevronDown" :size="10" />
                  </button>
                  <button
                    class="ebb-layers__action-btn ebb-layers__action-btn--danger"
                    :title="resolveLabel('delete_node')"
                    @click="onDeleteNode(content.id, $event)"
                  >
                    <EIcon name="Trash2" :size="10" />
                  </button>
                </div>
              </div>
            </template>
          </template>
        </template>
      </template>
    </div>

    <!-- Empty state -->
    <div v-if="body.children.length === 0" class="ebb-layers__empty">
      <EIcon name="Layers" :size="24" color="#d1d5db" />
      <p>{{ resolveLabel('empty_canvas_hint') }}</p>
    </div>
  </div>
</template>

<style>
.ebb-layers {
  padding: 0;
}

.ebb-layers__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ee-primary);
  border-bottom: 1px solid var(--ee-border);
  background: var(--ee-panel-header-bg);
}

html[data-theme='dark'] .ebb-layers__header {
  background: #111827;
  border-bottom-color: #374151;
}

.ebb-layers__count {
  font-size: 10px;
  font-weight: 500;
  color: #9ca3af;
  background: #f3f4f6;
  border-radius: 10px;
  padding: 1px 7px;
  margin-left: auto;
}

html[data-theme='dark'] .ebb-layers__count {
  background: #1f2937;
}

.ebb-layers__tree {
  padding: 4px 0;
}

.ebb-layers__node {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px 5px 8px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background 0.1s ease;
  user-select: none;
  border-left: 2px solid transparent;
}

html[data-theme='dark'] .ebb-layers__node {
  color: #d1d5db;
}

.ebb-layers__node:hover {
  background: #f9fafb;
}

html[data-theme='dark'] .ebb-layers__node:hover {
  background: #111827;
}

.ebb-layers__node--hovered {
  background: rgba(1, 168, 171, 0.04);
}

.ebb-layers__node--selected {
  background: rgba(1, 168, 171, 0.08);
  border-left-color: var(--ee-primary);
  color: var(--ee-primary);
}

.ebb-layers__node--selected:hover {
  background: rgba(1, 168, 171, 0.12);
}

.ebb-layers__node--indent-1 {
  padding-left: 24px;
}

.ebb-layers__node--indent-2 {
  padding-left: 40px;
}

.ebb-layers__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 3px;
  padding: 0;
  flex-shrink: 0;
}

.ebb-layers__toggle:hover {
  background: #e5e7eb;
  color: #374151;
}

html[data-theme='dark'] .ebb-layers__toggle:hover {
  background: #374151;
  color: #d1d5db;
}

.ebb-layers__toggle-spacer {
  width: 16px;
  flex-shrink: 0;
}

.ebb-layers__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.ebb-layers__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
}

.ebb-layers__actions {
  display: none;
  align-items: center;
  gap: 1px;
  margin-left: auto;
  flex-shrink: 0;
}

.ebb-layers__node:hover .ebb-layers__actions {
  display: flex;
}

.ebb-layers__action-btn {
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
  padding: 0;
}

.ebb-layers__action-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

html[data-theme='dark'] .ebb-layers__action-btn:hover {
  background: #374151;
  color: #d1d5db;
}

.ebb-layers__action-btn--danger:hover {
  background: #fee2e2;
  color: #dc2626;
}

html[data-theme='dark'] .ebb-layers__action-btn--danger:hover {
  background: #450a0a;
  color: #f87171;
}

.ebb-layers__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 20px;
  text-align: center;
  color: #9ca3af;
}

.ebb-layers__empty p {
  font-size: 12px;
  margin: 0;
  line-height: 1.5;
}
</style>
