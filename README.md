# Vue Email Editor

<p align="center">
  <a href="https://www.npmjs.com/package/@lab2view/vue-email-editor"><img src="https://img.shields.io/npm/v/@lab2view/vue-email-editor.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://github.com/lab2view/vue-email-editor/actions"><img src="https://img.shields.io/github/actions/workflow/status/lab2view/vue-email-editor/ci.yml?style=flat-square" alt="CI" /></a>
  <a href="https://github.com/lab2view/vue-email-editor/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@lab2view/vue-email-editor.svg?style=flat-square" alt="license" /></a>
  <img src="https://img.shields.io/badge/vue-3.x-42b883?style=flat-square&logo=vue.js" alt="Vue 3" />
  <img src="https://img.shields.io/badge/mjml-4.x-e54434?style=flat-square" alt="MJML" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript" alt="TypeScript" />
</p>

<p align="center">
  A professional <strong>drag-and-drop</strong> email editor built with <strong>Vue 3</strong> and <strong>MJML</strong>.<br/>
  Design responsive HTML emails visually — 43 blocks, AI generation, merge tags, plugins, i18n, and more.
</p>

| Drag & Drop Builder | Ready-made Templates |
|:---:|:---:|
| ![Blocks panel](src/assets/capture_blocs_layouts_1.png) | ![Ready-made composite blocks](src/assets/capture_blocs_ready_made_1.png) |

## Installation

```bash
npm install @lab2view/vue-email-editor vue@^3.4 mjml-browser@^4.15
```

## Quick Start

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { EmailEditor } from '@lab2view/vue-email-editor'

const mjml = ref('')
const html = ref('')
const designJson = ref()
</script>

<template>
  <EmailEditor
    ref="editorRef"
    v-model="mjml"
    :design-json="designJson"
    @update:compiled-html="html = $event"
    @update:design-json="designJson = $event"
  />
</template>
```

That's it. The editor renders a full drag-and-drop email builder with live preview, undo/redo, and HTML export.

## Highlights

- **43 blocks** — layouts, content, and 30 ready-made composites (hero, pricing, testimonial, FAQ, etc.)
- **Inline editing** — double-click any text to edit with TipTap (bold, italic, links, colors)
- **AI generation** — describe an email in plain language, get a production-ready template (BYOAI)
- **Merge tags** — insert dynamic variables (`{{first_name}}`) with visual chips
- **Conditional content** — show/hide sections based on merge tag values
- **22 starter templates** — welcome, newsletter, e-commerce, abandoned cart, and more
- **ESP export** — pre-formatted HTML for Mailchimp, SendGrid, Brevo, AWS SES, Postmark, Resend
- **Dark mode preview** — simulate email client dark mode in the canvas
- **Plugin system** — add custom blocks, toolbar actions, sidebar panels
- **i18n** — English + French included, 175+ label keys for full translation
- **Theming** — customize colors, fonts, border radius via `theme` prop
- **Undo/Redo** — full history with `Ctrl+Z` / `Ctrl+Shift+Z`
- **Imperative API** — `getMjml()`, `getHtml()`, `selectNode()`, `deleteNode()`, and more via ref

## AI Template Generation

Plug in any LLM — OpenAI, Anthropic, Gemini, or your own backend:

```vue
<EmailEditor
  v-model="mjml"
  :ai-provider="{
    generateText: async (prompt, ctx) => { /* your API call */ },
    generateTemplate: async (messages, systemPrompt) => { /* your API call */ },
  }"
/>
```

The editor handles JSON parsing, repair, and retry automatically.

## Theming & i18n

```vue
<EmailEditor
  :theme="{ primaryColor: '#7C3AED', borderRadius: '8px' }"
  :labels="FR_LABELS"
/>
```

## Documentation

Full API reference, plugin guide, AI integration examples, and more:

**[Documentation →](https://lab2view.github.io/vue-email-editor/)**

## License

[MIT](LICENSE)
