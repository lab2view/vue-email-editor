import type { InjectionKey, Ref } from 'vue'
import type { UseEmailDocumentReturn } from './composables/useEmailDocument'
import type { UseEmailSelectionReturn } from './composables/useEmailSelection'
import type { UseEmailDragDropReturn } from './composables/useEmailDragDrop'

export const EMAIL_DOCUMENT_KEY: InjectionKey<UseEmailDocumentReturn> = Symbol('email-document')
export const EMAIL_SELECTION_KEY: InjectionKey<UseEmailSelectionReturn> = Symbol('email-selection')
export const EMAIL_DRAG_DROP_KEY: InjectionKey<UseEmailDragDropReturn> = Symbol('email-drag-drop')

export const EMAIL_EDITOR_CONFIG_KEY: InjectionKey<{
  variables: Ref<string[]>
}> = Symbol('email-editor-config')
