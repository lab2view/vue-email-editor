/**
 * TipTap extension for merge tag inline nodes.
 *
 * Renders merge tags as non-editable colored chips in the editor.
 * On export (getHTML), they output their raw value (e.g. "{{first_name}}").
 */
import { Node, mergeAttributes } from '@tiptap/core'

export interface MergeTagOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mergeTag: {
      insertMergeTag: (attrs: { label: string; value: string }) => ReturnType
    }
  }
}

export const MergeTagExtension = Node.create<MergeTagOptions>({
  name: 'mergeTag',

  group: 'inline',
  inline: true,
  atom: true, // non-editable, treated as single unit
  selectable: true,
  draggable: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      label: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-merge-label') || element.textContent || '',
      },
      value: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-merge-value') || '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-merge-tag]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, {
        'data-merge-tag': '',
        'data-merge-label': HTMLAttributes.label,
        'data-merge-value': HTMLAttributes.value,
        contenteditable: 'false',
        class: 'ebb-merge-tag',
      }),
      HTMLAttributes.label,
    ]
  },

  renderText({ node }) {
    // When exporting as text, use the raw value
    return node.attrs.value
  },

  addCommands() {
    return {
      insertMergeTag:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          })
        },
    }
  },
})
