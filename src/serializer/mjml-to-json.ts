/**
 * Parse an MJML string into an EmailDocument.
 *
 * Used for:
 * - Migrating old GrapesJS templates (parse the MJML body string)
 * - Syncing from code view back to visual editor
 */

import type { EmailDocument, EmailNode, EmailNodeType, EmailHeadAttributes } from '../types'
import { CONTENT_NODE_TYPES } from '../types'
import { createId } from '../utils/id'
import { createDefaultDocument } from './node-factory'

const MJML_NODE_TYPES = new Set<string>([
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
])

export function mjmlToDocument(mjmlSource: string): EmailDocument {
  if (!mjmlSource || !mjmlSource.trim()) {
    return createDefaultDocument()
  }

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(mjmlSource, 'text/xml')

    // Check for parse errors
    const parseError = doc.querySelector('parsererror')
    if (parseError) {
      // Try parsing as HTML instead (more lenient)
      return mjmlToDocumentViaHtml(mjmlSource)
    }

    const mjmlRoot = doc.querySelector('mjml')
    if (!mjmlRoot) {
      return createDefaultDocument()
    }

    const mjHead = mjmlRoot.querySelector('mj-head')
    const mjBody = mjmlRoot.querySelector('mj-body')

    const headAttributes = mjHead ? parseHead(mjHead) : defaultHeadAttributes()
    const body = mjBody ? parseNode(mjBody) : createDefaultBody()

    return { version: 1, headAttributes, body }
  } catch {
    return createDefaultDocument()
  }
}

function mjmlToDocumentViaHtml(mjmlSource: string): EmailDocument {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(mjmlSource, 'text/html')

    const mjmlRoot = doc.querySelector('mjml')
    if (!mjmlRoot) {
      return createDefaultDocument()
    }

    const mjHead = mjmlRoot.querySelector('mj-head')
    const mjBody = mjmlRoot.querySelector('mj-body')

    const headAttributes = mjHead ? parseHead(mjHead) : defaultHeadAttributes()
    const body = mjBody ? parseNode(mjBody) : createDefaultBody()

    return { version: 1, headAttributes, body }
  } catch {
    return createDefaultDocument()
  }
}

function parseHead(headEl: Element): EmailHeadAttributes {
  const head: EmailHeadAttributes = {
    defaultStyles: {},
    fonts: [],
    previewText: '',
  }

  // Parse <mj-font> elements
  headEl.querySelectorAll('mj-font').forEach((fontEl) => {
    const name = fontEl.getAttribute('name')
    const href = fontEl.getAttribute('href')
    if (name && href) {
      head.fonts.push({ name, href })
    }
  })

  // Parse <mj-preview>
  const preview = headEl.querySelector('mj-preview')
  if (preview) {
    head.previewText = preview.textContent || ''
  }

  // Parse <mj-attributes>
  const attrsEl = headEl.querySelector('mj-attributes')
  if (attrsEl) {
    for (const child of Array.from(attrsEl.children)) {
      const tag = child.tagName.toLowerCase()
      const attrs: Record<string, string> = {}
      for (const attr of Array.from(child.attributes)) {
        attrs[attr.name] = attr.value
      }
      if (Object.keys(attrs).length > 0) {
        head.defaultStyles[tag] = attrs
      }
    }
  }

  return head
}

function parseNode(element: Element): EmailNode {
  const tagName = element.tagName.toLowerCase()
  const type: EmailNodeType = MJML_NODE_TYPES.has(tagName)
    ? (tagName as EmailNodeType)
    : 'mj-raw'

  const id = createId()

  // Extract attributes (skip css-class containing ebb-node- prefixes from re-parsing)
  const attributes: Record<string, string> = {}
  for (const attr of Array.from(element.attributes)) {
    if (attr.name === 'css-class') {
      // Strip out our injected ebb-node-* classes
      const cleaned = attr.value
        .split(/\s+/)
        .filter((cls) => !cls.startsWith('ebb-node-'))
        .join(' ')
        .trim()
      if (cleaned) {
        attributes['css-class'] = cleaned
      }
    } else {
      attributes[attr.name] = attr.value
    }
  }

  // Content nodes: extract innerHTML
  const isContentNode = CONTENT_NODE_TYPES.includes(type)
  const htmlContent = isContentNode ? element.innerHTML.trim() : undefined

  // Recurse children (skip text nodes, only process element children)
  const children: EmailNode[] = isContentNode
    ? []
    : Array.from(element.children)
        .filter((child) => {
          const childTag = child.tagName.toLowerCase()
          return MJML_NODE_TYPES.has(childTag)
        })
        .map((child) => parseNode(child))

  return { id, type, attributes, children, htmlContent }
}

function defaultHeadAttributes(): EmailHeadAttributes {
  return {
    defaultStyles: {},
    fonts: [],
    previewText: '',
  }
}

function createDefaultBody(): EmailNode {
  return {
    id: createId(),
    type: 'mj-body',
    attributes: {},
    children: [],
  }
}
