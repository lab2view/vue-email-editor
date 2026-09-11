import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailEditor from '../EmailEditor.vue'

vi.mock('mjml-browser', () => ({
  default: (mjml: string) => ({ html: '<html>' + mjml + '</html>', errors: [] }),
}))

/**
 * The whole point of the toolbar slots is that a HOST can fill them, and a host only ever touches
 * EmailEditor. This mounts the real thing — shallowMount stubs the shell, which is exactly the hop
 * being asserted.
 */
describe('EmailEditor slot forwarding', () => {
  it('passes a host slot through the shell and into the toolbar', () => {
    const wrapper = mount(EmailEditor, {
      props: { modelValue: '' },
      slots: { 'toolbar-start': '<button class="host-save">Save</button>' },
    })

    expect(wrapper.find('.ebb-toolbar__left .host-save').exists()).toBe(true)
  })

  it('changes nothing when the host supplies none', () => {
    const wrapper = mount(EmailEditor, { props: { modelValue: '' } })

    expect(wrapper.find('.ebb-toolbar').exists()).toBe(true)
    expect(wrapper.find('.ebb-toolbar__left').element.children).toHaveLength(1)
  })
})
