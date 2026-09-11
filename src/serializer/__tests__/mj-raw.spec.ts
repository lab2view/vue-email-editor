import { describe, it, expect } from 'vitest'
import { mjmlToDocument } from '../mjml-to-json'
import { documentToMjml } from '../json-to-mjml'

/**
 * mj-raw is how anything that MJML must not touch gets into a template: a merge tag that expands to a
 * whole table, a tracking pixel, a block of vendor HTML.
 *
 * Before mj-raw was a content node the parser treated it as a container, looked for MJML children,
 * found none, and stored nothing — so a document round-tripped through the editor came back with the
 * element empty. Nothing failed and nothing warned. Opening a template was enough to destroy it.
 */
describe('mj-raw', () => {
  const wrap = (inner: string) =>
    `<mjml><mj-body><mj-section><mj-column>${inner}</mj-column></mj-section></mj-body></mjml>`

  it('survives a round trip with its content intact', () => {
    const out = documentToMjml(mjmlToDocument(wrap('<mj-raw><table><tr><td>{products}</td></tr></table></mj-raw>')))

    expect(out).toContain('{products}')
    expect(out).toContain('<table>')
  })

  it('keeps a bare merge tag', () => {
    const out = documentToMjml(mjmlToDocument(wrap('<mj-raw>{discounts}</mj-raw>')))

    expect(out).toContain('{discounts}')
  })

  it('is parsed as content rather than as a container, so its markup is never walked as MJML', () => {
    const doc = mjmlToDocument(wrap('<mj-raw><div><span>keep me</span></div></mj-raw>'))
    const raw = doc.body.children[0].children[0].children[0]

    expect(raw.type).toBe('mj-raw')
    expect(raw.children).toHaveLength(0)
    expect(raw.htmlContent).toContain('keep me')
  })

  it('keeps both the raw block and the node after it', () => {
    const out = documentToMjml(
      mjmlToDocument(wrap('<mj-raw>{products}</mj-raw><mj-text>after</mj-text>')),
    )

    expect(out).toContain('{products}')
    expect(out).toContain('after')
  })
})
