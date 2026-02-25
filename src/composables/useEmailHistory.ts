import { computed, shallowRef, type Ref } from 'vue'
import { useManualRefHistory } from '@vueuse/core'
import { cloneDeep } from 'lodash'
import type { EmailDocument } from '../types'
import type { UseEmailEventsReturn } from './useEmailEvents'

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

export function useEmailHistory(
  document: Ref<EmailDocument>,
  events?: UseEmailEventsReturn,
): UseEmailHistoryReturn {
  const { commit: rawCommit, undo: rawUndo, history } = useManualRefHistory(
    document,
    {
      capacity: 50,
      clone: cloneDeep,
    },
  )

  const canUndo = computed(() => history.value.length > 1)

  // Reactive redo stack — shallowRef triggers reactivity on reassign
  const redoStack = shallowRef<EmailDocument[]>([])
  const canRedo = computed(() => redoStack.value.length > 0)

  function commit() {
    rawCommit()
    redoStack.value = [] // Clear redo stack on new action
  }

  function undo() {
    if (history.value.length <= 1) return
    redoStack.value = [...redoStack.value, cloneDeep(document.value)]
    rawUndo()
    events?.emit('history:undo', { canUndo: canUndo.value, canRedo: canRedo.value })
  }

  function redo() {
    if (redoStack.value.length === 0) return
    const stack = [...redoStack.value]
    const redoState = stack.pop()!
    redoStack.value = stack
    rawCommit()
    document.value = redoState
    events?.emit('history:redo', { canUndo: canUndo.value, canRedo: canRedo.value })
  }

  return {
    commit,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
