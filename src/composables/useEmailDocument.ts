/**
 * Core composable managing the email document state and emission pipeline.
 *
 * Owns the document ref. History is created internally.
 * All mutations snapshot history, mutate, then debounce-emit.
 */

import { ref, type Ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { EmailDocument, EmailNode, NodeId, EmailDesignJson, ConditionalRule } from '../types'
import { isNewEditorJson } from '../types'
import { findNode, findParent, removeNode, moveNode as treeMoveNode, cloneSubtree } from '../utils/tree'
import { documentToMjml } from '../serializer/json-to-mjml'
import { mjmlToDocument } from '../serializer/mjml-to-json'
import { createDefaultDocument } from '../serializer/node-factory'
import { compileMjml } from './useMjmlCompiler'
import { useEmailHistory, type UseEmailHistoryReturn } from './useEmailHistory'
import type { UseEmailEventsReturn } from './useEmailEvents'

export interface UseEmailDocumentReturn {
  document: Ref<EmailDocument>
  history: UseEmailHistoryReturn
  compiledHtml: Ref<string>
  isCompiling: Ref<boolean>
  updateNodeAttribute: (nodeId: NodeId, key: string, value: string) => void
  updateNodeCondition: (nodeId: NodeId, condition: ConditionalRule | undefined) => void
  updateNodeContent: (nodeId: NodeId, htmlContent: string) => void
  updateHeadStyle: (tag: string, key: string, value: string) => void
  updatePreviewText: (text: string) => void
  insertNode: (parentId: NodeId, index: number, newNode: EmailNode) => void
  insertNodesAfter: (refNodeId: NodeId, nodes: EmailNode[]) => void
  deleteNode: (nodeId: NodeId) => void
  moveNodeTo: (nodeId: NodeId, newParentId: NodeId, newIndex: number) => void
  moveNodeUp: (nodeId: NodeId) => boolean
  moveNodeDown: (nodeId: NodeId) => boolean
  duplicateNode: (nodeId: NodeId) => NodeId | null
  replaceDocument: (newDoc: EmailDocument) => void
  loadFromProps: (mjml: string, designJson: Record<string, unknown> | null) => void
  triggerEmit: () => Promise<void>
}

export function useEmailDocument(options: {
  onMjmlChange: (mjml: string) => void
  onHtmlChange: (html: string) => void
  onDesignJsonChange: (data: EmailDesignJson) => void
  events?: UseEmailEventsReturn
}): UseEmailDocumentReturn {
  const document = ref<EmailDocument>(createDefaultDocument())
  const compiledHtml = ref('')
  const isCompiling = ref(false)

  // History wraps the document ref — no circular dependency
  const history = useEmailHistory(document, options.events)

  // ─── Emission pipeline (debounced) ───

  const emitChanges = useDebounceFn(async () => {
    await doEmit()
  }, 300)

  async function doEmit() {
    isCompiling.value = true
    try {
      const mjml = documentToMjml(document.value)
      options.onMjmlChange(mjml)

      const result = await compileMjml(mjml)
      if (result.html) {
        compiledHtml.value = result.html
        options.onHtmlChange(result.html)
      }

      const designJson: EmailDesignJson = {
        _editor: 'mesagoo-email-editor',
        _version: 1,
        document: document.value,
      }
      options.onDesignJsonChange(designJson)
      options.events?.emit('editor:change', { document: document.value })
    } catch (err) {
      console.error('[EmailEditor] doEmit error:', err)
    } finally {
      isCompiling.value = false
    }
  }

  // ─── Mutations (all snapshot history first) ───

  function updateNodeAttribute(nodeId: NodeId, key: string, value: string) {
    const node = findNode(document.value.body, nodeId)
    if (!node) return
    history.commit()
    if (value === '' || value === undefined) {
      delete node.attributes[key]
    } else {
      node.attributes[key] = value
    }
    options.events?.emit('property:changed', { nodeId, key, value })
    emitChanges()
  }

  function updateNodeCondition(nodeId: NodeId, condition: ConditionalRule | undefined) {
    const node = findNode(document.value.body, nodeId)
    if (!node) return
    history.commit()
    if (condition) {
      node.condition = condition
    } else {
      delete node.condition
    }
    emitChanges()
  }

  function updateNodeContent(nodeId: NodeId, htmlContent: string) {
    const node = findNode(document.value.body, nodeId)
    if (!node) return
    history.commit()
    node.htmlContent = htmlContent
    emitChanges()
  }

  function updateHeadStyle(tag: string, key: string, value: string) {
    history.commit()
    if (!document.value.headAttributes.defaultStyles[tag]) {
      document.value.headAttributes.defaultStyles[tag] = {}
    }
    if (value === '' || value === undefined) {
      delete document.value.headAttributes.defaultStyles[tag][key]
    } else {
      document.value.headAttributes.defaultStyles[tag][key] = value
    }
    emitChanges()
  }

  function updatePreviewText(text: string) {
    history.commit()
    document.value.headAttributes.previewText = text
    emitChanges()
  }

  function insertNode(parentId: NodeId, index: number, newNode: EmailNode) {
    const parent = findNode(document.value.body, parentId)
    if (!parent) return
    history.commit()
    const clampedIndex = Math.min(index, parent.children.length)
    parent.children.splice(clampedIndex, 0, newNode)
    emitChanges()
  }

  function insertNodesAfter(refNodeId: NodeId, nodes: EmailNode[]) {
    const parent = findParent(document.value.body, refNodeId)
    if (!parent) return
    history.commit()
    const refIndex = parent.children.findIndex((c) => c.id === refNodeId)
    if (refIndex === -1) return
    parent.children.splice(refIndex + 1, 0, ...nodes)
    emitChanges()
  }

  function deleteNode(nodeId: NodeId) {
    history.commit()
    removeNode(document.value.body, nodeId)
    options.events?.emit('node:deleted', { nodeId })
    emitChanges()
  }

  function moveNodeTo(nodeId: NodeId, newParentId: NodeId, newIndex: number) {
    const oldParent = findParent(document.value.body, nodeId)
    const fromParentId = oldParent?.id ?? nodeId
    history.commit()
    treeMoveNode(document.value.body, nodeId, newParentId, newIndex)
    options.events?.emit('node:moved', { nodeId, fromParentId, toParentId: newParentId })
    emitChanges()
  }

  function moveNodeUp(nodeId: NodeId): boolean {
    const parent = findParent(document.value.body, nodeId)
    if (!parent) return false
    const idx = parent.children.findIndex((c) => c.id === nodeId)
    if (idx <= 0) return false
    history.commit()
    const [node] = parent.children.splice(idx, 1)
    parent.children.splice(idx - 1, 0, node)
    emitChanges()
    return true
  }

  function moveNodeDown(nodeId: NodeId): boolean {
    const parent = findParent(document.value.body, nodeId)
    if (!parent) return false
    const idx = parent.children.findIndex((c) => c.id === nodeId)
    if (idx === -1 || idx >= parent.children.length - 1) return false
    history.commit()
    const [node] = parent.children.splice(idx, 1)
    parent.children.splice(idx + 1, 0, node)
    emitChanges()
    return true
  }

  function duplicateNode(nodeId: NodeId): NodeId | null {
    const node = findNode(document.value.body, nodeId)
    if (!node) return null
    const parent = findParent(document.value.body, nodeId)
    if (!parent) return null

    history.commit()
    const clone = cloneSubtree(node)
    const refIndex = parent.children.findIndex((c) => c.id === nodeId)
    parent.children.splice(refIndex + 1, 0, clone)
    options.events?.emit('node:duplicated', { originalId: nodeId, newId: clone.id })
    emitChanges()
    return clone.id
  }

  function replaceDocument(newDoc: EmailDocument) {
    history.commit()
    document.value = newDoc
    emitChanges()
  }

  /** Initialize from props (handles migration from old GrapesJS format) */
  function loadFromProps(mjml: string, designJson: Record<string, unknown> | null) {
    if (designJson && isNewEditorJson(designJson)) {
      document.value = (designJson as EmailDesignJson).document
    } else if (mjml && mjml.trim()) {
      document.value = mjmlToDocument(mjml)
    } else {
      document.value = createDefaultDocument()
    }
  }

  /** Force immediate emission */
  async function triggerEmit() {
    await doEmit()
  }

  return {
    document,
    history,
    compiledHtml,
    isCompiling,
    updateNodeAttribute,
    updateNodeCondition,
    updateNodeContent,
    updateHeadStyle,
    updatePreviewText,
    insertNode,
    insertNodesAfter,
    deleteNode,
    moveNodeTo,
    moveNodeUp,
    moveNodeDown,
    duplicateNode,
    replaceDocument,
    loadFromProps,
    triggerEmit,
  }
}
