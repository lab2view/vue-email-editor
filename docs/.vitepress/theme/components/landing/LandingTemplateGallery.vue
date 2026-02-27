<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch, defineAsyncComponent } from 'vue'
import { STARTER_TEMPLATES } from '../../../../../src/blocks/starter-templates'

const EmailEditor = defineAsyncComponent(() =>
  import('../../../../../src/EmailEditor.vue')
)

interface TemplateEntry {
  id: string
  label: string
  description: string
  color: string
  file: string
  category: string
  tags: string[]
}

const templates = ref<TemplateEntry[]>([])
const editingTemplate = ref<TemplateEntry | null>(null)
const activeCategory = ref('all')
const editorRef = ref<InstanceType<typeof EmailEditor> | null>(null)
const editorMjml = ref('')
const editorHtml = ref('')
const copyLabel = ref('Copy HTML')

// Categories matching the Pencil design pills — keys are manifest category values
const categories = [
  { key: 'all', label: 'All' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'engagement', label: 'Engagement' },
  { key: 'transactionnel', label: 'Transactional' },
  { key: 'evenement', label: 'Events' },
  { key: 'industrie', label: 'Industry' },
]

// The 12 showcase template IDs — displayed first, with specific heights
const showcaseHeights: Record<string, number> = {
  'blank': 280,
  'fashion-gift-guide': 620,
  'womens-day': 520,
  'chinese-new-year': 420,
  'travel-newsletter': 620,
  'product-launch-aurora': 520,
  'holiday-sale-christmas': 520,
  'welcome-series': 420,
  'summer-promo': 620,
  'order-confirmation-phone': 420,
  'weekly-digest': 520,
  'black-friday-deal': 620,
}

const showcaseOrder = Object.keys(showcaseHeights)
const defaultCardHeight = 480
const showAll = ref(false)

onMounted(async () => {
  try {
    const resp = await fetch(import.meta.env.BASE_URL + 'templates/manifest.json')
    templates.value = await resp.json()
  } catch {
    templates.value = []
  }

})

// Showcase-only templates (the 12 Pencil cards), sorted by Pencil order
const showcaseTemplates = computed(() => {
  return templates.value
    .filter(t => showcaseOrder.includes(t.id))
    .sort((a, b) => showcaseOrder.indexOf(a.id) - showcaseOrder.indexOf(b.id))
})

// All other templates (not in showcase)
const restTemplates = computed(() => {
  return templates.value.filter(t => !showcaseOrder.includes(t.id))
})

// What gets displayed: showcase only, or showcase + rest
const displayedTemplates = computed(() => {
  const base = showAll.value
    ? [...showcaseTemplates.value, ...restTemplates.value]
    : showcaseTemplates.value

  if (activeCategory.value === 'all') return base
  return base.filter(t => t.category === activeCategory.value)
})

function cardHeight(tpl: TemplateEntry): number {
  return showcaseHeights[tpl.id] || defaultCardHeight
}

function expandAll() {
  showAll.value = true
}

function templateUrl(tpl: TemplateEntry) {
  return import.meta.env.BASE_URL + 'templates/' + tpl.file
}


// Template waiting to be loaded once the async editor component is ready
const pendingTemplate = ref<TemplateEntry | null>(null)

function loadTemplateInEditor(tpl: TemplateEntry) {
  const starter = STARTER_TEMPLATES.find(s => s.id === tpl.id)
  if (!starter) return
  editorRef.value?.loadTemplate(starter.factory())
}

function openEditor(tpl: TemplateEntry) {
  editingTemplate.value = tpl
  pendingTemplate.value = tpl
  copyLabel.value = 'Copy HTML'
  document.body.style.overflow = 'hidden'

  // If editor already loaded (not first click), load immediately
  if (editorRef.value) {
    nextTick(() => {
      loadTemplateInEditor(tpl)
      pendingTemplate.value = null
    })
  }
  // Otherwise the watcher below handles it when the async component mounts
}

// Watch for the async EmailEditor to become available on first load
watch(editorRef, (editor) => {
  if (editor && pendingTemplate.value) {
    nextTick(() => {
      loadTemplateInEditor(pendingTemplate.value!)
      pendingTemplate.value = null
    })
  }
})

