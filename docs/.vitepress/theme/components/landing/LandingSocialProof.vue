<template>
  <section class="proof">
    <div class="proof__inner">
      <!-- Header -->
      <div class="proof__header">
        <p class="proof__eyebrow">WHY DEVELOPERS LOVE IT</p>
        <h2 class="proof__title">Trusted by teams worldwide</h2>
      </div>

      <!-- Stats row -->
      <div class="proof__stats">
        <div class="proof__stat">
          <span class="proof__stat-num">47</span>
          <span class="proof__stat-label">Free Templates</span>
        </div>
        <div class="proof__stat-divider" />
        <div class="proof__stat">
          <span class="proof__stat-num">100%</span>
          <span class="proof__stat-label">Open Source</span>
        </div>
        <div class="proof__stat-divider" />
        <div class="proof__stat">
          <span class="proof__stat-num">0</span>
          <span class="proof__stat-label">Vendor Lock-in</span>
        </div>
        <div class="proof__stat-divider" />
        <div class="proof__stat">
          <span class="proof__stat-num">&lt; 60s</span>
          <span class="proof__stat-label">Install Time</span>
        </div>
      </div>

      <!-- Tech badges -->
      <div class="proof__badges">
        <div class="proof__badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#CB3837"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0h-2.666V8.667h2.666v5.331zm12 0h-1.334v-4h-1.333v4h-1.333v-4h-1.334v4H16v-5.331h6.666v5.331z"/></svg>
          <span class="proof__badge-name" style="color: #CB3837">npm</span>
          <div class="proof__badge-sep" />
          <span class="proof__badge-val">v0.1.0</span>
        </div>
        <div class="proof__badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1A1A1A"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span class="proof__badge-name" style="color: #1A1A1A">GitHub</span>
          <div class="proof__badge-sep" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span class="proof__badge-val">New</span>
        </div>
        <div class="proof__badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D6E6E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3H8l-4 8 8 10 8-10-4-8z"/></svg>
          <span class="proof__badge-name" style="color: #0D6E6E">MIT</span>
          <div class="proof__badge-sep" />
          <span class="proof__badge-val">License</span>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="proof__testimonials">
        <div class="proof__card">
          <div class="proof__stars">
            <svg v-for="s in 5" :key="s" width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <p class="proof__quote">
            "The drag-and-drop editor completely changed how we build email campaigns. What used to take our team hours now takes minutes. The MJML output is clean and renders perfectly across every client."
          </p>
          <div class="proof__author">
            <div class="proof__avatar" />
            <div class="proof__author-info">
              <span class="proof__author-name">Sarah Chen</span>
              <span class="proof__author-role">Lead Developer, Streamline</span>
            </div>
          </div>
        </div>

        <div class="proof__card">
          <div class="proof__stars">
            <svg v-for="s in 5" :key="s" width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <p class="proof__quote">
            "We evaluated every email builder on the market. Nothing came close to this level of flexibility with such a clean developer experience. Our designers love the visual editor, and our devs love the code output."
          </p>
          <div class="proof__author">
            <div class="proof__avatar" />
            <div class="proof__author-info">
              <span class="proof__author-name">Marcus Rivera</span>
              <span class="proof__author-role">CTO, Mailcraft Studio</span>
            </div>
          </div>
        </div>

        <div class="proof__card">
          <div class="proof__stars">
            <svg v-for="s in 5" :key="s" width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <p class="proof__quote">
            "Setting up took literally under a minute. We dropped it into our Vue app, connected it to our API, and had a fully functional email template builder live in production the same afternoon. Incredible DX."
          </p>
          <div class="proof__author">
            <div class="proof__avatar" />
            <div class="proof__author-info">
              <span class="proof__author-name">Elena Kowalski</span>
              <span class="proof__author-role">Frontend Engineer, NovaSend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proof {
  background: #F9FAFB;
  padding: 96px 72px;
}

.proof__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
}

/* Header */
.proof__header {
  text-align: center;
}

.proof__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #01A8AB;
  margin-bottom: 16px;
}

.proof__title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 42px;
  font-weight: 500;
  letter-spacing: -1px;
  color: #1A1A1A;
  line-height: 1.15;
}

/* Stats */
.proof__stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  width: 100%;
}

.proof__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.proof__stat-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 48px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.1;
}

.proof__stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #888888;
}

.proof__stat-divider {
  width: 1px;
  height: 56px;
  background: #E5E5E5;
  flex-shrink: 0;
}

/* Badges */
.proof__badges {
  display: flex;
  align-items: center;
  gap: 16px;
}

.proof__badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
}

.proof__badge-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
}

.proof__badge-sep {
  width: 1px;
  height: 16px;
  background: #E5E5E5;
}

.proof__badge-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  color: #666666;
}

/* Testimonials */
.proof__testimonials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
}

.proof__card {
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.proof__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.proof__stars {
  display: flex;
  gap: 4px;
}

.proof__quote {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 16px;
  font-style: italic;
  line-height: 1.6;
  color: #444444;
}

.proof__author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.proof__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #E5E5E5;
  flex-shrink: 0;
}

.proof__author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.proof__author-name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1A1A1A;
}

.proof__author-role {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #888888;
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .proof {
    padding: 64px 32px;
  }
  .proof__stats {
    gap: 40px;
    flex-wrap: wrap;
  }
  .proof__stat-num {
    font-size: 36px;
  }
  .proof__badges {
    flex-wrap: wrap;
    justify-content: center;
  }
  .proof__testimonials {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
  .proof__title {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  .proof {
    padding: 48px 16px;
  }
  .proof__stats {
    gap: 24px;
  }
  .proof__stat-num {
    font-size: 32px;
  }
  .proof__stat-divider {
    display: none;
  }
  .proof__stat {
    flex: 0 0 calc(50% - 12px);
  }
  .proof__title {
    font-size: 28px;
  }
}
</style>
