<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
const previewTemplate = ref<TemplateEntry | null>(null)
const activeCategory = ref('all')

const categories = [
  { key: 'all', label: 'All' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'transactionnel', label: 'Transactional' },
  { key: 'engagement', label: 'Engagement' },
  { key: 'evenement', label: 'Event' },
  { key: 'industrie', label: 'Industry' },
]

// Curated display order — most visually impressive first
const featuredOrder = [
  'newsletter', 'promotion', 'travel', 'event', 'restaurant',
  'welcome', 'conference', 'flash-sale', 'education', 'fitness',
  'product-launch', 'real-estate', 'case-study', 'workshop',
  'loyalty-program', 'saas-onboarding', 'invoice', 'testimonials',
  'webinar', 'seasonal-sale', 'milestone', 'abandoned-cart',
  'win-back', 'referral', 're-engagement', 'feedback-request',
  'birthday', 'survey', 'shipping', 'receipt',
  'subscription-renewal', 'notification', 'password-reset',
  'account-verification', 'order-confirmation', 'blank',
]

function sortByFeatured(list: TemplateEntry[]) {
  return [...list].sort((a, b) => {
    const ia = featuredOrder.indexOf(a.id)
    const ib = featuredOrder.indexOf(b.id)
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
  })
}

onMounted(async () => {
  try {
    const resp = await fetch(import.meta.env.BASE_URL + 'templates/manifest.json')
    templates.value = await resp.json()
  } catch {
    templates.value = []
  }
})

const filtered = computed(() => {
  const list = activeCategory.value === 'all'
    ? templates.value
    : templates.value.filter(t => t.category === activeCategory.value)
  return sortByFeatured(list)
})

function categoryCount(key: string) {
  if (key === 'all') return templates.value.length
  return templates.value.filter(t => t.category === key).length
}

const showAll = ref(false)
const displayCount = 12
const displayed = computed(() => showAll.value ? filtered.value : filtered.value.slice(0, displayCount))
const hasMore = computed(() => filtered.value.length > displayCount)

function setCategory(key: string) {
  activeCategory.value = key
  showAll.value = false
}

function openPreview(tpl: TemplateEntry) {
  previewTemplate.value = tpl
  document.body.style.overflow = 'hidden'
}

function closePreview() {
  previewTemplate.value = null
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closePreview()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

function templateUrl(tpl: TemplateEntry) {
  return import.meta.env.BASE_URL + 'templates/' + tpl.file
}

// Navigate between templates in modal
function navigatePreview(dir: number) {
  if (!previewTemplate.value) return
  const list = filtered.value
  const idx = list.findIndex(t => t.id === previewTemplate.value!.id)
  const next = idx + dir
  if (next >= 0 && next < list.length) {
    previewTemplate.value = list[next]
  }
}

function onModalKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') navigatePreview(-1)
  if (e.key === 'ArrowRight') navigatePreview(1)
}

onMounted(() => document.addEventListener('keydown', onModalKeydown))
onUnmounted(() => document.removeEventListener('keydown', onModalKeydown))

const canPrev = computed(() => {
  if (!previewTemplate.value) return false
  return filtered.value.findIndex(t => t.id === previewTemplate.value!.id) > 0
})
const canNext = computed(() => {
  if (!previewTemplate.value) return false
  const idx = filtered.value.findIndex(t => t.id === previewTemplate.value!.id)
  return idx < filtered.value.length - 1
})
</script>

