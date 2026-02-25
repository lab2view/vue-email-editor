import type { InjectionKey, Ref } from 'vue'
import type { UseEmailDocumentReturn } from './composables/useEmailDocument'
import type { UseEmailSelectionReturn } from './composables/useEmailSelection'
import type { UseEmailDragDropReturn } from './composables/useEmailDragDrop'
import type { UseEmailEventsReturn } from './composables/useEmailEvents'
import type { UsePluginRegistryReturn } from './composables/usePluginRegistry'
import type { ImageUploadHandler, BrowseAssetsHandler, MergeTag } from './types'

export const EMAIL_DOCUMENT_KEY: InjectionKey<UseEmailDocumentReturn> = Symbol('email-document')
export const EMAIL_SELECTION_KEY: InjectionKey<UseEmailSelectionReturn> = Symbol('email-selection')
export const EMAIL_DRAG_DROP_KEY: InjectionKey<UseEmailDragDropReturn> = Symbol('email-drag-drop')
export const EMAIL_EVENTS_KEY: InjectionKey<UseEmailEventsReturn> = Symbol('email-events')
export const PLUGIN_REGISTRY_KEY: InjectionKey<UsePluginRegistryReturn> = Symbol('plugin-registry')

export const EMAIL_EDITOR_CONFIG_KEY: InjectionKey<{
  variables: Ref<string[]>
  onImageUpload?: ImageUploadHandler
  onBrowseAssets?: BrowseAssetsHandler
  mergeTags?: MergeTag[]
}> = Symbol('email-editor-config')
