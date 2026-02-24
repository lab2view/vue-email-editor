import type { EmailNode, NodeId } from '../types'
import { createId } from './id'

/** Find a node by ID in the tree. Returns null if not found. */
export function findNode(root: EmailNode, nodeId: NodeId): EmailNode | null {
  if (root.id === nodeId) return root
  for (const child of root.children) {
    const found = findNode(child, nodeId)
    if (found) return found
  }
  return null
}

/** Find the parent of a node by ID. Returns null if not found or if nodeId is root. */
export function findParent(root: EmailNode, nodeId: NodeId): EmailNode | null {
  for (const child of root.children) {
    if (child.id === nodeId) return root
    const found = findParent(child, nodeId)
    if (found) return found
  }
  return null
}

/** Get the ancestor path (array of IDs) from root to the target node. */
export function getAncestorPath(root: EmailNode, nodeId: NodeId): NodeId[] {
  const path: NodeId[] = []

  function walk(node: EmailNode): boolean {
    path.push(node.id)
    if (node.id === nodeId) return true
    for (const child of node.children) {
      if (walk(child)) return true
    }
    path.pop()
    return false
  }

  walk(root)
  return path
}

/** Remove a node from the tree by ID. Returns true if removed. */
export function removeNode(root: EmailNode, nodeId: NodeId): boolean {
  for (let i = 0; i < root.children.length; i++) {
    if (root.children[i].id === nodeId) {
      root.children.splice(i, 1)
      return true
    }
    if (removeNode(root.children[i], nodeId)) return true
  }
  return false
}

/** Move a node to a new parent at a specific index. */
export function moveNode(
  root: EmailNode,
  nodeId: NodeId,
  newParentId: NodeId,
  newIndex: number,
): boolean {
  const node = findNode(root, nodeId)
  if (!node) return false

  // Remove from current position
  removeNode(root, nodeId)

  // Insert at new position
  const newParent = findNode(root, newParentId)
  if (!newParent) return false

  const clampedIndex = Math.min(newIndex, newParent.children.length)
  newParent.children.splice(clampedIndex, 0, node)
  return true
}

/** Deep clone a subtree, generating fresh IDs for every node. */
export function cloneSubtree(node: EmailNode): EmailNode {
  return {
    id: createId(),
    type: node.type,
    attributes: { ...node.attributes },
    children: node.children.map(cloneSubtree),
    htmlContent: node.htmlContent,
  }
}

/** Walk the tree, calling the visitor for each node. */
export function walkTree(root: EmailNode, visitor: (node: EmailNode) => void): void {
  visitor(root)
  for (const child of root.children) {
    walkTree(child, visitor)
  }
}

/** Get the index of a node within its parent's children array. Returns -1 if not found. */
export function getNodeIndex(root: EmailNode, nodeId: NodeId): number {
  const parent = findParent(root, nodeId)
  if (!parent) return -1
  return parent.children.findIndex((c) => c.id === nodeId)
}