<template>
  <section class="tpl-gallery">
    <div class="tpl-gallery__header">
      <p class="tpl-gallery__eyebrow">Starter Templates</p>
      <h2 class="tpl-gallery__title">
        Start from a professional template
      </h2>
      <p class="tpl-gallery__subtitle">
        {{ templates.length }} professional templates ready to customize.
        Pick one, open it in the editor, and make it yours.
      </p>
    </div>

    <!-- Category filters -->
    <div class="tpl-filters">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="tpl-filters__pill"
        :class="{ 'tpl-filters__pill--active': activeCategory === cat.key }"
        @click="setCategory(cat.key)"
      >
        {{ cat.label }}
        <span class="tpl-filters__count">{{ categoryCount(cat.key) }}</span>
      </button>
    </div>

    <!-- Template grid — tall cards like Stripo -->
    <div class="tpl-gallery__grid">
      <button
        v-for="tpl in displayed"
        :key="tpl.id"
        class="tpl-card"
        @click="openPreview(tpl)"
      >
        <div class="tpl-card__preview">
          <iframe
            :src="templateUrl(tpl)"
            class="tpl-card__iframe"
            loading="lazy"
            tabindex="-1"
            sandbox="allow-same-origin"
            scrolling="no"
          />
          <div class="tpl-card__overlay">
            <div class="tpl-card__overlay-inner">
              <span class="tpl-card__zoom-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </span>
              <span>Preview</span>
            </div>
          </div>
        </div>
        <div class="tpl-card__footer">
          <span class="tpl-card__name">{{ tpl.label }}</span>
          <span class="tpl-card__badge" :style="{ background: tpl.color }"></span>
        </div>
      </button>
    </div>

    <!-- Show all -->
    <div v-if="hasMore && !showAll" class="tpl-gallery__more">
      <button class="tpl-gallery__more-btn" @click="showAll = true">
        View all {{ filtered.length }} templates
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>

    <!-- Full preview modal — side panel like Stripo -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="previewTemplate" class="tpl-modal" @click.self="closePreview">
          <div class="tpl-modal__panel">
            <!-- Sidebar info -->
            <div class="tpl-modal__sidebar">
              <button class="tpl-modal__close" @click="closePreview" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div class="tpl-modal__info">
                <span class="tpl-modal__badge" :style="{ background: previewTemplate.color }"></span>
                <h3 class="tpl-modal__title">{{ previewTemplate.label }}</h3>
                <p class="tpl-modal__desc">{{ previewTemplate.description }}</p>
                <span class="tpl-modal__cat">{{ previewTemplate.category }}</span>
              </div>
              <div class="tpl-modal__nav">
                <button class="tpl-modal__nav-btn" :disabled="!canPrev" @click="navigatePreview(-1)" aria-label="Previous">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button class="tpl-modal__nav-btn" :disabled="!canNext" @click="navigatePreview(1)" aria-label="Next">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
                </button>
              </div>
            </div>
            <!-- Preview -->
            <div class="tpl-modal__preview">
              <iframe
                :src="templateUrl(previewTemplate)"
                class="tpl-modal__iframe"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* ═══════════════════════════════════════════
   Gallery — immersive, edge-to-edge layout
   ═══════════════════════════════════════════ */
.tpl-gallery {
  max-width: 100%;
  padding: 0 3vw 4rem;
}

.tpl-gallery__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.tpl-gallery__eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.tpl-gallery__title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.tpl-gallery__subtitle {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ── Category Filters ── */
.tpl-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.tpl-filters__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.1rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  font-family: inherit;
}

.tpl-filters__pill:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tpl-filters__pill--active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #ffffff;
}

.tpl-filters__pill--active:hover {
  color: #ffffff;
}

.tpl-filters__count {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 99px;
  background: rgba(0, 0, 0, 0.08);
  min-width: 1.2rem;
  text-align: center;
}

.tpl-filters__pill--active .tpl-filters__count {
  background: rgba(255, 255, 255, 0.25);
}

/* ── Grid — 6 columns on large screens ── */
.tpl-gallery__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.25rem;
}

/* ── Card — tall, immersive, minimal chrome ── */
.tpl-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
  padding: 0;
  font: inherit;
  color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.tpl-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

/* Preview area — tall to show most of the email */
.tpl-card__preview {
  position: relative;
  height: 440px;
  overflow: hidden;
  background: #ffffff;
}

.tpl-card__iframe {
  width: 600px;
  height: 1800px;
  border: none;
  pointer-events: none;
  transform-origin: top left;
  /* Scale to fit ~230px card width: 230/600 ≈ 0.383 */
  transform: scale(0.383);
}

/* Hover overlay — appears from bottom */
.tpl-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tpl-card:hover .tpl-card__overlay {
  opacity: 1;
}

.tpl-card__overlay-inner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
}

.tpl-card__zoom-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
}

