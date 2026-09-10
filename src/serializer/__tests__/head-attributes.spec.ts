import { describe, it, expect } from 'vitest'
import { mjmlToDocument } from '../mjml-to-json'

/**
 * Regression: every <mj-attributes> entry must survive parsing, including when the
 * document is not well-formed XML and the lenient HTML fallback is used. The HTML parser
 * cannot self-close unknown elements, so it nests each entry inside the previous one.
 */
describe('parseHead / mj-attributes', () => {
  const head =
    '<mj-head><mj-attributes>' +
    '<mj-all font-family="Brand Sans" />' +
    '<mj-text color="#111111" />' +
    '<mj-button background-color="#222222" />' +
    '</mj-attributes></mj-head>'

  const build = (body: string) =>
    `<mjml>${head}<mj-body><mj-section><mj-column>${body}</mj-column></mj-section></mj-body></mjml>`

  it('keeps every entry for well-formed XML', () => {
    const doc = mjmlToDocument(build('<mj-text>Hello</mj-text>'))
    expect(Object.keys(doc.headAttributes.defaultStyles).sort()).toEqual([
      'mj-all', 'mj-button', 'mj-text',
    ])
    expect(doc.headAttributes.defaultStyles['mj-text'].color).toBe('#111111')
    expect(doc.headAttributes.defaultStyles['mj-button']['background-color']).toBe('#222222')
  })

  // A bare &nbsp; is not a predefined XML entity and <br>/<img> cannot self-close, so each
  // of these forces the HTML fallback. All are commonplace in real email content.
  it.each([
    ['bare &nbsp;', '<mj-text>Hello&nbsp;world</mj-text>'],
    ['unclosed <br>', '<mj-text>Line<br>Next</mj-text>'],
    ['unclosed <img> in mj-raw', '<mj-raw><img src="x.png"></mj-raw>'],
  ])('keeps every entry when the body is not valid XML (%s)', (_label, body) => {
    const doc = mjmlToDocument(build(body))
    expect(Object.keys(doc.headAttributes.defaultStyles).sort()).toEqual([
      'mj-all', 'mj-button', 'mj-text',
    ])
  })
})
