import type { InjectionKey } from 'vue'

export interface EditorLabels {
  blocks: string
  styles: string
  layers: string
  search_blocks: string
  undo: string
  redo: string
  editor_title: string
  code: string
  fullscreen: string
  desktop: string
  tablet: string
  mobile: string
  init_error: string
  templates: string
}

export const DEFAULT_LABELS: EditorLabels = {
  blocks: 'Blocks',
  styles: 'Styles',
  layers: 'Layers',
  search_blocks: 'Search blocks...',
  undo: 'Undo',
  redo: 'Redo',
  editor_title: 'Email Editor',
  code: 'Code',
  fullscreen: 'Fullscreen',
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
  init_error: 'Editor initialization error',
  templates: 'Templates',
}

export const EMAIL_LABELS_KEY: InjectionKey<EditorLabels> = Symbol('email-labels')
