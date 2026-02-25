import { describe, it, expect, vi, beforeEach } from 'vitest'
import { documentToMjml } from '../json-to-mjml'
import { mjmlToDocument } from '../mjml-to-json'
import { STARTER_TEMPLATES } from '../../blocks/starter-templates'

// Mock nanoid for deterministic IDs
let counter = 0
vi.mock('nanoid', () => ({
  nanoid: () => `id-${++counter}`,
}))

beforeEach(() => {
  counter = 0
})

describe('MJML Snapshot Tests', () => {
  // Snapshot test for each starter template
  STARTER_TEMPLATES.forEach((template) => {
    it(`serializes ${template.id} template to MJML`, () => {
      const document = template.factory()
      const mjml = documentToMjml(document)

      expect(mjml).toMatchSnapshot()
    })
  })

  // Round-trip test
  it('round-trips template through MJML serialize/parse/serialize', () => {
    const originalDocument = STARTER_TEMPLATES[0].factory() // Use blank template (simpler)
    const mjml1 = documentToMjml(originalDocument)
    const parsedDocument = mjmlToDocument(mjml1)
    const mjml2 = documentToMjml(parsedDocument)

    // The structure should be preserved (we can't compare IDs as they are regenerated)
    // Instead, check that both contain the same structure
    expect(mjml2).toContain('<mjml>')
    expect(mjml2).toContain('<mj-head>')
    expect(mjml2).toContain('<mj-body')
    expect(mjml2).toContain('<mj-section')
    expect(mjml2).toContain('<mj-column')
    
    // Count the number of sections - should be the same
    const section1Count = (mjml1.match(/<mj-section/g) || []).length
    const section2Count = (mjml2.match(/<mj-section/g) || []).length
    expect(section2Count).toBe(section1Count)
  })

  // Validate all templates contain valid MJML structure
  it('all templates contain valid MJML structure', () => {
    STARTER_TEMPLATES.forEach((template) => {
      const document = template.factory()
      const mjml = documentToMjml(document)

      // Check for required MJML root elements
      expect(mjml).toContain('<mjml>')
      expect(mjml).toContain('</mjml>')
      expect(mjml).toContain('<mj-head>')
      expect(mjml).toContain('</mj-head>')
      // mj-body is serialized with attributes, so check for opening tag
      expect(mjml).toMatch(/<mj-body[^>]*>/)
      expect(mjml).toContain('</mj-body>')
    })
  })

  // Test that css-class attributes are injected for node identification
  it('injects ebb-node-* css classes for node identification', () => {
    const document = STARTER_TEMPLATES[0].factory() // Blank template
    const mjml = documentToMjml(document)

    // Should contain at least one ebb-node-* class
    expect(mjml).toMatch(/css-class="[^"]*ebb-node-id-\d+/)
  })

  // Test that empty template still produces valid MJML
  it('produces valid MJML for minimal blank template', () => {
    const document = STARTER_TEMPLATES[0].factory() // Blank template
    const mjml = documentToMjml(document)

    expect(mjml).toContain('<mjml>')
    expect(mjml).toContain('<mj-head>')
    expect(mjml).toMatch(/<mj-body[^>]*>/)
    expect(mjml).toMatch(/<mj-section[^>]*>/)
    expect(mjml).toMatch(/<mj-column[^>]*>/)
    expect(mjml).toMatch(/<mj-text[^>]*>/)
  })

  // Test that preview text is serialized
  it('serializes preview text in mj-head', () => {
    const document = STARTER_TEMPLATES[1].factory() // Newsletter template
    const mjml = documentToMjml(document)

    if (document.headAttributes.previewText) {
      expect(mjml).toContain('<mj-preview>')
      expect(mjml).toContain(document.headAttributes.previewText)
      expect(mjml).toContain('</mj-preview>')
    }
  })

  // Test that default styles are serialized
  it('serializes default styles in mj-attributes', () => {
    // Create a document with default styles
    const document = STARTER_TEMPLATES[0].factory()
    document.headAttributes.defaultStyles = {
      'mj-text': {
        'font-family': 'Arial, sans-serif',
        'font-size': '14px',
      },
    }

    const mjml = documentToMjml(document)

    expect(mjml).toContain('<mj-attributes>')
    expect(mjml).toContain('font-family="Arial, sans-serif"')
    expect(mjml).toContain('</mj-attributes>')
  })

  // Test that fonts are serialized
  it('serializes custom fonts in mj-head', () => {
    const document = STARTER_TEMPLATES[0].factory()
    document.headAttributes.fonts = [
      {
        name: 'Roboto',
        href: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ]

    const mjml = documentToMjml(document)

    expect(mjml).toContain('<mj-font')
    expect(mjml).toContain('name="Roboto"')
    expect(mjml).toContain('href="https://fonts.googleapis.com/css?family=Roboto"')
  })
})
