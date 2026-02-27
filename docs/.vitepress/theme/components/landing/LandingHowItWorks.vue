<template>
  <section class="hiw">
    <div class="hiw__inner">
      <p class="hiw__eyebrow">QUICK START</p>
      <h2 class="hiw__title">Up and running in 3 steps</h2>
      <p class="hiw__subtitle">
        Drop it into your Vue app and start building emails instantly.
      </p>

      <div class="hiw__grid">
        <!-- Step 1 -->
        <div class="hiw__card">
          <span class="hiw__num">01</span>
          <h3 class="hiw__card-title">Install the package</h3>
          <div class="hiw__code">
            <code>npm i @lab2view/vue-email-editor</code>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="hiw__card">
          <span class="hiw__num">02</span>
          <h3 class="hiw__card-title">Import the component</h3>
          <div class="hiw__code">
            <code>&lt;EmailEditor :templates=&quot;templates&quot; /&gt;</code>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="hiw__card">
          <span class="hiw__num">03</span>
          <h3 class="hiw__card-title">Customize &amp; send</h3>
          <p class="hiw__card-desc">
            Choose a template, customize it visually, export responsive HTML.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hiw {
  background: #111827;
  padding: 96px 72px;
}

.hiw__inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

.hiw__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #01A8AB;
  margin-bottom: 16px;
}

.hiw__title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 42px;
  font-weight: 500;
  letter-spacing: -1px;
  color: #FFFFFF;
  margin-bottom: 16px;
  line-height: 1.15;
}

.hiw__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 400;
  color: #94A3B8;
  margin-bottom: 48px;
  line-height: 1.6;
}

.hiw__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.hiw__card {
  background: #1E293B;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 32px;
  text-align: left;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.hiw__card:hover {
  transform: translateY(-4px);
  border-color: #01A8AB;
}

.hiw__num {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 32px;
  font-weight: 700;
  color: #01A8AB;
  margin-bottom: 16px;
}

.hiw__card-title {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 16px;
  line-height: 1.3;
}

.hiw__card-desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #94A3B8;
  line-height: 1.6;
}

.hiw__code {
  background: #0F172A;
  border-radius: 8px;
  padding: 16px 20px;
  overflow-x: auto;
}

.hiw__code code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 400;
  color: #01A8AB;
  white-space: nowrap;
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .hiw {
    padding: 64px 32px;
  }
  .hiw__grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }
  .hiw__title {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  .hiw {
    padding: 48px 16px;
  }
  .hiw__title {
    font-size: 28px;
  }
}
</style>
