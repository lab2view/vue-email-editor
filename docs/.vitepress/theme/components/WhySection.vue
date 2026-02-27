<script setup lang="ts">
const reasons = [
  {
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    title: 'True Vue 3 Component',
    description: 'Not a wrapper around a legacy jQuery library. Built from scratch with Vue 3 Composition API, reactive props, and native TypeScript support.',
  },
  {
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    title: 'MJML Under the Hood',
    description: 'Generates clean MJML markup that compiles to pixel-perfect HTML. Your emails render flawlessly on Gmail, Outlook, Apple Mail, and 50+ email clients.',
  },
  {
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    title: 'Zero Vendor Lock-in',
    description: 'MIT licensed, self-hosted, no tracking. Own your code, your data, and your deployment. Replace Stripo or Unlayer without SaaS fees.',
  },
]
</script>

<template>
  <section class="why-section">
    <p class="why-section__eyebrow">Why choose us</p>
    <h2 class="why-section__title">Built differently</h2>
    <p class="why-section__subtitle">
      Most email editors are bloated iframes or SaaS lock-ins.
      This one is a native Vue 3 component you actually own.
    </p>

    <div class="why-section__grid">
      <div v-for="(reason, i) in reasons" :key="i" class="why-card">
        <div class="why-card__icon" v-html="reason.icon" />
        <h3 class="why-card__title">{{ reason.title }}</h3>
        <p class="why-card__desc">{{ reason.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
}

.why-section__eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.why-section__title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.why-section__subtitle {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  max-width: 520px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.why-section__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.why-card {
  padding: 2rem 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  text-align: left;
  transition: all 0.3s ease;
}

.why-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(1, 168, 171, 0.1);
  border-color: var(--vp-c-brand-1);
}

.why-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  margin-bottom: 1.25rem;
}

.why-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.why-card__desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .why-section__grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .why-section__title {
    font-size: 1.5rem;
  }
}
</style>
