import { ref, computed, type Ref } from 'vue'
import type { NodeId, EmailNode, EmailDocument } from '../types'
import { findNode, getAncestorPath } from '../utils/tree'

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

export function useEmailSelection(document: Ref<EmailDocument>): UseEmailSelectionReturn {
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
    selectedNodeId.value = nodeId
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
    selectedNodeId.value = null
    hoveredNodeId.value = null
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
