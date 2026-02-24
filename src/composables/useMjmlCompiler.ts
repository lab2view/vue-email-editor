/**
 * MJML compiler — lazy-loads mjml-browser and compiles MJML to HTML.
 */

export interface MjmlError {
  line: number
  message: string
  tagName?: string
  formattedMessage?: string
}

export interface MjmlCompilationResult {
  html: string
  errors: MjmlError[]
}

let mjml2htmlFn: ((source: string) => { html: string; errors: MjmlError[] }) | null = null

async function loadMjml() {
  if (!mjml2htmlFn) {
    const mod = await import('mjml-browser')
    mjml2htmlFn = mod.default
  }
  return mjml2htmlFn
}

export async function compileMjml(source: string): Promise<MjmlCompilationResult> {
  if (!source || !source.trim()) {
    return { html: '', errors: [] }
  }

  try {
    const mjml2html = await loadMjml()
    const result = mjml2html(source)
    return {
      html: result.html,
      errors: (result.errors || []).map((e) => ({
        line: e.line ?? 0,
        message: e.message ?? String(e),
        tagName: e.tagName,
        formattedMessage: e.formattedMessage,
      })),
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return {
      html: '',
      errors: [{ line: 0, message: `Compilation failed: ${message}` }],
    }
  }
}
