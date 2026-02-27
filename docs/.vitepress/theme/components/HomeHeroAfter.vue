<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import TemplateGallery from './TemplateGallery.vue'
import WhySection from './WhySection.vue'
import ComparisonTable from './ComparisonTable.vue'
import CtaSection from './CtaSection.vue'

const stats = [
  { number: '36', label: 'Starter Templates' },
  { number: '43', label: 'Drag & Drop Blocks' },
  { number: '147+', label: 'Tests' },
  { number: 'MIT', label: 'License' },
]

// Scroll-reveal with IntersectionObserver
const sections = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

function setSectionRef(el: any) {
  if (el) sections.value.push(el)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  sections.value.forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
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

    <!-- Why Section -->
    <div :ref="setSectionRef" class="reveal-section">
      <WhySection />
    </div>

    <div class="home-section-divider" />

    <!-- Template Gallery — the centerpiece -->
    <div :ref="setSectionRef" class="reveal-section">
      <TemplateGallery />
    </div>

    <div class="home-section-divider" />

    <!-- Comparison Table -->
    <div :ref="setSectionRef" class="reveal-section">
      <ComparisonTable />
    </div>

    <div class="home-section-divider" />

    <!-- Code example -->
    <div :ref="setSectionRef" class="reveal-section">
      <section class="home-code">
        <h2 class="home-code__title">Ready in seconds</h2>
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

    <div class="home-section-divider" />

    <!-- CTA -->
    <div :ref="setSectionRef" class="reveal-section">
      <CtaSection />
    </div>
  </div>
</template>

<style scoped>
.home-after {
  padding-top: 1rem;
}

/* Scroll-reveal animation */
.reveal-section {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal-section.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
