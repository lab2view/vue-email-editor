import { ref, type Ref } from 'vue'
import type { AiProvider, AiChatMessage, AiAttachment, EmailDocument, MergeTag } from '../types'
import { buildTemplateSystemPrompt } from '../ai/system-prompt'
import { parseAiTemplateResponse, AiParseError } from '../ai/parse-ai-response'
import { documentToMjml } from '../serializer/json-to-mjml'
import { compileMjml } from './useMjmlCompiler'

export interface UseAiChatOptions {
  mergeTags?: MergeTag[]
  promptPrefix?: string
  promptSuffix?: string
}

export interface UseAiChatReturn {
  messages: Ref<AiChatMessage[]>
  isGenerating: Ref<boolean>
  error: Ref<string | null>
  lastGeneratedTemplate: Ref<EmailDocument | null>
  previewHtml: Ref<string>
  streamBuffer: Ref<string>
  sendMessage: (userMessage: string, attachments?: AiAttachment[]) => Promise<void>
  applyTemplate: () => void
  discardTemplate: () => void
  clearConversation: () => void
  retry: () => Promise<void>
}

/**
 * Heuristic: detect if the AI response is a JSON template or a conversational text reply.
 * We check multiple signals to be robust against different AI models.
 */
function looksLikeJson(raw: string): boolean {
  const trimmed = raw.trim()
  // Direct JSON object
  if (trimmed.startsWith('{')) return true
  // JSON inside a code fence
  if (/```(?:json)?\s*\n?\s*\{/.test(trimmed)) return true
  // Check if there's a JSON block anywhere in the response that looks like our schema
  // Search the entire response, not just the first 100 chars — the AI often puts text before JSON
  if (trimmed.includes('"version"') && trimmed.includes('"body"') && trimmed.includes('"mj-body"')) {
    return true
  }
  if (trimmed.includes('"headAttributes"') && trimmed.includes('"mj-body"')) {
    return true
  }
  return false
}

/**
 * Detect if the current document has real content (not just an empty body).
 */
function hasTemplateContent(doc: EmailDocument): boolean {
  return doc.body.children.length > 0
}

export function useAiChat(
  aiProvider: AiProvider,
  document: Ref<EmailDocument>,
  replaceDocument: (doc: EmailDocument) => void,
  options?: UseAiChatOptions,
): UseAiChatReturn {
  const messages = ref<AiChatMessage[]>([])
  const isGenerating = ref(false)
  const error = ref<string | null>(null)
  const lastGeneratedTemplate = ref<EmailDocument | null>(null)
  const previewHtml = ref('')
  const streamBuffer = ref('')
  let lastUserMessage = ''
  let lastUserAttachments: AiAttachment[] | undefined

  function buildSystemPrompt(): string {
    return buildTemplateSystemPrompt({
      mergeTags: options?.mergeTags,
      promptPrefix: options?.promptPrefix,
      promptSuffix: options?.promptSuffix,
    })
  }

  function buildMessages(): AiChatMessage[] {
    const allMessages = [...messages.value]

    // Determine which template the AI should use as the refinement base.
    // Priority: lastGeneratedTemplate (previewed but not yet applied) > editor document.
    // This is critical: when the user asks to refine a previewed template,
    // we must send THAT template as context, not the old editor document.
    const referenceDoc = lastGeneratedTemplate.value ?? document.value
    if (hasTemplateContent(referenceDoc)) {
      const docJson = JSON.stringify(referenceDoc, null, 2)
      const label = lastGeneratedTemplate.value
        ? 'CURRENT_PREVIEW_TEMPLATE_JSON — This is the template you just generated that is being previewed. The user wants to refine THIS template. Make ONLY the requested changes and return the complete updated JSON.'
        : 'CURRENT_TEMPLATE_JSON — This is the template currently loaded in the editor. When I ask for changes, modify this and return the complete updated JSON. When I ask for a completely new template, ignore this and create from scratch.'
      const contextMessage: AiChatMessage = {
        role: 'user',
        content: `[${label}]\n\n${docJson}`,
      }
      // Insert the context before the last user message
      allMessages.splice(allMessages.length - 1, 0, contextMessage)
    }

    return allMessages
  }

  /**
   * Summarize what was generated for the chat bubble.
   */
  function summarizeTemplate(doc: EmailDocument): string {
    const sections = doc.body.children.length
    const images = countNodesByType(doc.body, 'mj-image')
    const buttons = countNodesByType(doc.body, 'mj-button')
    const parts = [`${sections} section${sections !== 1 ? 's' : ''}`]
    if (images > 0) parts.push(`${images} image${images !== 1 ? 's' : ''}`)
    if (buttons > 0) parts.push(`${buttons} button${buttons !== 1 ? 's' : ''}`)
    return parts.join(', ')
  }

  function countNodesByType(node: { type: string; children?: { type: string; children?: unknown[] }[] }, type: string): number {
    let count = node.type === type ? 1 : 0
    if (node.children) {
      for (const child of node.children) {
        count += countNodesByType(child as { type: string; children?: { type: string; children?: unknown[] }[] }, type)
      }
    }
    return count
  }

  /** Call the AI provider and return the raw response string */
  async function callAi(chatMessages: AiChatMessage[], systemPrompt: string): Promise<string> {
    if (aiProvider.generateTemplateStream) {
      let buffer = ''
      for await (const chunk of aiProvider.generateTemplateStream(chatMessages, systemPrompt)) {
        buffer += chunk
        streamBuffer.value = buffer
      }
      return buffer
    } else {
      return await aiProvider.generateTemplate!(chatMessages, systemPrompt)
    }
  }

  /** Handle a successful template parse: compile preview + push summary message */
  async function handleTemplateSuccess(parsed: EmailDocument, wasRefinement: boolean): Promise<void> {
    lastGeneratedTemplate.value = parsed

    // Compile to HTML for preview
    const mjml = documentToMjml(parsed)
    const compiled = await compileMjml(mjml)
    previewHtml.value = compiled.html

    const summary = summarizeTemplate(parsed)
    messages.value.push({
      role: 'assistant',
      content: wasRefinement
        ? `Template updated (${summary}). Review the changes and apply or discard.`
        : `Template created (${summary}). Apply it to load it in the editor.`,
    })
  }

  async function sendMessage(userMessage: string, attachments?: AiAttachment[]): Promise<void> {
    if (!aiProvider.generateTemplate && !aiProvider.generateTemplateStream) return

    lastUserMessage = userMessage
    lastUserAttachments = attachments
    error.value = null
    streamBuffer.value = ''

    const userMsg: AiChatMessage = { role: 'user', content: userMessage }
    if (attachments && attachments.length > 0) {
      userMsg.attachments = attachments
    }
    messages.value.push(userMsg)
    isGenerating.value = true

    try {
      const systemPrompt = buildSystemPrompt()
      // Detect refinement BEFORE clearing: was there a previewed template or editor content?
      const wasRefinement = !!lastGeneratedTemplate.value || hasTemplateContent(document.value)
      // Build messages BEFORE clearing lastGeneratedTemplate so the AI
      // receives the previewed template as refinement context.
      const chatMessages = buildMessages()
      lastGeneratedTemplate.value = null
      const rawResponse = await callAi(chatMessages, systemPrompt)

      // Detect if the AI responded with a template (JSON) or a conversation (text)
      if (looksLikeJson(rawResponse)) {
        try {
          const parsed = parseAiTemplateResponse(rawResponse)
          await handleTemplateSuccess(parsed, wasRefinement)
        } catch (parseErr) {
          if (parseErr instanceof AiParseError) {
            // Auto-retry: ask the AI to re-send only raw JSON
            streamBuffer.value = ''
            const retryMsg: AiChatMessage = {
              role: 'user',
              content: 'Your previous response could not be parsed. Please re-send ONLY the raw JSON EmailDocument, starting with { and ending with }. No text, no code fences, no markdown — just the JSON object.',
            }
            messages.value.push(retryMsg)
            const retryMessages = buildMessages()
            const retryResponse = await callAi(retryMessages, systemPrompt)
            // Remove the internal retry message from visible chat
            messages.value.pop()

            const parsed = parseAiTemplateResponse(retryResponse)
            await handleTemplateSuccess(parsed, wasRefinement)
          } else {
            throw parseErr
          }
        }
      } else {
        // Conversation mode — the AI is asking questions or discussing
        messages.value.push({
          role: 'assistant',
          content: rawResponse.trim(),
        })
      }
    } catch (err) {
      if (err instanceof AiParseError) {
        error.value = err.message
      } else if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'An unexpected error occurred'
      }
      // Remove the user message on failure so retry can re-send
      messages.value.pop()
    } finally {
      isGenerating.value = false
      streamBuffer.value = ''
    }
  }

  function applyTemplate(): void {
    if (lastGeneratedTemplate.value) {
      replaceDocument(lastGeneratedTemplate.value)
      lastGeneratedTemplate.value = null
      previewHtml.value = ''
    }
  }

  function discardTemplate(): void {
    lastGeneratedTemplate.value = null
    previewHtml.value = ''
  }

  function clearConversation(): void {
    messages.value = []
    error.value = null
    lastGeneratedTemplate.value = null
    previewHtml.value = ''
    streamBuffer.value = ''
    lastUserMessage = ''
  }

  async function retry(): Promise<void> {
    if (lastUserMessage) {
      error.value = null
      await sendMessage(lastUserMessage, lastUserAttachments)
    }
  }

  return {
    messages,
    isGenerating,
    error,
    lastGeneratedTemplate,
    previewHtml,
    streamBuffer,
    sendMessage,
    applyTemplate,
    discardTemplate,
    clearConversation,
    retry,
  }
}
