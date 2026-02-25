<script setup lang="ts">
/**
 * InlineToolbar — Floating formatting toolbar for the TipTap inline text editor.
 * Positioned above the editing area, shows bold/italic/underline/link/color/align.
 */
import { inject, ref, computed } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import type { MergeTag } from '../../types'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS, type EditorLabels } from '../../labels'
import { EMAIL_EDITOR_CONFIG_KEY } from '../../injection-keys'

const props = defineProps<{
  editor: Editor | null
  mergeTags?: MergeTag[]
}>()

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const config = inject(EMAIL_EDITOR_CONFIG_KEY, undefined)

const showMergeMenu = ref(false)
const showAiMenu = ref(false)
const aiLoading = ref(false)
const showAiPrompt = ref(false)
const aiPromptText = ref('')

const hasAi = computed(() => !!config?.aiProvider)

const mergeTagsByCategory = computed(() => {
  const tags = props.mergeTags ?? []
  if (tags.length === 0) return []
  const groups = new Map<string, MergeTag[]>()
  for (const tag of tags) {
    const cat = tag.category || ''
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(tag)
  }
  return Array.from(groups.entries()).map(([category, items]) => ({ category, items }))
})

function insertMergeTag(tag: MergeTag) {
  if (!props.editor) return
  props.editor.chain().focus().insertMergeTag({ label: tag.name, value: tag.value }).run()
  showMergeMenu.value = false
}

function toggleMergeMenu() {
  showMergeMenu.value = !showMergeMenu.value
  showAiMenu.value = false
}

function toggleAiMenu() {
  showAiMenu.value = !showAiMenu.value
  showMergeMenu.value = false
  showAiPrompt.value = false
}

async function aiAction(action: 'improve' | 'shorten' | 'expand' | 'translate' | 'generate') {
  if (!props.editor || !config?.aiProvider || aiLoading.value) return

  if (action === 'generate') {
    showAiPrompt.value = true
    return
  }

  const selectedText = props.editor.state.doc.textBetween(
    props.editor.state.selection.from,
    props.editor.state.selection.to,
    ' ',
  ) || props.editor.getText()

  if (!selectedText.trim()) return

  aiLoading.value = true
  showAiMenu.value = false

  try {
    const instructions: Record<string, string> = {
      improve: 'Improve this text. Make it clearer and more engaging.',
      shorten: 'Make this text shorter and more concise.',
      expand: 'Expand this text with more detail.',
      translate: 'Translate this text to English if it\'s in another language, or to French if it\'s in English.',
    }

    let result: string | undefined
    if (config.aiProvider.improveText) {
      result = await config.aiProvider.improveText(selectedText, instructions[action])
    } else {
      result = await config.aiProvider.generateText(instructions[action] + '\n\nText: ' + selectedText)
    }

    if (result && props.editor) {
      const { from, to } = props.editor.state.selection
      if (from !== to) {
        props.editor.chain().focus().deleteRange({ from, to }).insertContent(result).run()
      } else {
        props.editor.chain().focus().setContent(result).run()
      }
    }
  } catch {
    // Silently fail — consumer can handle errors in their provider
  } finally {
    aiLoading.value = false
  }
}

async function submitAiPrompt() {
  if (!props.editor || !config?.aiProvider || !aiPromptText.value.trim() || aiLoading.value) return

  aiLoading.value = true
  showAiPrompt.value = false
  showAiMenu.value = false

  try {
    const context = props.editor.getText()
    const result = await config.aiProvider.generateText(aiPromptText.value, context)
    if (result && props.editor) {
      props.editor.chain().focus().insertContent(result).run()
    }
  } catch {
    // Silently fail
  } finally {
    aiLoading.value = false
    aiPromptText.value = ''
  }
}

