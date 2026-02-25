/**
 * Serialize an EmailDocument to an MJML string.
 *
 * Each node gets a css-class="ebb-node-{id}" attribute injected so the
 * compiled HTML can be linked back to document nodes for click-to-select.
 */

import type { EmailDocument, EmailNode } from '../types'
import { SELF_CLOSING_NODE_TYPES, CONTENT_NODE_TYPES } from '../types'

export function documentToMjml(doc: EmailDocument): string {
  const head = serializeHead(doc.headAttributes)
  const body = serializeNode(doc.body, 2)
  return `<mjml>\n${head}\n${body}\n</mjml>`
}

function serializeHead(head: EmailDocument['headAttributes']): string {
  const parts: string[] = ['  <mj-head>']

  // Fonts
  for (const font of head.fonts) {
    parts.push(`    <mj-font name="${escapeAttr(font.name)}" href="${escapeAttr(font.href)}" />`)
  }

  // Preview text
  if (head.previewText) {
    parts.push(`    <mj-preview>${escapeHtml(head.previewText)}</mj-preview>`)
  }

  // Default styles via <mj-attributes>
  const styleEntries = Object.entries(head.defaultStyles)
  if (styleEntries.length > 0) {
    parts.push('    <mj-attributes>')
    for (const [tag, attrs] of styleEntries) {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
        .join(' ')
      parts.push(`      <${tag} ${attrStr} />`)
    }
    parts.push('    </mj-attributes>')
  }

  parts.push('  </mj-head>')
  return parts.join('\n')
}

function serializeNode(node: EmailNode, indent: number): string {
  const pad = ' '.repeat(indent)

  // Wrap conditional nodes in mj-raw HTML comments
  if (node.condition) {
    const inner = serializeNodeInner(node, indent)
    const condComment = buildConditionComment(node.condition)
    return `${pad}<mj-raw><!-- ${condComment} --></mj-raw>\n${inner}\n${pad}<mj-raw><!--[endif]--></mj-raw>`
  }

  return serializeNodeInner(node, indent)
}

function buildConditionComment(condition: EmailNode['condition']): string {
  if (!condition) return ''
  const { variable, operator, value } = condition
  switch (operator) {
    case 'equals': return `[if ${variable} == "${value ?? ''}"]`
    case 'not_equals': return `[if ${variable} != "${value ?? ''}"]`
    case 'contains': return `[if ${variable} contains "${value ?? ''}"]`
    case 'not_contains': return `[if ${variable} not_contains "${value ?? ''}"]`
    case 'exists': return `[if ${variable}]`
    case 'not_exists': return `[if not ${variable}]`
    default: return `[if ${variable}]`
  }
}

function serializeNodeInner(node: EmailNode, indent: number): string {
  const pad = ' '.repeat(indent)

  // Build attributes string, injecting css-class for node identification
  const allAttrs = { ...node.attributes }

  // Inject the node ID as a css-class for iframe node targeting
  const existingClass = allAttrs['css-class'] || ''
  const nodeClass = `ebb-node-${node.id}`
  allAttrs['css-class'] = existingClass ? `${existingClass} ${nodeClass}` : nodeClass

  const attrStr = Object.entries(allAttrs)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
    .join(' ')

  const openTag = `${pad}<${node.type}${attrStr ? ' ' + attrStr : ''}>`

  // Self-closing nodes (mj-divider, mj-spacer, mj-image)
  if (SELF_CLOSING_NODE_TYPES.includes(node.type)) {
    return `${pad}<${node.type}${attrStr ? ' ' + attrStr : ''} />`
  }

  // Content nodes (mj-text, mj-button): emit htmlContent as inner text
  if (CONTENT_NODE_TYPES.includes(node.type)) {
    const content = node.htmlContent ?? ''
    return `${openTag}\n${pad}  ${content}\n${pad}</${node.type}>`
  }

  // Container nodes: recurse children
  if (node.children.length === 0) {
    return `${openTag}</${node.type}>`
  }

  const childrenStr = node.children.map((c) => serializeNode(c, indent + 2)).join('\n')
  return `${openTag}\n${childrenStr}\n${pad}</${node.type}>`
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
