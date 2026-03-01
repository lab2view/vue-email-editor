<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const loaded = ref(false)
const activeIndex = ref(0)

const showcaseTemplates = [
  { id: 'black-friday-deal', label: 'Black Friday Deal' },
  { id: 'fashion-gift-guide', label: 'Fashion Gift Guide' },
  { id: 'product-launch-aurora', label: 'Product Launch Aurora' },
  { id: 'holiday-sale-christmas', label: 'Holiday Sale' },
  { id: 'travel-newsletter', label: 'Travel Newsletter' },
]

const baseUrl = typeof import.meta !== 'undefined' ? import.meta.env.BASE_URL : '/'

function templateUrl(id: string) {
  return baseUrl + 'templates/' + id + '.html'
}

const currentTemplate = computed(() => showcaseTemplates[activeIndex.value])

let interval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 100)
  interval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % showcaseTemplates.length
  }, 4000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

function goTo(idx: number) {
  activeIndex.value = idx
  if (interval) clearInterval(interval)
  interval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % showcaseTemplates.length
  }, 4000)
}
</script>

<template>
  <section class="hero" :class="{ 'hero--visible': loaded }">
    <!-- Background glow -->
    <div class="hero__glow" />

    <div class="hero__inner">
      <div class="hero__content">
        <div class="hero__badge">
          <span class="hero__badge-dot" />
          Open Source &middot; MIT Licensed
        </div>
        <h1 class="hero__title">
          Build stunning emails<br>
          <span class="hero__title-gradient">with AI + drag &amp; drop</span>
        </h1>
        <p class="hero__desc">
          Describe your email and let AI generate it — or drag &amp; drop it yourself.
          A Vue 3 email editor with built-in AI chat, 47 free templates, MJML rendering,
          and full responsive preview.
        </p>
        <div class="hero__actions">
          <a href="https://www.npmjs.com/package/@lab2view/vue-email-editor" class="hero__btn hero__btn--primary" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            npm i @lab2view/vue-email-editor
          </a>
          <a href="https://github.com/lab2view/vue-email-editor" class="hero__btn hero__btn--ghost" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- Editor Showcase -->
    <div class="hero__editor">
      <div class="editor-showcase" :class="{ 'editor-showcase--visible': loaded }">
        <!-- Window chrome -->
        <div class="editor-showcase__chrome">
          <div class="editor-showcase__dots">
            <span class="editor-showcase__dot editor-showcase__dot--red" />
            <span class="editor-showcase__dot editor-showcase__dot--yellow" />
            <span class="editor-showcase__dot editor-showcase__dot--green" />
          </div>
          <span class="editor-showcase__chrome-title">{{ currentTemplate.label }} — vue-email-editor</span>
        </div>
        <!-- Editor layout -->
        <div class="editor-showcase__body">
          <!-- Left: Canvas -->
          <div class="editor-showcase__canvas">
            <div class="editor-showcase__viewport">
              <div class="editor-showcase__vp-btn editor-showcase__vp-btn--active">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Desktop
              </div>
              <div class="editor-showcase__vp-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                Tablet
              </div>
              <div class="editor-showcase__vp-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                Mobile
              </div>
            </div>
            <div class="editor-showcase__email-area">
              <div class="editor-showcase__email-frame">
                <template v-for="(tpl, idx) in showcaseTemplates" :key="tpl.id">
                  <iframe
                    v-show="idx === activeIndex"
                    :src="templateUrl(tpl.id)"
                    :title="tpl.label"
                    class="editor-showcase__iframe"
                    loading="lazy"
                    tabindex="-1"
                    scrolling="no"
                  />
                </template>
              </div>
            </div>
            <div class="editor-showcase__nav">
              <button
                v-for="(tpl, idx) in showcaseTemplates"
                :key="tpl.id"
                class="editor-showcase__nav-dot"
                :class="{ 'editor-showcase__nav-dot--active': idx === activeIndex }"
                :aria-label="'Show ' + tpl.label"
                @click="goTo(idx)"
              />
            </div>
          </div>
          <!-- Right: Sidebar -->
          <div class="editor-showcase__sidebar">
            <div class="editor-showcase__tabs">
              <span class="editor-showcase__tab editor-showcase__tab--active">Blocks</span>
              <span class="editor-showcase__tab">Styles</span>
              <span class="editor-showcase__tab">Layers</span>
              <span class="editor-showcase__tab editor-showcase__tab--ai">AI</span>
            </div>
            <div class="editor-showcase__sidebar-body">
              <div class="editor-showcase__search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <span class="editor-showcase__search-text">Search blocks...</span>
              </div>
              <span class="editor-showcase__section-label">STRUCTURE</span>
              <div class="editor-showcase__block-grid">
                <div class="editor-showcase__block-item"><div class="editor-showcase__block-icon editor-showcase__block-icon--teal" /><span>1 Column</span></div>
                <div class="editor-showcase__block-item"><div class="editor-showcase__block-icon editor-showcase__block-icon--teal" /><span>2 Columns</span></div>
                <div class="editor-showcase__block-item"><div class="editor-showcase__block-icon editor-showcase__block-icon--teal" /><span>3 Columns</span></div>
                <div class="editor-showcase__block-item"><div class="editor-showcase__block-icon editor-showcase__block-icon--teal" /><span>Sidebar</span></div>
              </div>
              <span class="editor-showcase__section-label">CONTENT</span>
              <div class="editor-showcase__block-grid">
                <div class="editor-showcase__block-item"><div class="editor-showcase__block-icon editor-showcase__block-icon--purple" /><span>Heading</span></div>
                <div class="editor-showcase__block-item"><div class="editor-showcase__block-icon editor-showcase__block-icon--purple" /><span>Text</span></div>
                <div class="editor-showcase__block-item"><div class="editor-showcase__block-icon editor-showcase__block-icon--amber" /><span>Image</span></div>
                <div class="editor-showcase__block-item"><div class="editor-showcase__block-icon editor-showcase__block-icon--amber" /><span>Button</span></div>
              </div>
              <span class="editor-showcase__section-label">READY-MADE</span>
              <div class="editor-showcase__readymade-grid">
                <div class="editor-showcase__readymade-item" />
                <div class="editor-showcase__readymade-item" />
                <div class="editor-showcase__readymade-item" />
                <div class="editor-showcase__readymade-item" />
                <div class="editor-showcase__readymade-item" />
                <div class="editor-showcase__readymade-item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Hero Section — always dark ── */
