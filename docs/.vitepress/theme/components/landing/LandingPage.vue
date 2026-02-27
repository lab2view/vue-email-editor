<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import LandingHero from './LandingHero.vue'
import LandingTemplateGallery from './LandingTemplateGallery.vue'
import LandingFeatures from './LandingFeatures.vue'
import LandingHowItWorks from './LandingHowItWorks.vue'
import LandingSocialProof from './LandingSocialProof.vue'
import LandingCta from './LandingCta.vue'
import LandingFooter from './LandingFooter.vue'

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
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
  )
  sections.value.forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="landing">
    <LandingHero />

    <div :ref="setSectionRef" class="landing__reveal">
      <LandingTemplateGallery />
    </div>

    <div :ref="setSectionRef" class="landing__reveal">
      <LandingFeatures />
    </div>

    <div :ref="setSectionRef" class="landing__reveal">
      <LandingHowItWorks />
    </div>

    <div :ref="setSectionRef" class="landing__reveal">
      <LandingSocialProof />
    </div>

    <div :ref="setSectionRef" class="landing__reveal">
      <LandingCta />
    </div>

    <LandingFooter />
  </div>
</template>

<style scoped>
.landing {
  overflow-x: hidden;
}

.landing__reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.landing__reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
