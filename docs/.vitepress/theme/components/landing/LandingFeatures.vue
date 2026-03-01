<template>
  <section class="features">
    <!-- Feature 1: AI-powered template generation -->
    <div class="features__block">
      <div class="features__mockup">
        <div class="editor-mock">
          <!-- Email Canvas with AI-generated preview -->
          <div class="editor-mock__canvas">
            <div class="editor-mock__email">
              <div class="editor-mock__ai-header">
                <span class="editor-mock__ai-header-text">WEEKLY DIGEST</span>
              </div>
              <div class="editor-mock__ai-hero">
                <span class="editor-mock__ai-hero-title">Your Week in Review</span>
                <span class="editor-mock__ai-hero-sub">Curated highlights just for you</span>
              </div>
              <div class="editor-mock__ai-cards">
                <div class="editor-mock__ai-card" />
                <div class="editor-mock__ai-card" />
              </div>
              <div class="editor-mock__ai-cta">
                <div class="editor-mock__ai-cta-btn">Read More</div>
              </div>
            </div>
          </div>
          <!-- Sidebar - AI Chat panel -->
          <div class="editor-mock__sidebar">
            <div class="editor-mock__tabs">
              <span class="editor-mock__tab">Blocks</span>
              <span class="editor-mock__tab">Styles</span>
              <span class="editor-mock__tab">Layers</span>
              <span class="editor-mock__tab editor-mock__tab--active editor-mock__tab--ai">AI</span>
            </div>
            <div class="editor-mock__sidebar-content editor-mock__ai-chat">
              <div class="editor-mock__ai-msg editor-mock__ai-msg--user">
                Create a weekly digest newsletter with a modern blue theme
              </div>
              <div class="editor-mock__ai-msg editor-mock__ai-msg--assistant">
                <span class="editor-mock__ai-sparkle">&#x2728;</span>
                Template created (3 sections, 2 images, 1 button). Apply it to load in the editor.
              </div>
              <div class="editor-mock__ai-actions">
                <div class="editor-mock__ai-apply-btn">Apply</div>
                <div class="editor-mock__ai-discard-btn">Discard</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="features__text">
        <h3 class="features__title">1. AI-powered template generation</h3>
        <p class="features__desc">
          Describe your email in plain language and let AI build the entire template for you.
          The built-in AI chat panel generates complete, production-ready MJML templates from
          a simple prompt — with full preview before applying. Refine the result through
          conversation: ask the AI to tweak colors, add sections, or change the layout, and see
          updates instantly. Bring your own AI provider (OpenAI, Anthropic, or any LLM) with the
          flexible BYOAI pattern. From first draft to final design, AI makes email creation
          faster than ever.
        </p>
      </div>
    </div>

    <!-- Feature 2: Responsive on every device (reversed) -->
    <div class="features__block features__block--reversed">
      <div class="features__text">
        <h3 class="features__title">2. Responsive on every device</h3>
        <p class="features__desc">
          Every email you craft is rendered through MJML, the industry-standard framework for
          responsive email markup. This means your designs automatically adapt to any screen
          size — from widescreen desktop monitors to the smallest mobile displays. Preview your
          layouts in real-time across multiple breakpoints before hitting send, ensuring pixel-
          perfect rendering in Gmail, Outlook, Apple Mail, and dozens of other clients. No more
          broken tables or misaligned columns; just consistently beautiful emails that look exactly
          as you intended.
        </p>
      </div>
      <div class="features__mockup">
        <div class="editor-mock">
          <div class="editor-mock__canvas">
            <div class="editor-mock__email">
              <div class="editor-mock__birthday-emoji">🎂</div>
              <div class="editor-mock__birthday-text">
                <span class="editor-mock__birthday-title">Joyeux anniversaire !</span>
                <span class="editor-mock__birthday-sub">Un cadeau spécial vous attend</span>
              </div>
              <div class="editor-mock__birthday-gift">
                <span class="editor-mock__gift-badge">-30%</span>
                <div class="editor-mock__gift-btn">Special Offer</div>
              </div>
            </div>
          </div>
          <div class="editor-mock__sidebar">
            <div class="editor-mock__tabs">
              <span class="editor-mock__tab">Blocks</span>
              <span class="editor-mock__tab editor-mock__tab--active">Styles</span>
              <span class="editor-mock__tab">Layers</span>
            </div>
            <div class="editor-mock__sidebar-content">
              <span class="editor-mock__breadcrumb">Body / Section / Column / Image</span>
              <span class="editor-mock__section-label">IMAGE</span>
              <div class="editor-mock__style-preview" />
              <div class="editor-mock__style-input">https://example.com/image.png</div>
              <span class="editor-mock__section-label">DIMENSIONS</span>
              <div class="editor-mock__dim-row">
                <div class="editor-mock__dim-field"><span>W</span><span>340</span></div>
                <div class="editor-mock__dim-field"><span>H</span><span>auto</span></div>
              </div>
              <span class="editor-mock__section-label">LAYOUT</span>
              <div class="editor-mock__align-row">
                <div class="editor-mock__align-btn editor-mock__align-btn--active">L</div>
                <div class="editor-mock__align-btn">C</div>
                <div class="editor-mock__align-btn">R</div>
              </div>
              <span class="editor-mock__section-label">BORDER</span>
              <div class="editor-mock__dim-row">
                <div class="editor-mock__dim-field"><span>Width</span><span>0</span></div>
                <div class="editor-mock__dim-field"><span>Radius</span><span>0</span></div>
              </div>
              <span class="editor-mock__section-label">SPACING</span>
              <div class="editor-mock__spacing-box" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Feature 3: Fully customizable templates -->
    <div class="features__block">
      <div class="features__mockup">
        <div class="editor-mock">
          <div class="editor-mock__canvas">
            <div class="editor-mock__email">
              <div class="editor-mock__restaurant-header">
                <span class="editor-mock__restaurant-name">LE COMPTOIR</span>
                <span class="editor-mock__restaurant-sub">BRASSERIE</span>
              </div>
              <div class="editor-mock__food-image" />
              <div class="editor-mock__menu-section">
                <span class="editor-mock__menu-title">Menu de Saison</span>
                <span class="editor-mock__menu-desc">Découvrez nos nouvelles créations</span>
                <div class="editor-mock__menu-btn">Réserver</div>
              </div>
            </div>
          </div>
          <div class="editor-mock__sidebar">
            <div class="editor-mock__tabs">
              <span class="editor-mock__tab editor-mock__tab--active">Blocks</span>
              <span class="editor-mock__tab">Styles</span>
              <span class="editor-mock__tab">Layers</span>
            </div>
            <div class="editor-mock__sidebar-content">
              <div class="editor-mock__readymade-header">
                <span class="editor-mock__section-label">READY-MADE</span>
                <span class="editor-mock__see-all">See all</span>
              </div>
              <div class="editor-mock__readymade-grid">
                <div class="editor-mock__readymade-item" />
                <div class="editor-mock__readymade-item" />
                <div class="editor-mock__readymade-item" />
                <div class="editor-mock__readymade-item" />
                <div class="editor-mock__readymade-item" />
                <div class="editor-mock__readymade-item" />
                <div class="editor-mock__readymade-item" />
                <div class="editor-mock__readymade-item" />
                <div class="editor-mock__readymade-item" />
                <div class="editor-mock__readymade-item" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="features__text">
        <h3 class="features__title">3. Fully customizable templates</h3>
        <p class="features__desc">
          Take complete creative control over every element of your email templates. Adjust color
          palettes, typography, spacing, and layout structures through an intuitive visual interface
          that requires zero coding knowledge. Save your brand presets — logos, fonts, color
          schemes — and reuse them across campaigns for effortlessly consistent
          communications. From custom header compositions to tailored footer layouts, every
          component is designed to reinforce your brand identity and make your emails
          unmistakably yours.
        </p>
      </div>
    </div>

    <!-- Feature 4: Visual drag & drop editing (reversed) -->
    <div class="features__block features__block--reversed">
      <div class="features__text">
        <h3 class="features__title">4. Visual drag &amp; drop editing</h3>
        <p class="features__desc">
          Build stunning emails without writing a single line of HTML. Our intuitive drag-and-drop
          editor lets you assemble professional layouts by simply placing content blocks exactly
          where you want them. Choose from a rich library of pre-built sections — headers,
          columns, images, buttons, and more — then customize every detail through a clean
          visual interface. Powered by a modern Vue.js architecture, the editor delivers a seamless
          experience that bridges the gap between design freedom and technical precision.
        </p>
      </div>
      <div class="features__mockup">
        <div class="editor-mock">
          <div class="editor-mock__canvas">
            <div class="editor-mock__email">
              <div class="editor-mock__email-header">
                <span class="editor-mock__brand-icon" />
                <span class="editor-mock__brand-text">AuraX</span>
              </div>
              <div class="editor-mock__product-area">
                <div class="editor-mock__headphones" />
              </div>
              <div class="editor-mock__cta-section">
                <span class="editor-mock__cta-title">DISCOVER MORE</span>
                <div class="editor-mock__cta-button">SHOP NOW</div>
              </div>
            </div>
          </div>
          <div class="editor-mock__sidebar">
            <div class="editor-mock__tabs">
              <span class="editor-mock__tab editor-mock__tab--active">Blocks</span>
              <span class="editor-mock__tab">Styles</span>
              <span class="editor-mock__tab">Layers</span>
            </div>
            <div class="editor-mock__sidebar-content">
              <div class="editor-mock__search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <span class="editor-mock__search-text">Search blocks...</span>
              </div>
              <span class="editor-mock__section-label">STRUCTURE</span>
              <div class="editor-mock__block-grid">
                <div class="editor-mock__block-item"><div class="editor-mock__block-icon editor-mock__block-icon--teal" /><span>1 Column</span></div>
                <div class="editor-mock__block-item"><div class="editor-mock__block-icon editor-mock__block-icon--teal" /><span>2 Column</span></div>
                <div class="editor-mock__block-item"><div class="editor-mock__block-icon editor-mock__block-icon--teal" /><span>3 Column</span></div>
                <div class="editor-mock__block-item"><div class="editor-mock__block-icon editor-mock__block-icon--teal" /><span>Sidebar</span></div>
              </div>
              <span class="editor-mock__section-label">CONTENT</span>
              <div class="editor-mock__block-grid">
                <div class="editor-mock__block-item"><div class="editor-mock__block-icon editor-mock__block-icon--purple" /><span>Heading</span></div>
                <div class="editor-mock__block-item"><div class="editor-mock__block-icon editor-mock__block-icon--purple" /><span>Text</span></div>
                <div class="editor-mock__block-item"><div class="editor-mock__block-icon editor-mock__block-icon--amber" /><span>Image</span></div>
                <div class="editor-mock__block-item"><div class="editor-mock__block-icon editor-mock__block-icon--amber" /><span>Button</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  background: var(--features-bg, #FFFFFF);
  padding: 96px 72px;
}

