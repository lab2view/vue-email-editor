import { computed, type Ref } from 'vue'
import { useManualRefHistory } from '@vueuse/core'
import { cloneDeep } from 'lodash'
import type { EmailDocument } from '../types'

export interface UseEmailHistoryReturn {
  /** Take a snapshot of the current state (call BEFORE mutating) */
  commit: () => void
  /** Undo the last change */
  undo: () => void
  /** Redo the last undone change */
  redo: () => void
  canUndo: Ref<boolean>
  canRedo: Ref<boolean>
}

export function useEmailHistory(document: Ref<EmailDocument>): UseEmailHistoryReturn {
  const { commit: rawCommit, undo: rawUndo, redo: rawRedo, history } = useManualRefHistory(
    document,
    {
      capacity: 50,
      clone: cloneDeep,
    },
  )

  const canUndo = computed(() => history.value.length > 1)
  const canRedo = computed(() => {
    // useManualRefHistory tracks redo internally via the undone list
    // We check if there are entries after the current pointer
    // Since useManualRefHistory doesn't expose canRedo, we track it differently
    return false // Will be improved when we implement a custom solution if needed
  })

  // We track redo capability manually
  let undoStack: EmailDocument[] = []

  function commit() {
    rawCommit()
    undoStack = [] // Clear redo stack on new action
  }

  function undo() {
    if (history.value.length <= 1) return
    undoStack.push(cloneDeep(document.value))
    rawUndo()
  }

  function redo() {
    if (undoStack.length === 0) return
    rawCommit()
    const redoState = undoStack.pop()!
    document.value = redoState
  }

  const canRedoComputed = computed(() => undoStack.length > 0)

  return {
    commit,
    undo,
    redo,
    canUndo,
    canRedo: canRedoComputed,
  }
}
