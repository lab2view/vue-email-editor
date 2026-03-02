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
import { ref } from 'vue'
import { EmailEditor } from '@lab2view/vue-email-editor'
import type { AiProvider, MergeTag } from '@lab2view/vue-email-editor'

const mjml = ref('')

const mergeTags: MergeTag[] = [
  { name: 'First Name', value: '{{first_name}}', category: 'Contact' },
  { name: 'Company', value: '{{company}}', category: 'Contact' },
]

const aiProvider: AiProvider = {
  generateText: async (prompt, context) => {
    const res = await fetch('/api/ai/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, context }),
    })
    return (await res.json()).text
  },

  generateTemplate: async (messages, systemPrompt) => {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, systemPrompt }),
    })
    return (await res.json()).content
  },
}
</script>
```

## Quick Start with OpenAI

A complete, copy-paste example with a Node.js/Express backend and OpenAI.

### 1. Install dependencies

```bash
# Backend
npm install express openai cors

# Frontend (already done if you installed the editor)
npm install @lab2view/vue-email-editor
```

### 2. Backend — `server.js`

```js
import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'

const app = express()
app.use(cors())
app.use(express.json({ limit: '2mb' }))

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Template generation (used by the AI chat panel)
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages, // { role: 'user' | 'assistant', content: string }
      ],
    })

    res.json({ content: completion.choices[0].message.content })
  } catch (error) {
    console.error('AI chat error:', error)
    res.status(500).json({ error: 'AI generation failed' })
  }
})

// Inline text generation (used by text editing actions)
app.post('/api/ai/text', async (req, res) => {
  try {
    const { prompt, context } = req.body

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: context || 'You are a helpful email copywriter.' },
        { role: 'user', content: prompt },
      ],
    })

    res.json({ text: completion.choices[0].message.content })
  } catch (error) {
    console.error('AI text error:', error)
    res.status(500).json({ error: 'Text generation failed' })
  }
})

app.listen(3001, () => console.log('AI backend running on http://localhost:3001'))
```

### 3. Frontend — Vue component

```vue
<template>
  <EmailEditor v-model="mjml" :ai-provider="aiProvider" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EmailEditor } from '@lab2view/vue-email-editor'
import type { AiProvider } from '@lab2view/vue-email-editor'

const mjml = ref('')

const API_BASE = 'http://localhost:3001'

const aiProvider: AiProvider = {
  generateText: async (prompt, context) => {
    const res = await fetch(`${API_BASE}/api/ai/text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, context }),
    })
    return (await res.json()).text
  },

  generateTemplate: async (messages, systemPrompt) => {
    const res = await fetch(`${API_BASE}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, systemPrompt }),
    })
    return (await res.json()).content
  },
}
</script>
```

### 4. Run it

```bash
OPENAI_API_KEY=sk-... node server.js
```

That's it — the AI chat panel appears in the editor sidebar. Users can describe emails and get full templates.

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

### What should `generateTemplate` return?

`generateTemplate` (and `generateTemplateStream`) must return the **raw text** of the AI response as a string. You do **not** need to parse JSON yourself.

The editor handles everything automatically:
- Extracting JSON from the AI response (even if wrapped in markdown code fences or conversational text)
- Repairing malformed JSON (trailing commas, truncated output)
- Filling in missing fields (`version`, `headAttributes`, `children`)
- Regenerating invalid node IDs
- Retrying by asking the AI to re-send raw JSON if the first parse fails

Just forward the AI's response text as-is — the editor takes care of the rest.

## Backend Examples

### OpenAI (GPT-4o)

```bash
npm install openai
```

```js
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// POST /api/ai/chat
app.post('/api/ai/chat', async (req, res) => {
  const { messages, systemPrompt } = req.body

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
  })

  res.json({ content: completion.choices[0].message.content })
})

// POST /api/ai/text
app.post('/api/ai/text', async (req, res) => {
  const { prompt, context } = req.body

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: context || 'You are a helpful email copywriter.' },
      { role: 'user', content: prompt },
    ],
  })

  res.json({ text: completion.choices[0].message.content })
})
```

### Anthropic (Claude)

```bash
npm install @anthropic-ai/sdk
```

```js
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// POST /api/ai/chat
app.post('/api/ai/chat', async (req, res) => {
  const { messages, systemPrompt } = req.body

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    system: systemPrompt,
    messages, // [{ role: 'user' | 'assistant', content: string }]
  })

  res.json({ content: response.content[0].text })
})

