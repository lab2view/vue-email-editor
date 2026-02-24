import { ref, type Ref } from 'vue'
import type { DragSource, DropTarget } from '../types'

export interface UseEmailDragDropReturn {
  isDragging: Ref<boolean>
  dragSource: Ref<DragSource | null>
  dropTarget: Ref<DropTarget | null>
  startDrag: (source: DragSource) => void
  updateDropTarget: (target: DropTarget | null) => void
  endDrag: () => void
}

export function useEmailDragDrop(): UseEmailDragDropReturn {
  const isDragging = ref(false)
  const dragSource = ref<DragSource | null>(null)
  const dropTarget = ref<DropTarget | null>(null)

  function startDrag(source: DragSource) {
    isDragging.value = true
    dragSource.value = source
  }

  function updateDropTarget(target: DropTarget | null) {
    dropTarget.value = target
  }

  function endDrag() {
    isDragging.value = false
    dragSource.value = null
    dropTarget.value = null
  }

  return { isDragging, dragSource, dropTarget, startDrag, updateDropTarget, endDrag }
}
