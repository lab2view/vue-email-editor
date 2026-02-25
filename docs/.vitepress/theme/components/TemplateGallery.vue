<script setup lang="ts">
import { ref, computed } from 'vue'

interface TemplateCard {
  id: string
  name: string
  category: string
  color: string
  accent: string
  layout: 'hero' | 'sidebar' | 'minimal' | 'grid' | 'banner' | 'split' | 'card' | 'stack'
  tag?: string
}

const categories = [
  { id: 'all', label: 'All Templates', count: 0 },
  { id: 'marketing', label: 'Marketing', count: 0 },
  { id: 'transactional', label: 'Transactional', count: 0 },
  { id: 'ecommerce', label: 'E-Commerce', count: 0 },
  { id: 'saas', label: 'SaaS', count: 0 },
  { id: 'events', label: 'Events', count: 0 },
  { id: 'newsletter', label: 'Newsletter', count: 0 },
  { id: 'seasonal', label: 'Seasonal', count: 0 },
  { id: 'industry', label: 'Industry', count: 0 },
]

const templates: TemplateCard[] = [
  // Marketing (15)
  { id: 'promo-flash', name: 'Flash Sale', category: 'marketing', color: '#dc2626', accent: '#fca5a5', layout: 'banner', tag: 'Popular' },
  { id: 'promo-discount', name: 'Discount Offer', category: 'marketing', color: '#ea580c', accent: '#fdba74', layout: 'hero' },
  { id: 'product-launch', name: 'Product Launch', category: 'marketing', color: '#0891b2', accent: '#67e8f9', layout: 'split', tag: 'New' },
  { id: 'referral', name: 'Referral Program', category: 'marketing', color: '#8b5cf6', accent: '#c4b5fd', layout: 'card' },
  { id: 'loyalty', name: 'Loyalty Rewards', category: 'marketing', color: '#d97706', accent: '#fcd34d', layout: 'stack' },
  { id: 'brand-story', name: 'Brand Story', category: 'marketing', color: '#059669', accent: '#6ee7b7', layout: 'minimal' },
  { id: 'survey-feedback', name: 'Survey & Feedback', category: 'marketing', color: '#0284c7', accent: '#7dd3fc', layout: 'card' },
  { id: 're-engagement', name: 'Win-Back', category: 'marketing', color: '#e11d48', accent: '#fda4af', layout: 'hero' },
  { id: 'cross-sell', name: 'Cross-Sell', category: 'marketing', color: '#7c3aed', accent: '#a78bfa', layout: 'grid' },
  { id: 'upsell', name: 'Upsell Premium', category: 'marketing', color: '#0d9488', accent: '#5eead4', layout: 'split' },
  { id: 'social-proof', name: 'Testimonials', category: 'marketing', color: '#ca8a04', accent: '#fde047', layout: 'stack' },
  { id: 'free-trial', name: 'Free Trial', category: 'marketing', color: '#2563eb', accent: '#93c5fd', layout: 'hero', tag: 'Popular' },
  { id: 'webinar-promo', name: 'Webinar Promo', category: 'marketing', color: '#9333ea', accent: '#d8b4fe', layout: 'banner' },
  { id: 'contest', name: 'Contest & Giveaway', category: 'marketing', color: '#f59e0b', accent: '#fde68a', layout: 'hero' },
  { id: 'partnership', name: 'Partnership', category: 'marketing', color: '#4f46e5', accent: '#a5b4fc', layout: 'split' },

  // Transactional (12)
  { id: 'welcome', name: 'Welcome', category: 'transactional', color: '#01A8AB', accent: '#5eead4', layout: 'hero', tag: 'Essential' },
  { id: 'order-confirm', name: 'Order Confirmation', category: 'transactional', color: '#16a34a', accent: '#86efac', layout: 'stack' },
  { id: 'shipping-notif', name: 'Shipping Notification', category: 'transactional', color: '#0284c7', accent: '#7dd3fc', layout: 'card' },
  { id: 'password-reset', name: 'Password Reset', category: 'transactional', color: '#6366f1', accent: '#a5b4fc', layout: 'minimal' },
  { id: 'invoice', name: 'Invoice', category: 'transactional', color: '#0f766e', accent: '#99f6e4', layout: 'stack' },
  { id: 'receipt', name: 'Payment Receipt', category: 'transactional', color: '#0d9488', accent: '#5eead4', layout: 'minimal' },
  { id: 'account-verify', name: 'Email Verification', category: 'transactional', color: '#7c3aed', accent: '#c4b5fd', layout: 'card' },
  { id: 'subscription', name: 'Subscription Confirm', category: 'transactional', color: '#059669', accent: '#6ee7b7', layout: 'minimal' },
  { id: 'delivery', name: 'Delivery Complete', category: 'transactional', color: '#15803d', accent: '#86efac', layout: 'hero' },
  { id: 'refund', name: 'Refund Processed', category: 'transactional', color: '#dc2626', accent: '#fca5a5', layout: 'minimal' },
  { id: 'security-alert', name: 'Security Alert', category: 'transactional', color: '#b91c1c', accent: '#fecaca', layout: 'banner' },
  { id: '2fa-code', name: '2FA Code', category: 'transactional', color: '#4338ca', accent: '#c7d2fe', layout: 'minimal' },

  // E-Commerce (14)
  { id: 'abandoned-cart', name: 'Abandoned Cart', category: 'ecommerce', color: '#ea580c', accent: '#fdba74', layout: 'card', tag: 'Popular' },
  { id: 'product-reco', name: 'Product Recommendations', category: 'ecommerce', color: '#0891b2', accent: '#67e8f9', layout: 'grid' },
  { id: 'back-in-stock', name: 'Back in Stock', category: 'ecommerce', color: '#16a34a', accent: '#86efac', layout: 'hero' },
  { id: 'price-drop', name: 'Price Drop Alert', category: 'ecommerce', color: '#dc2626', accent: '#fca5a5', layout: 'banner', tag: 'New' },
  { id: 'new-arrivals', name: 'New Arrivals', category: 'ecommerce', color: '#7c3aed', accent: '#c4b5fd', layout: 'grid' },
  { id: 'wishlist-remind', name: 'Wishlist Reminder', category: 'ecommerce', color: '#ec4899', accent: '#f9a8d4', layout: 'card' },
  { id: 'review-request', name: 'Review Request', category: 'ecommerce', color: '#ca8a04', accent: '#fde047', layout: 'stack' },
  { id: 'order-update', name: 'Order Status Update', category: 'ecommerce', color: '#2563eb', accent: '#93c5fd', layout: 'stack' },
  { id: 'flash-deal', name: 'Flash Deal', category: 'ecommerce', color: '#e11d48', accent: '#fda4af', layout: 'banner' },
  { id: 'bundle-offer', name: 'Bundle Offer', category: 'ecommerce', color: '#0d9488', accent: '#5eead4', layout: 'split' },
  { id: 'vip-access', name: 'VIP Early Access', category: 'ecommerce', color: '#9333ea', accent: '#d8b4fe', layout: 'hero', tag: 'Premium' },
  { id: 'gift-guide', name: 'Gift Guide', category: 'ecommerce', color: '#059669', accent: '#6ee7b7', layout: 'grid' },
  { id: 'reorder', name: 'Reorder Reminder', category: 'ecommerce', color: '#0284c7', accent: '#7dd3fc', layout: 'card' },
  { id: 'membership', name: 'Membership Perks', category: 'ecommerce', color: '#d97706', accent: '#fcd34d', layout: 'split' },

  // SaaS (12)
  { id: 'saas-onboarding', name: 'Onboarding Flow', category: 'saas', color: '#7c3aed', accent: '#c4b5fd', layout: 'stack', tag: 'Essential' },
  { id: 'feature-announce', name: 'Feature Announcement', category: 'saas', color: '#2563eb', accent: '#93c5fd', layout: 'hero' },
  { id: 'usage-report', name: 'Usage Report', category: 'saas', color: '#0891b2', accent: '#67e8f9', layout: 'stack' },
  { id: 'trial-ending', name: 'Trial Ending', category: 'saas', color: '#dc2626', accent: '#fca5a5', layout: 'banner', tag: 'Popular' },
  { id: 'upgrade-prompt', name: 'Upgrade to Pro', category: 'saas', color: '#9333ea', accent: '#d8b4fe', layout: 'hero' },
  { id: 'changelog', name: 'Changelog / Release Notes', category: 'saas', color: '#059669', accent: '#6ee7b7', layout: 'stack' },
  { id: 'milestone', name: 'User Milestone', category: 'saas', color: '#f59e0b', accent: '#fde68a', layout: 'card' },
  { id: 'nps-survey', name: 'NPS Survey', category: 'saas', color: '#0d9488', accent: '#5eead4', layout: 'minimal' },
  { id: 'api-key', name: 'API Key Generated', category: 'saas', color: '#4f46e5', accent: '#a5b4fc', layout: 'minimal' },
  { id: 'team-invite', name: 'Team Invitation', category: 'saas', color: '#0284c7', accent: '#7dd3fc', layout: 'card' },
  { id: 'downgrade', name: 'Plan Downgrade', category: 'saas', color: '#b91c1c', accent: '#fecaca', layout: 'minimal' },
  { id: 'integration', name: 'Integration Connected', category: 'saas', color: '#16a34a', accent: '#86efac', layout: 'hero' },

  // Events (10)
  { id: 'event-invite', name: 'Event Invitation', category: 'events', color: '#7c3aed', accent: '#c4b5fd', layout: 'hero', tag: 'Popular' },
  { id: 'conference', name: 'Conference', category: 'events', color: '#1d4ed8', accent: '#93c5fd', layout: 'banner' },
  { id: 'workshop', name: 'Workshop', category: 'events', color: '#059669', accent: '#6ee7b7', layout: 'card' },
  { id: 'meetup', name: 'Meetup', category: 'events', color: '#ea580c', accent: '#fdba74', layout: 'split' },
  { id: 'webinar-invite', name: 'Webinar Invite', category: 'events', color: '#2563eb', accent: '#93c5fd', layout: 'hero' },
  { id: 'rsvp-confirm', name: 'RSVP Confirmation', category: 'events', color: '#16a34a', accent: '#86efac', layout: 'minimal' },
  { id: 'event-reminder', name: 'Event Reminder', category: 'events', color: '#f59e0b', accent: '#fde68a', layout: 'banner' },
  { id: 'post-event', name: 'Post-Event Follow-up', category: 'events', color: '#0891b2', accent: '#67e8f9', layout: 'stack' },
  { id: 'speaker-intro', name: 'Speaker Introduction', category: 'events', color: '#9333ea', accent: '#d8b4fe', layout: 'split' },
  { id: 'ticket-confirm', name: 'Ticket Confirmation', category: 'events', color: '#0d9488', accent: '#5eead4', layout: 'card' },

  // Newsletter (8)
  { id: 'weekly-digest', name: 'Weekly Digest', category: 'newsletter', color: '#3b82f6', accent: '#93c5fd', layout: 'stack', tag: 'Popular' },
  { id: 'monthly-recap', name: 'Monthly Recap', category: 'newsletter', color: '#059669', accent: '#6ee7b7', layout: 'stack' },
  { id: 'curated-links', name: 'Curated Links', category: 'newsletter', color: '#7c3aed', accent: '#c4b5fd', layout: 'minimal' },
  { id: 'blog-roundup', name: 'Blog Roundup', category: 'newsletter', color: '#0891b2', accent: '#67e8f9', layout: 'grid' },
  { id: 'community-news', name: 'Community Update', category: 'newsletter', color: '#ea580c', accent: '#fdba74', layout: 'card' },
  { id: 'industry-insights', name: 'Industry Insights', category: 'newsletter', color: '#1d4ed8', accent: '#93c5fd', layout: 'stack' },
  { id: 'ceo-letter', name: 'CEO Letter', category: 'newsletter', color: '#0f766e', accent: '#99f6e4', layout: 'minimal' },
  { id: 'tips-tricks', name: 'Tips & Tricks', category: 'newsletter', color: '#f59e0b', accent: '#fde68a', layout: 'grid' },

  // Seasonal (10)
  { id: 'black-friday', name: 'Black Friday', category: 'seasonal', color: '#171717', accent: '#fbbf24', layout: 'banner', tag: 'Popular' },
  { id: 'cyber-monday', name: 'Cyber Monday', category: 'seasonal', color: '#1e40af', accent: '#60a5fa', layout: 'banner' },
  { id: 'christmas', name: 'Christmas', category: 'seasonal', color: '#dc2626', accent: '#86efac', layout: 'hero' },
  { id: 'new-year', name: 'New Year', category: 'seasonal', color: '#7c3aed', accent: '#fcd34d', layout: 'hero' },
  { id: 'valentines', name: "Valentine's Day", category: 'seasonal', color: '#ec4899', accent: '#fda4af', layout: 'split' },
  { id: 'easter', name: 'Easter', category: 'seasonal', color: '#a855f7', accent: '#fde68a', layout: 'card' },
  { id: 'summer-sale', name: 'Summer Sale', category: 'seasonal', color: '#f59e0b', accent: '#67e8f9', layout: 'banner' },
  { id: 'back-to-school', name: 'Back to School', category: 'seasonal', color: '#2563eb', accent: '#93c5fd', layout: 'grid' },
  { id: 'halloween', name: 'Halloween', category: 'seasonal', color: '#ea580c', accent: '#171717', layout: 'hero' },
  { id: 'mothers-day', name: "Mother's Day", category: 'seasonal', color: '#ec4899', accent: '#fbcfe8', layout: 'split' },

  // Industry (12)
  { id: 'real-estate', name: 'Real Estate Listing', category: 'industry', color: '#15803d', accent: '#86efac', layout: 'grid' },
  { id: 'restaurant', name: 'Restaurant Menu', category: 'industry', color: '#b91c1c', accent: '#fca5a5', layout: 'card' },
  { id: 'fitness', name: 'Fitness Studio', category: 'industry', color: '#0891b2', accent: '#67e8f9', layout: 'hero' },
  { id: 'travel', name: 'Travel & Tourism', category: 'industry', color: '#0284c7', accent: '#7dd3fc', layout: 'grid', tag: 'New' },
  { id: 'healthcare', name: 'Healthcare', category: 'industry', color: '#059669', accent: '#6ee7b7', layout: 'minimal' },
  { id: 'education', name: 'Education', category: 'industry', color: '#7c3aed', accent: '#c4b5fd', layout: 'stack' },
  { id: 'finance', name: 'Finance & Banking', category: 'industry', color: '#1d4ed8', accent: '#93c5fd', layout: 'stack' },
  { id: 'nonprofit', name: 'Non-Profit', category: 'industry', color: '#059669', accent: '#6ee7b7', layout: 'hero' },
  { id: 'legal', name: 'Legal Services', category: 'industry', color: '#374151', accent: '#9ca3af', layout: 'minimal' },
  { id: 'beauty-spa', name: 'Beauty & Spa', category: 'industry', color: '#ec4899', accent: '#fbcfe8', layout: 'split' },
  { id: 'automotive', name: 'Automotive', category: 'industry', color: '#0f172a', accent: '#94a3b8', layout: 'banner' },
  { id: 'tech-startup', name: 'Tech Startup', category: 'industry', color: '#6366f1', accent: '#a5b4fc', layout: 'hero', tag: 'New' },
]

