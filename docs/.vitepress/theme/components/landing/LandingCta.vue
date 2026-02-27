<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <section class="cta">
    <div class="cta__card">
      <!-- Mini editor preview -->
      <div class="cta__editor">
        <div class="cta__editor-canvas">
          <!-- Viewport bar -->
          <div class="cta__vp-bar">
            <div class="cta__vp-btn cta__vp-btn--active">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              Desktop
            </div>
            <span class="cta__vp-label">Tablet</span>
            <span class="cta__vp-label">Mobile</span>
          </div>
          <!-- Email preview -->
          <div class="cta__email-preview">
            <div class="cta__email">
              <div class="cta__email-header">
                <span class="cta__email-brand-dot" />
                <span class="cta__email-brand">AuraX</span>
              </div>
              <div class="cta__email-hero" />
              <div class="cta__email-cta">
                <span class="cta__email-cta-title">DISCOVER MORE</span>
                <div class="cta__email-cta-btn">SHOP NOW</div>
              </div>
            </div>
          </div>
        </div>
        <div class="cta__editor-sidebar">
          <div class="cta__editor-tabs">
            <span class="cta__editor-tab cta__editor-tab--active">Blocks</span>
            <span class="cta__editor-tab">Styles</span>
            <span class="cta__editor-tab">Layers</span>
          </div>
          <div class="cta__editor-blocks">
            <div class="cta__editor-search">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Search...</span>
            </div>
            <span class="cta__editor-label">STRUCTURE</span>
            <div class="cta__editor-grid">
              <div class="cta__editor-item" /><div class="cta__editor-item" />
              <div class="cta__editor-item" /><div class="cta__editor-item" />
              <div class="cta__editor-item" /><div class="cta__editor-item" />
            </div>
            <span class="cta__editor-label">CONTENT</span>
            <div class="cta__editor-grid">
              <div class="cta__editor-item" /><div class="cta__editor-item" />
              <div class="cta__editor-item" /><div class="cta__editor-item" />
              <div class="cta__editor-item" /><div class="cta__editor-item" />
            </div>
          </div>
        </div>
      </div>

      <!-- Eyebrow -->
      <p class="cta__eyebrow">GET STARTED TODAY</p>

      <!-- Title -->
      <h2 class="cta__title">
        Start building beautiful<br>emails in minutes
      </h2>

      <!-- Description -->
      <p class="cta__desc">
        Join developers and marketing teams who trust vue-email-editor<br>
        to create stunning, responsive emails without writing HTML.
      </p>

      <!-- Buttons -->
      <div class="cta__buttons">
        <a :href="withBase('/guide/getting-started')" class="cta__btn cta__btn--primary">
          Get Started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <a href="https://github.com/lab2view/vue-email-editor" target="_blank" rel="noopener" class="cta__btn cta__btn--ghost">
          View on GitHub
        </a>
      </div>

      <!-- Trust badges -->
      <div class="cta__trust">
        <span class="cta__trust-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#01A8AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          100% free
        </span>
        <span class="cta__trust-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#01A8AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          No vendor lock-in
        </span>
        <span class="cta__trust-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#01A8AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          MIT licensed
        </span>
        <span class="cta__trust-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#01A8AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Vue 3 + MJML
        </span>
      </div>

      <!-- Install command -->
      <div class="cta__install">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
        <code>npm install @lab2view/vue-email-editor</code>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: #F9FAFB;
  padding: 120px 72px;
}

.cta__card {
  max-width: 900px;
  margin: 0 auto;
  background: #111827;
  border-radius: 24px;
  padding: 80px;
  box-shadow: 0 24px 64px rgba(17, 24, 39, 0.19);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

/* ── Mini editor ── */
.cta__editor {
  width: 100%;
  max-width: 800px;
  height: 320px;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  background: #0D1117;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
}

.cta__editor-canvas {
  flex: 1;
  background: #E8E8E8;
  display: flex;
  flex-direction: column;
}

.cta__vp-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
}

.cta__vp-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 500;
}

.cta__vp-btn--active {
  background: #FFFFFF;
  color: #1A1A1A;
}

.cta__vp-label {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: #999999;
}

.cta__email-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
}

.cta__email {
  width: 100%;
  max-width: 360px;
  background: #FFFFFF;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.cta__email-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 50px;
  background: #1A1A1A;
}

.cta__email-brand-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #01A8AB, #059669);
}

.cta__email-brand {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 2px;
}

.cta__email-hero {
  height: 100px;
  background: #F5C542;
}

.cta__email-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  gap: 8px;
}

.cta__email-cta-title {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #1A1A1A;
}

.cta__email-cta-btn {
  background: #01A8AB;
  color: white;
  padding: 6px 20px;
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 600;
}

/* Editor sidebar */
.cta__editor-sidebar {
  width: 220px;
  background: #FFFFFF;
  border-left: 1px solid #E5E5E5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cta__editor-tabs {
  display: flex;
  gap: 20px;
  padding: 0 14px;
  height: 36px;
  align-items: center;
  background: #FAFAFA;
  border-bottom: 1px solid #E5E5E5;
}

.cta__editor-tab {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #999;
}

.cta__editor-tab--active {
  font-weight: 600;
  color: #01A8AB;
}

.cta__editor-blocks {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}

.cta__editor-search {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #F5F5F5;
  border-radius: 6px;
  padding: 8px 10px;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  color: #BBB;
}

.cta__editor-label {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #888888;
}

.cta__editor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.cta__editor-item {
  height: 28px;
  border-radius: 4px;
  background: #F5F5F5;
  border: 1px solid #EBEBEB;
}

/* ── Content ── */
.cta__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #01A8AB;
}

.cta__title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 52px;
  font-weight: 500;
  letter-spacing: -1px;
  line-height: 1.15;
  color: #FFFFFF;
  text-align: center;
  max-width: 700px;
}

.cta__desc {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.7;
  color: #94A3B8;
  text-align: center;
  max-width: 560px;
}

/* Buttons */
.cta__buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 44px;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.cta__btn--primary {
  background: #01A8AB;
  color: #FFFFFF;
  box-shadow: 0 8px 32px rgba(1, 168, 171, 0.25);
}

.cta__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(1, 168, 171, 0.4);
}

.cta__btn--ghost {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.cta__btn--ghost:hover {
  border-color: rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
  transform: translateY(-2px);
}

/* Trust */
.cta__trust {
  display: flex;
  align-items: center;
  gap: 40px;
}

.cta__trust-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #64748B;
}

/* Install */
.cta__install {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.cta__install code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 400;
  color: #94A3B8;
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .cta {
    padding: 64px 24px;
  }
  .cta__card {
    padding: 48px 32px;
  }
  .cta__title {
    font-size: 36px;
  }
  .cta__editor {
    height: 260px;
  }
  .cta__editor-sidebar {
    width: 160px;
  }
  .cta__trust {
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  .cta__buttons {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .cta {
    padding: 48px 16px;
  }
  .cta__card {
    padding: 32px 20px;
    border-radius: 20px;
  }
  .cta__title {
    font-size: 28px;
  }
  .cta__editor {
    height: 220px;
  }
  .cta__editor-sidebar {
    display: none;
  }
  .cta__trust {
    flex-direction: column;
    gap: 12px;
  }
  .cta__install {
    padding: 10px 16px;
  }
  .cta__install code {
    font-size: 11px;
  }
}
</style>
