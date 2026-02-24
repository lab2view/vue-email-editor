<script setup lang="ts">
/**
 * InlineToolbar — Floating formatting toolbar for the TipTap inline text editor.
 * Positioned above the editing area, shows bold/italic/underline/link/color/align.
 */
import type { Editor } from '@tiptap/vue-3'
import EIcon from '../internal/EIcon.vue'

const props = defineProps<{
  editor: Editor | null
}>()

function toggle(command: string) {
  if (!props.editor) return
  switch (command) {
    case 'bold':
      props.editor.chain().focus().toggleBold().run()
      break
    case 'italic':
      props.editor.chain().focus().toggleItalic().run()
      break
    case 'underline':
      props.editor.chain().focus().toggleUnderline().run()
      break
    case 'strike':
      props.editor.chain().focus().toggleStrike().run()
      break
    case 'link': {
      const prev = props.editor.getAttributes('link').href
      const url = prompt('URL du lien :', prev || 'https://')
      if (url === null) return
      if (url === '') {
        props.editor.chain().focus().unsetLink().run()
      } else {
        props.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
      }
      break
    }
    case 'unlink':
      props.editor.chain().focus().unsetLink().run()
      break
    case 'align-left':
      props.editor.chain().focus().setTextAlign('left').run()
      break
    case 'align-center':
      props.editor.chain().focus().setTextAlign('center').run()
      break
    case 'align-right':
      props.editor.chain().focus().setTextAlign('right').run()
      break
  }
}

function setColor(e: Event) {
  const target = e.target as HTMLInputElement
  if (!props.editor) return
  props.editor.chain().focus().setColor(target.value).run()
}

function isActive(name: string, attrs?: Record<string, unknown>): boolean {
  if (!props.editor) return false
  return props.editor.isActive(name, attrs)
}
</script>

<template>
  <div v-if="editor" class="ebb-inline-toolbar" @mousedown.prevent>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('bold') }"
      title="Gras"
      @click="toggle('bold')"
    >
      <EIcon name="Bold" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('italic') }"
      title="Italique"
      @click="toggle('italic')"
    >
      <EIcon name="Italic" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('underline') }"
      title="Souligné"
      @click="toggle('underline')"
    >
      <EIcon name="Underline" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('strike') }"
      title="Barré"
      @click="toggle('strike')"
    >
      <EIcon name="Strikethrough" :size="14" />
    </button>

    <span class="ebb-inline-toolbar__sep"></span>

    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('link') }"
      title="Lien"
      @click="toggle('link')"
    >
      <EIcon name="Link" :size="14" />
    </button>
    <button
      v-if="isActive('link')"
      class="ebb-inline-toolbar__btn"
      title="Supprimer le lien"
      @click="toggle('unlink')"
    >
      <EIcon name="Unlink" :size="14" />
    </button>

    <span class="ebb-inline-toolbar__sep"></span>

    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('textAlign', { textAlign: 'left' }) }"
      title="Aligner à gauche"
      @click="toggle('align-left')"
    >
      <EIcon name="AlignLeft" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('textAlign', { textAlign: 'center' }) }"
      title="Centrer"
      @click="toggle('align-center')"
    >
      <EIcon name="AlignCenter" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('textAlign', { textAlign: 'right' }) }"
      title="Aligner à droite"
      @click="toggle('align-right')"
    >
      <EIcon name="AlignRight" :size="14" />
    </button>

    <span class="ebb-inline-toolbar__sep"></span>

    <label class="ebb-inline-toolbar__color" title="Couleur du texte">
      <EIcon name="Palette" :size="14" />
      <input type="color" @input="setColor" />
    </label>
  </div>
</template>

<style>
.ebb-inline-toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  background: #1f2937;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  user-select: none;
}

.ebb-inline-toolbar__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #d1d5db;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.1s ease;
}

.ebb-inline-toolbar__btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.ebb-inline-toolbar__btn--active {
  background: rgba(1, 168, 171, 0.3);
  color: #01A8AB;
}

.ebb-inline-toolbar__sep {
  width: 1px;
  height: 18px;
  background: #374151;
  margin: 0 2px;
}

.ebb-inline-toolbar__color {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: #d1d5db;
  position: relative;
}

.ebb-inline-toolbar__color:hover {
  color: #ffffff;
}

.ebb-inline-toolbar__color input[type='color'] {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>
