<script setup lang="ts">
/**
 * CodeEditor — CodeMirror 6 editor for viewing/editing raw MJML source.
 * Two-way sync: user edits MJML → parse back to EmailDocument → re-render canvas.
 */
import { ref, inject, onMounted, onBeforeUnmount, watch } from 'vue'
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'
import { EMAIL_DOCUMENT_KEY } from '../../injection-keys'
import { documentToMjml } from '../../serializer/json-to-mjml'
import { mjmlToDocument } from '../../serializer/mjml-to-json'

const doc = inject(EMAIL_DOCUMENT_KEY)!

const editorContainer = ref<HTMLDivElement | null>(null)
let view: EditorView | null = null
let ignoreNextUpdate = false

function getMjml(): string {
  return documentToMjml(doc.document.value)
}

function createEditor(container: HTMLElement) {
  const state = EditorState.create({
    doc: getMjml(),
    extensions: [
      lineNumbers(),
      highlightActiveLine(),
      keymap.of([...defaultKeymap, indentWithTab]),
      xml(),
      oneDark,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          ignoreNextUpdate = true
          const mjmlSource = update.state.doc.toString()
          try {
            const newDoc = mjmlToDocument(mjmlSource)
            doc.replaceDocument(newDoc)
          } catch {
            // Invalid MJML — ignore until user fixes it
          }
        }
      }),
      EditorView.theme({
        '&': { height: '100%', fontSize: '13px' },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': { fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },
      }),
    ],
  })

  view = new EditorView({ state, parent: container })
}

// Sync document changes back to the editor (e.g. undo/redo from visual mode)
watch(
  () => doc.document.value,
  () => {
    if (ignoreNextUpdate) {
      ignoreNextUpdate = false
      return
    }
    if (!view) return
    const newMjml = getMjml()
    const currentMjml = view.state.doc.toString()
    if (newMjml !== currentMjml) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: newMjml },
      })
    }
  },
  { deep: true },
)

onMounted(() => {
  if (editorContainer.value) {
    createEditor(editorContainer.value)
  }
})

onBeforeUnmount(() => {
  view?.destroy()
  view = null
})
</script>

<template>
  <div ref="editorContainer" class="ebb-code-editor"></div>
</template>

<style>
.ebb-code-editor {
  flex: 1;
  overflow: hidden;
  background: #282c34;
}

.ebb-code-editor .cm-editor {
  height: 100%;
}
</style>
