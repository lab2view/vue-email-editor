<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

interface TemplateEntry {
  id: string
  label: string
  description: string
  color: string
  file: string
}

const templates = ref<TemplateEntry[]>([])
const previewTemplate = ref<TemplateEntry | null>(null)

onMounted(async () => {
  try {
    const resp = await fetch(import.meta.env.BASE_URL + 'templates/manifest.json')
    templates.value = await resp.json()
  } catch {
    // Fallback: hardcoded from build
    templates.value = []
  }
})

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

const showAll = ref(false)
const displayCount = 8
const displayed = computed(() => showAll.value ? templates.value : templates.value.slice(0, displayCount))
const hasMore = computed(() => templates.value.length > displayCount)
</script>

<template>
  <section class="tpl-gallery">
    <div class="tpl-gallery__header">
      <p class="tpl-gallery__eyebrow">Starter Templates</p>
      <h2 class="tpl-gallery__title">
        Start with a beautiful template
      </h2>
      <p class="tpl-gallery__subtitle">
        {{ templates.length }} professional templates ready to customize.
        Pick one, open it in the editor, and make it yours.
      </p>
    </div>

    <!-- Template grid with real previews -->
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
            <span class="tpl-card__zoom-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </span>
            Preview
          </div>
        </div>
        <div class="tpl-card__info">
          <span class="tpl-card__name">{{ tpl.label }}</span>
          <span class="tpl-card__desc">{{ tpl.description }}</span>
        </div>
        <div class="tpl-card__accent" :style="{ background: tpl.color }" />
      </button>
    </div>

    <!-- Show all -->
    <div v-if="hasMore && !showAll" class="tpl-gallery__more">
      <button class="tpl-gallery__more-btn" @click="showAll = true">
        Show all {{ templates.length }} templates
      </button>
    </div>

    <!-- Full preview modal -->
    <Teleport to="body">
      <div v-if="previewTemplate" class="tpl-modal" @click.self="closePreview">
        <div class="tpl-modal__content">
          <div class="tpl-modal__header">
            <div>
              <h3 class="tpl-modal__title">{{ previewTemplate.label }}</h3>
              <p class="tpl-modal__desc">{{ previewTemplate.description }}</p>
            </div>
            <button class="tpl-modal__close" @click="closePreview" aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <iframe
            :src="templateUrl(previewTemplate)"
            class="tpl-modal__iframe"
          />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.tpl-gallery {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
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

/* Grid */
.tpl-gallery__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* Card */
.tpl-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  padding: 0;
  font: inherit;
  color: inherit;
}

.tpl-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-1);
}

/* Accent bar at bottom */
.tpl-card__accent {
  height: 3px;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tpl-card:hover .tpl-card__accent {
  opacity: 1;
}

/* Preview area */
.tpl-card__preview {
  position: relative;
  height: 280px;
  overflow: hidden;
  background: #ffffff;
}

.tpl-card__iframe {
  width: 600px;
  height: 900px;
  border: none;
  pointer-events: none;
  transform: scale(0.44);
  transform-origin: top left;
}

/* Hover overlay */
.tpl-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(1, 168, 171, 0.85);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.tpl-card:hover .tpl-card__overlay {
  opacity: 1;
}

.tpl-card__zoom-icon {
  display: flex;
}

/* Info */
.tpl-card__info {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tpl-card__name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tpl-card__desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

/* Show more */
.tpl-gallery__more {
  text-align: center;
  margin-top: 2rem;
}

.tpl-gallery__more-btn {
  padding: 0.75rem 2.5rem;
  border-radius: 99px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid var(--vp-c-brand-1);
  background: transparent;
  color: var(--vp-c-brand-1);
  transition: all 0.2s ease;
}

.tpl-gallery__more-btn:hover {
  background: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(1, 168, 171, 0.25);
}

/* ── Modal ── */
.tpl-modal {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  padding: 2rem;
}

.tpl-modal__content {
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  background: var(--vp-c-bg);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

.tpl-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tpl-modal__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}

.tpl-modal__desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin: 2px 0 0;
}

.tpl-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
}

.tpl-modal__close:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.tpl-modal__iframe {
  width: 100%;
  flex: 1;
  min-height: 70vh;
  border: none;
  background: white;
}

/* Responsive */
@media (max-width: 960px) {
  .tpl-gallery__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .tpl-gallery__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .tpl-gallery__title {
    font-size: 1.5rem;
  }
  .tpl-card__preview {
    height: 200px;
  }
  .tpl-card__iframe {
    transform: scale(0.33);
  }
  .tpl-modal {
    padding: 0.5rem;
  }
}
</style>
