import { describe, it, expect } from 'vitest'
import {
  exportForEsp,
  exportForMailchimp,
  exportForSendGrid,
  exportForBrevo,
  exportForAwsSes,
  exportForPostmark,
  exportForResend,
  ESP_PRESETS,
  MAILCHIMP_PRESET,
  SENDGRID_PRESET,
  BREVO_PRESET,
  AWS_SES_PRESET,
  POSTMARK_PRESET,
  RESEND_PRESET,
} from '../esp-presets'
import type { EspPreset } from '../esp-presets'
import { createDefaultDocument, createSection, createColumn, createText } from '../../serializer/node-factory'
import type { EmailDocument } from '../../types'

/** Build a minimal document with a text node containing merge tags */
function buildDocWithMergeTags(text: string): EmailDocument {
  const doc = createDefaultDocument()
  const section = createSection()
  const col = createColumn()
  const textNode = createText(text)
  col.children.push(textNode)
  section.children.push(col)
  doc.body.children = [section]
  return doc
}

describe('ESP Presets', () => {
  describe('preset registry', () => {
    it('contains all built-in presets', () => {
      expect(Object.keys(ESP_PRESETS)).toEqual([
        'mailchimp', 'sendgrid', 'brevo', 'aws-ses', 'postmark', 'resend',
      ])
    })

    it('each preset has required fields', () => {
      for (const preset of Object.values(ESP_PRESETS)) {
        expect(preset.id).toBeTruthy()
        expect(preset.name).toBeTruthy()
        expect(typeof preset.transformMergeTag).toBe('function')
      }
    })
  })

  describe('Mailchimp merge tag transform', () => {
    it('maps first_name to *|FNAME|*', () => {
      expect(MAILCHIMP_PRESET.transformMergeTag('first_name')).toBe('*|FNAME|*')
    })

    it('maps email to *|EMAIL|*', () => {
      expect(MAILCHIMP_PRESET.transformMergeTag('email')).toBe('*|EMAIL|*')
    })

    it('maps unknown variables to uppercase pipe format', () => {
      expect(MAILCHIMP_PRESET.transformMergeTag('custom_field')).toBe('*|CUSTOM_FIELD|*')
    })

    it('maps unsubscribe_url to *|UNSUB|*', () => {
      expect(MAILCHIMP_PRESET.transformMergeTag('unsubscribe_url')).toBe('*|UNSUB|*')
    })
  })

  describe('SendGrid merge tag transform', () => {
    it('maps first_name to {{first_name}}', () => {
      expect(SENDGRID_PRESET.transformMergeTag('first_name')).toBe('{{first_name}}')
    })

    it('maps unsubscribe_url to triple braces', () => {
      expect(SENDGRID_PRESET.transformMergeTag('unsubscribe_url')).toBe('{{{unsubscribe}}}')
    })

    it('maps unknown variables to handlebars format', () => {
      expect(SENDGRID_PRESET.transformMergeTag('custom')).toBe('{{custom}}')
    })
  })

  describe('Brevo merge tag transform', () => {
    it('maps first_name to {{ contact.FIRSTNAME }}', () => {
      expect(BREVO_PRESET.transformMergeTag('first_name')).toBe('{{ contact.FIRSTNAME }}')
    })

    it('maps unsubscribe_url to {{ unsubscribe }}', () => {
      expect(BREVO_PRESET.transformMergeTag('unsubscribe_url')).toBe('{{ unsubscribe }}')
    })

    it('maps unknown variables to contact attribute format', () => {
      expect(BREVO_PRESET.transformMergeTag('custom')).toBe('{{ contact.CUSTOM }}')
    })
  })

  describe('AWS SES merge tag transform', () => {
    it('maps first_name to {{firstName}} (camelCase)', () => {
      expect(AWS_SES_PRESET.transformMergeTag('first_name')).toBe('{{firstName}}')
    })

    it('maps unknown variables to handlebars format', () => {
      expect(AWS_SES_PRESET.transformMergeTag('custom')).toBe('{{custom}}')
    })
  })

  describe('Postmark merge tag transform', () => {
    it('maps first_name to {{first_name}}', () => {
      expect(POSTMARK_PRESET.transformMergeTag('first_name')).toBe('{{first_name}}')
    })

    it('maps unsubscribe_url to triple braces', () => {
      expect(POSTMARK_PRESET.transformMergeTag('unsubscribe_url')).toBe('{{{unsubscribe_url}}}')
    })
  })

  describe('Resend merge tag transform', () => {
    it('wraps any variable in handlebars', () => {
      expect(RESEND_PRESET.transformMergeTag('first_name')).toBe('{{first_name}}')
      expect(RESEND_PRESET.transformMergeTag('any_var')).toBe('{{any_var}}')
    })
  })

  describe('exportForEsp', () => {
    it('exports HTML for a valid preset string', async () => {
      const doc = buildDocWithMergeTags('<p>Hello {{first_name}}</p>')
      const result = await exportForEsp(doc, 'mailchimp')
      expect(result.html).toContain('*|FNAME|*')
      expect(result.mjml).toBeTruthy()
      expect(result.errors).toEqual([])
    })

    it('exports HTML for a preset object', async () => {
      const doc = buildDocWithMergeTags('<p>Hello {{first_name}}</p>')
      const result = await exportForEsp(doc, SENDGRID_PRESET)
      expect(result.html).toBeTruthy()
    })

    it('throws for unknown preset string', async () => {
      const doc = buildDocWithMergeTags('<p>Test</p>')
      await expect(exportForEsp(doc, 'unknown-esp')).rejects.toThrow('Unknown ESP preset')
    })

    it('strips editor classes from output', async () => {
      const doc = buildDocWithMergeTags('<p>Test</p>')
      const result = await exportForEsp(doc, 'sendgrid')
      expect(result.html).not.toContain('ebb-node-')
    })

    it('applies custom merge tag mappings', async () => {
      const doc = buildDocWithMergeTags('<p>Hello {{name}}</p>')
      const result = await exportForEsp(doc, 'sendgrid', {
        mergeTags: { name: '%%CUSTOM_NAME%%' },
      })
      expect(result.html).toContain('%%CUSTOM_NAME%%')
    })

    it('applies custom wrapHtml', async () => {
      const doc = buildDocWithMergeTags('<p>Test</p>')
      const result = await exportForEsp(doc, 'sendgrid', {
        wrapHtml: (html) => `<!-- WRAPPED -->${html}`,
      })
      expect(result.html).toContain('<!-- WRAPPED -->')
    })
  })

  describe('convenience functions', () => {
    const doc = buildDocWithMergeTags('<p>Hello {{first_name}}</p>')

    it('exportForMailchimp transforms merge tags', async () => {
      const result = await exportForMailchimp(doc)
      expect(result.html).toContain('*|FNAME|*')
    })

    it('exportForSendGrid returns valid HTML', async () => {
      const result = await exportForSendGrid(doc)
      expect(result.html).toBeTruthy()
      expect(result.errors).toEqual([])
    })

    it('exportForBrevo transforms merge tags', async () => {
      const result = await exportForBrevo(doc)
      expect(result.html).toContain('contact.FIRSTNAME')
    })

    it('exportForAwsSes transforms merge tags', async () => {
      const result = await exportForAwsSes(doc)
      expect(result.html).toContain('{{firstName}}')
    })

    it('exportForPostmark returns valid HTML', async () => {
      const result = await exportForPostmark(doc)
      expect(result.html).toBeTruthy()
    })

    it('exportForResend returns valid HTML', async () => {
      const result = await exportForResend(doc)
      expect(result.html).toBeTruthy()
    })
  })

  describe('Mailchimp postProcess', () => {
    it('injects unsubscribe link if missing', async () => {
      const doc = buildDocWithMergeTags('<p>Hello</p>')
      const result = await exportForMailchimp(doc)
      expect(result.html).toContain('*|UNSUB|*')
    })
  })

  describe('custom preset', () => {
    it('supports user-defined presets', async () => {
      const customPreset: EspPreset = {
        id: 'custom',
        name: 'Custom ESP',
        transformMergeTag: (variable) => `[%${variable}%]`,
      }
      const doc = buildDocWithMergeTags('<p>Hello {{name}}</p>')
      const result = await exportForEsp(doc, customPreset)
      expect(result.html).toContain('[%name%]')
    })
  })
})
