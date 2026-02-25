import { ref, computed, type Ref } from 'vue'
import type { NodeId, EmailNode, EmailDocument } from '../types'
import { findNode, getAncestorPath } from '../utils/tree'
import type { UseEmailEventsReturn } from './useEmailEvents'

export interface UseEmailSelectionReturn {
  selectedNodeId: Ref<NodeId | null>
  hoveredNodeId: Ref<NodeId | null>
  selectedNode: Ref<EmailNode | null>
  selectedNodePath: Ref<NodeId[]>
  selectNode: (nodeId: NodeId | null) => void
  selectParent: () => void
  hoverNode: (nodeId: NodeId | null) => void
  clearSelection: () => void
}

export function useEmailSelection(
  document: Ref<EmailDocument>,
  events?: UseEmailEventsReturn,
): UseEmailSelectionReturn {
  const selectedNodeId = ref<NodeId | null>(null)
  const hoveredNodeId = ref<NodeId | null>(null)

  const selectedNode = computed<EmailNode | null>(() => {
    if (!selectedNodeId.value) return null
    return findNode(document.value.body, selectedNodeId.value)
  })

  const selectedNodePath = computed<NodeId[]>(() => {
    if (!selectedNodeId.value) return []
    return getAncestorPath(document.value.body, selectedNodeId.value)
  })

  function selectNode(nodeId: NodeId | null) {
    const previousId = selectedNodeId.value
    selectedNodeId.value = nodeId

    if (previousId && previousId !== nodeId) {
      events?.emit('node:deselected', { nodeId: previousId })
    }
    if (nodeId) {
      const node = findNode(document.value.body, nodeId)
      if (node) {
        events?.emit('node:selected', { nodeId, node })
      }
    }
  }

  function selectParent() {
    const path = selectedNodePath.value
    // path is [body, ..., parent, current]. Select the one before current.
    if (path.length >= 2) {
      selectedNodeId.value = path[path.length - 2]
    }
  }

  function hoverNode(nodeId: NodeId | null) {
    hoveredNodeId.value = nodeId
  }

  function clearSelection() {
    const previousId = selectedNodeId.value
    selectedNodeId.value = null
    hoveredNodeId.value = null
    if (previousId) {
      events?.emit('node:deselected', { nodeId: previousId })
    }
  }

  return {
    selectedNodeId,
    hoveredNodeId,
    selectedNode,
    selectedNodePath,
    selectNode,
    selectParent,
    hoverNode,
    clearSelection,
  }
}
