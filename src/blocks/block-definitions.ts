/**
 * Master block registry — combines all block categories and exposes helpers
 * for the BlocksPanel to consume.
 */
import type { BlockCategory, BlockDefinition } from '../types'
import { layoutBlocks } from './layout-blocks'
import { contentBlocks } from './content-blocks'
import { compositeBlocks } from './composite-blocks'
import { createVariableBlocks } from './variable-blocks'

/** Category metadata for display order and labels */
export const BLOCK_CATEGORIES: Array<{ id: BlockCategory; label: string; icon: string }> = [
  { id: 'layout', label: 'Disposition', icon: 'LayoutGrid' },
  { id: 'content', label: 'Contenu', icon: 'FileText' },
  { id: 'composite', label: 'Modules prêts', icon: 'Package' },
  { id: 'variable', label: 'Variables', icon: 'Variable' },
]

/** All static blocks (layout + content + composite) */
export const STATIC_BLOCKS: BlockDefinition[] = [
  ...layoutBlocks,
  ...contentBlocks,
  ...compositeBlocks,
]

/**
 * Get all blocks including dynamic variable blocks.
 * Variable blocks are generated from the template's variable list.
 */
export function getAllBlocks(variables: string[] = []): BlockDefinition[] {
  return [...STATIC_BLOCKS, ...createVariableBlocks(variables)]
}

/**
 * Group blocks by category, preserving the category display order.
 */
export function getBlocksByCategory(
  variables: string[] = [],
): Array<{ category: BlockCategory; label: string; icon: string; blocks: BlockDefinition[] }> {
  const allBlocks = getAllBlocks(variables)

  return BLOCK_CATEGORIES
    .map((cat) => ({
      category: cat.id,
      label: cat.label,
      icon: cat.icon,
      blocks: allBlocks.filter((b) => b.category === cat.id),
    }))
    .filter((cat) => cat.blocks.length > 0)
}

/** Find a block definition by its ID */
export function findBlockById(id: string, variables: string[] = []): BlockDefinition | undefined {
  return getAllBlocks(variables).find((b) => b.id === id)
}
