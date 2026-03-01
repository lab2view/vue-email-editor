<script setup lang="ts">
import { ref, inject, nextTick, watch, computed } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS } from '../../labels'
import { EMAIL_DOCUMENT_KEY, EMAIL_EDITOR_CONFIG_KEY } from '../../injection-keys'
import { useAiChat } from '../../composables/useAiChat'
import type { AiAttachment } from '../../types'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ACCEPTED_TYPES = 'image/png,image/jpeg,image/gif,image/webp,image/svg+xml,application/pdf'

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const doc = inject(EMAIL_DOCUMENT_KEY)!
const config = inject(EMAIL_EDITOR_CONFIG_KEY)!

const chat = useAiChat(config.aiProvider!, doc.document, doc.replaceDocument, {
  mergeTags: config.mergeTags,
})

const inputText = ref('')
const messagesContainer = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const pendingAttachments = ref<AiAttachment[]>([])
const attachError = ref<string | null>(null)
const activeTab = ref<'chat' | 'preview'>('chat')

const hasMessages = computed(() => chat.messages.value.length > 0)
const hasPreview = computed(() => !!chat.lastGeneratedTemplate.value)

const suggestions = [
  'Create a professional newsletter',
  'Design a welcome email for a SaaS product',
  'Promotional email with 30% discount',
  'Event invitation with modern design',
]

async function handleSend() {
  const text = inputText.value.trim()
  if (!text || chat.isGenerating.value) return
  const attachments = pendingAttachments.value.length > 0 ? [...pendingAttachments.value] : undefined
  inputText.value = ''
  pendingAttachments.value = []
  attachError.value = null
  await chat.sendMessage(text, attachments)
  scrollToBottom()
}