// Compute category counts
categories.forEach(cat => {
  cat.count = cat.id === 'all' ? templates.length : templates.filter(t => t.category === cat.id).length
})

const activeCategory = ref('all')

const filteredTemplates = computed(() => {
  if (activeCategory.value === 'all') return templates
  return templates.filter(t => t.category === activeCategory.value)
})

const showAll = ref(false)
const displayedTemplates = computed(() => {
  if (showAll.value) return filteredTemplates.value
  return filteredTemplates.value.slice(0, 12)
})

const hasMore = computed(() => filteredTemplates.value.length > 12)
</script>

<template>
  <section class="tpl-gallery">
    <div class="tpl-gallery__header">
      <h2 class="tpl-gallery__title">{{ templates.length }}+ Starter Templates</h2>
      <p class="tpl-gallery__subtitle">
        Professional email templates for every use case. Pick one, customize it in the editor, and send.
      </p>
    </div>

    <!-- Category filter -->
    <div class="tpl-gallery__filters">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="tpl-filter"
        :class="{ 'tpl-filter--active': activeCategory === cat.id }"
        @click="activeCategory = cat.id; showAll = false"
      >
        {{ cat.label }}
        <span class="tpl-filter__count">{{ cat.count }}</span>
      </button>
    </div>

    <!-- Template grid -->
    <div class="tpl-gallery__grid">
      <div
        v-for="tpl in displayedTemplates"
        :key="tpl.id"
        class="tpl-card"
      >
        <!-- Mini email preview mockup -->
        <div class="tpl-card__preview" :style="{ '--tpl-color': tpl.color, '--tpl-accent': tpl.accent }">
          <div class="tpl-card__tag" v-if="tpl.tag">{{ tpl.tag }}</div>

          <!-- Layout variations -->
          <div class="tpl-preview" :class="`tpl-preview--${tpl.layout}`">
            <template v-if="tpl.layout === 'hero'">
              <div class="tpl-p__header" />
              <div class="tpl-p__hero-img" />
              <div class="tpl-p__line" />
              <div class="tpl-p__line tpl-p__line--short" />
              <div class="tpl-p__btn" />
              <div class="tpl-p__footer" />
            </template>

            <template v-else-if="tpl.layout === 'banner'">
              <div class="tpl-p__banner" />
              <div class="tpl-p__line" />
              <div class="tpl-p__line" />
              <div class="tpl-p__btn" />
              <div class="tpl-p__divider" />
              <div class="tpl-p__line tpl-p__line--short" />
              <div class="tpl-p__footer" />
            </template>

            <template v-else-if="tpl.layout === 'grid'">
              <div class="tpl-p__header" />
              <div class="tpl-p__line" />
              <div class="tpl-p__grid-row">
                <div class="tpl-p__grid-item" />
                <div class="tpl-p__grid-item" />
              </div>
              <div class="tpl-p__grid-row">
                <div class="tpl-p__grid-item" />
                <div class="tpl-p__grid-item" />
              </div>
              <div class="tpl-p__footer" />
            </template>

            <template v-else-if="tpl.layout === 'split'">
              <div class="tpl-p__header" />
              <div class="tpl-p__split-row">
                <div class="tpl-p__split-img" />
                <div class="tpl-p__split-text">
                  <div class="tpl-p__line" />
                  <div class="tpl-p__line tpl-p__line--short" />
                  <div class="tpl-p__btn tpl-p__btn--sm" />
                </div>
              </div>
              <div class="tpl-p__footer" />
            </template>

            <template v-else-if="tpl.layout === 'card'">
              <div class="tpl-p__header" />
              <div class="tpl-p__card-box">
                <div class="tpl-p__card-icon" />
                <div class="tpl-p__line" />
                <div class="tpl-p__line tpl-p__line--short" />
                <div class="tpl-p__btn tpl-p__btn--sm" />
              </div>
              <div class="tpl-p__footer" />
            </template>

            <template v-else-if="tpl.layout === 'stack'">
              <div class="tpl-p__header" />
              <div class="tpl-p__line" />
              <div class="tpl-p__divider" />
              <div class="tpl-p__line" />
              <div class="tpl-p__divider" />
              <div class="tpl-p__line" />
              <div class="tpl-p__btn" />
              <div class="tpl-p__footer" />
            </template>

            <template v-else-if="tpl.layout === 'sidebar'">
              <div class="tpl-p__header" />
              <div class="tpl-p__split-row">
                <div class="tpl-p__split-text" style="flex: 2">
                  <div class="tpl-p__line" />
                  <div class="tpl-p__line" />
                  <div class="tpl-p__line tpl-p__line--short" />
                </div>
                <div class="tpl-p__sidebar-col">
                  <div class="tpl-p__grid-item" />
                  <div class="tpl-p__grid-item" />
                </div>
              </div>
              <div class="tpl-p__footer" />
            </template>

            <template v-else>
              <div class="tpl-p__header" />
              <div class="tpl-p__line" />
              <div class="tpl-p__line tpl-p__line--short" />
              <div class="tpl-p__btn" />
              <div class="tpl-p__footer" />
            </template>
          </div>
        </div>

        <div class="tpl-card__info">
          <span class="tpl-card__name">{{ tpl.name }}</span>
          <span class="tpl-card__category">{{ tpl.category }}</span>
        </div>
      </div>
    </div>

    <!-- Show more button -->
    <div v-if="hasMore && !showAll" class="tpl-gallery__more">
      <button class="tpl-gallery__more-btn" @click="showAll = true">
        Show all {{ filteredTemplates.length }} templates
      </button>
    </div>
  </section>
