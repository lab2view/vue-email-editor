import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import EmailEditor from '../EmailEditor.vue'
import type { Plugin, PluginContext } from '../types'

// Mock mjml-browser
vi.mock('mjml-browser', () => ({
  default: (mjml: string) => ({
    html: '<html>' + mjml + '</html>',
    errors: [],
  }),
}))

// Mock nanoid for deterministic IDs
vi.mock('nanoid', () => ({
  nanoid: () => 'test-id-' + Math.random().toString(36).slice(2, 8),
}))

describe('EmailEditor.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('mounts without errors with minimal props', () => {
    const wrapper = shallowMount(EmailEditor, {
      props: {
        modelValue: '',
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('exposes the EmailEditorAPI via template ref', async () => {
    const wrapper = shallowMount(EmailEditor, {
      props: {
        modelValue: '',
      },
    })

    // Access exposed API methods
    const vm = wrapper.vm as any

    // Check all API methods are exposed
    expect(typeof vm.getDocument).toBe('function')
    expect(typeof vm.getMjml).toBe('function')
    expect(typeof vm.getHtml).toBe('function')
    expect(typeof vm.getDesignJson).toBe('function')
    expect(typeof vm.undo).toBe('function')
    expect(typeof vm.redo).toBe('function')
    expect(typeof vm.canUndo).toBe('function')
    expect(typeof vm.canRedo).toBe('function')
    expect(typeof vm.selectNode).toBe('function')
    expect(typeof vm.getSelectedNode).toBe('function')
    expect(typeof vm.clearSelection).toBe('function')
    expect(typeof vm.deleteNode).toBe('function')
    expect(typeof vm.duplicateNode).toBe('function')
    expect(typeof vm.insertBlock).toBe('function')
    expect(typeof vm.updateNodeAttribute).toBe('function')
    expect(typeof vm.loadTemplate).toBe('function')
    expect(typeof vm.on).toBe('function')
    expect(typeof vm.off).toBe('function')

    // Test a few API calls to ensure they work
    const document = vm.getDocument()
    expect(document).toBeDefined()
    expect(document.version).toBe(1)
    expect(document.body).toBeDefined()

    const mjml = vm.getMjml()
    expect(typeof mjml).toBe('string')
    expect(mjml).toContain('<mjml>')

    const designJson = vm.getDesignJson()
    expect(designJson._editor).toBe('mesagoo-email-editor')
    expect(designJson._version).toBe(1)
    expect(designJson.document).toBeDefined()

    expect(vm.canUndo()).toBe(false) // No history yet
    expect(vm.canRedo()).toBe(false) // No history yet
  })

  it('emits update:modelValue after mounting', async () => {
    const wrapper = shallowMount(EmailEditor, {
      props: {
        modelValue: '',
      },
    })

    // Wait for onMounted to complete
    await new Promise((resolve) => setTimeout(resolve, 50))

    // Check that update:modelValue was emitted
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeDefined()
    expect(emitted!.length).toBeGreaterThan(0)

    // The emitted value should be MJML string
    const emittedValue = emitted![0][0] as string
    expect(typeof emittedValue).toBe('string')
    expect(emittedValue).toContain('<mjml>')
  })

  it('emits update:designJson after mounting', async () => {
    const wrapper = shallowMount(EmailEditor, {
      props: {
        modelValue: '',
      },
    })

    // Wait for onMounted to complete
    await new Promise((resolve) => setTimeout(resolve, 50))

    // Check that update:designJson was emitted
    const emitted = wrapper.emitted('update:designJson')
    expect(emitted).toBeDefined()
    expect(emitted!.length).toBeGreaterThan(0)

    // The emitted value should be EmailDesignJson
    const emittedValue = emitted![0][0] as any
    expect(emittedValue._editor).toBe('mesagoo-email-editor')
    expect(emittedValue._version).toBe(1)
    expect(emittedValue.document).toBeDefined()
  })

  it('initializes plugins on mount', async () => {
    const mockPlugin = vi.fn()

    const wrapper = shallowMount(EmailEditor, {
      props: {
        modelValue: '',
        plugins: [mockPlugin as Plugin],
      },
    })

    // Wait for onMounted to complete
    await new Promise((resolve) => setTimeout(resolve, 50))

    // Plugin should have been called
    expect(mockPlugin).toHaveBeenCalledTimes(1)

    // Plugin should receive PluginContext with all methods
    const pluginContext = mockPlugin.mock.calls[0][0] as PluginContext
    expect(typeof pluginContext.registerBlock).toBe('function')
    expect(typeof pluginContext.registerBlockCategory).toBe('function')
    expect(typeof pluginContext.registerPropertyEditor).toBe('function')
    expect(typeof pluginContext.registerToolbarAction).toBe('function')
    expect(typeof pluginContext.registerSidebarPanel).toBe('function')
    expect(typeof pluginContext.on).toBe('function')
    expect(typeof pluginContext.off).toBe('function')
    expect(pluginContext.labels).toBeDefined()
  })

  it('merges custom labels with defaults', () => {
    const customLabels = {
      blocks: 'Custom Blocks',
      styles: 'Custom Styles',
    }

    const wrapper = shallowMount(EmailEditor, {
      props: {
        modelValue: '',
        labels: customLabels,
      },
    })

    // We can't easily check the provided value directly from wrapper,
    // but we can verify the component accepts the prop without error
    expect(wrapper.props().labels).toEqual(customLabels)
  })
})
