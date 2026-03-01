import type { EmailDocument, EmailNode, EmailNodeType } from '../types'
import { createId } from '../utils/id'

const VALID_NODE_TYPES: Set<string> = new Set<string>([
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

export class AiParseError extends Error {
  constructor(message: string, public readonly rawResponse?: string) {
    super(message)
    this.name = 'AiParseError'
  }
}

/**
 * Parse an AI response string into a validated EmailDocument.
 * Tries multiple extraction strategies and regenerates all node IDs.
 */
export function parseAiTemplateResponse(raw: string): EmailDocument {
  const json = extractJson(raw)
  validateDocument(json)
  const doc = json as unknown as EmailDocument
  regenerateIds(doc.body)
  return doc
}

/**
 * Attempt to repair common JSON issues produced by LLMs:
 * - Trailing commas before } or ]
 * - Single-line // comments
 * - Truncated JSON (missing closing brackets)
 */
function repairJson(str: string): string {
  let repaired = str

  // Remove single-line comments (// ...) outside of strings
  // Simple approach: remove lines that are only comments, or trailing comments
  repaired = repaired.replace(/(?<="[^"]*")\s*\/\/[^\n]*/g, '')

  // Remove trailing commas before } or ]
  repaired = repaired.replace(/,\s*([}\]])/g, '$1')

  // Handle truncated JSON: count unmatched { and [ and close them
  let braceDepth = 0
  let bracketDepth = 0
  let inString = false
  let escape = false
  for (let i = 0; i < repaired.length; i++) {
    const ch = repaired[i]
    if (escape) { escape = false; continue }
    if (ch === '\\' && inString) { escape = true; continue }
    if (ch === '"') { inString = !inString; continue }
    if (inString) continue
    if (ch === '{') braceDepth++
    else if (ch === '}') braceDepth--
    else if (ch === '[') bracketDepth++
    else if (ch === ']') bracketDepth--
  }

  // If there's an unclosed string at the end (truncated in a value), try closing it
  if (inString) {
    repaired += '"'
  }

  // Close any unclosed brackets/braces
  while (bracketDepth > 0) { repaired += ']'; bracketDepth-- }
  while (braceDepth > 0) { repaired += '}'; braceDepth-- }

  // Clean up trailing commas again after repairs
  repaired = repaired.replace(/,\s*([}\]])/g, '$1')

  return repaired
}

/** Try to JSON.parse, falling back to repair + parse */
function tryParse(str: string): Record<string, unknown> | null {
  const trimmed = str.trim()
  // Direct parse
  try {
    const parsed = JSON.parse(trimmed)
    if (typeof parsed === 'object' && parsed !== null) return parsed
  } catch {
    // Try with repairs
  }

  // Repaired parse
  try {
    const repaired = repairJson(trimmed)
    const parsed = JSON.parse(repaired)
    if (typeof parsed === 'object' && parsed !== null) return parsed
  } catch {
    // Still not valid
  }

  return null
}

/** Check if a parsed object looks like an EmailDocument */
function looksLikeEmailDocument(obj: Record<string, unknown>): boolean {
  // Must have at least body with mj-body type
  if ('body' in obj && typeof obj.body === 'object' && obj.body !== null) {
    const body = obj.body as Record<string, unknown>
    if (body.type === 'mj-body') return true
  }
  // Or has the version + headAttributes combo
  if ('version' in obj && 'headAttributes' in obj) return true
  return false
}

/** Try multiple strategies to extract a JSON object from the raw AI response */
function extractJson(raw: string): Record<string, unknown> {
  const trimmed = raw.trim()

  // Strategy 1: Direct parse (possibly with repair)
  const direct = tryParse(trimmed)
  if (direct && looksLikeEmailDocument(direct)) return direct

  // Strategy 2: Extract from code fences ```json ... ``` or ``` ... ```
  const codeFenceMatches = [...trimmed.matchAll(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/g)]
  for (const match of codeFenceMatches) {
    const result = tryParse(match[1])
    if (result && looksLikeEmailDocument(result)) return result
  }

  // Strategy 3: Find all { positions and try bracket-counted extraction from each
  let searchFrom = 0
  while (searchFrom < trimmed.length) {
    const startIdx = trimmed.indexOf('{', searchFrom)
    if (startIdx === -1) break

    const result = extractByBracketCounting(trimmed, startIdx)
    if (result) return result

    // Move past this { and try the next one
    searchFrom = startIdx + 1
  }

  throw new AiParseError('Could not extract JSON from AI response', raw)
}

/**
 * Extract a JSON object starting at the given position using bracket counting.
 * Returns the parsed object or null if extraction fails.
 */
function extractByBracketCounting(str: string, startIdx: number): Record<string, unknown> | null {
  let depth = 0
  let inString = false
  let escape = false

  for (let i = startIdx; i < str.length; i++) {
    const ch = str[i]
    if (escape) {
      escape = false
      continue
    }
    if (ch === '\\' && inString) {
      escape = true
      continue
    }
    if (ch === '"') {
      inString = !inString
      continue
    }
    if (inString) continue
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) {
        const candidate = str.slice(startIdx, i + 1)
        // Only try parsing if the candidate is large enough to be a real document
        if (candidate.length < 50) return null
        const parsed = tryParse(candidate)
        if (parsed && looksLikeEmailDocument(parsed)) {
          return parsed
        }
        // Not an EmailDocument — don't return null, let the caller try the next {
        return null
      }
    }
  }

  // Brackets never closed — try to repair the truncated JSON
  if (depth > 0) {
    const candidate = str.slice(startIdx)
    if (candidate.length >= 50) {
      const parsed = tryParse(candidate)
      if (parsed && looksLikeEmailDocument(parsed)) {
        return parsed
      }
    }
  }

  return null
}

/** Validate the parsed object conforms to the EmailDocument schema */
function validateDocument(obj: Record<string, unknown>): void {
  // Auto-fill version if missing but document looks valid otherwise
  if (obj.version === undefined && 'body' in obj) {
    obj.version = 1
  }

  if (obj.version !== 1) {
    throw new AiParseError(`Invalid document version: expected 1, got ${obj.version}`)
  }

  // Auto-create headAttributes if missing
  if (!obj.headAttributes || typeof obj.headAttributes !== 'object') {
    obj.headAttributes = { defaultStyles: {}, fonts: [], previewText: '' }
  }

  const head = obj.headAttributes as Record<string, unknown>
  // Provide defaults for missing optional head fields
  if (!head.defaultStyles) head.defaultStyles = {}
  if (!head.fonts) head.fonts = []
  if (head.previewText === undefined) head.previewText = ''

  if (!obj.body || typeof obj.body !== 'object') {
    throw new AiParseError('Missing or invalid body')
  }

  const body = obj.body as Record<string, unknown>
  if (body.type !== 'mj-body') {
    throw new AiParseError(`body.type must be "mj-body", got "${body.type}"`)
  }

  // Recursively validate node types
  validateNodeTypes(obj.body as EmailNode)
}

function validateNodeTypes(node: EmailNode): void {
  if (!VALID_NODE_TYPES.has(node.type)) {
    throw new AiParseError(`Invalid node type: "${node.type}"`)
  }

  // Ensure required fields exist
  if (!node.attributes) node.attributes = {}
  if (!node.children) node.children = []

  for (const child of node.children) {
    validateNodeTypes(child)
  }
}

/** Recursively regenerate all node IDs to ensure uniqueness */
function regenerateIds(node: EmailNode): void {
  node.id = createId()
  if (node.children) {
    for (const child of node.children) {
      regenerateIds(child)
    }
  }
}
