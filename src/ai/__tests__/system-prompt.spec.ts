import { describe, it, expect } from 'vitest'
import { buildTemplateSystemPrompt } from '../system-prompt'

describe('buildTemplateSystemPrompt', () => {
  it('includes all 13 EmailNodeTypes', () => {
    const prompt = buildTemplateSystemPrompt()
    const types = [
      'mj-body',
      'mj-section',
      'mj-column',
      'mj-text',
      'mj-image',
      'mj-button',
      'mj-divider',
      'mj-spacer',
      'mj-social',
      'mj-social-element',
      'mj-hero',
      'mj-raw',
      'mj-wrapper',
    ]
    for (const type of types) {
      expect(prompt).toContain(type)
    }
  })

  it('includes EmailDocument schema', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('EmailDocument')
    expect(prompt).toContain('EmailNode')
    expect(prompt).toContain('version')
    expect(prompt).toContain('headAttributes')
  })

  it('includes structure rules', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('Structure Rules')
    expect(prompt).toContain('mj-body')
    expect(prompt).toContain('mj-section')
    expect(prompt).toContain('mj-column')
  })

  it('includes absolute rules section', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('ABSOLUTE RULES')
    expect(prompt).toContain('RULE 1')
    expect(prompt).toContain('RULE 2')
    expect(prompt).toContain('RULE 3')
    expect(prompt).toContain('RULE 4')
  })

  it('includes 3 operating modes', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('MODE 1: CONVERSATION')
    expect(prompt).toContain('MODE 2: GENERATION')
    expect(prompt).toContain('MODE 3: REFINEMENT')
  })

  it('includes typography guidance', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('Typography')
    expect(prompt).toContain('Poppins')
    expect(prompt).toContain('Google Font')
  })

  it('includes output format instructions for all modes', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('Conversation mode')
    expect(prompt).toContain('Generation/Refinement mode')
    expect(prompt).toContain('ONLY raw JSON')
  })

  it('includes layout patterns', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('Header')
    expect(prompt).toContain('Hero')
    expect(prompt).toContain('Footer')
    expect(prompt).toContain('CTA')
  })

  it('injects merge tags when provided', () => {
    const prompt = buildTemplateSystemPrompt({
      mergeTags: [
        { name: 'First Name', value: '{{first_name}}', category: 'Contact' },
        { name: 'Company', value: '{{company}}' },
      ],
    })
    expect(prompt).toContain('{{first_name}}')
    expect(prompt).toContain('First Name')
    expect(prompt).toContain('Contact')
    expect(prompt).toContain('{{company}}')
    expect(prompt).toContain('Merge Tags')
  })

  it('does not include merge tags section when none provided', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).not.toContain('Available Merge Tags')
  })

  it('applies promptPrefix', () => {
    const prompt = buildTemplateSystemPrompt({ promptPrefix: 'CUSTOM PREFIX HERE' })
    expect(prompt.startsWith('CUSTOM PREFIX HERE')).toBe(true)
  })

  it('applies promptSuffix', () => {
    const prompt = buildTemplateSystemPrompt({ promptSuffix: 'CUSTOM SUFFIX HERE' })
    expect(prompt.endsWith('CUSTOM SUFFIX HERE')).toBe(true)
  })

  it('includes image guidelines with picsum.photos', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('picsum.photos')
    expect(prompt).toContain('NEVER')
    expect(prompt).toContain('RULE 1')
  })

  it('includes color palette suggestions', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('Color')
    expect(prompt).toContain('palette')
  })

  it('includes golden example with picsum images', () => {
    const prompt = buildTemplateSystemPrompt()
    expect(prompt).toContain('COMPLETE EXAMPLE')
    expect(prompt).toContain('picsum.photos/seed/')
    expect(prompt).toContain('"mj-body"')
    expect(prompt).toContain('"mj-social"')
  })
})
