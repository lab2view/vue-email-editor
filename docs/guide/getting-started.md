# Getting Started

## Installation

```bash
npm install @lab2view/vue-email-editor
```

### Peer Dependencies

The editor requires Vue 3.4+ and mjml-browser:

```bash
npm install vue@^3.4 mjml-browser@^4.15
```

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { EmailEditor } from '@lab2view/vue-email-editor'
import '@lab2view/vue-email-editor/style.css'

const editorRef = ref()
const mjml = ref('')
const html = ref('')
const designJson = ref()
</script>

<template>
  <div style="height: 100vh">
    <EmailEditor
      ref="editorRef"
      v-model="mjml"
      :design-json="designJson"
      @update:compiled-html="html = $event"
      @update:design-json="designJson = $event"
    />
  </div>
</template>
```

::: tip
The editor fills its parent container. Make sure to give it a defined height (e.g. `height: 100vh`).
:::

## What You Get

The `v-model` binding gives you the **MJML source** string. You also get:

- **`compiled-html`** — The rendered HTML, ready to send
- **`design-json`** — A serialized JSON format for saving and reloading designs

## Saving & Loading Designs

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { EmailEditor } from '@lab2view/vue-email-editor'
import '@lab2view/vue-email-editor/style.css'

const editorRef = ref()
const designJson = ref()

// Load a saved design
async function loadDesign() {
  const saved = await fetch('/api/designs/1').then(r => r.json())
  designJson.value = saved
}

// Save the current design
function saveDesign() {
  const json = editorRef.value.getDesignJson()
  fetch('/api/designs/1', {
    method: 'PUT',
    body: JSON.stringify(json),
  })
}

// Export final HTML
function exportHtml() {
  const html = editorRef.value.getHtml()
  // Send via your email API
}
</script>

<template>
  <div style="height: 100vh">
    <EmailEditor
      ref="editorRef"
      :design-json="designJson"
    />
    <button @click="saveDesign">Save</button>
    <button @click="exportHtml">Export HTML</button>
  </div>
</template>
```

## With French Labels

```vue
<script setup lang="ts">
import { EmailEditor, FR_LABELS } from '@lab2view/vue-email-editor'
import '@lab2view/vue-email-editor/style.css'
</script>

<template>
  <EmailEditor :labels="FR_LABELS" />
</template>
```

## With Custom Theme

```vue
<EmailEditor
  :theme="{
    primaryColor: '#7C3AED',
    primaryHover: '#6D28D9',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
  }"
/>
```

## Next Steps

- [Theming](/guide/theming) — Customize colors, fonts, and spacing
- [i18n](/guide/i18n) — Add your own language
- [Plugins](/guide/plugins) — Extend with custom blocks and UI
- [API Reference](/api/props) — Full props, events, and methods
