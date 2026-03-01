# AI Template Generation

The editor includes a built-in AI chat panel that lets users describe an email in natural language and have AI generate a complete template. Users can preview, refine, and apply generated templates — all without leaving the editor.

## How It Works

1. User opens the AI panel from the sidebar
2. User describes the email they want (e.g. "a welcome email for a SaaS product with a blue theme")
3. The AI either asks clarifying questions or generates a complete `EmailDocument` JSON
4. The generated template is compiled to HTML and previewed in an iframe
5. User can refine ("make the hero darker", "add a testimonial section") or apply to the editor

## Setup

Provide an `aiProvider` prop implementing the `AiProvider` interface:

```vue
<template>
  <EmailEditor
    v-model="mjml"
    :ai-provider="aiProvider"
    :merge-tags="mergeTags"
  />
</template>

<script setup lang="ts">
import { EmailEditor } from '@lab2view/vue-email-editor'
import type { AiProvider, AiChatMessage, MergeTag } from '@lab2view/vue-email-editor'

const mjml = ref('')

const mergeTags: MergeTag[] = [
  { name: 'First Name', value: '{{first_name}}', category: 'Contact' },
  { name: 'Company', value: '{{company}}', category: 'Contact' },
]

const aiProvider: AiProvider = {
  generateText: async (prompt, context) => {
    const res = await fetch('/api/ai/text', {
      method: 'POST',
      body: JSON.stringify({ prompt, context }),
    })
    return (await res.json()).text
  },

  generateTemplate: async (messages, systemPrompt) => {
    const res = await fetch('/api/ai/template', {
      method: 'POST',
      body: JSON.stringify({ messages, systemPrompt }),
    })
    return (await res.json()).content
  },
}
</script>
```

## The `AiProvider` Interface

```ts
interface AiProvider {
  /** Generate text from a prompt and optional context */
  generateText: (prompt: string, context?: string) => Promise<string>

  /** Generate subject line suggestions from email content */
  generateSubjectLine?: (emailContent: string) => Promise<string[]>

  /** Improve existing text with an instruction */
  improveText?: (text: string, instruction: string) => Promise<string>

  /** Generate a complete email template from a multi-turn conversation */
  generateTemplate?: (messages: AiChatMessage[], systemPrompt: string) => Promise<string>

  /** Streaming variant — yields chunks for real-time feedback */
  generateTemplateStream?: (messages: AiChatMessage[], systemPrompt: string) => AsyncIterable<string>
}
```

### Required methods

| Method | Used by |
|--------|---------|
| `generateText` | Inline text generation in the editor |

### Optional methods

| Method | Used by |
|--------|---------|
| `generateSubjectLine` | Subject line suggestions |
| `improveText` | "Improve this text" contextual action |
| `generateTemplate` | AI chat panel — full template generation |
| `generateTemplateStream` | AI chat panel — streaming variant (preferred for UX) |

If neither `generateTemplate` nor `generateTemplateStream` is provided, the AI chat panel is hidden.

## Streaming

For better UX, implement `generateTemplateStream` to yield chunks as they arrive:

```ts
const aiProvider: AiProvider = {
  generateText: async (prompt) => { /* ... */ },

  async *generateTemplateStream(messages, systemPrompt) {
    const response = await fetch('/api/ai/stream', {
      method: 'POST',
      body: JSON.stringify({ messages, systemPrompt }),
    })
    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      yield decoder.decode(value, { stream: true })
    }
  },
}
```

When streaming is used, the chat panel shows a live stream buffer so the user sees progress.

## Merge Tags

Pass `mergeTags` to make personalization variables available to the AI. The system prompt includes them so the AI can use `{{first_name}}`, `{{company}}`, etc. in generated templates.

```ts
const mergeTags: MergeTag[] = [
  { name: 'First Name', value: '{{first_name}}', category: 'Contact' },
  { name: 'Last Name', value: '{{last_name}}', category: 'Contact' },
  { name: 'Company', value: '{{company}}', category: 'Company' },
  { name: 'Unsubscribe URL', value: '{{unsubscribe_url}}', category: 'System' },
]
```

## Image Attachments

Users can attach images (screenshots, mockups, brand guidelines) to their messages. The AI analyzes them to match colors, layout, and style:

```ts
interface AiAttachment {
  mimeType: string  // e.g. 'image/png'
  data: string      // base64-encoded
  name?: string     // original filename
}
```

Your backend must forward these attachments to a multimodal AI model (e.g. Claude, GPT-4V).

## System Prompt

The editor generates a detailed system prompt via `buildTemplateSystemPrompt()`. It includes:

- The `EmailDocument` JSON schema
- MJML rendering rules and constraints
- Design guidelines (color palettes, typography, layout patterns)
- A complete example template
- Available merge tags (if provided)

You can customize the prompt with `promptPrefix` and `promptSuffix`:

```ts
import { buildTemplateSystemPrompt } from '@lab2view/vue-email-editor'

const systemPrompt = buildTemplateSystemPrompt({
  mergeTags,
  promptPrefix: 'You are the email designer for Acme Corp. Always use brand color #FF6B35.',
  promptSuffix: 'Always include an unsubscribe link in the footer.',
})
```

## AI Response Parsing

The editor uses `parseAiTemplateResponse()` to extract and validate the `EmailDocument` JSON from AI responses. It handles:

- Raw JSON responses
- JSON wrapped in code fences
- JSON embedded in conversational text
- Trailing commas and truncated output (auto-repair)
- Missing `version`, `headAttributes`, or `children` fields (auto-fill)
- Invalid node IDs (regenerated with nanoid)

If the first parse fails, the composable automatically retries by asking the AI to re-send only raw JSON.

## Preview & Refinement Flow

When a template is generated:

1. The template is compiled to HTML via `documentToMjml()` + `compileMjml()`
2. A preview is displayed in a sandboxed iframe
3. The user can switch between **Chat** and **Preview** tabs
4. The user can continue chatting to request changes — the AI receives the previewed template as context
5. When satisfied, the user clicks **Apply** to load it into the editor

This iterative loop lets users refine templates without ever applying incomplete work to the editor.

## Customizing AI Labels

Override AI-related labels via the `labels` prop:

```ts
const labels = {
  ai_chat: 'AI Assistant',
  ai_chat_placeholder: 'Describe your email...',
  ai_chat_send: 'Send',
  ai_chat_apply: 'Apply',
  ai_chat_discard: 'Discard',
  ai_chat_preview: 'Preview',
  ai_chat_generating: 'Generating...',
  ai_chat_error: 'Generation failed',
  ai_chat_retry: 'Retry',
}
```

See [Internationalization](/guide/i18n) for the full label list.
