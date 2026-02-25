import { describe, it, expect } from 'vitest'
import { documentToMjml } from '../json-to-mjml'
import type { EmailDocument, EmailNode } from '../../types'

function makeMinimalDoc(body?: Partial<EmailNode>): EmailDocument {
  return {
    version: 1,
    headAttributes: {
      defaultStyles: {},
      fonts: [],
      previewText: '',
    },
    body: {
      id: 'body-1',
      type: 'mj-body',
      attributes: {},
      children: [],
      ...body,
    },
  }
}

describe('documentToMjml', () => {
  it('produces valid MJML wrapper', () => {
    const doc = makeMinimalDoc()
    const mjml = documentToMjml(doc)
    expect(mjml).toContain('<mjml>')
    expect(mjml).toContain('</mjml>')
    expect(mjml).toContain('<mj-head>')
    expect(mjml).toContain('<mj-body')
    expect(mjml).toContain('</mj-body>')
  })

  it('injects ebb-node-* css-class on nodes', () => {
    const doc = makeMinimalDoc({
      children: [
        {
          id: 'sec-1',
          type: 'mj-section',
          attributes: {},
          children: [],
        },
      ],
    })
    const mjml = documentToMjml(doc)
    expect(mjml).toContain('css-class="ebb-node-sec-1"')
    expect(mjml).toContain('css-class="ebb-node-body-1"')
  })

  it('serializes self-closing tags correctly', () => {
    const doc = makeMinimalDoc({
      children: [
        {
          id: 'sec-1',
          type: 'mj-section',
          attributes: {},
          children: [
            {
              id: 'col-1',
              type: 'mj-column',
              attributes: {},
              children: [
                { id: 'div-1', type: 'mj-divider', attributes: { 'border-color': '#ccc' }, children: [] },
                { id: 'spc-1', type: 'mj-spacer', attributes: { height: '20px' }, children: [] },
                { id: 'img-1', type: 'mj-image', attributes: { src: 'test.png' }, children: [] },
              ],
            },
          ],
        },
      ],
    })
    const mjml = documentToMjml(doc)
    expect(mjml).toMatch(/<mj-divider[^>]*\/>/)
    expect(mjml).toMatch(/<mj-spacer[^>]*\/>/)
    expect(mjml).toMatch(/<mj-image[^>]*\/>/)
  })

  it('serializes content nodes with innerHTML', () => {
    const doc = makeMinimalDoc({
      children: [
        {
          id: 'sec-1',
          type: 'mj-section',
          attributes: {},
          children: [
            {
              id: 'col-1',
              type: 'mj-column',
              attributes: {},
              children: [
                { id: 'txt-1', type: 'mj-text', attributes: {}, children: [], htmlContent: '<p>Hello world</p>' },
              ],
            },
          ],
        },
      ],
    })
    const mjml = documentToMjml(doc)
    expect(mjml).toContain('<p>Hello world</p>')
    expect(mjml).toContain('</mj-text>')
  })

  it('serializes node attributes', () => {
    const doc = makeMinimalDoc({
      children: [
        {
          id: 'sec-1',
          type: 'mj-section',
          attributes: { 'background-color': '#ffffff', padding: '20px' },
          children: [],
        },
      ],
    })
    const mjml = documentToMjml(doc)
    expect(mjml).toContain('background-color="')
    expect(mjml).toContain('padding="20px"')
  })

  it('skips empty attribute values', () => {
    const doc = makeMinimalDoc({
      children: [
        {
          id: 'sec-1',
          type: 'mj-section',
          attributes: { 'background-color': '', padding: '10px' },
          children: [],
        },
      ],
    })
    const mjml = documentToMjml(doc)
    expect(mjml).not.toContain('background-color=""')
    expect(mjml).toContain('padding="10px"')
  })

  it('serializes head with fonts and preview text', () => {
    const doc: EmailDocument = {
      version: 1,
      headAttributes: {
        defaultStyles: { 'mj-all': { 'font-family': 'Arial' } },
        fonts: [{ name: 'Roboto', href: 'https://fonts.googleapis.com/css?family=Roboto' }],
        previewText: 'Welcome to our newsletter',
      },
      body: { id: 'body-1', type: 'mj-body', attributes: {}, children: [] },
    }
    const mjml = documentToMjml(doc)
    expect(mjml).toContain('<mj-font name="Roboto"')
    expect(mjml).toContain('<mj-preview>Welcome to our newsletter</mj-preview>')
    expect(mjml).toContain('<mj-all font-family="Arial" />')
  })

  it('escapes special characters in attributes', () => {
    const doc = makeMinimalDoc({
      attributes: { 'background-color': '#fff' },
      children: [
        {
          id: 'sec-1',
          type: 'mj-section',
          attributes: {},
          children: [
            {
              id: 'col-1',
              type: 'mj-column',
              attributes: {},
              children: [
                { id: 'txt-1', type: 'mj-text', attributes: {}, children: [], htmlContent: 'A & B <strong>"hi"</strong>' },
              ],
            },
          ],
        },
      ],
    })
    const mjml = documentToMjml(doc)
    // Content should be preserved as-is (it's HTML)
    expect(mjml).toContain('A & B <strong>"hi"</strong>')
  })
})
