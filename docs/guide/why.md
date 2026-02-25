# Why This Editor?

## The Problem

Building a good email editor is hard. Existing solutions are either:

- **Expensive** — Unlayer charges $250-2000/month, with features like custom blocks and merge tags locked behind $750+/month plans
- **Not Vue-native** — Most editors are framework-agnostic wrappers, losing Vue's reactivity and composition benefits
- **Closed source** — You can't customize internal behavior or fix bugs yourself

## Our Approach

`@lab2view/vue-email-editor` is a **Vue 3 native**, **MJML-powered**, **open-source** email editor that gives you everything the paid solutions offer — for free.

## Comparison

| Feature | This Editor | Unlayer | Beefree | GrapesJS |
|---------|:-----------:|:-------:|:-------:|:--------:|
| **Price** | Free (MIT) | $250-2000/mo | Paid tiers | Free (BSD) |
| **Vue 3 native** | Yes | Wrapper | No | No |
| **Open source** | MIT | No | No | BSD |
| **MJML rendering** | Built-in | No | No | Plugin |
| **TypeScript** | Full | Partial | No | Partial |
| **Plugin system** | Yes | $750+/mo | Paid | Yes |
| **i18n** | 175+ keys | Limited | Limited | Manual |
| **Theming** | 25 CSS vars | Limited | Limited | Manual |
| **Pre-built blocks** | 43 | ~20 | ~30 | ~10 |
| **Imperative API** | 18 methods | Basic | Basic | Complex |
| **Tests** | 102 | Unknown | Unknown | Yes |

## Key Advantages

### Vue 3 Composition API

The editor is built entirely with Vue 3's Composition API. Every feature is a composable that you can understand, debug, and extend:

- `useEmailDocument` — Document tree management
- `useEmailHistory` — Undo/redo with reactive state
- `useEmailSelection` — Node selection tracking
- `useEmailEvents` — Typed event system
- `usePluginRegistry` — Plugin registration

### MJML-Powered

Unlike editors that generate raw HTML tables, this editor works with [MJML](https://mjml.io) — the industry standard for responsive emails. This means:

- Emails render correctly in **all clients** (Gmail, Outlook, Apple Mail, etc.)
- The document model is clean and semantic
- You can import/export standard MJML

### Extensible by Design

The plugin system lets you:

- Add custom blocks with your own factories
- Register new block categories
- Override property editors
- Add toolbar buttons
- Add sidebar panels
- Listen to all editor events

All without forking the project.
