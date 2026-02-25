/**
 * Keyboard shortcuts for the email editor.
 * Ctrl+Z = undo, Ctrl+Shift+Z / Ctrl+Y = redo, Delete/Backspace = delete selected node.
 */
import { onMounted, onBeforeUnmount } from 'vue'
import type { UseEmailDocumentReturn } from './useEmailDocument'
import type { UseEmailSelectionReturn } from './useEmailSelection'

export function useEmailKeyboard(
  doc: UseEmailDocumentReturn,
  selection: UseEmailSelectionReturn,
) {
  function handleKeydown(e: KeyboardEvent) {
    // Skip if the target is an input, textarea, or contenteditable
    const target = e.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable ||
      target.closest('.ebb-inline-editor') ||
      target.closest('.ebb-code-editor') ||
      target.closest('.cm-editor')
    ) {
      return
    }

    const isMod = e.ctrlKey || e.metaKey

    // Undo: Ctrl+Z
    if (isMod && !e.shiftKey && e.key === 'z') {
      e.preventDefault()
      doc.history.undo()
      return
    }

    // Redo: Ctrl+Shift+Z or Ctrl+Y
    if ((isMod && e.shiftKey && e.key === 'z') || (isMod && e.key === 'y')) {
      e.preventDefault()
      doc.history.redo()
      return
    }

    // Delete selected node: Delete or Backspace
    if ((e.key === 'Delete' || e.key === 'Backspace') && selection.selectedNodeId.value) {
      e.preventDefault()
      const nodeId = selection.selectedNodeId.value
      selection.clearSelection()
      doc.deleteNode(nodeId)
      return
    }

    // Duplicate selected node: Ctrl+D
    if (isMod && e.key === 'd' && selection.selectedNodeId.value) {
      e.preventDefault()
      doc.duplicateNode(selection.selectedNodeId.value)
      return
    }

    // Escape: clear selection
    if (e.key === 'Escape') {
      selection.clearSelection()
      return
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}