function closeEditor() {
  editingTemplate.value = null
  editorMjml.value = ''
  editorHtml.value = ''
  document.body.style.overflow = ''
}

function navigateEditor(dir: number) {
  if (!editingTemplate.value) return
  const list = displayedTemplates.value
  const idx = list.findIndex(t => t.id === editingTemplate.value!.id)
  const next = idx + dir
  if (next >= 0 && next < list.length) {
    const tpl = list[next]
    editingTemplate.value = tpl
    copyLabel.value = 'Copy HTML'
    loadTemplateInEditor(tpl)
  }
}

const canPrev = computed(() => {
  if (!editingTemplate.value) return false
  return displayedTemplates.value.findIndex(t => t.id === editingTemplate.value!.id) > 0
})

const canNext = computed(() => {
  if (!editingTemplate.value) return false
  const idx = displayedTemplates.value.findIndex(t => t.id === editingTemplate.value!.id)
  return idx < displayedTemplates.value.length - 1
})

async function copyHtml() {
  const html = editorRef.value?.getHtml()
  if (!html) return
  try {
    await navigator.clipboard.writeText(html)
    copyLabel.value = 'Copied!'
    setTimeout(() => { copyLabel.value = 'Copy HTML' }, 2000)
  } catch {
    // Fallback
    copyLabel.value = 'Failed'
    setTimeout(() => { copyLabel.value = 'Copy HTML' }, 2000)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (!editingTemplate.value) return
  if (e.key === 'Escape') closeEditor()
}

// Dynamic iframe scaling
const iframeScale = ref(0.15)
const gridRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

function updateScale() {
  if (!gridRef.value) return
  const card = gridRef.value.querySelector('.gallery__card-iframe-wrap') as HTMLElement
  if (card) {
    iframeScale.value = card.offsetWidth / 600
  }
}

// Re-compute scale when filter or showAll changes (cards may resize)
watch([activeCategory, showAll], () => nextTick(updateScale))

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  nextTick(() => {
    updateScale()
    if (gridRef.value) {
      resizeObserver = new ResizeObserver(updateScale)
      resizeObserver.observe(gridRef.value)
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  resizeObserver?.disconnect()
})

const categoryCounts = computed(() => {
  const counts: Record<string, number> = { all: templates.value.length }
  for (const tpl of templates.value) {
    counts[tpl.category] = (counts[tpl.category] || 0) + 1
  }
  return counts
})
</script>

<template>
  <section class="gallery">
    <!-- Header -->
    <div class="gallery__header">
      <div class="gallery__header-top">
        <span class="gallery__eyebrow">STARTER TEMPLATES</span>
        <span class="gallery__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          {{ templates.length }} templates
        </span>
      </div>
      <h2 class="gallery__title">Ship faster with ready&#8209;made templates</h2>
      <p class="gallery__subtitle">
        Every template ships with the npm package — no account needed, no API calls.
        Import, customize in the editor, and export production&#8209;ready HTML.
      </p>
      <div class="gallery__install-hint">
        <code class="gallery__install-code">import { starterTemplates } from '@lab2view/vue-email-editor'</code>
      </div>
    </div>

    <!-- Filter pills -->
    <div class="gallery__filters">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="gallery__pill"
        :class="{ 'gallery__pill--active': activeCategory === cat.key }"
        @click="activeCategory = cat.key"
      >
        {{ cat.label }}
        <span v-if="categoryCounts[cat.key]" class="gallery__pill-count">{{ categoryCounts[cat.key] }}</span>
      </button>
    </div>

    <!-- Masonry grid -->
    <div ref="gridRef" class="gallery__masonry">
      <div
        v-for="tpl in displayedTemplates"
        :key="tpl.id"
        class="gallery__card"
        :style="{ height: cardHeight(tpl) + 'px' }"
        @click="openEditor(tpl)"
      >
        <!-- Blank card -->
        <template v-if="tpl.id === 'blank'">
          <div class="gallery__card-blank">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span class="gallery__card-blank-text">Blank Template</span>
          </div>
        </template>
        <!-- Iframe preview card -->
        <template v-else>
          <div class="gallery__card-iframe-wrap">
            <iframe
              :src="templateUrl(tpl)"
              :title="tpl.label + ' email template'"
              class="gallery__card-iframe"
              :style="{ transform: `scale(${iframeScale})` }"
              loading="lazy"
              tabindex="-1"
              scrolling="no"
            />
          </div>
          <div class="gallery__card-info">
            <span class="gallery__card-name">{{ tpl.label }}</span>
            <span class="gallery__card-cat">{{ tpl.category }}</span>
          </div>
        </template>
      </div>
    </div>

    <!-- View all button -->
    <div v-if="!showAll && restTemplates.length > 0" class="gallery__expand">
      <button class="gallery__expand-btn" @click="expandAll">
        View all {{ templates.length }} templates
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>

    <!-- Editor Modal (fullscreen) -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="editingTemplate"
          class="gallery__modal"
          role="dialog"
          aria-modal="true"
          :aria-label="`Edit: ${editingTemplate.label}`"
        >
          <!-- Floating controls overlaid on the editor toolbar -->
          <div class="gallery__modal-controls-left">
            <button class="gallery__modal-close" @click="closeEditor" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <span class="gallery__modal-badge" :style="{ background: editingTemplate.color }" />
            <h3 class="gallery__modal-name">{{ editingTemplate.label }}</h3>
          </div>
          <div class="gallery__modal-controls-right">
            <div class="gallery__modal-nav">
              <button class="gallery__modal-nav-btn" :disabled="!canPrev" @click="navigateEditor(-1)" aria-label="Previous template">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="gallery__modal-nav-btn" :disabled="!canNext" @click="navigateEditor(1)" aria-label="Next template">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
              </button>
            </div>
            <button class="gallery__modal-copy" @click="copyHtml">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              {{ copyLabel }}
            </button>
          </div>
          <!-- Editor fills the entire viewport -->
          <div class="gallery__modal-editor">
            <EmailEditor
              ref="editorRef"
              v-model="editorMjml"
              @update:compiled-html="editorHtml = $event"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery {
  background: #F9FAFB;
  padding: 96px 72px;
}

/* ── Header ── */
.gallery__header {
  text-align: center;
  margin-bottom: 48px;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}

.gallery__header-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.gallery__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #01A8AB;
}

.gallery__badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #666666;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 100px;
  padding: 5px 12px;
}

