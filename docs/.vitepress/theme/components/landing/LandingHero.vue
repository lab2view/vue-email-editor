<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loaded = ref(false)
onMounted(() => {
  setTimeout(() => { loaded.value = true }, 100)
})

</script>

<template>
  <section class="hero" :class="{ 'hero--visible': loaded }">
    <div class="hero__inner">
      <div class="hero__content">
        <h1 class="hero__title">The open-source<br>email editor for Vue</h1>
        <p class="hero__desc">A powerful drag-and-drop email editor built for Vue 3. 47 free templates, MJML-powered rendering, and full responsive preview — all in one package.</p>
        <div class="hero__actions">
          <a href="https://www.npmjs.com/package/@lab2view/vue-email-editor" class="hero__btn hero__btn--primary" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            npm i @lab2view/vue-email-editor
          </a>
          <a href="https://github.com/lab2view/vue-email-editor" class="hero__btn hero__btn--secondary" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- Editor Preview -->
    <div class="hero__editor">
      <div class="editor-mock">
        <!-- Email Canvas -->
        <div class="editor-mock__canvas">
          <div class="editor-mock__viewport">
            <div class="editor-mock__vp-btn editor-mock__vp-btn--active">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              Desktop
            </div>
            <div class="editor-mock__vp-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              Tablet
            </div>
            <div class="editor-mock__vp-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              Mobile
            </div>
          </div>
          <!-- Email frame -->
          <div class="editor-mock__email">
            <div class="editor-mock__email-hero">
              <span class="editor-mock__email-brand">ATRYELO</span>
              <span class="editor-mock__email-logo">AuraX</span>
              <span class="editor-mock__email-sub">L'originalite glamour des portions</span>
            </div>
            <div class="editor-mock__email-product" />
            <div class="editor-mock__email-cta">
              <span class="editor-mock__email-btn">DECOUVRIR AURAX</span>
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="editor-mock__sidebar">
          <div class="editor-mock__tabs">
            <span class="editor-mock__tab editor-mock__tab--active">Blocks</span>
            <span class="editor-mock__tab">Styles</span>
            <span class="editor-mock__tab">Layers</span>
          </div>
          <div class="editor-mock__sidebar-body">
            <div class="editor-mock__search" />
            <span class="editor-mock__section-label">STRUCTURE</span>
            <div class="editor-mock__block-grid">
              <div class="editor-mock__block-item" /><div class="editor-mock__block-item" />
              <div class="editor-mock__block-item" /><div class="editor-mock__block-item" />
            </div>
            <span class="editor-mock__section-label">CONTENT</span>
            <div class="editor-mock__block-row"><div class="editor-mock__block-sm" /><div class="editor-mock__block-sm" /><div class="editor-mock__block-sm" /></div>
            <div class="editor-mock__block-row"><div class="editor-mock__block-sm" /><div class="editor-mock__block-sm" /><div class="editor-mock__block-sm" /></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 72px 72px 48px;
  background: #FFFFFF;
}

.hero__inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.hero__title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 56px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -1.5px;
  color: #1A1A1A;
  margin-bottom: 32px;
}

.hero__desc {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.7;
  color: #666666;
  max-width: 560px;
  margin: 0 auto 32px;
}

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
  font-weight: 500;
  text-decoration: none;
  transition: all 0.25s ease;
}

.hero__btn--primary {
  background: #111827;
  color: #FFFFFF;
  font-family: 'JetBrains Mono', monospace;
}

.hero__btn--primary:hover {
  background: #1e293b;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.hero__btn--secondary {
  border: 1.5px solid #E5E5E5;
  color: #1A1A1A;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  padding: 16px 36px;
}

.hero__btn--secondary:hover {
  border-color: #01A8AB;
  color: #01A8AB;
  transform: translateY(-2px);
}

/* ── Editor Preview ── */
.hero__editor {
  max-width: 960px;
  margin: 56px auto 0;
}

.editor-mock {
  display: flex;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  background: #F5F5F5;
  border: 1px solid #E2E2E2;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease;
}

.hero:not(.hero--visible) .editor-mock {
  opacity: 0;
  transform: translateY(40px) scale(0.97);
}

.editor-mock__canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #E8E8E8;
  padding: 16px 40px;
  gap: 12px;
}

.editor-mock__viewport {
  display: flex;
  gap: 8px;
  padding: 6px 0;
}

.editor-mock__vp-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #888888;
}

.editor-mock__vp-btn--active {
  background: #FFFFFF;
  color: #1A1A1A;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.editor-mock__email {
  flex: 1;
  max-width: 460px;
  margin: 0 auto;
  border-radius: 4px;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
}

.editor-mock__email-hero {
  background: #1A1A1A;
  padding: 16px 20px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.editor-mock__email-brand {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #888888;
}

.editor-mock__email-logo {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 28px;
  font-weight: 500;
  color: #FFFFFF;
}

.editor-mock__email-sub {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: #999999;
}

.editor-mock__email-product {
  flex: 1;
  background: #F5C542;
}

.editor-mock__email-cta {
  background: #FFFFFF;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.editor-mock__email-btn {
  display: inline-block;
  padding: 10px 28px;
  border-radius: 6px;
  background: #01A8AB;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
}

/* Sidebar */
.editor-mock__sidebar {
  width: 280px;
  flex-shrink: 0;
  background: #FFFFFF;
  border-left: 1px solid #E5E5E5;
  display: flex;
  flex-direction: column;
}

.editor-mock__tabs {
  display: flex;
  border-bottom: 1px solid #E5E5E5;
}

.editor-mock__tab {
  flex: 1;
  padding: 12px 0;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #888888;
}

.editor-mock__tab--active {
  color: #01A8AB;
  border-bottom: 2px solid #01A8AB;
}

.editor-mock__sidebar-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.editor-mock__search {
  height: 34px;
  border-radius: 6px;
  background: #F5F5F5;
}

.editor-mock__section-label {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #AAAAAA;
}

.editor-mock__block-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.editor-mock__block-item {
  height: 48px;
  border-radius: 6px;
  background: #F5F5F5;
  border: 1px solid #EEEEEE;
}

.editor-mock__block-row {
  display: flex;
  gap: 8px;
}

.editor-mock__block-sm {
  flex: 1;
  height: 36px;
  border-radius: 6px;
  background: #F5F5F5;
  border: 1px solid #EEEEEE;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero {
    padding: 48px 24px 32px;
  }
  .hero__title {
    font-size: 36px;
  }
  .hero__actions {
    flex-direction: column;
  }
  .editor-mock {
    height: 350px;
  }
  .editor-mock__sidebar {
    display: none;
  }
}
</style>
