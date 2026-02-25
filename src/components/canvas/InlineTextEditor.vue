<script setup lang="ts">
/**
 * InlineTextEditor — TipTap overlay for editing mj-text/mj-button content inline.
 * Positioned over the iframe node using the node's bounding rect.
 * On blur/close, the HTML is committed back to the document.
 */
import { ref, watch, onBeforeUnmount, nextTick, inject, computed, markRaw } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { MergeTagExtension } from '../../extensions/merge-tag'
import { EMAIL_EDITOR_CONFIG_KEY } from '../../injection-keys'
import InlineToolbar from './InlineToolbar.vue'

const props = defineProps<{
  content: string
  rect: DOMRect
}>()

const emit = defineEmits<{
  save: [html: string]
  close: []
}>()

const toolbarRef = ref<HTMLDivElement | null>(null)
const config = inject(EMAIL_EDITOR_CONFIG_KEY, undefined)
const mergeTags = computed(() => config?.mergeTags ?? [])

// markRaw prevents Vue from deeply tracking TipTap extension internals
const editorExtensions = markRaw([
  StarterKit.configure({
    heading: { levels: [1, 2, 3, 4] },
  }),
  Link.configure({ openOnClick: false }),
  TextStyle,
  Color,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Underline,
  MergeTagExtension,
])

const editor = useEditor({
  content: props.content,
  extensions: editorExtensions,
  editorProps: {
    attributes: {
      class: 'ebb-inline-editor__content',
    },
  },
  onUpdate: () => {
    // Live update (optional — we commit on close)
  },
})

// Focus the editor when it mounts
watch(editor, (ed) => {
  if (ed) {
    nextTick(() => ed.commands.focus('end'))
  }
}, { immediate: true })

function save() {
  if (!editor.value) return
  emit('save', editor.value.getHTML())
}

function close() {
  save()
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  }
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="ebb-inline-editor-wrapper" @keydown="onKeydown">
    <!-- Floating toolbar above the editor -->
    <div
      ref="toolbarRef"
      class="ebb-inline-editor__toolbar-pos"
      :style="{
        top: Math.max(0, rect.top - 44) + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
      }"
    >
      <InlineToolbar :editor="editor ?? null" :merge-tags="mergeTags" />
    </div>

    <!-- Editor container positioned over the iframe node -->
    <div
      class="ebb-inline-editor"
      :style="{
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        minHeight: rect.height + 'px',
      }"
    >
      <EditorContent v-if="editor" :editor="editor" />
    </div>

    <!-- Backdrop to catch clicks outside -->
    <div class="ebb-inline-editor__backdrop" @click="close"></div>
  </div>
</template>

<style>
.ebb-inline-editor-wrapper {
  position: absolute;
  inset: 0;
  z-index: 20;
}

.ebb-inline-editor__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.ebb-inline-editor__toolbar-pos {
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
}

.ebb-inline-editor {
  position: absolute;
  z-index: 1;
  background: #ffffff;
  border: 2px solid var(--ee-primary);
  border-radius: 4px;
  overflow: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.ebb-inline-editor__content {
  outline: none;
  padding: 4px 8px;
  min-height: 24px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.ebb-inline-editor__content p {
  margin: 0;
}

.ebb-inline-editor__content a {
  color: var(--ee-primary);
  text-decoration: underline;
}

.ebb-inline-editor__content h1,
.ebb-inline-editor__content h2,
.ebb-inline-editor__content h3,
.ebb-inline-editor__content h4 {
  margin: 0;
  line-height: 1.3;
}

/* ─── Merge Tag Chips ─── */
.ebb-merge-tag {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  margin: 0 1px;
  background: rgba(1, 168, 171, 0.12);
  border: 1px solid rgba(1, 168, 171, 0.3);
  border-radius: 3px;
  font-size: 0.9em;
  color: var(--ee-primary, #01A8AB);
  font-weight: 500;
  white-space: nowrap;
  cursor: default;
  user-select: all;
  vertical-align: baseline;
  line-height: 1.4;
}

.ebb-merge-tag:hover {
  background: rgba(1, 168, 171, 0.2);
  border-color: rgba(1, 168, 171, 0.5);
}

.ebb-merge-tag.ProseMirror-selectednode {
  outline: 2px solid var(--ee-primary, #01A8AB);
  outline-offset: 1px;
}
</style>
