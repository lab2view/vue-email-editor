import { describe, it, expect, vi } from 'vitest'
import { usePluginRegistry } from '../usePluginRegistry'
import type { BlockDefinition, BlockCategoryDefinition, ToolbarAction, SidebarPanel } from '../../types'
import { defineComponent } from 'vue'

const DummyComponent = defineComponent({ template: '<div />' })

function makeBlock(id: string): BlockDefinition {
  return {
    id,
    label: `Block ${id}`,
    category: 'content',
    icon: 'Square',
    factory: () => ({ id: 'n1', type: 'mj-text', attributes: {}, children: [] }),
  }
}

function makeCategory(id: string): BlockCategoryDefinition {
  return { id, label: `Category ${id}`, icon: 'Folder', order: 10 }
}

function makeToolbarAction(id: string): ToolbarAction {
  return { id, label: `Action ${id}`, icon: 'Zap', handler: () => {} }
}

function makeSidebarPanel(id: string): SidebarPanel {
  return { id, label: `Panel ${id}`, icon: 'Box', component: DummyComponent }
}

describe('usePluginRegistry', () => {
  it('starts with empty registries', () => {
    const registry = usePluginRegistry()
    expect(registry.registeredBlocks.value).toHaveLength(0)
    expect(registry.registeredCategories.value).toHaveLength(0)
    expect(registry.toolbarActions.value).toHaveLength(0)
    expect(registry.sidebarPanels.value).toHaveLength(0)
  })

  describe('registerBlock', () => {
    it('registers a block', () => {
      const registry = usePluginRegistry()
      registry.registerBlock(makeBlock('my-block'))
      expect(registry.registeredBlocks.value).toHaveLength(1)
      expect(registry.registeredBlocks.value![0].id).toBe('my-block')
    })

    it('prevents duplicate block registration', () => {
      const registry = usePluginRegistry()
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      registry.registerBlock(makeBlock('dup'))
      registry.registerBlock(makeBlock('dup'))

      expect(registry.registeredBlocks.value).toHaveLength(1)
      expect(warnSpy).toHaveBeenCalled()
      warnSpy.mockRestore()
    })
  })

  describe('registerBlockCategory', () => {
    it('registers a category', () => {
      const registry = usePluginRegistry()
      registry.registerBlockCategory(makeCategory('custom'))
      expect(registry.registeredCategories.value).toHaveLength(1)
    })

    it('prevents duplicate category registration', () => {
      const registry = usePluginRegistry()
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      registry.registerBlockCategory(makeCategory('dup'))
      registry.registerBlockCategory(makeCategory('dup'))

      expect(registry.registeredCategories.value).toHaveLength(1)
      expect(warnSpy).toHaveBeenCalled()
      warnSpy.mockRestore()
    })
  })

  describe('registerPropertyEditor', () => {
    it('registers a property editor component', () => {
      const registry = usePluginRegistry()
      registry.registerPropertyEditor('custom-color', DummyComponent)
      expect(registry.propertyEditors.value!.has('custom-color')).toBe(true)
    })

    it('overwrites existing property editor', () => {
      const registry = usePluginRegistry()
      const Other = defineComponent({ template: '<span />' })
      registry.registerPropertyEditor('color', DummyComponent)
      registry.registerPropertyEditor('color', Other)
      expect(registry.propertyEditors.value!.get('color')).toStrictEqual(Other)
    })
  })

  describe('registerToolbarAction', () => {
    it('registers a toolbar action', () => {
      const registry = usePluginRegistry()
      registry.registerToolbarAction(makeToolbarAction('save'))
      expect(registry.toolbarActions.value).toHaveLength(1)
    })

    it('prevents duplicate toolbar action registration', () => {
      const registry = usePluginRegistry()
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      registry.registerToolbarAction(makeToolbarAction('dup'))
      registry.registerToolbarAction(makeToolbarAction('dup'))

      expect(registry.toolbarActions.value).toHaveLength(1)
      warnSpy.mockRestore()
    })
  })

  describe('registerSidebarPanel', () => {
    it('registers a sidebar panel', () => {
      const registry = usePluginRegistry()
      registry.registerSidebarPanel(makeSidebarPanel('analytics'))
      expect(registry.sidebarPanels.value).toHaveLength(1)
    })

    it('prevents duplicate sidebar panel registration', () => {
      const registry = usePluginRegistry()
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      registry.registerSidebarPanel(makeSidebarPanel('dup'))
      registry.registerSidebarPanel(makeSidebarPanel('dup'))

      expect(registry.sidebarPanels.value).toHaveLength(1)
      warnSpy.mockRestore()
    })
  })
})