.gallery__title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 42px;
  font-weight: 500;
  letter-spacing: -1px;
  color: #1A1A1A;
  margin-bottom: 16px;
  line-height: 1.15;
}

.gallery__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  line-height: 1.7;
  margin-bottom: 24px;
}

.gallery__install-hint {
  display: inline-block;
}

.gallery__install-code {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: #01A8AB;
  background: rgba(1, 168, 171, 0.06);
  border: 1px solid rgba(1, 168, 171, 0.15);
  border-radius: 8px;
  padding: 10px 20px;
  letter-spacing: -0.2px;
}

/* ── Filter pills ── */
.gallery__filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
}

.gallery__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #FFFFFF;
  color: #1A1A1A;
  border: 1px solid #E5E5E5;
}

.gallery__pill:hover {
  border-color: #01A8AB;
  color: #01A8AB;
}

.gallery__pill--active {
  background: #01A8AB;
  border-color: #01A8AB;
  color: #FFFFFF;
}

.gallery__pill--active:hover {
  color: #FFFFFF;
}

.gallery__pill-count {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.6;
}

.gallery__pill--active .gallery__pill-count {
  opacity: 0.85;
}


/* ── Masonry grid using CSS columns ── */
.gallery__masonry {
  columns: 6;
  column-gap: 20px;
}

.gallery__card {
  break-inside: avoid;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  background: #FFFFFF;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.gallery__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

/* Blank card */
.gallery__card-blank {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border: 1px solid #E5E5E5;
  border-radius: 12px;
}

.gallery__card-blank-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
}

/* Iframe preview card */
.gallery__card-iframe-wrap {
  flex: 1;
  overflow: hidden;
  position: relative;
  pointer-events: none;
}

.gallery__card-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 2000px;
  border: none;
  transform-origin: top left;
  pointer-events: none;
}

.gallery__card-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  flex-shrink: 0;
}

