<script setup lang="ts">
</script>

<template>
  <section class="cta-section">
    <div class="cta-section__inner">
      <h2 class="cta-section__title">Ready to build beautiful emails?</h2>
      <p class="cta-section__subtitle">
        Install in seconds. No API keys, no subscriptions, no limits.
      </p>
      <div class="cta-section__actions">
        <a href="/guide/getting-started" class="cta-btn cta-btn--primary">
          Get Started
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <a href="https://github.com/lab2view/vue-email-editor" class="cta-btn cta-btn--secondary" target="_blank" rel="noopener">
          View on GitHub
        </a>
      </div>
      <p class="cta-section__install">
        <code>npm install @lab2view/vue-email-editor</code>
      </p>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 5rem 1.5rem;
  text-align: center;
}

.cta-section__inner {
  max-width: 640px;
  margin: 0 auto;
}

.cta-section__title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.cta-section__subtitle {
  font-size: 1.15rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-section__actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 2rem;
  border-radius: 99px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.cta-btn--primary {
  background: linear-gradient(135deg, #01A8AB, #6366f1);
  color: #ffffff;
}

.cta-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(1, 168, 171, 0.35);
}

.dark .cta-btn--primary {
  background: linear-gradient(135deg, #0d9488, #818cf8);
}

.dark .cta-btn--primary:hover {
  box-shadow: 0 8px 24px rgba(45, 212, 191, 0.3);
}

.cta-btn--secondary {
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.cta-btn--secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.cta-section__install code {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-divider);
  font-family: 'Fira Code', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

@media (max-width: 640px) {
  .cta-section__title {
    font-size: 1.75rem;
  }
  .cta-section__actions {
    flex-direction: column;
    align-items: center;
  }
  .cta-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}
</style>
