import { describe, it, expect, vi, beforeEach } from 'vitest'
import { parseAiTemplateResponse, AiParseError } from '../parse-ai-response'

let idCounter = 0
vi.mock('nanoid', () => ({
  nanoid: () => `test-${++idCounter}`,
}))

function makeValidDoc(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    version: 1,
    headAttributes: { defaultStyles: {}, fonts: [], previewText: '' },
    body: {
      id: 'old-body',
      type: 'mj-body',
      attributes: { 'background-color': '#f4f4f4' },
      children: [
        {
          id: 'old-section',
          type: 'mj-section',
          attributes: {},
          children: [
            {
              id: 'old-col',
              type: 'mj-column',
              attributes: {},
              children: [
                {
                  id: 'old-text',
                  type: 'mj-text',
                  attributes: {},
                  children: [],
                  htmlContent: '<p>Hello</p>',
                },
              ],
            },
          ],
        },
      ],
    },
    ...overrides,
  })
}

describe('parseAiTemplateResponse', () => {
  beforeEach(() => {
    idCounter = 0
  })

  it('parses clean JSON directly', () => {
    const raw = makeValidDoc()
    const result = parseAiTemplateResponse(raw)
    expect(result.version).toBe(1)
    expect(result.body.type).toBe('mj-body')
  })

  it('extracts JSON from code fence', () => {
    const raw = `Here is the template:\n\`\`\`json\n${makeValidDoc()}\n\`\`\`\nEnjoy!`
    const result = parseAiTemplateResponse(raw)
    expect(result.version).toBe(1)
    expect(result.body.type).toBe('mj-body')
  })

  it('extracts JSON from generic code fence without language', () => {
    const raw = `\`\`\`\n${makeValidDoc()}\n\`\`\``
    const result = parseAiTemplateResponse(raw)
    expect(result.version).toBe(1)
  })

  it('extracts JSON by bracket counting', () => {
    const raw = `Sure! Here's your template: ${makeValidDoc()} Hope you like it!`
    const result = parseAiTemplateResponse(raw)
    expect(result.version).toBe(1)
  })

  it('regenerates all IDs to be unique', () => {
    const raw = makeValidDoc()
    idCounter = 0
    const result = parseAiTemplateResponse(raw)

    const ids = new Set<string>()
    function collectIds(node: { id: string; children: { id: string; children: unknown[] }[] }) {
      ids.add(node.id)
      for (const child of node.children) collectIds(child as typeof node)
    }
    collectIds(result.body as unknown as Parameters<typeof collectIds>[0])

    // All IDs should start with "test-" (regenerated)
    for (const id of ids) {
      expect(id).toMatch(/^test-/)
    }

    // All IDs should be unique
    expect(ids.size).toBe(4) // body + section + column + text
  })

  it('throws AiParseError for invalid JSON', () => {
    expect(() => parseAiTemplateResponse('not json at all')).toThrow(AiParseError)
  })

  it('throws AiParseError for wrong version', () => {
    expect(() => parseAiTemplateResponse(makeValidDoc({ version: 2 }))).toThrow(AiParseError)
    expect(() => parseAiTemplateResponse(makeValidDoc({ version: 2 }))).toThrow('Invalid document version')
  })

  it('throws AiParseError for missing body', () => {
    const json = JSON.stringify({ version: 1, headAttributes: {} })
    expect(() => parseAiTemplateResponse(json)).toThrow(AiParseError)
  })

  it('throws AiParseError for wrong body type', () => {
    const raw = makeValidDoc()
    const obj = JSON.parse(raw)
    obj.body.type = 'div'
    expect(() => parseAiTemplateResponse(JSON.stringify(obj))).toThrow('body.type must be "mj-body"')
  })

  it('throws AiParseError for invalid node type in children', () => {
    const raw = makeValidDoc()
    const obj = JSON.parse(raw)
    obj.body.children[0].type = 'mj-invalid'
    expect(() => parseAiTemplateResponse(JSON.stringify(obj))).toThrow('Invalid node type')
  })

  it('extracts JSON preceded by long explanatory text', () => {
    const longPreamble = 'Here is your email template. I\'ve designed it with a modern blue theme, using Poppins font throughout. The hero section features a bold dark background with white text. I included stats, features, and a testimonial section for maximum impact. Here is the result:\n\n'
    const raw = longPreamble + makeValidDoc()
    const result = parseAiTemplateResponse(raw)
    expect(result.version).toBe(1)
    expect(result.body.type).toBe('mj-body')
  })

  it('extracts JSON with text both before and after', () => {
    const raw = `I've created a beautiful newsletter template for you. Here it is:\n\n${makeValidDoc()}\n\nFeel free to ask if you'd like any changes!`
    const result = parseAiTemplateResponse(raw)
    expect(result.version).toBe(1)
    expect(result.body.type).toBe('mj-body')
  })

  it('extracts JSON when first { is not the document', () => {
    // The AI might mention a small JSON object before the actual template
    const raw = `I used the color palette {"primary": "#3b82f6"} as inspiration. Here's the template:\n\n${makeValidDoc()}`
    const result = parseAiTemplateResponse(raw)
    expect(result.version).toBe(1)
    expect(result.body.type).toBe('mj-body')
  })

  it('handles missing attributes/children gracefully', () => {
    const raw = JSON.stringify({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: '' },
      body: {
        id: 'b',
        type: 'mj-body',
        children: [
          {
            id: 's',
            type: 'mj-section',
            // missing attributes and children
          },
        ],
      },
    })
    const result = parseAiTemplateResponse(raw)
    expect(result.body.children[0].attributes).toEqual({})
    expect(result.body.children[0].children).toEqual([])
  })

  it('provides defaults for missing headAttributes fields', () => {
    const raw = JSON.stringify({
      version: 1,
      headAttributes: {},
      body: {
        id: 'b',
        type: 'mj-body',
        attributes: {},
        children: [],
      },
    })
    const result = parseAiTemplateResponse(raw)
    expect(result.headAttributes.defaultStyles).toEqual({})
    expect(result.headAttributes.fonts).toEqual([])
    expect(result.headAttributes.previewText).toBe('')
  })

  // ─── Robustness: JSON repair ───

  it('handles trailing commas in JSON', () => {
    // LLMs often produce trailing commas
    const raw = `{
      "version": 1,
      "headAttributes": { "defaultStyles": {}, "fonts": [], "previewText": "" },
      "body": {
        "id": "b", "type": "mj-body", "attributes": {}, "children": [
          { "id": "s", "type": "mj-section", "attributes": {}, "children": [], },
        ],
      },
    }`
    const result = parseAiTemplateResponse(raw)
    expect(result.version).toBe(1)
    expect(result.body.type).toBe('mj-body')
  })

  it('auto-fills missing version when body is valid', () => {
    const raw = JSON.stringify({
      headAttributes: { defaultStyles: {}, fonts: [], previewText: '' },
      body: { id: 'b', type: 'mj-body', attributes: {}, children: [] },
    })
    const result = parseAiTemplateResponse(raw)
    expect(result.version).toBe(1)
  })

  it('auto-creates headAttributes when missing', () => {
    const raw = JSON.stringify({
      version: 1,
      body: { id: 'b', type: 'mj-body', attributes: {}, children: [] },
    })
    const result = parseAiTemplateResponse(raw)
    expect(result.headAttributes).toBeDefined()
    expect(result.headAttributes.defaultStyles).toEqual({})
    expect(result.headAttributes.fonts).toEqual([])
  })

  it('handles truncated JSON by auto-closing brackets', () => {
    // Simulate a response that got cut off by token limit
    const validJson = makeValidDoc()
    const truncated = validJson.slice(0, -3) // remove last 3 chars (}}\n or similar)
    const result = parseAiTemplateResponse(truncated)
    expect(result.version).toBe(1)
    expect(result.body.type).toBe('mj-body')
  })
})
