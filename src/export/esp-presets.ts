/**
 * ESP Export Presets — Transform email HTML for specific Email Service Providers.
 *
 * Each preset maps generic merge tags ({{variable}}) to ESP-specific formats
 * and applies ESP-specific HTML constraints.
 */

import type { EmailDocument } from '../types'
import { documentToMjml } from '../serializer/json-to-mjml'
import { compileMjml } from '../composables/useMjmlCompiler'

// ─── Types ──────────────────────────────────────────────────────

export interface EspExportOptions {
  /** Map of generic variable names to ESP-specific tag formats */
  mergeTags?: Record<string, string>
  /** Strip editor-internal CSS classes (ebb-node-*) from output */
  stripEditorClasses?: boolean
  /** Add ESP-specific meta tags or wrapper HTML */
  wrapHtml?: (html: string) => string
}

export interface EspExportResult {
  /** Final HTML ready for the ESP */
  html: string
  /** MJML source (useful for debugging) */
  mjml: string
  /** Any compilation errors */
  errors: Array<{ line: number; message: string }>
}

export interface EspPreset {
  /** ESP identifier */
  id: string
  /** Display name */
  name: string
  /** Transform a generic merge tag variable to ESP format */
  transformMergeTag: (variable: string) => string
  /** Apply ESP-specific post-processing to the HTML */
  postProcess?: (html: string) => string
}

// ─── Built-in Presets ───────────────────────────────────────────

export const MAILCHIMP_PRESET: EspPreset = {
  id: 'mailchimp',
  name: 'Mailchimp',
  transformMergeTag: (variable) => {
    // Mailchimp uses *|MERGE_TAG|* format
    const map: Record<string, string> = {
      first_name: '*|FNAME|*',
      last_name: '*|LNAME|*',
      email: '*|EMAIL|*',
      company: '*|COMPANY|*',
      phone: '*|PHONE|*',
      address: '*|ADDRESS|*',
      city: '*|CITY|*',
      state: '*|STATE|*',
      zip: '*|ZIP|*',
      country: '*|COUNTRY|*',
      unsubscribe_url: '*|UNSUB|*',
      update_profile_url: '*|UPDATE_PROFILE|*',
      browser_url: '*|ARCHIVE|*',
      current_year: '*|CURRENT_YEAR|*',
      list_name: '*|LIST:NAME|*',
    }
    return map[variable] || `*|${variable.toUpperCase()}|*`
  },
  postProcess: (html) => {
    // Mailchimp requires the unsubscribe link
    if (!html.includes('*|UNSUB|*') && !html.includes('*|LIST:UNSUBSCRIBE|*')) {
      // Inject a minimal unsubscribe footer if not present
      html = html.replace(
        '</body>',
        '<div style="text-align:center;font-size:11px;color:#999;padding:20px 0;">' +
        '<a href="*|UNSUB|*" style="color:#999;">Unsubscribe</a>' +
        '</div></body>',
      )
    }
    return html
  },
}

export const SENDGRID_PRESET: EspPreset = {
  id: 'sendgrid',
  name: 'SendGrid',
  transformMergeTag: (variable) => {
    // SendGrid uses {{variable}} handlebars format (same as generic)
    const map: Record<string, string> = {
      first_name: '{{first_name}}',
      last_name: '{{last_name}}',
      email: '{{email}}',
      company: '{{company}}',
      unsubscribe_url: '{{{unsubscribe}}}',
      browser_url: '{{{weblink}}}',
      sender_name: '{{sender_name}}',
      sender_city: '{{sender_city}}',
      sender_state: '{{sender_state}}',
      sender_country: '{{sender_country}}',
    }
    return map[variable] || `{{${variable}}}`
  },
  postProcess: (html) => {
    // SendGrid requires triple braces for URLs (unescaped)
    return html.replace(/\{\{(https?:\/\/[^}]+)\}\}/g, '{{{$1}}}')
  },
}

export const BREVO_PRESET: EspPreset = {
  id: 'brevo',
  name: 'Brevo (Sendinblue)',
  transformMergeTag: (variable) => {
    // Brevo uses {{ contact.ATTRIBUTE }} format
    const map: Record<string, string> = {
      first_name: '{{ contact.FIRSTNAME }}',
      last_name: '{{ contact.LASTNAME }}',
      email: '{{ contact.EMAIL }}',
      company: '{{ contact.COMPANY }}',
      phone: '{{ contact.SMS }}',
      unsubscribe_url: '{{ unsubscribe }}',
      browser_url: '{{ mirror }}',
      current_date: '{{ date_now }}',
    }
    return map[variable] || `{{ contact.${variable.toUpperCase()} }}`
  },
}

export const AWS_SES_PRESET: EspPreset = {
  id: 'aws-ses',
  name: 'Amazon SES',
  transformMergeTag: (variable) => {
    // AWS SES uses {{variable}} for templates
    const map: Record<string, string> = {
      first_name: '{{firstName}}',
      last_name: '{{lastName}}',
      email: '{{email}}',
      company: '{{company}}',
      unsubscribe_url: '{{unsubscribeUrl}}',
    }
    return map[variable] || `{{${variable}}}`
  },
}

