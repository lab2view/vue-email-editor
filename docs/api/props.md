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

## Emitted Events (Vue)

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | MJML source updated |
| `update:compiled-html` | `string` | Compiled HTML updated |
| `update:design-json` | `EmailDesignJson` | Design JSON updated |