.hero {
  position: relative;
  padding: 80px 72px 64px;
  background: #0A0E1A;
  overflow: hidden;
}

/* Radial glow behind content */
.hero__glow {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  background: radial-gradient(ellipse at center, rgba(1, 168, 171, 0.15) 0%, rgba(1, 168, 171, 0.05) 40%, transparent 70%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
}

/* Badge */
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(1, 168, 171, 0.08);
  border: 1px solid rgba(1, 168, 171, 0.2);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #2dd4bf;
  margin-bottom: 32px;
}

.hero__badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2dd4bf;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Title */
.hero__title {
  font-family: 'Inter', sans-serif;
  font-size: 64px;
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -2.5px;
  color: #FFFFFF !important;
  margin: 0 0 24px;
}

.hero__title-gradient {
  background: linear-gradient(135deg, #2dd4bf, #01A8AB, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Description */
.hero__desc {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.7;
  color: #8B9DC3;
  max-width: 560px;
  margin: 0 auto 40px;
}

/* Buttons */
.hero__actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.hero__btn--primary {
  background: #01A8AB;
  color: #FFFFFF;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  box-shadow: 0 0 32px rgba(1, 168, 171, 0.25);
}

.hero__btn--primary:hover {
  background: #02c4c7;
  transform: translateY(-2px);
  box-shadow: 0 8px 40px rgba(1, 168, 171, 0.4);
}

.hero__btn--ghost {
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  padding: 16px 36px;
}

.hero__btn--ghost:hover {
  border-color: rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
  transform: translateY(-2px);
}

/* ── Editor Showcase ── */
.hero__editor {
  position: relative;
  max-width: 1100px;
  margin: 64px auto 0;
  z-index: 1;
}

.editor-showcase {
  border-radius: 16px;
  overflow: hidden;
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 32px 80px rgba(0, 0, 0, 0.5),
    0 0 120px rgba(1, 168, 171, 0.08);
  opacity: 0;
  transform: translateY(48px) scale(0.96);
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
}

.editor-showcase--visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Chrome bar */
.editor-showcase__chrome {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #0D1117;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.editor-showcase__dots {
  display: flex;
  gap: 8px;
}

.editor-showcase__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.editor-showcase__dot--red { background: #FF5F56; }
.editor-showcase__dot--yellow { background: #FFBD2E; }
.editor-showcase__dot--green { background: #27C93F; }

.editor-showcase__chrome-title {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #4B5563;
  margin-left: 4px;
}

/* Body */
.editor-showcase__body {
  display: flex;
  height: 540px;
}

/* Canvas */
.editor-showcase__canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1A1F2E;
}

.editor-showcase__viewport {
  display: flex;
  gap: 6px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.editor-showcase__vp-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #4B5563;
}

.editor-showcase__vp-btn--active {
  background: rgba(255, 255, 255, 0.06);
  color: #D1D5DB;
}

/* Email preview */
.editor-showcase__email-area {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px 32px 4px;
  overflow: hidden;
}

.editor-showcase__email-frame {
  width: 480px;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
}

.editor-showcase__iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 2400px;
  border: none;
  pointer-events: none;
  transform-origin: top left;
  transform: scale(0.8); /* 480 / 600 */
}

/* Nav dots */
.editor-showcase__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 0 12px;
}

.editor-showcase__nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.editor-showcase__nav-dot--active {
  width: 28px;
  border-radius: 4px;
  background: #01A8AB;
  box-shadow: 0 0 12px rgba(1, 168, 171, 0.4);
}

/* Sidebar */
.editor-showcase__sidebar {
  width: 260px;
  flex-shrink: 0;
  background: #111827;
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-showcase__tabs {
  display: flex;
  height: 42px;
  align-items: center;
  gap: 20px;
  padding: 0 16px;
  background: #0D1117;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.editor-showcase__tab {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #4B5563;
}

.editor-showcase__tab--active {
  font-weight: 600;
  color: #2dd4bf;
  border-bottom: 2px solid #2dd4bf;
}

.editor-showcase__tab--ai {
  color: #a78bfa;
  font-weight: 500;
}

.editor-showcase__sidebar-body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}

.editor-showcase__search {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 8px 12px;
}

.editor-showcase__search-text {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #4B5563;
}

.editor-showcase__section-label {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #4B5563;
}

.editor-showcase__block-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.editor-showcase__block-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: #6B7280;
}

.editor-showcase__block-icon {
  width: 22px;
  height: 22px;
  border-radius: 4px;
}

.editor-showcase__block-icon--teal { background: linear-gradient(135deg, #01A8AB, #059669); }
.editor-showcase__block-icon--purple { background: linear-gradient(135deg, #6366f1, #818cf8); }
.editor-showcase__block-icon--amber { background: linear-gradient(135deg, #f59e0b, #fbbf24); }

.editor-showcase__readymade-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.editor-showcase__readymade-item {
  height: 42px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero {
    padding: 48px 24px 32px;
  }
  .hero__title {
    font-size: 40px !important;
    letter-spacing: -1.5px;
  }
  .hero__desc {
    font-size: 16px;
  }
  .hero__actions {
    flex-direction: column;
    align-items: center;
  }
  .editor-showcase__body {
    height: 400px;
  }
  .editor-showcase__sidebar {
    display: none;
  }
  .editor-showcase__email-frame {
    width: 100%;
    max-width: 420px;
  }
  .editor-showcase__iframe {
    transform: scale(0.7);
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: 32px !important;
    letter-spacing: -1px;
  }
  .editor-showcase__body {
    height: 340px;
  }
}
</style>
