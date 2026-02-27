<script setup lang="ts">
import { withBase } from 'vitepress'

const columns = [
  {
    title: 'PRODUCT',
    links: [
      { label: 'Email Templates', href: '#templates' },
      { label: 'Email Editor', href: withBase('/guide/getting-started') },
      { label: 'Features', href: '#features' },
      { label: 'Changelog', href: 'https://github.com/lab2view/vue-email-editor/releases' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Documentation', href: withBase('/guide/getting-started') },
      { label: 'API Reference', href: withBase('/api/props') },
      { label: 'Getting Started', href: withBase('/guide/getting-started') },
      { label: 'Contributing', href: 'https://github.com/lab2view/vue-email-editor/blob/main/CONTRIBUTING.md' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Lab2view', href: 'https://lab2view.com' },
      { label: 'Contact', href: 'https://lab2view.com' },
      { label: 'GitHub', href: 'https://github.com/lab2view/vue-email-editor' },
      { label: 'Careers', href: 'https://lab2view.com' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <!-- Top section -->
      <div class="footer__top">
        <!-- Brand column -->
        <div class="footer__brand">
          <div class="footer__logo">
            <div class="footer__logo-mark" />
            <span class="footer__logo-text">vue-email-editor</span>
          </div>
          <p class="footer__desc">
            The open-source drag-and-drop email editor for Vue 3.
            Build beautiful, responsive emails with MJML — no HTML coding required.
          </p>
          <div class="footer__socials">
            <a href="https://github.com/lab2view/vue-email-editor" target="_blank" rel="noopener" class="footer__social" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            </a>
            <a href="https://twitter.com/lab2view" target="_blank" rel="noopener" class="footer__social" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="https://linkedin.com/company/lab2view" target="_blank" rel="noopener" class="footer__social" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <!-- Link columns -->
        <div v-for="col in columns" :key="col.title" class="footer__column">
          <h4 class="footer__column-title">{{ col.title }}</h4>
          <ul class="footer__column-links">
            <li v-for="link in col.links" :key="link.label">
              <a :href="link.href" class="footer__link">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="footer__divider" />

      <!-- Bottom -->
      <div class="footer__bottom">
        <span class="footer__copyright">&copy; {{ year }} Lab2view. All rights reserved.</span>
        <div class="footer__bottom-links">
          <a href="#" class="footer__bottom-link">Status</a>
          <a href="#" class="footer__bottom-link">Security</a>
          <span class="footer__mit-badge">
            <span class="footer__mit-dot" />
            MIT License
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #111827;
  padding: 64px 72px 40px;
}

.footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* ── Top ── */
.footer__top {
  display: flex;
  gap: 64px;
}

/* Brand */
.footer__brand {
  width: 340px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer__logo-mark {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #01A8AB, #059669);
}

.footer__logo-text {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 18px;
  font-weight: 500;
  color: #FFFFFF;
}

.footer__desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: #64748B;
}

.footer__socials {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  color: #94A3B8;
  transition: all 0.2s ease;
}

.footer__social:hover {
  color: #01A8AB;
  background: rgba(1, 168, 171, 0.1);
}

/* Columns */
.footer__column {
  flex: 1;
  min-width: 0;
}

.footer__column-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #94A3B8;
  margin-bottom: 20px;
}

.footer__column-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer__link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #D1D5DB;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__link:hover {
  color: #01A8AB;
}

/* ── Divider ── */
.footer__divider {
  height: 1px;
  background: #1F2937;
}

/* ── Bottom ── */
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__copyright {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #6B7280;
}

.footer__bottom-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.footer__bottom-link {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #6B7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__bottom-link:hover {
  color: #01A8AB;
}

.footer__mit-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(1, 168, 171, 0.08);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  color: #01A8AB;
}

.footer__mit-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #01A8AB;
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .footer {
    padding: 48px 32px 32px;
  }
  .footer__top {
    flex-direction: column;
    gap: 40px;
  }
  .footer__brand {
    width: 100%;
    max-width: 400px;
  }
  .footer__top {
    flex-wrap: wrap;
  }
  .footer__column {
    flex: 0 0 calc(50% - 32px);
  }
}

@media (max-width: 640px) {
  .footer {
    padding: 40px 16px 24px;
  }
  .footer__column {
    flex: 0 0 calc(50% - 16px);
  }
  .footer__bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  .footer__bottom-links {
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
