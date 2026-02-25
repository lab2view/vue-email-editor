/**
 * Plugin Registry — manages runtime-registered blocks, categories,
 * property editors, toolbar actions, and sidebar panels from plugins.
 */

import { ref, type Component } from 'vue'
import type { BlockDefinition, BlockCategoryDefinition, ToolbarAction, SidebarPanel } from '../types'

export interface UsePluginRegistryReturn {
  registeredBlocks: ReturnType<typeof ref<BlockDefinition[]>>
  registeredCategories: ReturnType<typeof ref<BlockCategoryDefinition[]>>
  propertyEditors: ReturnType<typeof ref<Map<string, Component>>>
  toolbarActions: ReturnType<typeof ref<ToolbarAction[]>>
  sidebarPanels: ReturnType<typeof ref<SidebarPanel[]>>

  registerBlock: (block: BlockDefinition) => void
  registerBlockCategory: (category: BlockCategoryDefinition) => void
  registerPropertyEditor: (type: string, component: Component) => void
  registerToolbarAction: (action: ToolbarAction) => void
  registerSidebarPanel: (panel: SidebarPanel) => void
}

export function usePluginRegistry(): UsePluginRegistryReturn {
  const registeredBlocks = ref<BlockDefinition[]>([])
  const registeredCategories = ref<BlockCategoryDefinition[]>([])
  const propertyEditors = ref(new Map<string, Component>())
  const toolbarActions = ref<ToolbarAction[]>([])
  const sidebarPanels = ref<SidebarPanel[]>([])

  function registerBlock(block: BlockDefinition) {
    if (registeredBlocks.value.some((b) => b.id === block.id)) {
      console.warn(`[EmailEditor] Block "${block.id}" already registered, skipping.`)
      return
    }
    registeredBlocks.value.push(block)
  }

  function registerBlockCategory(category: BlockCategoryDefinition) {
    if (registeredCategories.value.some((c) => c.id === category.id)) {
      console.warn(`[EmailEditor] Category "${category.id}" already registered, skipping.`)
      return
    }
    registeredCategories.value.push(category)
  }

  function registerPropertyEditor(type: string, component: Component) {
    propertyEditors.value.set(type, component)
  }

  function registerToolbarAction(action: ToolbarAction) {
    if (toolbarActions.value.some((a) => a.id === action.id)) {
      console.warn(`[EmailEditor] Toolbar action "${action.id}" already registered, skipping.`)
      return
    }
    toolbarActions.value.push(action)
  }

  function registerSidebarPanel(panel: SidebarPanel) {
    if (sidebarPanels.value.some((p) => p.id === panel.id)) {
      console.warn(`[EmailEditor] Sidebar panel "${panel.id}" already registered, skipping.`)
      return
    }
    sidebarPanels.value.push(panel)
  }

  return {
    registeredBlocks,
    registeredCategories,
    propertyEditors,
    toolbarActions,
    sidebarPanels,
    registerBlock,
    registerBlockCategory,
    registerPropertyEditor,
    registerToolbarAction,
    registerSidebarPanel,
  }
}
