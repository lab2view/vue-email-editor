/**
 * Generate static HTML previews of all starter templates.
 * Outputs to docs/public/templates/{id}.html
 *
 * Usage: npx tsx scripts/generate-template-previews.ts
 */
import { mkdirSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { STARTER_TEMPLATES } from '../src/blocks/starter-templates'
import { documentToMjml } from '../src/serializer/json-to-mjml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const OUT_DIR = resolve(__dirname, '../docs/public/templates')

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  // Use Node-native mjml (not mjml-browser which requires window)
  const mjml = await import('mjml')
  const mjml2html = mjml.default

  const manifest: Array<{ id: string; label: string; description: string; color: string; file: string }> = []

  for (const tpl of STARTER_TEMPLATES) {
    const doc = tpl.factory()
    const mjmlStr = documentToMjml(doc)

    try {
      const result = mjml2html(mjmlStr)
      const html = result.html

      const filename = `${tpl.id}.html`
      writeFileSync(resolve(OUT_DIR, filename), html, 'utf-8')

      manifest.push({
        id: tpl.id,
        label: tpl.label,
        description: tpl.description,
        color: tpl.color,
        file: filename,
      })

      console.log(`  ✓ ${tpl.id} (${tpl.label})`)
    } catch (err) {
      console.error(`  ✗ ${tpl.id}: ${err}`)
    }
  }

  // Write manifest JSON for the docs site
  writeFileSync(
    resolve(OUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8',
  )

  console.log(`\n${manifest.length} templates generated in ${OUT_DIR}`)
}

main().catch(console.error)
