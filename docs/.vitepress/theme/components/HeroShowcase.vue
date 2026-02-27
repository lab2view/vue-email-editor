<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loaded = ref(false)
onMounted(() => {
  setTimeout(() => { loaded.value = true }, 150)
})

// 5 cards in a fan: outer ones smaller and more rotated
const cards = [
  { id: 'event',      cls: 'card--far-left' },
  { id: 'newsletter', cls: 'card--left' },
  { id: 'promotion',  cls: 'card--center' },
  { id: 'travel',     cls: 'card--right' },
  { id: 'restaurant', cls: 'card--far-right' },
]

function url(id: string) {
  return import.meta.env.BASE_URL + 'templates/' + id + '.html'
}
</script>

<template>
  <div class="showcase" :class="{ 'showcase--visible': loaded }">
    <div class="showcase__perspective">
      <div class="showcase__fan">
        <div
          v-for="card in cards"
          :key="card.id"
          class="showcase__card"
          :class="card.cls"
        >
          <iframe
            :src="url(card.id)"
            class="showcase__iframe"
            loading="eager"
            tabindex="-1"
            sandbox="allow-same-origin"
            scrolling="no"
          />
        </div>
      </div>
    </div>
    <div class="showcase__fade" />
  </div>
</template>

<style scoped>
.showcase {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1.5rem 0 0;
  margin-bottom: -3rem;
  overflow: hidden;
}

.showcase__perspective {
  perspective: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.showcase__fan {
  position: relative;
  height: 420px;
  width: 100%;
  max-width: 900px;
  transform: rotateX(4deg);
  transform-style: preserve-3d;
}

.showcase__card {
  position: absolute;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  transition:
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.7s ease;
}

/* Entrance animation */
.showcase:not(.showcase--visible) .showcase__card {
  opacity: 0;
  transform: translateY(60px) rotate(0deg) scale(0.9) !important;
}

/* ── Card positions ── */
.card--center {
  width: 280px;
  height: 400px;
  left: calc(50% - 140px);
  top: 0;
  z-index: 5;
  transform: rotate(0deg);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  transition-delay: 0s;
}

.card--left {
  width: 250px;
  height: 370px;
  left: calc(50% - 360px);
  top: 20px;
  z-index: 4;
  transform: rotate(-5deg);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.15);
  transition-delay: 0.06s;
}

.card--right {
  width: 250px;
  height: 370px;
  left: calc(50% + 110px);
  top: 20px;
  z-index: 4;
  transform: rotate(5deg);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.15);
  transition-delay: 0.06s;
}

.card--far-left {
  width: 210px;
  height: 320px;
  left: calc(50% - 560px);
  top: 50px;
  z-index: 2;
  transform: rotate(-10deg);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  opacity: 0.7;
  transition-delay: 0.12s;
}

.card--far-right {
  width: 210px;
  height: 320px;
  left: calc(50% + 350px);
  top: 50px;
  z-index: 2;
  transform: rotate(10deg);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  opacity: 0.7;
  transition-delay: 0.12s;
}

.showcase--visible .card--far-left,
.showcase--visible .card--far-right {
  opacity: 0.7;
}

/* Iframe scaling */
.showcase__iframe {
  width: 600px;
  height: 1400px;
  border: none;
  pointer-events: none;
  transform-origin: top left;
}

.card--center .showcase__iframe { transform: scale(0.467); }
.card--left .showcase__iframe,
.card--right .showcase__iframe { transform: scale(0.417); }
.card--far-left .showcase__iframe,
.card--far-right .showcase__iframe { transform: scale(0.35); }

/* Bottom gradient fade */
.showcase__fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 140px;
  background: linear-gradient(to top, var(--vp-c-bg, #ffffff), transparent);
  pointer-events: none;
  z-index: 10;
}

/* Dark mode */
.dark .showcase__card {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.dark .showcase__fade {
  background: linear-gradient(to top, var(--vp-c-bg, #1b1b1f), transparent);
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .card--far-left,
  .card--far-right {
    display: none;
  }
  .showcase__fan {
    max-width: 700px;
  }
  .card--left { left: calc(50% - 300px); }
  .card--right { left: calc(50% + 50px); }
}

@media (max-width: 768px) {
  .showcase__fan {
    height: 300px;
    max-width: 500px;
  }
  .card--center {
    width: 200px;
    height: 280px;
    left: calc(50% - 100px);
  }
  .card--left {
    width: 180px;
    height: 260px;
    left: calc(50% - 240px);
    top: 15px;
  }
  .card--right {
    width: 180px;
    height: 260px;
    left: calc(50% + 60px);
    top: 15px;
  }
  .card--center .showcase__iframe { transform: scale(0.333); }
  .card--left .showcase__iframe,
  .card--right .showcase__iframe { transform: scale(0.3); }
}

@media (max-width: 480px) {
  .showcase__fan {
    height: 220px;
  }
  .card--center {
    width: 160px;
    height: 220px;
    left: calc(50% - 80px);
  }
  .card--left {
    width: 130px;
    height: 190px;
    left: calc(50% - 175px);
  }
  .card--right {
    width: 130px;
    height: 190px;
    left: calc(50% + 45px);
  }
  .card--center .showcase__iframe { transform: scale(0.267); }
  .card--left .showcase__iframe,
  .card--right .showcase__iframe { transform: scale(0.217); }
}
</style>
