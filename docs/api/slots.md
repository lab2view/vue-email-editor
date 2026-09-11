# Slots

The toolbar has three regions a host can fill. Each is empty by default, except `toolbar-title`,
which renders the editor title unless you replace it — so an editor with no slots supplied looks and
behaves exactly as it did before slots existed.

| Slot | Where | Default |
|------|-------|---------|
| `toolbar-start` | The start of the toolbar, before the device switcher | empty |
| `toolbar-title` | The centre of the toolbar | `labels.editor_title` |
| `toolbar-end` | The end of the toolbar, after the built-in actions | empty |

## Why they exist

An editor embedded in an application usually has to carry that application's chrome: a Save button, a
Close link, the name of the thing being edited, a view switch. When the host page has a header of its
own there is somewhere else to put those. When it does not — a full-screen editing route, a modal —
the editor's own toolbar is the only bar on the screen.

Enumerating that chrome as props would make the component learn one host's needs one option at a
time. A slot does not.

## Usage

```vue
<template>
  <EmailEditor v-model="mjml">
    <template #toolbar-start>
      <button @click="close">Close</button>
      <button @click="save">Save</button>
    </template>

    <template #toolbar-title>
      {{ template.name }}
    </template>

    <template #toolbar-end>
      <button @click="showPreview">Preview</button>
    </template>
  </EmailEditor>
</template>
```

## Styling

The slots render inside the toolbar's own regions, so anything you put in them inherits the bar's
height and alignment. The bar is 48px tall; size controls to fit it rather than letting them grow it,
and use the theme's CSS variables (`--ee-*`) so host chrome follows a theme change with everything
else.

```css
.my-toolbar-btn {
  padding: 4px 12px;
  font-size: 13px;
  line-height: 1.4;
  white-space: nowrap;
}
```