function resolveLabel(key: string): string {
  return (labels as EditorLabels)[key as keyof EditorLabels] ?? key
}

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
      const url = prompt(resolveLabel('link_url_prompt'), prev || 'https://')
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
  <div v-if="editor" class="ebb-inline-toolbar" role="toolbar" aria-label="Text formatting" @mousedown.prevent>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('bold') }"
      :aria-pressed="isActive('bold')"
      :title="resolveLabel('bold')"
      :aria-label="resolveLabel('bold')"
      @click="toggle('bold')"
    >
      <EIcon name="Bold" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('italic') }"
      :aria-pressed="isActive('italic')"
      :title="resolveLabel('italic')"
      :aria-label="resolveLabel('italic')"
      @click="toggle('italic')"
    >
      <EIcon name="Italic" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('underline') }"
      :aria-pressed="isActive('underline')"
      :title="resolveLabel('underline')"
      :aria-label="resolveLabel('underline')"
      @click="toggle('underline')"
    >
      <EIcon name="Underline" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('strike') }"
      :aria-pressed="isActive('strike')"
      :title="resolveLabel('strikethrough')"
      :aria-label="resolveLabel('strikethrough')"
      @click="toggle('strike')"
    >
      <EIcon name="Strikethrough" :size="14" />
    </button>

    <span class="ebb-inline-toolbar__sep"></span>

    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('link') }"
      :title="resolveLabel('link')"
      :aria-label="resolveLabel('link')"
      @click="toggle('link')"
    >
      <EIcon name="Link" :size="14" />
    </button>
    <button
      v-if="isActive('link')"
      class="ebb-inline-toolbar__btn"
      :title="resolveLabel('unlink')"
      :aria-label="resolveLabel('unlink')"
      @click="toggle('unlink')"
    >
      <EIcon name="Unlink" :size="14" />
    </button>

    <span class="ebb-inline-toolbar__sep"></span>

    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('textAlign', { textAlign: 'left' }) }"
      :aria-pressed="isActive('textAlign', { textAlign: 'left' })"
      :title="resolveLabel('align_text_left')"
      :aria-label="resolveLabel('align_text_left')"
      @click="toggle('align-left')"
    >
      <EIcon name="AlignLeft" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('textAlign', { textAlign: 'center' }) }"
      :aria-pressed="isActive('textAlign', { textAlign: 'center' })"
      :title="resolveLabel('align_text_center')"
      :aria-label="resolveLabel('align_text_center')"
      @click="toggle('align-center')"
    >
      <EIcon name="AlignCenter" :size="14" />
    </button>
    <button
      class="ebb-inline-toolbar__btn"
      :class="{ 'ebb-inline-toolbar__btn--active': isActive('textAlign', { textAlign: 'right' }) }"
      :aria-pressed="isActive('textAlign', { textAlign: 'right' })"
      :title="resolveLabel('align_text_right')"
      :aria-label="resolveLabel('align_text_right')"
      @click="toggle('align-right')"
    >
      <EIcon name="AlignRight" :size="14" />
    </button>

    <span class="ebb-inline-toolbar__sep"></span>

    <label class="ebb-inline-toolbar__color" :title="resolveLabel('text_color_label')">
      <EIcon name="Palette" :size="14" />
      <input type="color" :aria-label="resolveLabel('text_color_label')" @input="setColor" />
    </label>

    <!-- Merge Tags -->
    <template v-if="mergeTags && mergeTags.length > 0">
      <span class="ebb-inline-toolbar__sep"></span>
      <div class="ebb-inline-toolbar__merge-wrap">
        <button
          class="ebb-inline-toolbar__btn"
          :class="{ 'ebb-inline-toolbar__btn--active': showMergeMenu }"
          :title="resolveLabel('insert_merge_tag')"
          :aria-label="resolveLabel('insert_merge_tag')"
          :aria-expanded="showMergeMenu"
          aria-haspopup="true"
          @click="toggleMergeMenu"
        >
          <EIcon name="Tags" :size="14" />
        </button>
        <div v-if="showMergeMenu" class="ebb-merge-menu" role="menu" @mousedown.prevent>
          <template v-for="group in mergeTagsByCategory" :key="group.category">
            <div v-if="group.category" class="ebb-merge-menu__category">{{ group.category }}</div>
            <button
              v-for="tag in group.items"
              :key="tag.value"
              class="ebb-merge-menu__item"
              role="menuitem"
              @click="insertMergeTag(tag)"
            >
              <span class="ebb-merge-menu__name">{{ tag.name }}</span>
              <span class="ebb-merge-menu__value">{{ tag.value }}</span>
            </button>
          </template>
        </div>
      </div>
    </template>

    <!-- AI Actions -->
    <template v-if="hasAi">
      <span class="ebb-inline-toolbar__sep"></span>
      <div class="ebb-inline-toolbar__ai-wrap">
        <button
          class="ebb-inline-toolbar__btn ebb-inline-toolbar__btn--ai"
          :class="{ 'ebb-inline-toolbar__btn--active': showAiMenu, 'ebb-inline-toolbar__btn--loading': aiLoading }"
          :title="resolveLabel('ai_generate')"
          :aria-label="resolveLabel('ai_generate')"
          :disabled="aiLoading"
          @click="toggleAiMenu"
        >
          <EIcon :name="aiLoading ? 'Loader2' : 'Sparkles'" :size="14" />
        </button>
        <div v-if="showAiMenu && !aiLoading" class="ebb-ai-menu" role="menu" @mousedown.prevent>
          <button class="ebb-ai-menu__item" role="menuitem" @click="aiAction('generate')">
            <EIcon name="Sparkles" :size="12" />
            {{ resolveLabel('ai_generate') }}
          </button>
          <button class="ebb-ai-menu__item" role="menuitem" @click="aiAction('improve')">
            <EIcon name="Wand2" :size="12" />
            {{ resolveLabel('ai_improve') }}
          </button>
          <button class="ebb-ai-menu__item" role="menuitem" @click="aiAction('shorten')">
            <EIcon name="Minimize2" :size="12" />
            {{ resolveLabel('ai_shorten') }}
          </button>
          <button class="ebb-ai-menu__item" role="menuitem" @click="aiAction('expand')">
            <EIcon name="Maximize2" :size="12" />
            {{ resolveLabel('ai_expand') }}
          </button>
          <button class="ebb-ai-menu__item" role="menuitem" @click="aiAction('translate')">
            <EIcon name="Languages" :size="12" />
            {{ resolveLabel('ai_translate') }}
          </button>
          <!-- Prompt input -->
          <div v-if="showAiPrompt" class="ebb-ai-menu__prompt">
            <input
              v-model="aiPromptText"
              class="ebb-ai-menu__prompt-input"
              :placeholder="resolveLabel('ai_prompt_placeholder')"
              @keydown.enter="submitAiPrompt"
              @keydown.stop
            />
            <button class="ebb-ai-menu__prompt-btn" :disabled="!aiPromptText.trim()" @click="submitAiPrompt">
              <EIcon name="Send" :size="12" />
            </button>
          </div>
        </div>
      </div>
    </template>
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
  color: var(--ee-primary);
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