function handleSuggestion(suggestion: string) {
  inputText.value = suggestion
  handleSend()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function openFilePicker() {
  fileInput.value?.click()
}

async function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const files = input.files
  if (!files || files.length === 0) return

  attachError.value = null

  for (const file of Array.from(files)) {
    if (file.size > MAX_FILE_SIZE) {
      attachError.value = labels.ai_chat_file_too_large
      continue
    }

    try {
      const base64 = await readFileAsBase64(file)
      pendingAttachments.value.push({
        mimeType: file.type,
        data: base64,
        name: file.name,
      })
    } catch {
      attachError.value = 'Failed to read file'
    }
  }

  // Reset input so the same file can be selected again
  input.value = ''
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Strip the data:...;base64, prefix
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function removeAttachment(index: number) {
  pendingAttachments.value.splice(index, 1)
}

function getAttachmentPreviewUrl(att: AiAttachment): string | null {
  if (att.mimeType.startsWith('image/')) {
    return `data:${att.mimeType};base64,${att.data}`
  }
  return null
}

watch(() => chat.messages.value.length, scrollToBottom)
watch(() => chat.streamBuffer.value, scrollToBottom)
watch(() => chat.lastGeneratedTemplate.value, (val) => {
  activeTab.value = val ? 'preview' : 'chat'
})
</script>

<template>
  <div class="ebb-ai-chat">
    <!-- Tab bar: only visible when a preview is available -->
    <div v-if="hasPreview" class="ebb-ai-chat__tabs">
      <button
        class="ebb-ai-chat__tab"
        :class="{ 'ebb-ai-chat__tab--active': activeTab === 'chat' }"
        @click="activeTab = 'chat'"
      >
        {{ labels.ai_chat }}
      </button>
      <button
        class="ebb-ai-chat__tab"
        :class="{ 'ebb-ai-chat__tab--active': activeTab === 'preview' }"
        @click="activeTab = 'preview'"
      >
        {{ labels.ai_chat_preview }}
      </button>
    </div>

    <!-- Preview panel -->
    <div v-if="hasPreview && activeTab === 'preview'" class="ebb-ai-chat__preview">
      <iframe
        class="ebb-ai-chat__preview-iframe"
        :srcdoc="chat.previewHtml.value"
        sandbox="allow-same-origin"
        :title="labels.ai_chat_preview_hint"
      ></iframe>
      <div class="ebb-ai-chat__actions">
        <button class="ebb-ai-chat__action-apply" @click="chat.applyTemplate()">
          <EIcon name="Check" :size="13" />
          {{ labels.ai_chat_apply }}
        </button>
        <span class="ebb-ai-chat__actions-sep"></span>
        <button class="ebb-ai-chat__action-discard" @click="chat.discardTemplate()">
          <EIcon name="X" :size="13" />
          {{ labels.ai_chat_discard }}
        </button>
      </div>
    </div>

    <!-- Messages area (hidden when preview tab is active) -->
    <div v-show="!hasPreview || activeTab === 'chat'" ref="messagesContainer" class="ebb-ai-chat__messages">
      <!-- Welcome state -->
      <div v-if="!hasMessages && !chat.isGenerating.value" class="ebb-ai-chat__welcome">
        <div class="ebb-ai-chat__welcome-icon">
          <EIcon name="Sparkles" :size="20" />
        </div>
        <p class="ebb-ai-chat__welcome-title">{{ labels.ai_chat_welcome }}</p>
        <p class="ebb-ai-chat__welcome-hint">{{ labels.ai_chat_welcome_hint }}</p>
        <div class="ebb-ai-chat__suggestions">
          <button
            v-for="s in suggestions"
            :key="s"
            class="ebb-ai-chat__suggestion"
            @click="handleSuggestion(s)"
          >
            {{ s }}
          </button>
        </div>
      </div>

      <!-- Message list -->
      <template v-for="(msg, i) in chat.messages.value" :key="i">
        <div
          class="ebb-ai-chat__msg"
          :class="msg.role === 'user' ? 'ebb-ai-chat__msg--user' : 'ebb-ai-chat__msg--assistant'"
        >
          <!-- Attachment thumbnails -->
          <div v-if="msg.attachments && msg.attachments.length > 0" class="ebb-ai-chat__attachments">
            <div
              v-for="(att, j) in msg.attachments"
              :key="j"
              class="ebb-ai-chat__attachment-thumb"
            >
              <img
                v-if="att.mimeType.startsWith('image/')"
                :src="`data:${att.mimeType};base64,${att.data}`"
                :alt="att.name || 'Attachment'"
                class="ebb-ai-chat__attachment-img"
              />
              <div v-else class="ebb-ai-chat__attachment-file">
                <EIcon name="FileText" :size="14" />
                <span>{{ att.name || 'Document' }}</span>
              </div>
            </div>
          </div>
          <span class="ebb-ai-chat__msg-text">{{ msg.content }}</span>
        </div>
      </template>

      <!-- Apply/discard bar inline in chat when preview is available -->
      <div v-if="hasPreview && activeTab === 'chat'" class="ebb-ai-chat__actions">
        <button class="ebb-ai-chat__action-apply" @click="chat.applyTemplate()">
          <EIcon name="Check" :size="13" />
          {{ labels.ai_chat_apply }}
        </button>
        <span class="ebb-ai-chat__actions-sep"></span>
        <button class="ebb-ai-chat__action-discard" @click="chat.discardTemplate()">
          <EIcon name="X" :size="13" />
          {{ labels.ai_chat_discard }}
        </button>
      </div>

      <!-- Generating indicator -->
      <div v-if="chat.isGenerating.value" class="ebb-ai-chat__thinking">
        <span class="ebb-ai-chat__spinner"></span>
        <span>{{ labels.ai_chat_thinking }}</span>
      </div>

      <!-- Error state -->
      <div v-if="chat.error.value" class="ebb-ai-chat__error">
        <EIcon name="AlertCircle" :size="14" />
        <span class="ebb-ai-chat__error-text">{{ chat.error.value }}</span>
        <button class="ebb-ai-chat__error-retry" @click="chat.retry()">
          <EIcon name="RotateCcw" :size="12" />
          {{ labels.ai_chat_retry }}
        </button>
      </div>
    </div>

    <!-- Input area -->
    <div class="ebb-ai-chat__input-area">
      <!-- Pending attachments preview -->
      <div v-if="pendingAttachments.length > 0" class="ebb-ai-chat__pending">
        <div
          v-for="(att, idx) in pendingAttachments"
          :key="idx"
          class="ebb-ai-chat__pending-item"
        >
          <img
            v-if="getAttachmentPreviewUrl(att)"
            :src="getAttachmentPreviewUrl(att)!"
            :alt="att.name || 'Preview'"
            class="ebb-ai-chat__pending-img"
          />
          <div v-else class="ebb-ai-chat__pending-file">
            <EIcon name="FileText" :size="14" />
          </div>
          <span class="ebb-ai-chat__pending-name">{{ att.name }}</span>
          <button class="ebb-ai-chat__pending-remove" @click="removeAttachment(idx)">
            <EIcon name="X" :size="10" />
          </button>
        </div>
      </div>

      <!-- Attach error -->
      <div v-if="attachError" class="ebb-ai-chat__attach-error">
        {{ attachError }}
      </div>

      <div class="ebb-ai-chat__input-row">
        <textarea
          v-model="inputText"
          class="ebb-ai-chat__textarea"
          :placeholder="labels.ai_chat_placeholder"
          rows="1"
          :disabled="chat.isGenerating.value"
          @keydown="handleKeydown"
        ></textarea>
        <div class="ebb-ai-chat__input-buttons">
          <button
            class="ebb-ai-chat__icon-btn"
            :title="labels.ai_chat_attach"
            :disabled="chat.isGenerating.value"
            @click="openFilePicker"
          >
            <EIcon name="ImagePlus" :size="14" />
          </button>
          <button
            class="ebb-ai-chat__icon-btn ebb-ai-chat__icon-btn--send"
            :disabled="!inputText.trim() || chat.isGenerating.value"
            @click="handleSend"
          >
            <EIcon name="ArrowUp" :size="14" />
          </button>
        </div>
      </div>

      <div v-if="hasMessages" class="ebb-ai-chat__footer">
        <button class="ebb-ai-chat__new-btn" @click="chat.clearConversation()">
          <EIcon name="Plus" :size="12" />
          {{ labels.ai_chat_new }}
        </button>
      </div>

      <!-- Hidden file input -->
      <input
        ref="fileInput"
        type="file"
        :accept="ACCEPTED_TYPES"
        multiple
        style="display: none"
        @change="handleFileSelect"
      />
    </div>
  </div>
</template>

<style>
.ebb-ai-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--ee-bg, #ffffff);
}