.features__block {
  display: flex;
  align-items: center;
  gap: 64px;
  max-width: 1100px;
  margin: 0 auto 80px;
}

.features__block:last-child {
  margin-bottom: 0;
}

.features__block--reversed {
  flex-direction: row-reverse;
}

/* ── Text ── */
.features__text {
  flex: 1;
  min-width: 0;
}

.features__title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--features-heading, #1A1A1A);
  margin-bottom: 20px;
}

.features__desc {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: var(--features-text, #666666);
}

/* ── Mockup ── */
.features__mockup {
  flex-shrink: 0;
  width: 560px;
}

.editor-mock {
  display: flex;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--features-mock-bg, #F5F5F5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

/* Canvas */
.editor-mock__canvas {
  flex: 1;
  background: var(--features-mock-canvas, #E8E8E8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.editor-mock__email {
  width: 100%;
  max-width: 340px;
  background: var(--features-mock-email, #FFFFFF);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* Feature 1 - AuraX email */
.editor-mock__email-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 60px;
  background: #1A1A1A;
  color: white;
}

.editor-mock__brand-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #01A8AB, #059669);
}

.editor-mock__brand-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
}

.editor-mock__product-area {
  height: 160px;
  background: #F5C542;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-mock__headphones {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.15);
}

.editor-mock__cta-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 10px;
}

.editor-mock__cta-title {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #1A1A1A;
}

.editor-mock__cta-button {
  background: #01A8AB;
  color: white;
  padding: 8px 32px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Feature 2 - Birthday email */
.editor-mock__birthday-emoji {
  text-align: center;
  font-size: 36px;
  padding: 16px 0 8px;
}

.editor-mock__birthday-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  gap: 4px;
}

.editor-mock__birthday-title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 18px;
  font-weight: 600;
  color: #1A1A1A;
}