/* Footer — minimal name + color dot */
.tpl-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-top: 1px solid rgba(0,0,0,0.05);
}

.tpl-card__name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tpl-card__badge {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── Show more ── */
.tpl-gallery__more {
  text-align: center;
  margin-top: 2.5rem;
}

.tpl-gallery__more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2.5rem;
  border-radius: 99px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid var(--vp-c-brand-1);
  background: transparent;
  color: var(--vp-c-brand-1);
  transition: all 0.25s ease;
  font-family: inherit;
}

.tpl-gallery__more-btn:hover {
  background: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(1, 168, 171, 0.25);
}

/* ═══════════════════════════════════════════
   Modal — Side panel with navigation
   ═══════════════════════════════════════════ */
.tpl-modal {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
}

.tpl-modal__panel {
  display: flex;
  width: 100%;
  max-width: 1100px;
  margin: 2rem;
  background: var(--vp-c-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4);
}

.tpl-modal__sidebar {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.tpl-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
  margin-bottom: 1.5rem;
}

.tpl-modal__close:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.tpl-modal__info {
  flex: 1;
}

.tpl-modal__badge {
  display: block;
  width: 40px;
  height: 4px;
  border-radius: 2px;
  margin-bottom: 1rem;
}

.tpl-modal__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
  line-height: 1.3;
}

.tpl-modal__desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0 0 1rem;
}

.tpl-modal__cat {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
}

.tpl-modal__nav {
  display: flex;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: auto;
}

.tpl-modal__nav-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
}

.tpl-modal__nav-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tpl-modal__nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.tpl-modal__preview {
  flex: 1;
  overflow-y: auto;
  background: #f8f8f8;
  display: flex;
  justify-content: center;
}

.dark .tpl-modal__preview {
  background: #1a1a2e;
}

.tpl-modal__iframe {
  width: 600px;
  min-height: 100%;
  border: none;
  background: white;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active .tpl-modal__panel,
.modal-leave-active .tpl-modal__panel {
  transition: transform 0.3s ease;
}
.modal-enter-from {
  opacity: 0;
}
.modal-enter-from .tpl-modal__panel {
  transform: scale(0.95) translateY(20px);
}
.modal-leave-to {
  opacity: 0;
}
.modal-leave-to .tpl-modal__panel {
  transform: scale(0.95);
}

/* ═══════════════════════════════════════════
   Dark mode overrides
   ═══════════════════════════════════════════ */
.dark .tpl-card {
  background: var(--vp-c-bg-soft);
  border-color: rgba(255, 255, 255, 0.06);
}

.dark .tpl-card:hover {
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
}

.dark .tpl-card__footer {
  border-top-color: rgba(255, 255, 255, 0.06);
}

/* ═══════════════════════════════════════════
   Responsive
   ═══════════════════════════════════════════ */
@media (max-width: 1400px) {
  .tpl-gallery__grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1100px) {
  .tpl-gallery__grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .tpl-card__preview {
    height: 380px;
  }
}

@media (max-width: 860px) {
  .tpl-gallery__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .tpl-card__preview {
    height: 360px;
  }
  /* Modal: stack sidebar on top */
  .tpl-modal__panel {
    flex-direction: column;
    margin: 0.5rem;
  }
  .tpl-modal__sidebar {
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .tpl-modal__close {
    margin-bottom: 0;
  }
  .tpl-modal__info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .tpl-modal__badge {
    display: none;
  }
  .tpl-modal__title {
    font-size: 1rem;
    margin: 0;
  }
  .tpl-modal__desc {
    display: none;
  }
  .tpl-modal__cat {
    display: none;
  }
  .tpl-modal__nav {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
    margin-left: auto;
  }
}

@media (max-width: 640px) {
  .tpl-gallery {
    padding: 0 1rem 3rem;
  }
  .tpl-gallery__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  .tpl-gallery__title {
    font-size: 1.5rem;
  }
  .tpl-card__preview {
    height: 300px;
  }
  .tpl-card__iframe {
    transform: scale(0.3);
  }
  .tpl-filters {
    gap: 0.35rem;
  }
  .tpl-filters__pill {
    font-size: 0.78rem;
    padding: 0.4rem 0.75rem;
  }
}
</style>
