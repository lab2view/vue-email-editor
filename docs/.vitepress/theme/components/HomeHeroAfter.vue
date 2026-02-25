<script setup lang="ts">
import TemplateGallery from './TemplateGallery.vue'

const stats = [
  { number: '93+', label: 'Starter Templates' },
  { number: '43', label: 'Drag & Drop Blocks' },
  { number: '147+', label: 'Tests' },
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

    <!-- Template Gallery — the centerpiece -->
    <TemplateGallery />

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


</style>
