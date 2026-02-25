import { describe, it, expect } from 'vitest'
import { mjmlToDocument } from '../mjml-to-json'

describe('mjmlToDocument', () => {
  it('returns default document for empty input', () => {
    const doc = mjmlToDocument('')
    expect(doc.version).toBe(1)
    expect(doc.body.type).toBe('mj-body')
  })

  it('returns default document for whitespace-only input', () => {
    const doc = mjmlToDocument('   \n  ')
    expect(doc.body.type).toBe('mj-body')
  })

  it('parses a minimal MJML document', () => {
    const mjml = `<mjml><mj-body></mj-body></mjml>`
    const doc = mjmlToDocument(mjml)
    expect(doc.body.type).toBe('mj-body')
    expect(doc.body.children).toHaveLength(0)
  })

  it('parses nested sections and columns', () => {
    const mjml = `<mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>Hello</mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>`
    const doc = mjmlToDocument(mjml)
    expect(doc.body.children).toHaveLength(1)
    const section = doc.body.children[0]
    expect(section.type).toBe('mj-section')
    expect(section.children).toHaveLength(1)
    const col = section.children[0]
    expect(col.type).toBe('mj-column')
    expect(col.children).toHaveLength(1)
    expect(col.children[0].type).toBe('mj-text')
    expect(col.children[0].htmlContent).toBe('Hello')
  })

  it('parses attributes correctly', () => {
    const mjml = `<mjml>
      <mj-body>
        <mj-section background-color="#ff0000" padding="20px">
        </mj-section>
      </mj-body>
    </mjml>`
    const doc = mjmlToDocument(mjml)
    const section = doc.body.children[0]
    expect(section.attributes['background-color']).toBe('#ff0000')
    expect(section.attributes['padding']).toBe('20px')
  })

  it('strips ebb-node-* css classes', () => {
    const mjml = `<mjml>
      <mj-body>
        <mj-section css-class="ebb-node-abc custom-class">
        </mj-section>
      </mj-body>
    </mjml>`
    const doc = mjmlToDocument(mjml)
    const section = doc.body.children[0]
    expect(section.attributes['css-class']).toBe('custom-class')
  })

  it('generates unique IDs for each node', () => {
    const mjml = `<mjml>
      <mj-body>
        <mj-section>
          <mj-column></mj-column>
        </mj-section>
        <mj-section>
          <mj-column></mj-column>
        </mj-section>
      </mj-body>
    </mjml>`
    const doc = mjmlToDocument(mjml)
    const ids = new Set<string>()
    ids.add(doc.body.id)
    for (const section of doc.body.children) {
      ids.add(section.id)
      for (const col of section.children) {
        ids.add(col.id)
      }
    }
    // All IDs should be unique (5 nodes: body, 2 sections, 2 columns)
    expect(ids.size).toBe(5)
  })

  it('parses head attributes', () => {
    const mjml = `<mjml>
      <mj-head>
        <mj-preview>Preview text</mj-preview>
        <mj-font name="Roboto" href="https://fonts.example.com" />
        <mj-attributes>
          <mj-all font-family="Arial" />
        </mj-attributes>
      </mj-head>
      <mj-body></mj-body>
    </mjml>`
    const doc = mjmlToDocument(mjml)
    expect(doc.headAttributes.previewText).toBe('Preview text')
    expect(doc.headAttributes.fonts).toHaveLength(1)
    expect(doc.headAttributes.fonts[0].name).toBe('Roboto')
    expect(doc.headAttributes.defaultStyles['mj-all']).toBeDefined()
    expect(doc.headAttributes.defaultStyles['mj-all']['font-family']).toBe('Arial')
  })

  it('handles self-closing tags (non-void form)', () => {
    // DOMParser with text/xml handles self-closing tags;
    // we test with explicit closing tags for cross-parser compatibility.
    const mjml = `<mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-image src="test.png"></mj-image>
            <mj-divider border-color="#ccc"></mj-divider>
            <mj-spacer height="20px"></mj-spacer>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>`
    const doc = mjmlToDocument(mjml)
    const col = doc.body.children[0].children[0]
    expect(col.children).toHaveLength(3)
    expect(col.children[0].type).toBe('mj-image')
    expect(col.children[0].attributes.src).toBe('test.png')
    expect(col.children[1].type).toBe('mj-divider')
    expect(col.children[2].type).toBe('mj-spacer')
  })

  it('returns default document for malformed XML', () => {
    const doc = mjmlToDocument('<not-valid-xml>><<')
    expect(doc.body.type).toBe('mj-body')
  })
})
