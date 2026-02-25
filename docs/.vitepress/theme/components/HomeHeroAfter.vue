<script setup lang="ts">
const stats = [
  { number: '43', label: 'Pre-built Blocks' },
  { number: '147+', label: 'Tests' },
  { number: '249KB', label: 'Gzipped' },
  { number: 'MIT', label: 'License' },
]
</script>

<template>
  <div class="home-after">
    <!-- Stats bar -->
    <div class="home-stats">
      <div v-for="stat in stats" :key="stat.label" class="home-stats__item">
        <span class="home-stats__number">{{ stat.number }}</span>
        <span class="home-stats__label">{{ stat.label }}</span>
      </div>
    </div>

    <div class="home-section-divider" />

    <!-- Screenshot -->
    <section class="home-screenshot">
      <div class="home-screenshot__wrapper">
        <div class="home-screenshot__glow" />
        <div class="home-screenshot__placeholder">
          <div class="placeholder__toolbar">
            <span class="placeholder__dot placeholder__dot--red" />
            <span class="placeholder__dot placeholder__dot--yellow" />
            <span class="placeholder__dot placeholder__dot--green" />
            <span class="placeholder__toolbar-title">Vue Email Editor</span>
          </div>
          <div class="placeholder__body">
            <div class="placeholder__sidebar">
              <div class="placeholder__sidebar-item" />
              <div class="placeholder__sidebar-item" />
              <div class="placeholder__sidebar-item placeholder__sidebar-item--active" />
              <div class="placeholder__sidebar-item" />
              <div class="placeholder__sidebar-item" />
              <div class="placeholder__sidebar-item" />
            </div>
            <div class="placeholder__canvas">
              <div class="placeholder__email-header" />
              <div class="placeholder__email-text" />
              <div class="placeholder__email-text placeholder__email-text--short" />
              <div class="placeholder__email-image" />
              <div class="placeholder__email-text" />
              <div class="placeholder__email-btn" />
              <div class="placeholder__email-footer" />
            </div>
            <div class="placeholder__props">
              <div class="placeholder__props-title" />
              <div class="placeholder__props-input" />
              <div class="placeholder__props-input" />
              <div class="placeholder__props-input placeholder__props-input--color" />
              <div class="placeholder__props-input" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="home-section-divider" />

    <!-- Code example -->
    <section class="home-code">
      <h2 class="home-code__title">Get started in seconds</h2>
      <p class="home-code__subtitle">Install, import, use. That's it.</p>

      <div class="home-code__block">
        <pre><code><span class="code-tag">&lt;script</span> <span class="code-attr">setup</span><span class="code-tag">&gt;</span>
<span class="code-keyword">import</span> { <span class="code-tag">EmailEditor</span> } <span class="code-keyword">from</span> <span class="code-string">'@lab2view/vue-email-editor'</span>
<span class="code-keyword">import</span> <span class="code-string">'@lab2view/vue-email-editor/style.css'</span>
<span class="code-tag">&lt;/script&gt;</span>

<span class="code-tag">&lt;template&gt;</span>
  <span class="code-tag">&lt;EmailEditor</span> <span class="code-attr">v-model</span>=<span class="code-string">"mjml"</span> <span class="code-tag">/&gt;</span>
<span class="code-tag">&lt;/template&gt;</span></code></pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-after {
  padding-top: 1rem;
}

/* ---- Screenshot placeholder (stylized mock) ---- */
.home-screenshot__placeholder {
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
}

.placeholder__toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.placeholder__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.placeholder__dot--red { background: #ef4444; }
.placeholder__dot--yellow { background: #eab308; }
.placeholder__dot--green { background: #22c55e; }

.placeholder__toolbar-title {
  margin-left: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  letter-spacing: -0.01em;
}

.placeholder__body {
  display: grid;
  grid-template-columns: 180px 1fr 200px;
  min-height: 340px;
}

.placeholder__sidebar {
  padding: 16px 12px;
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.placeholder__sidebar-item {
  height: 36px;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.placeholder__sidebar-item--active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.placeholder__canvas {
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: var(--vp-c-bg-soft);
}

.placeholder__email-header {
  width: 100%;
  height: 48px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #6366f1);
  opacity: 0.8;
}

.placeholder__email-text {
  width: 100%;
  height: 12px;
  border-radius: 3px;
  background: var(--vp-c-divider);
}

.placeholder__email-text--short {
  width: 65%;
  align-self: flex-start;
}

.placeholder__email-image {
  width: 80%;
  height: 100px;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 2px dashed var(--vp-c-divider);
}

.placeholder__email-btn {
  width: 140px;
  height: 36px;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  opacity: 0.85;
}

.placeholder__email-footer {
  width: 100%;
  height: 24px;
  border-radius: 4px;
  background: var(--vp-c-divider);
  opacity: 0.5;
  margin-top: 8px;
}

.placeholder__props {
  padding: 16px 12px;
  border-left: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.placeholder__props-title {
  height: 14px;
  width: 60%;
  border-radius: 3px;
  background: var(--vp-c-text-3);
  opacity: 0.4;
  margin-bottom: 4px;
}

.placeholder__props-input {
  height: 32px;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.placeholder__props-input--color {
  position: relative;
  overflow: hidden;
}

.placeholder__props-input--color::after {
  content: '';
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: var(--vp-c-brand-1);
}

/* Responsive */
@media (max-width: 768px) {
  .placeholder__body {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .placeholder__sidebar,
  .placeholder__props {
    display: none;
  }
  .placeholder__canvas {
    min-height: 200px;
  }
}
</style>