/* ─── Tabs ─── */
.ebb-ai-chat__tabs {
  display: flex;
  flex-shrink: 0;
  border-bottom: 1px solid var(--ee-border, #e5e7eb);
}

.ebb-ai-chat__tab {
  flex: 1;
  padding: 8px 0;
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  text-align: center;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  color: var(--ee-text-muted, #9ca3af);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.ebb-ai-chat__tab:hover {
  color: var(--ee-text-secondary, #6b7280);
}

.ebb-ai-chat__tab--active {
  color: var(--ee-primary);
  border-bottom-color: var(--ee-primary);
}

/* ─── Actions (apply / discard) ─── */
.ebb-ai-chat__actions {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 8px 12px;
  border-top: 1px solid var(--ee-border, #e5e7eb);
}

.ebb-ai-chat__actions-sep {
  width: 1px;
  height: 14px;
  background: var(--ee-border, #e5e7eb);
  margin: 0 4px;
}

.ebb-ai-chat__action-apply,
.ebb-ai-chat__action-discard {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  border: none;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  transition: background 0.15s ease;
}

.ebb-ai-chat__action-apply {
  color: var(--ee-primary);
}

.ebb-ai-chat__action-apply:hover {
  background: var(--ee-bg-hover, #f9fafb);
}

.ebb-ai-chat__action-discard {
  color: var(--ee-text-muted, #9ca3af);
}

.ebb-ai-chat__action-discard:hover {
  color: var(--ee-error, #ef4444);
  background: #fef2f2;
}

html[data-theme='dark'] .ebb-ai-chat__action-discard:hover {
  background: #450a0a;
}

/* ─── Preview ─── */
.ebb-ai-chat__preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ebb-ai-chat__preview-iframe {
  flex: 1;
  width: 100%;
  border: none;
  background: #ffffff;
}


/* ─── Messages ─── */
.ebb-ai-chat__messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ebb-ai-chat__messages::-webkit-scrollbar {
  width: 4px;
}

.ebb-ai-chat__messages::-webkit-scrollbar-thumb {
  background: var(--ee-border-hover, #d1d5db);
  border-radius: 2px;
}

/* ─── Welcome ─── */
.ebb-ai-chat__welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 12px 12px;
  gap: 4px;
}

.ebb-ai-chat__welcome-icon {
  color: var(--ee-primary);
  margin-bottom: 8px;
}

.ebb-ai-chat__welcome-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--ee-text-primary, #1f2937);
  margin: 0;
}

.ebb-ai-chat__welcome-hint {
  font-size: 11px;
  color: var(--ee-text-muted, #9ca3af);
  margin: 0;
  line-height: 1.5;
}

.ebb-ai-chat__suggestions {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
  width: 100%;
}

.ebb-ai-chat__suggestion {
  width: 100%;
  padding: 8px 10px;
  font-size: 12px;
  font-family: inherit;
  text-align: left;
  border: 1px solid var(--ee-border, #e5e7eb);
  border-radius: 6px;
  background: var(--ee-bg, #ffffff);
  color: var(--ee-text-secondary, #6b7280);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
  line-height: 1.4;
}

.ebb-ai-chat__suggestion:hover {
  border-color: var(--ee-primary);
  color: var(--ee-primary);
}

/* ─── Messages ─── */
.ebb-ai-chat__msg {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 0;
  font-size: 12px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  border-left: 2px solid transparent;
}

.ebb-ai-chat__msg--user {
  color: var(--ee-text-primary, #1f2937);
  border-left-color: var(--ee-primary);
  background: none;
}

.ebb-ai-chat__msg--assistant {
  color: var(--ee-text-secondary, #6b7280);
  border-left-color: var(--ee-border, #e5e7eb);
  background: none;
}

.ebb-ai-chat__msg-text {
  display: block;
}


/* ─── Attachments in messages ─── */
.ebb-ai-chat__attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 2px;
}

.ebb-ai-chat__attachment-thumb {
  overflow: hidden;
  border-radius: 4px;
}

.ebb-ai-chat__attachment-img {
  display: block;
  max-width: 140px;
  max-height: 90px;
  border-radius: 4px;
  object-fit: cover;
}

.ebb-ai-chat__attachment-file {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  font-size: 11px;
}

html[data-theme='dark'] .ebb-ai-chat__attachment-file {
  background: rgba(255, 255, 255, 0.08);
}

/* ─── Thinking ─── */
.ebb-ai-chat__thinking {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  font-size: 12px;
  color: var(--ee-text-muted, #9ca3af);
}

.ebb-ai-chat__spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--ee-border, #e5e7eb);
  border-top-color: var(--ee-primary);
  animation: ebb-ai-spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes ebb-ai-spin {
  to { transform: rotate(360deg); }
}

/* ─── Error ─── */
.ebb-ai-chat__error {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 12px;
  color: var(--ee-error, #ef4444);
  background: #fef2f2;
}

html[data-theme='dark'] .ebb-ai-chat__error {
  background: #450a0a;
}

.ebb-ai-chat__error-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ebb-ai-chat__error-retry {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 500;
  font-family: inherit;
  border: none;
  border-radius: 4px;
  background: none;
  color: var(--ee-error, #ef4444);
  cursor: pointer;
  flex-shrink: 0;
}

.ebb-ai-chat__error-retry:hover {
  background: #fee2e2;
}

html[data-theme='dark'] .ebb-ai-chat__error-retry:hover {
  background: #7f1d1d;
}

/* ─── Input area ─── */
.ebb-ai-chat__input-area {
  border-top: 1px solid var(--ee-border, #e5e7eb);
  padding: 10px 12px;
  flex-shrink: 0;
}

/* ─── Pending attachments ─── */
.ebb-ai-chat__pending {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 8px;
}

.ebb-ai-chat__pending-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  background: var(--ee-bg-hover, #f3f4f6);
  border: 1px solid var(--ee-border, #e5e7eb);
  border-radius: 6px;
  font-size: 11px;
  color: var(--ee-text-secondary, #6b7280);
}

.ebb-ai-chat__pending-img {
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 3px;
  flex-shrink: 0;
}

.ebb-ai-chat__pending-file {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ee-text-muted, #9ca3af);
}

.ebb-ai-chat__pending-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
}

.ebb-ai-chat__pending-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--ee-text-muted, #9ca3af);
  cursor: pointer;
  padding: 0;
}

.ebb-ai-chat__pending-remove:hover {
  color: var(--ee-error, #ef4444);
}

.ebb-ai-chat__attach-error {
  font-size: 11px;
  color: var(--ee-error, #ef4444);
  margin-bottom: 6px;
}

.ebb-ai-chat__input-row {
  display: flex;
  align-items: flex-end;
  gap: 0;
  border: 1px solid var(--ee-border, #e5e7eb);
  border-radius: 20px;
  background: var(--ee-bg-hover, #f9fafb);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ebb-ai-chat__input-row:focus-within {
  border-color: var(--ee-primary);
  background: var(--ee-bg, #ffffff);
}

.ebb-ai-chat__textarea {
  flex: 1;
  resize: none;
  border: none;
  padding: 8px 2px 8px 14px;
  font-size: 12px;
  font-family: inherit;
  line-height: 1.4;
  outline: none;
  background: transparent;
  color: var(--ee-text-primary, #1f2937);
  min-height: 18px;
  max-height: 100px;
}

.ebb-ai-chat__textarea::placeholder {
  color: var(--ee-text-muted, #b0b5bf);
}

.ebb-ai-chat__input-buttons {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  flex-shrink: 0;
}

.ebb-ai-chat__icon-btn {
  width: 26px;
  height: 26px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: var(--ee-text-muted, #9ca3af);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s ease, background 0.15s ease;
}

.ebb-ai-chat__icon-btn:hover:not(:disabled) {
  color: var(--ee-text-secondary, #6b7280);
  background: var(--ee-bg-hover, #f3f4f6);
}

.ebb-ai-chat__icon-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.ebb-ai-chat__icon-btn--send {
  background: var(--ee-primary);
  color: #ffffff;
  border-radius: 50%;
}

.ebb-ai-chat__icon-btn--send:hover:not(:disabled) {
  background: var(--ee-primary-hover);
  color: #ffffff;
}

.ebb-ai-chat__icon-btn--send:disabled {
  opacity: 0.3;
}

/* ─── Footer (new conversation) ─── */
.ebb-ai-chat__footer {
  display: flex;
  justify-content: center;
  margin-top: 6px;
}

.ebb-ai-chat__new-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 500;
  font-family: inherit;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: var(--ee-text-muted, #b0b5bf);
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}

.ebb-ai-chat__new-btn:hover {
  color: var(--ee-text-secondary, #6b7280);
  background: var(--ee-bg-hover, #f3f4f6);
}
</style>
