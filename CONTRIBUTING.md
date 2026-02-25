# Contributing to @lab2view/vue-email-editor

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
# Clone the repository
git clone https://github.com/lab2view/vue-email-editor.git
cd vue-email-editor

# Install dependencies
npm install

# Run type checking
npm run typecheck

# Run tests
npm test

# Build the library
npm run build
```

## Project Structure

```
src/
  components/         # Vue components (EditorShell, Canvas, Sidebar, Toolbar)
  composables/        # Vue composables (useEmailDocument, useEmailHistory, etc.)
  serializer/         # MJML <-> JSON serialization
  blocks/             # Block definitions (layout, content, composite)
  properties/         # Property panel definitions
  extensions/         # TipTap extensions (merge tags)
  export/             # ESP export presets
  i18n/               # Translation files
  utils/              # Tree utilities
  types.ts            # All TypeScript types
  labels.ts           # i18n label interface + English defaults
  index.ts            # Public API exports
```

## Making Changes

### 1. Pick an Issue

- Look for issues tagged **good first issue** for beginner-friendly tasks
- Check the [ROADMAP.md](ROADMAP.md) for planned features
- Comment on the issue to let others know you're working on it

### 2. Branch Naming

```
feat/short-description     # New features
fix/short-description      # Bug fixes
docs/short-description     # Documentation
perf/short-description     # Performance improvements
```

### 3. Code Conventions

- **TypeScript strict** — No `any` types, all exports typed
- **Vue 3 Composition API** — `<script setup lang="ts">` for all components
- **BEM-like CSS classes** — Prefix with `ebb-` (Email Body Builder)
- **i18n** — All user-facing strings must use label keys from `EditorLabels`
- **CSS Variables** — Use `var(--ee-*)` for all themeable values
- **No hardcoded colors** — Use theme tokens

### 4. Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add image cropping support
fix: resolve drag-and-drop offset in Firefox
docs: update plugin API documentation
perf: lazy-load TipTap extensions
test: add ESP export preset tests
```

### 5. Testing

- Write tests for new features and bug fixes
- Run `npm test` before submitting
- Run `npm run typecheck` to verify types
- Aim for coverage on composables, serializers, and utilities

### 6. Submit a Pull Request

- Fill in the PR template
- Reference the related issue
- Include before/after screenshots for UI changes
- Ensure CI passes (typecheck + tests + build)

## Adding a New Block

1. Create the factory function in the appropriate file under `src/blocks/`
2. Add a label key to `EditorLabels` in `src/labels.ts`
3. Add the English default in `DEFAULT_LABELS`
4. Add the French translation in `src/i18n/fr.ts`
5. Register the block in `src/blocks/block-definitions.ts`

## Adding a New ESP Preset

1. Create the preset in `src/export/esp-presets.ts`
2. Add it to `ESP_PRESETS` registry
3. Create a convenience export function
4. Export from `src/index.ts`
5. Add tests in `src/export/__tests__/esp-presets.spec.ts`

## Adding i18n Labels

1. Add the key to `EditorLabels` interface in `src/labels.ts`
2. Add the English default in `DEFAULT_LABELS`
3. Add the French translation in `src/i18n/fr.ts`
4. Use `resolveLabel('key')` or `labels.key` in components

## Creating a Plugin

See the [Plugin System](#) section in README.md for the `PluginContext` API.

## Questions?

- Open a [GitHub Discussion](https://github.com/lab2view/vue-email-editor/discussions)
- File a [bug report](https://github.com/lab2view/vue-email-editor/issues/new?template=bug_report.md)
- Request a [feature](https://github.com/lab2view/vue-email-editor/issues/new?template=feature_request.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
