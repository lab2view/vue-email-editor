/**
 * Dynamic variable blocks — generated at runtime from the template's variable list.
 * Each variable becomes a draggable text block containing {variable_name}.
 */
import type { BlockDefinition } from '../types'
import { createText } from '../serializer/node-factory'

/**
 * Generate block definitions for each template variable.
 * Called with the current `variables` prop array.
 */
export function createVariableBlocks(variables: string[]): BlockDefinition[] {
  return variables.map((name) => ({
    id: `variable-${name}`,
    label: `{${name}}`,
    category: 'variable' as const,
    icon: 'Variable',
    factory: () =>
      createText(`<p style="margin: 0;">{${name}}</p>`, {
        'font-size': '14px',
        color: '#555555',
        padding: '10px 25px',
      }),
  }))
}
