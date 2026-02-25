/**
 * Master block registry — combines all block categories and exposes helpers
 * for the BlocksPanel to consume.
 *
 * Supports extensibility via the plugin registry: plugin-registered blocks
 * and categories are merged with built-in ones.
 */
import type { BlockCategory, BlockDefinition, BlockCategoryDefinition } from '../types'
import { layoutBlocks } from './layout-blocks'
import { contentBlocks } from './content-blocks'
import { compositeBlocks } from './composite-blocks'
import { createVariableBlocks } from './variable-blocks'

/** Built-in category metadata for display order and labels */
export const BUILT_IN_CATEGORIES: BlockCategoryDefinition[] = [
  { id: 'layout', label: 'category_layout', icon: 'LayoutGrid', order: 0 },
  { id: 'content', label: 'category_content', icon: 'FileText', order: 10 },
  { id: 'composite', label: 'category_composite', icon: 'Package', order: 20 },
  { id: 'variable', label: 'category_variable', icon: 'Variable', order: 30 },
]

/** All static blocks (layout + content + composite) */
export const STATIC_BLOCKS: BlockDefinition[] = [
  ...layoutBlocks,
  ...contentBlocks,
  ...compositeBlocks,
]

/**
 * Get all blocks including dynamic variable blocks and plugin-registered blocks.
 */
export function getAllBlocks(
  variables: string[] = [],
  pluginBlocks: BlockDefinition[] = [],
): BlockDefinition[] {
  return [...STATIC_BLOCKS, ...createVariableBlocks(variables), ...pluginBlocks]
}

/**
 * Group blocks by category, preserving the category display order.
 * Merges built-in categories with plugin-registered categories.
 */
export function getBlocksByCategory(
  variables: string[] = [],
  pluginBlocks: BlockDefinition[] = [],
  pluginCategories: BlockCategoryDefinition[] = [],
): Array<{ category: BlockCategory; label: string; icon: string; blocks: BlockDefinition[] }> {
  const allBlocks = getAllBlocks(variables, pluginBlocks)

  // Merge built-in + plugin categories, sorted by order
  const allCategories = [...BUILT_IN_CATEGORIES, ...pluginCategories]
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100))

  // Deduplicate by id (first wins)
  const seen = new Set<string>()
  const uniqueCategories = allCategories.filter((cat) => {
    if (seen.has(cat.id)) return false
    seen.add(cat.id)
    return true
  })

  return uniqueCategories
    .map((cat) => ({
      category: cat.id,
      label: cat.label,
      icon: cat.icon,
      blocks: allBlocks.filter((b) => b.category === cat.id),
    }))
    .filter((cat) => cat.blocks.length > 0)
}

/** Find a block definition by its ID */
export function findBlockById(
  id: string,
  variables: string[] = [],
  pluginBlocks: BlockDefinition[] = [],
): BlockDefinition | undefined {
  return getAllBlocks(variables, pluginBlocks).find((b) => b.id === id)
}
