<script setup lang="ts">
import { inject, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import { EMAIL_DOCUMENT_KEY, EMAIL_SELECTION_KEY, EMAIL_DRAG_DROP_KEY } from '../../injection-keys'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS } from '../../labels'
import type { IframeMessage, DropPosition, EmailNode } from '../../types'
import { CONTENT_NODE_TYPES } from '../../types'
import { findNode, findParent } from '../../utils/tree'
import CanvasOverlay from './CanvasOverlay.vue'
import InlineTextEditor from './InlineTextEditor.vue'

const props = withDefaults(defineProps<{
  canvasWidth?: number
}>(), {
  canvasWidth: 600,
})

const doc = inject(EMAIL_DOCUMENT_KEY)!
const selection = inject(EMAIL_SELECTION_KEY)!
const dragDrop = inject(EMAIL_DRAG_DROP_KEY)!
const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)

const iframeRef = ref<HTMLIFrameElement | null>(null)
const canvasRef = ref<HTMLDivElement | null>(null)
const isReady = ref(false)

// Overlay state
const selectedRect = ref<DOMRect | null>(null)
const hoveredRect = ref<DOMRect | null>(null)
const dropIndicatorRect = ref<DOMRect | null>(null)
const dropIndicatorPosition = ref<DropPosition>('after')

// Iframe auto-height
const iframeHeight = ref<number | null>(null)

// Inline text editing state
const inlineEditNodeId = ref<string | null>(null)
const inlineEditContent = ref('')
const inlineEditRect = ref<DOMRect | null>(null)

// ─── Iframe content management ───