</template>

<style scoped>
.tpl-gallery {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
}

.tpl-gallery__header {
  text-align: center;
  margin-bottom: 2rem;
}

.tpl-gallery__title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.tpl-gallery__subtitle {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Filters */
.tpl-gallery__filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tpl-filter {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
}

.tpl-filter:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tpl-filter--active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.tpl-filter__count {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* Grid */
.tpl-gallery__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

/* Card */
.tpl-card {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  transition: all 0.25s ease;
  cursor: pointer;
}

.tpl-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(1, 168, 171, 0.12);
  border-color: var(--vp-c-brand-1);
}

.dark .tpl-card:hover {
  box-shadow: 0 12px 32px rgba(45, 212, 191, 0.08);
}

/* Card preview area */
.tpl-card__preview {
  position: relative;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tpl-card__tag {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--tpl-color);
  color: white;
  z-index: 1;
}

/* Mini email preview */
.tpl-preview {
  width: 100%;
  max-width: 180px;
  background: white;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.dark .tpl-preview {
  background: #1a1a2e;
}

/* Preview elements */
.tpl-p__header {
  height: 20px;
  border-radius: 3px;
  background: var(--tpl-color);
  opacity: 0.9;
}

.tpl-p__hero-img {
  height: 50px;
  border-radius: 3px;
  background: linear-gradient(135deg, var(--tpl-color), var(--tpl-accent));
  opacity: 0.7;
}

.tpl-p__banner {
  height: 36px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--tpl-color), var(--tpl-accent));
}