export const POSTMARK_PRESET: EspPreset = {
  id: 'postmark',
  name: 'Postmark',
  transformMergeTag: (variable) => {
    // Postmark uses {{variable}} Mustache format
    const map: Record<string, string> = {
      first_name: '{{first_name}}',
      last_name: '{{last_name}}',
      email: '{{email}}',
      company: '{{company_name}}',
      unsubscribe_url: '{{{unsubscribe_url}}}',
    }
    return map[variable] || `{{${variable}}}`
  },
}

export const RESEND_PRESET: EspPreset = {
  id: 'resend',
  name: 'Resend',
  transformMergeTag: (variable) => {
    // Resend uses {{variable}} format
    return `{{${variable}}}`
  },
}

// ─── Preset Registry ────────────────────────────────────────────

export const ESP_PRESETS: Record<string, EspPreset> = {
  mailchimp: MAILCHIMP_PRESET,
  sendgrid: SENDGRID_PRESET,
  brevo: BREVO_PRESET,
  'aws-ses': AWS_SES_PRESET,
  postmark: POSTMARK_PRESET,
  resend: RESEND_PRESET,
}

// ─── Core Export Function ───────────────────────────────────────

/**
 * Export an email document for a specific ESP.
 *
 * @param document - The email document to export
 * @param preset - An EspPreset object or a string key from ESP_PRESETS
 * @param options - Additional export options
 */
export async function exportForEsp(
  document: EmailDocument,
  preset: EspPreset | string,
  options: EspExportOptions = {},
): Promise<EspExportResult> {
  const resolvedPreset = typeof preset === 'string' ? ESP_PRESETS[preset] : preset
  if (!resolvedPreset) {
    throw new Error(`Unknown ESP preset: ${preset}`)
  }

  // 1. Generate MJML from document
  let mjml = documentToMjml(document)

  // 2. Strip editor-internal CSS classes from MJML
  mjml = mjml.replace(/\s*css-class="[^"]*ebb-node-[^"]*"/g, (match) => {
    // Remove ebb-node-* classes (IDs may contain hyphens/underscores), keep any user classes
    const cleaned = match.replace(/ebb-node-[\w-]+/g, '').replace(/\s+/g, ' ').trim()
    if (cleaned === 'css-class=""' || cleaned === 'css-class=" "') return ''
    return cleaned
  })

  // 3. Transform merge tags in MJML content
  mjml = transformMergeTags(mjml, resolvedPreset, options.mergeTags)

  // 4. Compile MJML to HTML
  const result = await compileMjml(mjml)

  let html = result.html

  // 5. Clean up remaining editor classes in HTML output
  if (options.stripEditorClasses !== false) {
    html = html.replace(/\s*class="[^"]*ebb-node-[^"]*"/g, (match) => {
      const cleaned = match.replace(/ebb-node-[\w-]+/g, '').replace(/\s+/g, ' ').trim()
      if (cleaned === 'class=""' || cleaned === 'class=" "') return ''
      return cleaned
    })
  }

  // 6. Apply ESP-specific post-processing
  if (resolvedPreset.postProcess) {
    html = resolvedPreset.postProcess(html)
  }

  // 7. Apply custom wrapper
  if (options.wrapHtml) {
    html = options.wrapHtml(html)
  }

  return {
    html,
    mjml,
    errors: result.errors,
  }
}

// ─── Convenience Functions ──────────────────────────────────────

export async function exportForMailchimp(document: EmailDocument, options?: EspExportOptions): Promise<EspExportResult> {
  return exportForEsp(document, MAILCHIMP_PRESET, options)
}

export async function exportForSendGrid(document: EmailDocument, options?: EspExportOptions): Promise<EspExportResult> {
  return exportForEsp(document, SENDGRID_PRESET, options)
}

export async function exportForBrevo(document: EmailDocument, options?: EspExportOptions): Promise<EspExportResult> {
  return exportForEsp(document, BREVO_PRESET, options)
}

export async function exportForAwsSes(document: EmailDocument, options?: EspExportOptions): Promise<EspExportResult> {
  return exportForEsp(document, AWS_SES_PRESET, options)
}

export async function exportForPostmark(document: EmailDocument, options?: EspExportOptions): Promise<EspExportResult> {
  return exportForEsp(document, POSTMARK_PRESET, options)
}

export async function exportForResend(document: EmailDocument, options?: EspExportOptions): Promise<EspExportResult> {
  return exportForEsp(document, RESEND_PRESET, options)
}

// ─── Internal Helpers ───────────────────────────────────────────

/**
 * Replace generic merge tag syntax with ESP-specific format.
 * Handles {{variable}}, {{ variable }}, and custom mappings.
 */
function transformMergeTags(
  content: string,
  preset: EspPreset,
  customMappings?: Record<string, string>,
): string {
  // Match {{variable}} patterns (with optional spaces)
  return content.replace(/\{\{\s*([a-zA-Z_][a-zA-Z0-9_.]*)\s*\}\}/g, (_match, variable: string) => {
    // Check custom mappings first
    if (customMappings?.[variable]) {
      return customMappings[variable]
    }
    // Then use preset transformer
    return preset.transformMergeTag(variable)
  })
}