function updateIframe() {
  const iframe = iframeRef.value
  if (!iframe || !doc.compiledHtml.value) return

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { margin: 0; padding: 0; }
    [data-node-id] { cursor: pointer; transition: outline 0.1s ease; }
    [data-node-id]:hover { outline: 1px dashed rgba(1, 168, 171, 0.4); outline-offset: -1px; }
    /* Editor mode: give empty columns a minimum drop target area */
    div[class*="mj-column-"] { min-height: 60px; }
  </style>
</head>
<body>
  ${doc.compiledHtml.value}
  <script>
  (function() {
    // Annotate nodes: find elements with ebb-node-* class and set data-node-id
    // Then propagate data-node-id DOWN into child elements (table, tbody, tr, td, div)
    // so that elementFromPoint on empty areas inside columns resolves correctly.
    document.querySelectorAll('[class]').forEach(function(el) {
      var classes = (el.className.baseVal || el.className || '').toString().split(/\\s+/);
      for (var i = 0; i < classes.length; i++) {
        if (classes[i].indexOf('ebb-node-') === 0) {
          var nodeId = classes[i].replace('ebb-node-', '');
          el.dataset.nodeId = nodeId;
          break;
        }
      }
    });

    // Propagate downward: for each annotated node, mark its direct structural
    // children (table, tbody, tr, td, div) that don't already have a node-id.
    function propagateDown(el, nodeId) {
      for (var i = 0; i < el.children.length; i++) {
        var child = el.children[i];
        if (child.dataset.nodeId) continue; // stop at next annotated node
        var tag = child.tagName.toLowerCase();
        if (tag === 'table' || tag === 'tbody' || tag === 'tr' || tag === 'td' || tag === 'div') {
          child.dataset.nodeId = nodeId;
          propagateDown(child, nodeId);
        }
      }
    }
    document.querySelectorAll('[data-node-id]').forEach(function(el) {
      propagateDown(el, el.dataset.nodeId);
    });

    function getNodeId(el) {
      while (el && el !== document.body) {
        if (el.dataset && el.dataset.nodeId) return el.dataset.nodeId;
        el = el.parentElement;
      }
      return null;
    }

    function getNodeElement(el) {
      while (el && el !== document.body) {
        if (el.dataset && el.dataset.nodeId) return el;
        el = el.parentElement;
      }
      return null;
    }

    document.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var nodeId = getNodeId(e.target);
      if (nodeId) {
        var el = getNodeElement(e.target);
        // Refine section clicks to the specific column
        if (el) {
          var colChildren = el.querySelectorAll('div[class*="mj-column-"][data-node-id]');
          if (colChildren.length > 0) {
            el = refineToColumn(el, e.clientX);
            nodeId = el.dataset.nodeId;
          }
        }
        window.parent.postMessage({ type: 'ebb:select', nodeId: nodeId, rect: el ? el.getBoundingClientRect() : null }, '*');
      } else {
        window.parent.postMessage({ type: 'ebb:deselect' }, '*');
      }
    });

    document.addEventListener('dblclick', function(e) {
      e.preventDefault();
      var nodeId = getNodeId(e.target);
      if (nodeId) {
        var el = getNodeElement(e.target);
        window.parent.postMessage({ type: 'ebb:dblclick', nodeId: nodeId, rect: el ? el.getBoundingClientRect() : null }, '*');
      }
    });

    var lastHovered = null;
    document.addEventListener('mouseover', function(e) {
      var nodeId = getNodeId(e.target);
      if (nodeId && nodeId !== lastHovered) {
        lastHovered = nodeId;
        var el = getNodeElement(e.target);
        window.parent.postMessage({ type: 'ebb:hover', nodeId: nodeId, rect: el ? el.getBoundingClientRect() : null }, '*');
      }
    });

    document.addEventListener('mouseout', function(e) {
      var nodeId = e.relatedTarget ? getNodeId(e.relatedTarget) : null;
      if (!nodeId) {
        lastHovered = null;
        window.parent.postMessage({ type: 'ebb:hover-end' }, '*');
      }
    });

    // Given an element resolved by hit-test, try to find a more specific
    // child column if the hit is on a section's inner td.
    function refineToColumn(nodeEl, x) {
      // Find all direct child column divs inside this element's subtree
      var cols = nodeEl.querySelectorAll('div[class*="mj-column-"]');
      if (cols.length === 0) return nodeEl;
      // Find which column contains x
      for (var i = 0; i < cols.length; i++) {
        var colRect = cols[i].getBoundingClientRect();
        if (x >= colRect.left && x <= colRect.right) {
          return cols[i];
        }
      }
      // Fallback: nearest column by distance
      var best = null, bestDist = Infinity;
      for (var j = 0; j < cols.length; j++) {
        var cr = cols[j].getBoundingClientRect();
        var cx = cr.left + cr.width / 2;
        var d = Math.abs(x - cx);
        if (d < bestDist) { bestDist = d; best = cols[j]; }
      }
      return best || nodeEl;
    }

    // Handle hit-test requests from parent (for cross-iframe drag-and-drop)
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'ebb:hit-test') {
        var x = e.data.x;
        var y = e.data.y;
        var el = document.elementFromPoint(x, y);
        if (el) {
          var nodeEl = getNodeElement(el);
          if (nodeEl) {
            // If the resolved node is a section (contains columns), refine to specific column
            var columnChildren = nodeEl.querySelectorAll('div[class*="mj-column-"][data-node-id]');
            if (columnChildren.length > 0) {
              nodeEl = refineToColumn(nodeEl, x);
            }
            var rect = nodeEl.getBoundingClientRect();
            var midY = rect.top + rect.height / 2;
            var position = y < midY ? 'before' : 'after';
            window.parent.postMessage({
              type: 'ebb:hit-test-result',
              nodeId: nodeEl.dataset.nodeId,
              position: position,
              rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
              isDrop: e.data.isDrop || false
            }, '*');
          } else {
            window.parent.postMessage({ type: 'ebb:hit-test-result', nodeId: null, isDrop: e.data.isDrop || false }, '*');
          }
        }
      }
    });

    // Report content height to parent for auto-sizing
    function reportHeight() {
      var h = document.documentElement.scrollHeight || document.body.scrollHeight;
      window.parent.postMessage({ type: 'ebb:height', height: h }, '*');
    }
    reportHeight();
    new MutationObserver(reportHeight).observe(document.body, { childList: true, subtree: true, attributes: true });
    window.addEventListener('resize', reportHeight);

    window.parent.postMessage({ type: 'ebb:ready' }, '*');
  })();
  <\/script>