/* ─── Merge Tag Dropdown ─── */
.ebb-inline-toolbar__merge-wrap {
  position: relative;
}

.ebb-merge-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 200px;
  max-height: 240px;
  overflow-y: auto;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  padding: 4px;
  z-index: 10;
}

.ebb-merge-menu__category {
  padding: 6px 10px 2px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
}

.ebb-merge-menu__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 6px 10px;
  border: none;
  background: transparent;
  color: #d1d5db;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  text-align: left;
}

.ebb-merge-menu__item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.ebb-merge-menu__name {
  flex: 1;
  white-space: nowrap;
}

.ebb-merge-menu__value {
  font-family: monospace;
  font-size: 10px;
  color: #6b7280;
  white-space: nowrap;
}

/* ─── AI Menu ─── */
.ebb-inline-toolbar__ai-wrap {
  position: relative;
}

.ebb-inline-toolbar__btn--ai {
  color: #a78bfa;
}

.ebb-inline-toolbar__btn--ai:hover {
  color: #c4b5fd;
  background: rgba(167, 139, 250, 0.15);
}

.ebb-inline-toolbar__btn--loading {
  opacity: 0.6;
  cursor: wait;
  animation: ebb-ai-spin 1s linear infinite;
}

@keyframes ebb-ai-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ebb-ai-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 180px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  padding: 4px;
  z-index: 10;
}

.ebb-ai-menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 10px;
  border: none;
  background: transparent;
  color: #d1d5db;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  text-align: left;
}

.ebb-ai-menu__item:hover {
  background: rgba(167, 139, 250, 0.15);
  color: #ffffff;
}

.ebb-ai-menu__prompt {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-top: 1px solid #374151;
  margin-top: 4px;
}

.ebb-ai-menu__prompt-input {
  flex: 1;
  padding: 5px 8px;
  border: 1px solid #4b5563;
  border-radius: 4px;
  background: #111827;
  color: #e5e7eb;
  font-size: 11px;
  outline: none;
}

.ebb-ai-menu__prompt-input:focus {
  border-color: #a78bfa;
}

.ebb-ai-menu__prompt-input::placeholder {
  color: #6b7280;
}

.ebb-ai-menu__prompt-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: none;
  background: #a78bfa;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
}

.ebb-ai-menu__prompt-btn:hover {
  background: #8b5cf6;
}

.ebb-ai-menu__prompt-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