.editor-mock__birthday-sub {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #888888;
}

.editor-mock__birthday-gift {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #FFF0F5;
}

.editor-mock__gift-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 28px;
  font-weight: 700;
  color: #E11D48;
}

.editor-mock__gift-btn {
  background: #E11D48;
  color: white;
  padding: 8px 24px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
}

/* Feature 3 - Restaurant email */
.editor-mock__restaurant-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #2C2C2C;
  gap: 2px;
}

.editor-mock__restaurant-name {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  letter-spacing: 3px;
}

.editor-mock__restaurant-sub {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  font-weight: 400;
  color: #999;
  letter-spacing: 2px;
}

.editor-mock__food-image {
  height: 120px;
  background: #8B7355;
}

.editor-mock__menu-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
}

.editor-mock__menu-title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
}

.editor-mock__menu-desc {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #888888;
}

.editor-mock__menu-btn {
  background: #2C2C2C;
  color: white;
  padding: 8px 24px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
}

/* ── Sidebar ── */
.editor-mock__sidebar {
  width: 180px;
  background: var(--features-mock-sidebar-bg, #FFFFFF);
  border-left: 1px solid var(--features-mock-sidebar-border, #E5E5E5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-mock__tabs {
  display: flex;
  height: 40px;
  background: var(--features-mock-tab-bg, #FAFAFA);
  border-bottom: 1px solid var(--features-mock-tab-border, #E8E8E8);
  padding: 0 12px;
  align-items: center;
  gap: 16px;
}

.editor-mock__tab {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: var(--features-mock-tab-color, #999999);
}

.editor-mock__tab--active {
  font-weight: 600;
  color: #01A8AB;
  border-bottom: 2px solid #01A8AB;
  padding-bottom: 0;
}

.editor-mock__sidebar-content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.editor-mock__search {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--features-mock-field-bg, #F5F5F5);
  border-radius: 15px;
  padding: 6px 10px;
}

.editor-mock__search-text {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  color: #BBBBBB;
}

.editor-mock__section-label {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--features-mock-tab-color, #888888);
}

.editor-mock__block-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.editor-mock__block-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 4px;
  border-radius: 6px;
  background: var(--features-mock-block-bg, #FAFAFA);
  border: 1px solid var(--features-mock-block-border, #F0F0F0);
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  color: var(--features-mock-tab-color, #888888);
}

.editor-mock__block-icon {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}

.editor-mock__block-icon--teal { background: linear-gradient(135deg, #01A8AB, #059669); }
.editor-mock__block-icon--purple { background: linear-gradient(135deg, #6366f1, #818cf8); }
.editor-mock__block-icon--amber { background: linear-gradient(135deg, #f59e0b, #fbbf24); }

/* Sidebar - Styles panel */
.editor-mock__breadcrumb {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: #01A8AB;
}

.editor-mock__style-preview {
  width: 100%;
  height: 60px;
  background: var(--features-mock-canvas, #E8E8E8);
  border-radius: 4px;
}

.editor-mock__style-input {
  width: 100%;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--features-mock-field-bg, #F5F5F5);
  border: 1px solid var(--features-mock-field-border, #E8E8E8);
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.editor-mock__dim-row {
  display: flex;
  gap: 6px;
}

.editor-mock__dim-field {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 4px 6px;
  border-radius: 4px;
  background: var(--features-mock-field-bg, #F5F5F5);
  border: 1px solid var(--features-mock-field-border, #E8E8E8);
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: #666;
}

.editor-mock__align-row {
  display: flex;
  gap: 4px;
}

.editor-mock__align-btn {
  flex: 1;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  background: var(--features-mock-field-bg, #F5F5F5);
  border: 1px solid var(--features-mock-field-border, #E8E8E8);
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: #888;
}

.editor-mock__align-btn--active {
  background: #01A8AB;
  border-color: #01A8AB;
  color: white;
}

.editor-mock__spacing-box {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 2px dashed var(--features-mock-block-border, #D4D4D4);
  background: var(--features-mock-block-bg, #FAFAFA);
  position: relative;
}

/* Feature 4 - AI tab */
.editor-mock__tab--ai {
  color: #a78bfa !important;
}

.editor-mock__tab--ai.editor-mock__tab--active {
  border-bottom-color: #a78bfa !important;
}

/* Feature 4 - AI-generated email */
.editor-mock__ai-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background: #1e3a5f;
}

.editor-mock__ai-header-text {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #FFFFFF;
}

.editor-mock__ai-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 12px;
  background: linear-gradient(135deg, #1e3a5f, #2563eb);
  color: white;
}

.editor-mock__ai-hero-title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 16px;
  font-weight: 600;
}

.editor-mock__ai-hero-sub {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  opacity: 0.8;
}

.editor-mock__ai-cards {
  display: flex;
  gap: 6px;
  padding: 10px;
}

.editor-mock__ai-card {
  flex: 1;
  height: 50px;
  border-radius: 4px;
  background: var(--features-mock-block-bg, #F0F0F0);
  border: 1px solid var(--features-mock-block-border, #E8E8E8);
}

.editor-mock__ai-cta {
  display: flex;
  justify-content: center;
  padding: 8px 10px 12px;
}

.editor-mock__ai-cta-btn {
  background: #2563eb;
  color: white;
  padding: 6px 24px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
}

/* Feature 4 - AI Chat sidebar */
.editor-mock__ai-chat {
  gap: 6px !important;
}

.editor-mock__ai-msg {
  padding: 6px 8px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  line-height: 1.4;
}

.editor-mock__ai-msg--user {
  background: var(--features-mock-field-bg, #F0F0FF);
  color: #4B5563;
  align-self: flex-end;
  border-bottom-right-radius: 2px;
}

.editor-mock__ai-msg--assistant {
  background: var(--features-mock-block-bg, #F8F8FF);
  border: 1px solid var(--features-mock-block-border, #E8E8F0);
  color: #374151;
  display: flex;
  gap: 4px;
  align-items: flex-start;
}

.editor-mock__ai-sparkle {
  font-size: 10px;
  flex-shrink: 0;
}

.editor-mock__ai-actions {
  display: flex;
  gap: 4px;
  margin-top: 2px;
}

.editor-mock__ai-apply-btn {
  flex: 1;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: #a78bfa;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 600;
}

.editor-mock__ai-discard-btn {
  flex: 1;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--features-mock-field-bg, #F5F5F5);
  border: 1px solid var(--features-mock-field-border, #E8E8E8);
  color: #888;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 500;
}

/* Sidebar - Ready-made */
.editor-mock__readymade-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-mock__see-all {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: #01A8AB;
  font-weight: 500;
}

.editor-mock__readymade-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.editor-mock__readymade-item {
  height: 40px;
  border-radius: 4px;
  background: var(--features-mock-block-bg, #F0F0F0);
  border: 1px solid var(--features-mock-block-border, #E8E8E8);
}

/* ── Responsive ── */
@media (max-width: 1000px) {
  .features {
    padding: 64px 32px;
  }
  .features__block,
  .features__block--reversed {
    flex-direction: column;
    gap: 32px;
  }
  .features__mockup {
    width: 100%;
    max-width: 560px;
  }
  .features__block {
    margin-bottom: 64px;
  }
}

@media (max-width: 640px) {
  .features {
    padding: 48px 16px;
  }
  .features__title {
    font-size: 26px;
  }
  .editor-mock {
    height: 320px;
  }
  .editor-mock__sidebar {
    width: 140px;
  }
}
</style>