.gallery__card-name {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
}

.gallery__card-cat {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #888888;
  text-transform: capitalize;
}

/* ── Expand button ── */
.gallery__expand {
  text-align: center;
  margin-top: 48px;
}

.gallery__expand-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 36px;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  background: #FFFFFF;
  color: #1A1A1A;
  border: 1.5px solid #E5E5E5;
}

.gallery__expand-btn:hover {
  border-color: #01A8AB;
  color: #01A8AB;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(1, 168, 171, 0.12);
}

/* ── Fullscreen Editor Modal ── */
.gallery__modal {
  position: fixed;
  inset: 0;
  z-index: 999;
}

/* Floating controls — overlaid in the editor toolbar center */
.gallery__modal-controls-left,
.gallery__modal-controls-right {
  position: absolute;
  top: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  height: 48px; /* match .ebb-toolbar height */
  gap: 8px;
  pointer-events: auto;
}

.gallery__modal-controls-left {
  left: 50%;
  transform: translateX(-100%);
  padding-right: 12px;
}

.gallery__modal-controls-right {
  left: 50%;
  padding-left: 12px;
}

.gallery__modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--ee-border, #e5e7eb);
  background: var(--ee-panel-header-bg, #f9fafb);
  color: #666666;
  cursor: pointer;
  transition: all 0.15s;
}

.gallery__modal-close:hover {
  background: #F0F0F0;
  color: #1A1A1A;
  border-color: #CCC;
}

.gallery__modal-badge {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.gallery__modal-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #1A1A1A;
  margin: 0;
  line-height: 1;
  white-space: nowrap;
}

.gallery__modal-nav {
  display: flex;
  gap: 2px;
}

.gallery__modal-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--ee-border, #e5e7eb);
  background: var(--ee-panel-header-bg, #f9fafb);
  color: #666666;
  cursor: pointer;
  transition: all 0.15s;
}

.gallery__modal-nav-btn:hover:not(:disabled) {
  border-color: #01A8AB;
  color: #01A8AB;
}

.gallery__modal-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.gallery__modal-copy {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: #01A8AB;
  color: #FFFFFF;
  border: none;
}

.gallery__modal-copy:hover {
  background: #019093;
}

/* Editor fills the entire viewport edge-to-edge */
.gallery__modal-editor {
  position: absolute;
  inset: 0;
}

/* Strip the editor's own border / radius / shadow so it goes edge-to-edge */
.gallery__modal-editor :deep(.ebb-shell) {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  height: 100vh !important;
}

/* Hide the editor toolbar's center title (replaced by our controls) */
.gallery__modal-editor :deep(.ebb-toolbar__title) {
  visibility: hidden !important;
}

/* Hide the fullscreen button and preceding divider (we ARE fullscreen) */
.gallery__modal-editor :deep(.ebb-toolbar__group > .ebb-toolbar__action-btn:last-child),
.gallery__modal-editor :deep(.ebb-toolbar__group > .ebb-toolbar__divider:last-of-type) {
  display: none !important;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from { opacity: 0; }
.modal-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 1400px) {
  .gallery__masonry {
    columns: 5;
  }
}

@media (max-width: 1100px) {
  .gallery {
    padding: 64px 32px;
  }
  .gallery__masonry {
    columns: 4;
  }
}

@media (max-width: 860px) {
  .gallery {
    padding: 48px 24px;
  }
  .gallery__masonry {
    columns: 3;
  }
  .gallery__title {
    font-size: 32px;
  }
  .gallery__install-hint {
    display: none;
  }
  .gallery__modal-name {
    font-size: 12px;
  }
}

@media (max-width: 640px) {
  .gallery {
    padding: 40px 16px;
  }
  .gallery__title {
    font-size: 26px;
  }
  .gallery__eyebrow {
    font-size: 10px;
  }
  .gallery__filters {
    flex-wrap: wrap;
  }
  .gallery__masonry {
    columns: 2;
  }
  .gallery__card:nth-child(n) {
    height: auto !important;
    min-height: 200px;
  }
  .gallery__modal-controls-left .gallery__modal-name,
  .gallery__modal-controls-left .gallery__modal-badge {
    display: none;
  }
}
</style>
