# Theming

The editor's appearance is fully customizable via CSS variables. Pass a `theme` prop to override any of the 25 available properties.

## Basic Usage

```vue
<EmailEditor
  :theme="{
    primaryColor: '#7C3AED',
    primaryHover: '#6D28D9',
    borderRadius: '8px',
  }"
/>
```

## All Theme Properties

| Property | CSS Variable | Default | Description |
|----------|-------------|---------|-------------|
| `primaryColor` | `--ee-primary` | `#01A8AB` | Main accent color |
| `primaryHover` | `--ee-primary-hover` | `#018F91` | Hover state |
| `primaryActive` | `--ee-primary-active` | `#017375` | Active/pressed state |
| `borderColor` | `--ee-border` | `#e5e7eb` | Default borders |
| `borderColorHover` | `--ee-border-hover` | `#d1d5db` | Hovered borders |
| `backgroundColor` | `--ee-bg` | `#ffffff` | Panel backgrounds |
| `backgroundHover` | `--ee-bg-hover` | `#f3f4f6` | Hovered backgrounds |
| `backgroundActive` | `--ee-bg-active` | `#e5e7eb` | Active backgrounds |
| `textPrimary` | `--ee-text-primary` | `#1f2937` | Primary text |
| `textSecondary` | `--ee-text-secondary` | `#6b7280` | Secondary text |
| `textMuted` | `--ee-text-muted` | `#9ca3af` | Muted text |
| `canvasBg` | `--ee-canvas-bg` | `#e5e7eb` | Canvas background |
| `canvasBorder` | `--ee-canvas-border` | `#d1d5db` | Canvas border |
| `selectionColor` | `--ee-selection` | `#01A8AB` | Selected element outline |
| `hoverColor` | `--ee-hover` | `#01A8AB` | Hovered element outline |
| `dropIndicatorColor` | `--ee-drop-indicator` | `#01A8AB` | Drop zone indicator |
| `sidebarBg` | `--ee-sidebar-bg` | `#ffffff` | Sidebar background |
| `sidebarBorder` | `--ee-sidebar-border` | `#e5e7eb` | Sidebar border |
| `panelHeaderBg` | `--ee-panel-header-bg` | `#f9fafb` | Panel header background |
| `toolbarBg` | `--ee-toolbar-bg` | `#ffffff` | Toolbar background |
| `toolbarBorder` | `--ee-toolbar-border` | `#e5e7eb` | Toolbar border |
| `successColor` | `--ee-success` | `#10b981` | Success states |
| `warningColor` | `--ee-warning` | `#f59e0b` | Warning states |
| `errorColor` | `--ee-error` | `#ef4444` | Error states |
| `fontFamily` | `--ee-font-family` | System stack | UI font |
| `fontSize` | `--ee-font-size` | `13px` | UI font size |
| `borderRadius` | `--ee-radius` | `6px` | UI border radius |

## Examples

### Dark Theme

```vue
<EmailEditor
  :theme="{
    primaryColor: '#818cf8',
    primaryHover: '#6366f1',
    backgroundColor: '#1e1e2e',
    backgroundHover: '#2a2a3e',
    backgroundActive: '#363649',
    borderColor: '#3b3b52',
    textPrimary: '#e4e4ef',
    textSecondary: '#9898b0',
    textMuted: '#6b6b80',
    canvasBg: '#11111b',
    sidebarBg: '#1e1e2e',
    toolbarBg: '#1e1e2e',
    panelHeaderBg: '#2a2a3e',
  }"
/>
```

### Brand Colors

```vue
<EmailEditor
  :theme="{
    primaryColor: '#e11d48',
    primaryHover: '#be123c',
    primaryActive: '#9f1239',
    selectionColor: '#e11d48',
    hoverColor: '#e11d48',
    dropIndicatorColor: '#e11d48',
  }"
/>
```

### Rounded UI

```vue
<EmailEditor
  :theme="{
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
  }"
/>
```

## How It Works

The theme is applied via CSS custom properties on the `.ebb-shell` root element. All internal components reference these variables instead of hardcoded colors, so changes propagate everywhere instantly.

```ts
import { DEFAULT_THEME } from '@lab2view/vue-email-editor'

// Access all default values
console.log(DEFAULT_THEME.primaryColor) // '#01A8AB'
```
