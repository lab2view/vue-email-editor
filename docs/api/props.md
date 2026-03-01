# Props

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | MJML content (v-model) |
| `designJson` | `Record<string, unknown>` | — | Persisted design JSON for loading saved designs |
| `variables` | `string[]` | `[]` | Available merge variables displayed in the sidebar |
| `labels` | `Partial<EditorLabels>` | `DEFAULT_LABELS` | i18n label overrides |
| `label` | `string` | — | Form field label (when used in a form) |
| `required` | `boolean` | `false` | Form validation required flag |
| `theme` | `Partial<ThemeConfig>` | `DEFAULT_THEME` | Visual customization |
| `plugins` | `Plugin[]` | `[]` | Editor extensions |
| `aiProvider` | `AiProvider` | — | AI integration (template generation, text tools) |
| `mergeTags` | `MergeTag[]` | `[]` | Personalization variables for AI and merge tag insertion |
| `imageUpload` | `ImageUploadHandler` | — | Custom image upload handler |
| `browseAssets` | `BrowseAssetsHandler` | — | Custom asset browser handler |

## `modelValue` / `v-model`

The MJML source string. Updated whenever the document changes.

```vue
<EmailEditor v-model="mjml" />
```

## `designJson`

Pass a saved design to load it. The editor detects the format:

- **New format** (`{ _editor: 'mesagoo-email-editor', ... }`) — loaded directly
- **Legacy GrapesJS format** — parsed via MJML fallback

```vue
<EmailEditor :design-json="savedDesign" />
```

## `variables`

List of merge variable names displayed in a sidebar panel:

```vue
<EmailEditor :variables="['first_name', 'last_name', 'company']" />
```

## `labels`

Partial label overrides. Missing keys fall back to English defaults. See [i18n guide](/guide/i18n).

```vue
<EmailEditor :labels="{ editor_title: 'My Editor' }" />
```

## `theme`

Partial theme overrides. See [Theming guide](/guide/theming) for all 25 properties.

```vue
<EmailEditor :theme="{ primaryColor: '#7C3AED' }" />
```

## `plugins`

Array of plugin functions. See [Plugins guide](/guide/plugins).

```vue
<EmailEditor :plugins="[myPlugin, anotherPlugin]" />
```

## `aiProvider`

An object implementing the `AiProvider` interface. Enables AI-powered features: template generation via chat, text improvement, and subject line suggestions. See [AI Generation guide](/guide/ai).

```vue
<EmailEditor :ai-provider="myAiProvider" />
```

## `mergeTags`

Array of `MergeTag` objects representing personalization variables. Displayed in the sidebar for insertion and included in the AI system prompt.

```vue
<EmailEditor :merge-tags="[
  { name: 'First Name', value: '{{first_name}}', category: 'Contact' },
  { name: 'Company', value: '{{company}}', category: 'Company' },
]" />
```

## Emitted Events (Vue)

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | MJML source updated |
| `update:compiled-html` | `string` | Compiled HTML updated |
| `update:design-json` | `EmailDesignJson` | Design JSON updated |