.tpl-p__line {
  height: 6px;
  border-radius: 2px;
  background: var(--vp-c-divider);
}

.tpl-p__line--short {
  width: 60%;
}

.tpl-p__btn {
  height: 16px;
  width: 60px;
  border-radius: 3px;
  background: var(--tpl-color);
  align-self: center;
}

.tpl-p__btn--sm {
  height: 12px;
  width: 50px;
}

.tpl-p__divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 2px 0;
}

.tpl-p__footer {
  height: 12px;
  border-radius: 2px;
  background: var(--vp-c-divider);
  opacity: 0.5;
}

/* Grid layout */
.tpl-p__grid-row {
  display: flex;
  gap: 4px;
}

.tpl-p__grid-item {
  flex: 1;
  height: 36px;
  border-radius: 3px;
  background: linear-gradient(135deg, var(--tpl-accent), var(--tpl-color));
  opacity: 0.4;
}

/* Split layout */
.tpl-p__split-row {
  display: flex;
  gap: 6px;
}

.tpl-p__split-img {
  flex: 1;
  min-height: 50px;
  border-radius: 3px;
  background: linear-gradient(135deg, var(--tpl-color), var(--tpl-accent));
  opacity: 0.6;
}

.tpl-p__split-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
}

.tpl-p__sidebar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Card layout */
.tpl-p__card-box {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}

.tpl-p__card-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--tpl-color);
  opacity: 0.8;
}

/* Card info */
.tpl-card__info {
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tpl-card__name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tpl-card__category {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: capitalize;
}

/* Show more */
.tpl-gallery__more {
  text-align: center;
  margin-top: 2rem;
}

.tpl-gallery__more-btn {
  padding: 0.75rem 2rem;
  border-radius: 99px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid var(--vp-c-brand-1);
  background: transparent;
  color: var(--vp-c-brand-1);
  transition: all 0.2s ease;
}

.tpl-gallery__more-btn:hover {
  background: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(1, 168, 171, 0.25);
}

/* Responsive */
@media (max-width: 960px) {
  .tpl-gallery__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .tpl-gallery__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  .tpl-gallery__title {
    font-size: 1.5rem;
  }
  .tpl-card__preview {
    min-height: 160px;
    padding: 12px;
  }
}
</style>