</body>
</html>`

  iframe.srcdoc = html
}

// ─── postMessage handler ───

function handleMessage(e: MessageEvent) {
  const msg = e.data as IframeMessage
  if (!msg || typeof msg.type !== 'string' || !msg.type.startsWith('ebb:')) return

  switch (msg.type) {
    case 'ebb:ready':
      isReady.value = true
      break
    case 'ebb:height':
      iframeHeight.value = msg.height
      break
    case 'ebb:select':
      selection.selectNode(msg.nodeId)
      selectedRect.value = msg.rect
      break
    case 'ebb:deselect':
      selection.clearSelection()
      selectedRect.value = null
      break
    case 'ebb:hover':
      selection.hoverNode(msg.nodeId)
      hoveredRect.value = msg.rect
      break
    case 'ebb:hover-end':
      selection.hoverNode(null)
      hoveredRect.value = null
      break
    case 'ebb:dblclick':
      openInlineEditor(msg.nodeId, msg.rect)
      break
    case 'ebb:hit-test-result':
      handleHitTestResult(msg)
      break
  }
}

/** Process hit-test results from iframe */
function handleHitTestResult(msg: any) {
  if (!dragDrop.isDragging.value) return

  if (msg.isDrop) {
    // This is a drop action
    if (msg.nodeId && dragDrop.dragSource.value) {
      handleDrop(msg.nodeId, msg.position)
    }
    dropIndicatorRect.value = null
    dragDrop.endDrag()
  } else {
    // This is a dragover — update indicator
    if (msg.nodeId) {
      dragDrop.updateDropTarget({ nodeId: msg.nodeId, position: msg.position })
      dropIndicatorRect.value = msg.rect
      dropIndicatorPosition.value = msg.position
    } else {
      dropIndicatorRect.value = null
      dragDrop.updateDropTarget(null)
    }
  }
}

// ─── Drop handling ───

function handleDrop(targetNodeId: string, position: DropPosition) {
  const source = dragDrop.dragSource.value
  if (!source) return

  if (source.type === 'new-block') {
    const result = source.block.factory()
    const nodes: EmailNode[] = Array.isArray(result) ? result : [result]
    insertNodesAtTarget(nodes, targetNodeId, position)
  } else if (source.type === 'existing-node') {
    moveExistingNode(source.nodeId, targetNodeId, position)
  }
}

function insertNodesAtTarget(nodes: EmailNode[], targetNodeId: string, position: DropPosition) {
  const targetNode = findNode(doc.document.value.body, targetNodeId)
  if (!targetNode) return

  const SECTION_TYPES = ['mj-section', 'mj-wrapper', 'mj-hero']
  const isSectionLevelInsert = nodes.some((n) => SECTION_TYPES.includes(n.type))
  const isTargetSectionLevel = SECTION_TYPES.includes(targetNode.type)
  const isTargetColumn = targetNode.type === 'mj-column'
  const isTargetBody = targetNode.type === 'mj-body'

  // ── Case 1: Inserting section-level nodes ──
  if (isSectionLevelInsert) {
    // Find the nearest section-level ancestor to insert relative to
    let refNodeId = targetNodeId
    if (!isTargetSectionLevel && !isTargetBody) {
      const body = doc.document.value.body
      let current = findParent(body, targetNodeId)
      while (current && current.id !== body.id && !SECTION_TYPES.includes(current.type)) {
        current = findParent(body, current.id)
      }
      if (current && current.id !== body.id) {
        refNodeId = current.id
      } else {
        for (const node of nodes) {
          doc.insertNode(body.id, body.children.length, node)
        }
        return
      }
    }
    if (isTargetBody) {
      for (const node of nodes) {
        doc.insertNode(targetNodeId, targetNode.children.length, node)
      }
      return
    }
    const parent = findParent(doc.document.value.body, refNodeId)
    if (!parent) return
    const idx = parent.children.findIndex((c) => c.id === refNodeId)
    const insertIdx = position === 'before' ? idx : idx + 1
    for (let i = 0; i < nodes.length; i++) {
      doc.insertNode(parent.id, insertIdx + i, nodes[i])
    }
    return
  }

  // ── Case 2: Inserting content nodes into a section → route to first column ──
  if (isTargetSectionLevel) {
    const firstColumn = targetNode.children.find((c) => c.type === 'mj-column')
    if (firstColumn) {
      for (const node of nodes) {
        doc.insertNode(firstColumn.id, firstColumn.children.length, node)
      }
    }
    return
  }

  // ── Case 3: Inserting content nodes into a column → append inside ──
  if (isTargetColumn) {
    for (const node of nodes) {
      doc.insertNode(targetNodeId, targetNode.children.length, node)
    }
    return
  }

  // ── Case 4: Inserting content nodes into mj-body → wrap in section+column ──
  if (isTargetBody) {
    // Should not normally happen, but handle gracefully
    return
  }

  // ── Case 5: Inserting content relative to another content node ──
  // The target is a content node inside a column — insert as sibling
  const parent = findParent(doc.document.value.body, targetNodeId)
  if (!parent) return

  // If parent is a column, insert relative to the target
  const idx = parent.children.findIndex((c) => c.id === targetNodeId)
  const insertIdx = position === 'before' ? idx : idx + 1
  for (let i = 0; i < nodes.length; i++) {
    doc.insertNode(parent.id, insertIdx + i, nodes[i])
  }
}

function moveExistingNode(nodeId: string, targetNodeId: string, position: DropPosition) {
  const targetNode = findNode(doc.document.value.body, targetNodeId)
  if (!targetNode) return
  if (nodeId === targetNodeId) return // can't drop on self

  const movingNode = findNode(doc.document.value.body, nodeId)
  if (!movingNode) return

  const SECTION_TYPES = ['mj-section', 'mj-wrapper', 'mj-hero']
  const isMovingSection = SECTION_TYPES.includes(movingNode.type)

  // Moving a section: place relative to nearest section
  if (isMovingSection) {
    let refNodeId = targetNodeId
    if (!SECTION_TYPES.includes(targetNode.type)) {
      const body = doc.document.value.body
      let current = findParent(body, targetNodeId)
      while (current && current.id !== body.id && !SECTION_TYPES.includes(current.type)) {
        current = findParent(body, current.id)
      }
      refNodeId = current && current.id !== body.id ? current.id : body.id
    }
    const parent = findParent(doc.document.value.body, refNodeId)
    if (!parent) return
    const idx = parent.children.findIndex((c) => c.id === refNodeId)
    doc.moveNodeTo(nodeId, parent.id, position === 'before' ? idx : idx + 1)
    return
  }

  // Moving content into section → route to first column
  if (SECTION_TYPES.includes(targetNode.type)) {
    const firstColumn = targetNode.children.find((c) => c.type === 'mj-column')
    if (firstColumn) {
      doc.moveNodeTo(nodeId, firstColumn.id, firstColumn.children.length)
    }
    return
  }

  // Moving content into column → append
  if (targetNode.type === 'mj-column') {
    doc.moveNodeTo(nodeId, targetNodeId, targetNode.children.length)
    return
  }

  // Moving content relative to another content node
  const parent = findParent(doc.document.value.body, targetNodeId)
  if (!parent) return
  const idx = parent.children.findIndex((c) => c.id === targetNodeId)
  doc.moveNodeTo(nodeId, parent.id, position === 'before' ? idx : idx + 1)
}

// ─── Inline text editing ───

function openInlineEditor(nodeId: string, rect: DOMRect) {
  const node = findNode(doc.document.value.body, nodeId)
  if (!node || !CONTENT_NODE_TYPES.includes(node.type)) return
  inlineEditNodeId.value = nodeId
  inlineEditContent.value = node.htmlContent || ''
  inlineEditRect.value = rect
}

function onInlineSave(html: string) {
  if (inlineEditNodeId.value) {
    doc.updateNodeContent(inlineEditNodeId.value, html)
  }
}

function onInlineClose() {
  inlineEditNodeId.value = null
  inlineEditContent.value = ''
  inlineEditRect.value = null
}

// ─── Canvas-level drag events ───
// Drag events from the sidebar land on the drag overlay (not the iframe).
// We convert the mouse position to iframe-relative coords and ask the iframe
// to hit-test for us via postMessage.

function sendHitTest(e: DragEvent, isDrop: boolean) {
  const iframe = iframeRef.value
  if (!iframe || !iframe.contentWindow) return

  const iframeRect = iframe.getBoundingClientRect()
  const x = e.clientX - iframeRect.left
  const y = e.clientY - iframeRect.top

  iframe.contentWindow.postMessage({ type: 'ebb:hit-test', x, y, isDrop }, '*')
}

function onOverlayDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
  sendHitTest(e, false)
}

function onOverlayDrop(e: DragEvent) {
  e.preventDefault()
  sendHitTest(e, true)
}

function onOverlayDragLeave(e: DragEvent) {
  const related = e.relatedTarget as HTMLElement | null
  if (!canvasRef.value?.contains(related)) {
    dropIndicatorRect.value = null
    dragDrop.updateDropTarget(null)
  }
}

// ─── Watchers ───

watch(() => doc.compiledHtml.value, () => {
  updateIframe()
}, { flush: 'post' })

onMounted(() => {
  window.addEventListener('message', handleMessage)
  if (doc.compiledHtml.value) {
    updateIframe()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<template>
  <div
    ref="canvasRef"
    id="ebb-canvas-region"
    class="ebb-canvas"
    role="region"
    aria-label="Email canvas"
  >
    <!-- Loading overlay -->
    <div v-if="doc.isCompiling.value && !doc.compiledHtml.value" class="ebb-canvas__loading" role="status" aria-live="polite">
      <div class="ebb-canvas__spinner"></div>
      <span>{{ labels.loading }}</span>
    </div>

    <!-- Iframe wrapper: iframe + overlays share the same coordinate space -->
    <div class="ebb-canvas__iframe-wrapper" :style="{ width: canvasWidth + 'px', height: iframeHeight ? iframeHeight + 'px' : undefined }">
      <iframe
        ref="iframeRef"
        class="ebb-canvas__iframe"
        sandbox="allow-scripts allow-same-origin"
        title="Email Preview"
      ></iframe>

      <!-- Transparent drag overlay — shown during drag to intercept events above iframe -->
      <div
        v-if="dragDrop.isDragging.value"
        class="ebb-canvas__drag-overlay"
        @dragover="onOverlayDragOver"
        @drop="onOverlayDrop"
        @dragleave="onOverlayDragLeave"
      ></div>

      <!-- Inline text editor overlay -->
      <InlineTextEditor
        v-if="inlineEditNodeId && inlineEditRect"
        :content="inlineEditContent"
        :rect="inlineEditRect"
        @save="onInlineSave"
        @close="onInlineClose"
      />

      <!-- Selection/Hover/Drop overlay -->
      <CanvasOverlay
        :selected-rect="selectedRect"
        :hovered-rect="hoveredRect"
        :selected-node-id="selection.selectedNodeId.value"
        :hovered-node-id="selection.hoveredNodeId.value"
        :drop-indicator-rect="dropIndicatorRect"
        :drop-indicator-position="dropIndicatorPosition"
        :is-dragging="dragDrop.isDragging.value"
      />
    </div>
  </div>
</template>

<style>
.ebb-canvas {
  flex: 1;
  position: relative;
  background: #e5e7eb;
  background-image:
    radial-gradient(circle, #d1d5db 0.5px, transparent 0.5px);
  background-size: 16px 16px;
  overflow: auto;
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

html[data-theme='dark'] .ebb-canvas {
  background-color: #1a1f2e;
  background-image:
    radial-gradient(circle, #2d3348 0.5px, transparent 0.5px);
}

.ebb-canvas__loading {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #f9fafb;
  color: #6b7280;
  font-size: 13px;
}

html[data-theme='dark'] .ebb-canvas__loading {
  background: #111827;
  color: #9ca3af;
}

.ebb-canvas__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: var(--ee-primary);
  border-radius: 50%;
  animation: ebb-spin 0.8s linear infinite;
}

@keyframes ebb-spin {
  to { transform: rotate(360deg); }
}

.ebb-canvas__iframe-wrapper {
  position: relative;
  min-height: 200px;
  max-width: 100%;
  flex-shrink: 0;
  transition: width 0.3s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  overflow: hidden;
}

html[data-theme='dark'] .ebb-canvas__iframe-wrapper {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.15);
}

.ebb-canvas__iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #ffffff;
  display: block;
}

.ebb-canvas__drag-overlay {
  position: absolute;
  inset: 0;
  z-index: 5;
  cursor: copy;
  background: rgba(1, 168, 171, 0.02);
}
</style>
