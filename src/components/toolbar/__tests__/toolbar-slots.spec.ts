import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import EditorToolbar from '../EditorToolbar.vue'
import { EMAIL_DOCUMENT_KEY } from '../../../injection-keys'
import { DEFAULT_LABELS } from '../../../labels'
import { DEVICE_PRESETS } from '../../../constants'

/**
 * The toolbar's three regions are composition points.
 *
 * The second describe block is the one that matters to anyone already using this component: with no
 * slot supplied, the bar has to render exactly what it renders today. An empty <slot> emits nothing,
 * so that is true by construction — these assertions keep it true.
 */
const doc = {
  history: {
    canUndo: ref(false),
    canRedo: ref(false),
    undo: () => {},
    redo: () => {},
  },
  triggerEmit: () => {},
}

function toolbar(slots: Record<string, string> = {}) {
  return mount(EditorToolbar, {
    props: {
      isFullscreen: false,
      activeView: 'visual' as const,
      activeDeviceIndex: 0,
      isDarkPreview: false,
    },
    global: { provide: { [EMAIL_DOCUMENT_KEY as symbol]: doc } },
    slots,
  })
}

describe('toolbar slots', () => {
  it('renders host content at the start, inside the left region', () => {
    const wrapper = toolbar({ 'toolbar-start': '<button class="host-save">Save</button>' })

    expect(wrapper.find('.ebb-toolbar__left .host-save').exists()).toBe(true)
  })

  it('renders host content at the end, after the built-in actions', () => {
    const wrapper = toolbar({ 'toolbar-end': '<button class="host-preview">Preview</button>' })
    const group = wrapper.find('.ebb-toolbar__group')

    expect(group.find('.host-preview').exists()).toBe(true)
    // After, not before: a host region that landed among the undo/redo buttons would read as one of them.
    expect(group.element.lastElementChild?.classList.contains('host-preview')).toBe(true)
  })

  it('lets the host replace the centre title, which is the only place a template name can go', () => {
    const wrapper = toolbar({ 'toolbar-title': '<span class="host-title">order_conf</span>' })

    expect(wrapper.find('.ebb-toolbar__title').text()).toBe('order_conf')
    expect(wrapper.text()).not.toContain(DEFAULT_LABELS.editor_title)
  })
})

describe('the toolbar with no slots supplied', () => {
  it('still shows the editor title', () => {
    expect(toolbar().find('.ebb-toolbar__title').text()).toBe(DEFAULT_LABELS.editor_title)
  })

  it('still shows every device button and every action button', () => {
    const wrapper = toolbar()

    expect(wrapper.findAll('.ebb-toolbar__device-btn')).toHaveLength(DEVICE_PRESETS.length)
    expect(wrapper.findAll('.ebb-toolbar__action-btn')).toHaveLength(5)
  })

  it('adds no element of its own — the left region holds only the device group', () => {
    const left = toolbar().find('.ebb-toolbar__left')

    expect(left.element.children).toHaveLength(1)
    expect(left.element.firstElementChild?.classList.contains('ebb-toolbar__device-group')).toBe(true)
  })
})