// POST /api/ai/text
app.post('/api/ai/text', async (req, res) => {
  const { prompt, context } = req.body

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: context || 'You are a helpful email copywriter.',
    messages: [{ role: 'user', content: prompt }],
  })

  res.json({ text: response.content[0].text })
})
```

### Google Gemini

```bash
npm install @google/generative-ai
```

```js
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// POST /api/ai/chat
app.post('/api/ai/chat', async (req, res) => {
  const { messages, systemPrompt } = req.body

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemPrompt,
  })

  // Convert messages to Gemini format
  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))

  const chat = model.startChat({ history })
  const lastMessage = messages[messages.length - 1].content
  const result = await chat.sendMessage(lastMessage)

  res.json({ content: result.response.text() })
})

// POST /api/ai/text
app.post('/api/ai/text', async (req, res) => {
  const { prompt, context } = req.body

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: context || 'You are a helpful email copywriter.',
  })

  const result = await model.generateContent(prompt)
  res.json({ text: result.response.text() })
})
```

## Mock Provider for Testing

Use this provider to develop and test without an API key:

```ts
import type { AiProvider } from '@lab2view/vue-email-editor'

const mockAiProvider: AiProvider = {
  generateText: async (prompt) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500))
    return `Generated text for: "${prompt.slice(0, 50)}..."`
  },

  improveText: async (text) => {
    await new Promise((r) => setTimeout(r, 500))
    return text.charAt(0).toUpperCase() + text.slice(1)
  },

  generateTemplate: async () => {
    await new Promise((r) => setTimeout(r, 1000))
    return JSON.stringify({
      version: '1.0',
      headAttributes: { subject: 'Test Email' },
      children: [
        {
          type: 'mj-section',
          attributes: { 'background-color': '#ffffff', padding: '20px' },
          children: [
            {
              type: 'mj-column',
              attributes: {},
              children: [
                {
                  type: 'mj-text',
                  attributes: { 'font-size': '24px', align: 'center', color: '#333333' },
                  content: '<p>Welcome!</p>',
                },
                {
                  type: 'mj-text',
                  attributes: { 'font-size': '16px', color: '#666666' },
                  content: '<p>This is a mock template for testing the AI integration.</p>',
                },
                {
                  type: 'mj-button',
                  attributes: {
                    'background-color': '#01A8AB',
                    color: '#ffffff',
                    href: 'https://example.com',
                  },
                  content: 'Get Started',
                },
              ],
            },
          ],
        },
      ],
    })
  },
}
```

```vue
<EmailEditor v-model="mjml" :ai-provider="mockAiProvider" />
```

This is useful for:
- **Development** — work on the UI without burning API credits
- **Unit tests** — predictable responses for assertions
- **Demos** — show the AI feature without exposing API keys

## Error Handling

Wrap your AI calls with proper error handling for a robust production setup:

```ts
const aiProvider: AiProvider = {
  generateText: async (prompt, context) => {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30_000)

      const res = await fetch('/api/ai/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context }),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!res.ok) {
        if (res.status === 429) throw new Error('Rate limited — please wait a moment.')
        throw new Error(`AI request failed (${res.status})`)
      }

      return (await res.json()).text
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('Request timed out — please try again.')
      }
      throw error
    }
  },

  generateTemplate: async (messages, systemPrompt) => {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, systemPrompt }),
      })

      if (!res.ok) {
        if (res.status === 429) throw new Error('Rate limited — please wait a moment.')
        throw new Error(`AI request failed (${res.status})`)
      }

      return (await res.json()).content
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error — check your connection.')
      }
      throw error
    }
  },
}
```

When an error is thrown from an `AiProvider` method, the editor displays it in the UI so the user knows what happened.

## Streaming

For better UX, implement `generateTemplateStream` to yield chunks as they arrive:

```ts
const aiProvider: AiProvider = {
  generateText: async (prompt) => { /* ... */ },

  async *generateTemplateStream(messages, systemPrompt) {
    const response = await fetch('/api/ai/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

Your backend must forward these attachments to a multimodal AI model (e.g. Claude, GPT-4o).

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
