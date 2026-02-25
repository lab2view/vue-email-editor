<script setup lang="ts">
/**
 * BlockPreview — Mini SVG schematic preview for each block type.
 * Renders a simplified visual representation of what the block looks like.
 */
defineProps<{ blockId: string }>()

// Colors
const BG = '#f0f1f3'
const LINE = '#c4c8ce'
const ACCENT = '#01A8AB'
const DARK = '#6b7280'
const IMG = '#d1d5db'
const BTN = ACCENT
</script>

<template>
  <svg
    :viewBox="'0 0 80 48'"
    class="ebb-block-preview"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- ═══ LAYOUT BLOCKS ═══ -->

    <!-- 1 colonne -->
    <template v-if="blockId === 'layout-1-col'">
      <rect x="8" y="6" width="64" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
    </template>

    <!-- 2 colonnes -->
    <template v-else-if="blockId === 'layout-2-col'">
      <rect x="8" y="6" width="30" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="42" y="6" width="30" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
    </template>

    <!-- 3 colonnes -->
    <template v-else-if="blockId === 'layout-3-col'">
      <rect x="5" y="6" width="20" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="29" y="6" width="22" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="55" y="6" width="20" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
    </template>

    <!-- 4 colonnes -->
    <template v-else-if="blockId === 'layout-4-col'">
      <rect x="4" y="6" width="15" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="22" y="6" width="15" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="40" y="6" width="15" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="58" y="6" width="15" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
    </template>

    <!-- Sidebar gauche -->
    <template v-else-if="blockId === 'layout-sidebar-left'">
      <rect x="8" y="6" width="22" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="34" y="6" width="38" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
    </template>

    <!-- Sidebar droite -->
    <template v-else-if="blockId === 'layout-sidebar-right'">
      <rect x="8" y="6" width="38" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="50" y="6" width="22" height="36" rx="2" :fill="BG" :stroke="LINE" stroke-width="0.5" />
    </template>

    <!-- ═══ CONTENT BLOCKS ═══ -->

    <!-- Texte -->
    <template v-else-if="blockId === 'content-text'">
      <rect x="12" y="10" width="40" height="2.5" rx="1" :fill="DARK" />
      <rect x="12" y="16" width="56" height="2" rx="1" :fill="LINE" />
      <rect x="12" y="21" width="52" height="2" rx="1" :fill="LINE" />
      <rect x="12" y="26" width="48" height="2" rx="1" :fill="LINE" />
      <rect x="12" y="31" width="30" height="2" rx="1" :fill="LINE" />
    </template>

    <!-- Image -->
    <template v-else-if="blockId === 'content-image'">
      <rect x="12" y="6" width="56" height="36" rx="3" :fill="IMG" />
      <!-- Mountain icon -->
      <polygon points="28,32 38,20 48,32" :fill="'#b0b5bc'" />
      <polygon points="38,32 46,22 54,32" :fill="'#a0a6ae'" />
      <circle cx="30" cy="16" r="4" :fill="'#b0b5bc'" />
    </template>

    <!-- Bouton -->
    <template v-else-if="blockId === 'content-button'">
      <rect x="20" y="16" width="40" height="16" rx="4" :fill="BTN" />
      <rect x="28" y="22.5" width="24" height="3" rx="1.5" fill="#ffffff" />
    </template>

    <!-- Séparateur -->
    <template v-else-if="blockId === 'content-divider'">
      <line x1="12" y1="24" x2="68" y2="24" :stroke="LINE" stroke-width="1.5" />
    </template>

    <!-- Espacement -->
    <template v-else-if="blockId === 'content-spacer'">
      <line x1="38" y1="10" x2="38" y2="16" :stroke="LINE" stroke-width="1" />
      <line x1="35" y1="10" x2="41" y2="10" :stroke="LINE" stroke-width="1" />
      <rect x="12" y="18" width="52" height="12" rx="1" fill="none" :stroke="LINE" stroke-width="0.5" stroke-dasharray="2 2" />
      <line x1="38" y1="32" x2="38" y2="38" :stroke="LINE" stroke-width="1" />
      <line x1="35" y1="38" x2="41" y2="38" :stroke="LINE" stroke-width="1" />
    </template>

    <!-- Social -->
    <template v-else-if="blockId === 'content-social'">
      <circle cx="24" cy="24" r="6" :fill="'#3b5998'" />
      <circle cx="40" cy="24" r="6" :fill="'#1da1f2'" />
      <circle cx="56" cy="24" r="6" :fill="'#e4405f'" />
    </template>

    <!-- Hero -->
    <template v-else-if="blockId === 'content-hero'">
      <rect x="4" y="4" width="72" height="40" rx="3" :fill="'#7c3aed'" />
      <rect x="20" y="12" width="40" height="4" rx="2" fill="#ffffff" />
      <rect x="24" y="20" width="32" height="2" rx="1" fill="rgba(255,255,255,0.6)" />
      <rect x="28" y="28" width="24" height="10" rx="3" :fill="BTN" />
      <rect x="32" y="31.5" width="16" height="3" rx="1.5" fill="#ffffff" />
    </template>

    <!-- ═══ COMPOSITE BLOCKS ═══ -->

    <!-- En-tête -->
    <template v-else-if="blockId === 'composite-header'">
      <rect x="4" y="14" width="72" height="20" rx="2" :fill="BG" />
      <rect x="12" y="20" width="20" height="8" rx="2" :fill="DARK" />
    </template>

    <!-- En-tête + Nav -->
    <template v-else-if="blockId === 'composite-header-nav'">
      <rect x="4" y="14" width="72" height="20" rx="2" :fill="BG" />
      <rect x="10" y="20" width="16" height="8" rx="2" :fill="DARK" />
      <rect x="42" y="22" width="8" height="3" rx="1" :fill="LINE" />
      <rect x="53" y="22" width="8" height="3" rx="1" :fill="LINE" />
      <rect x="64" y="22" width="8" height="3" rx="1" :fill="LINE" />
    </template>

    <!-- Bannière Hero -->
    <template v-else-if="blockId === 'composite-hero'">
      <rect x="4" y="4" width="72" height="40" rx="3" :fill="'#7c3aed'" />
      <rect x="16" y="10" width="48" height="4" rx="2" fill="#ffffff" />
      <rect x="20" y="18" width="40" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
      <rect x="20" y="22" width="36" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
      <rect x="26" y="30" width="28" height="9" rx="3" fill="#ffffff" />
      <rect x="30" y="33" width="20" height="3" rx="1.5" :fill="'#7c3aed'" />
    </template>

    <!-- Hero Gradient -->
    <template v-else-if="blockId === 'composite-hero-gradient'">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7c3aed" />
          <stop offset="100%" stop-color="#01A8AB" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="72" height="40" rx="3" fill="url(#hg)" />
      <rect x="18" y="12" width="44" height="4" rx="2" fill="#ffffff" />
      <rect x="22" y="20" width="36" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
      <rect x="28" y="28" width="24" height="9" rx="3" :fill="BTN" />
    </template>

    <!-- Image + Texte -->
    <template v-else-if="blockId === 'composite-img-text'">
      <rect x="5" y="8" width="30" height="32" rx="2" :fill="IMG" />
      <polygon points="14,32 20,24 26,32" :fill="'#b0b5bc'" />
      <circle cx="14" cy="18" r="3" :fill="'#b0b5bc'" />
      <rect x="40" y="10" width="32" height="3" rx="1" :fill="DARK" />
      <rect x="40" y="17" width="34" height="2" rx="1" :fill="LINE" />
      <rect x="40" y="22" width="30" height="2" rx="1" :fill="LINE" />
      <rect x="40" y="27" width="26" height="2" rx="1" :fill="LINE" />
      <rect x="40" y="34" width="18" height="6" rx="2" :fill="BTN" />
    </template>

    <!-- Texte + Image -->
    <template v-else-if="blockId === 'composite-text-img'">
      <rect x="6" y="10" width="32" height="3" rx="1" :fill="DARK" />
      <rect x="6" y="17" width="30" height="2" rx="1" :fill="LINE" />
      <rect x="6" y="22" width="28" height="2" rx="1" :fill="LINE" />
      <rect x="6" y="27" width="24" height="2" rx="1" :fill="LINE" />
      <rect x="6" y="34" width="18" height="6" rx="2" :fill="BTN" />
      <rect x="44" y="8" width="30" height="32" rx="2" :fill="IMG" />
      <polygon points="53,32 59,24 65,32" :fill="'#b0b5bc'" />
      <circle cx="53" cy="18" r="3" :fill="'#b0b5bc'" />
    </template>

    <!-- Appel à l'action -->
    <template v-else-if="blockId === 'composite-cta'">
      <rect x="4" y="4" width="72" height="40" rx="3" :fill="BG" />
      <rect x="18" y="10" width="44" height="4" rx="1.5" :fill="DARK" />
      <rect x="20" y="18" width="40" height="2" rx="1" :fill="LINE" />
      <rect x="22" y="23" width="36" height="2" rx="1" :fill="LINE" />
      <rect x="24" y="30" width="32" height="10" rx="4" :fill="BTN" />
      <rect x="30" y="33.5" width="20" height="3" rx="1.5" fill="#ffffff" />
    </template>

    <!-- Grille images -->
    <template v-else-if="blockId === 'composite-image-grid'">
      <rect x="6" y="6" width="32" height="16" rx="2" :fill="IMG" />
      <rect x="42" y="6" width="32" height="16" rx="2" :fill="IMG" />
      <rect x="6" y="26" width="32" height="16" rx="2" :fill="IMG" />
      <rect x="42" y="26" width="32" height="16" rx="2" :fill="IMG" />
    </template>

    <!-- Fonctionnalités -->
    <template v-else-if="blockId === 'composite-features'">
      <circle cx="15" cy="14" r="5" :fill="ACCENT" opacity="0.2" />
      <circle cx="15" cy="14" r="2" :fill="ACCENT" />
      <rect x="24" y="10" width="20" height="2.5" rx="1" :fill="DARK" />
      <rect x="24" y="15" width="30" height="1.5" rx="0.75" :fill="LINE" />

      <circle cx="15" cy="32" r="5" :fill="ACCENT" opacity="0.2" />
      <circle cx="15" cy="32" r="2" :fill="ACCENT" />
      <rect x="24" y="28" width="20" height="2.5" rx="1" :fill="DARK" />
      <rect x="24" y="33" width="30" height="1.5" rx="0.75" :fill="LINE" />
    </template>

    <!-- Témoignage -->
    <template v-else-if="blockId === 'composite-testimonial'">
      <text x="10" y="16" font-size="14" :fill="LINE" opacity="0.5">"</text>
      <rect x="18" y="10" width="50" height="2" rx="1" :fill="LINE" />
      <rect x="20" y="15" width="44" height="2" rx="1" :fill="LINE" />
      <rect x="24" y="20" width="36" height="2" rx="1" :fill="LINE" />
      <circle cx="30" cy="34" r="5" :fill="IMG" />
      <rect x="38" y="31" width="20" height="2.5" rx="1" :fill="DARK" />
      <rect x="38" y="36" width="14" height="1.5" rx="0.75" :fill="ACCENT" />
    </template>

    <!-- Offre / Prix -->
    <template v-else-if="blockId === 'composite-pricing'">
      <rect x="4" y="4" width="72" height="40" rx="3" :fill="BG" />
      <rect x="20" y="9" width="40" height="3" rx="1" :fill="DARK" />
      <rect x="28" y="16" width="24" height="6" rx="1" :fill="ACCENT" />
      <rect x="32" y="17.5" width="16" height="3" rx="1" fill="#ffffff" />
      <rect x="22" y="26" width="36" height="1.5" rx="0.75" :fill="LINE" />
      <rect x="26" y="30" width="28" height="1.5" rx="0.75" :fill="LINE" />
      <rect x="26" y="36" width="28" height="6" rx="3" :fill="BTN" />
    </template>

    <!-- Code promo -->
    <template v-else-if="blockId === 'composite-coupon'">
      <rect x="10" y="8" width="60" height="32" rx="3" :fill="BG" stroke="#01A8AB" stroke-width="1" stroke-dasharray="3 2" />
      <rect x="22" y="14" width="36" height="3" rx="1" :fill="DARK" />
      <rect x="20" y="22" width="40" height="8" rx="2" fill="#ffffff" :stroke="LINE" stroke-width="0.5" />
      <rect x="24" y="24.5" width="32" height="3" rx="1" :fill="ACCENT" />
    </template>

    <!-- Vidéo -->
    <template v-else-if="blockId === 'composite-video'">
      <rect x="10" y="6" width="60" height="36" rx="3" :fill="IMG" />
      <circle cx="40" cy="24" r="10" fill="rgba(0,0,0,0.4)" />
      <polygon points="37,19 37,29 47,24" fill="#ffffff" />
    </template>

    <!-- Réseaux sociaux (composite) -->
    <template v-else-if="blockId === 'composite-social'">
      <rect x="4" y="10" width="72" height="28" rx="2" :fill="BG" />
      <rect x="26" y="14" width="28" height="2.5" rx="1" :fill="DARK" />
      <circle cx="22" cy="28" r="5" :fill="'#3b5998'" />
      <circle cx="34" cy="28" r="5" :fill="'#1da1f2'" />
      <circle cx="46" cy="28" r="5" :fill="'#e4405f'" />
      <circle cx="58" cy="28" r="5" :fill="'#0077b5'" />
    </template>

    <!-- Pied de page -->
    <template v-else-if="blockId === 'composite-footer'">
      <rect x="4" y="4" width="72" height="40" rx="2" :fill="'#374151'" />
      <circle cx="30" cy="14" r="3.5" fill="rgba(255,255,255,0.3)" />
      <circle cx="40" cy="14" r="3.5" fill="rgba(255,255,255,0.3)" />
      <circle cx="50" cy="14" r="3.5" fill="rgba(255,255,255,0.3)" />
      <rect x="18" y="22" width="44" height="1.5" rx="0.75" fill="rgba(255,255,255,0.2)" />
      <rect x="22" y="27" width="36" height="1.5" rx="0.75" fill="rgba(255,255,255,0.15)" />
      <rect x="24" y="34" width="32" height="1.5" rx="0.75" fill="rgba(255,255,255,0.1)" />
    </template>

    <!-- Pied de page simple -->
    <template v-else-if="blockId === 'composite-footer-minimal'">
      <rect x="4" y="14" width="72" height="20" rx="2" :fill="BG" />
      <rect x="18" y="20" width="44" height="1.5" rx="0.75" :fill="LINE" />
      <rect x="24" y="26" width="32" height="1.5" rx="0.75" :fill="LINE" opacity="0.6" />
    </template>

    <!-- Séparateur décoré -->
    <template v-else-if="blockId === 'composite-separator'">
      <line x1="10" y1="24" x2="34" y2="24" :stroke="LINE" stroke-width="1" />
      <circle cx="40" cy="24" r="3" :fill="ACCENT" />
      <line x1="46" y1="24" x2="70" y2="24" :stroke="LINE" stroke-width="1" />
    </template>

    <!-- Carte produit -->
    <template v-else-if="blockId === 'composite-product-card'">
      <rect x="14" y="4" width="52" height="40" rx="3" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="18" y="7" width="44" height="18" rx="2" :fill="IMG" />
      <rect x="20" y="28" width="26" height="2.5" rx="1" :fill="DARK" />
      <rect x="20" y="33" width="14" height="2.5" rx="1" :fill="ACCENT" />
      <rect x="44" y="33" width="14" height="6" rx="2" :fill="BTN" />
    </template>

    <!-- Notification -->
    <template v-else-if="blockId === 'composite-notification'">
      <rect x="8" y="10" width="64" height="28" rx="3" :fill="'#dbeafe'" />
      <circle cx="20" cy="24" r="6" :fill="'#3b82f6'" />
      <rect x="16" y="22" width="8" height="4" rx="1" fill="#ffffff" opacity="0.6" />
      <rect x="32" y="18" width="32" height="2.5" rx="1" :fill="'#1e40af'" />
      <rect x="32" y="24" width="28" height="1.5" rx="0.75" :fill="'#3b82f6'" opacity="0.6" />
      <rect x="32" y="28" width="24" height="1.5" rx="0.75" :fill="'#3b82f6'" opacity="0.4" />
    </template>

    <!-- Statistiques -->
    <template v-else-if="blockId === 'composite-stats'">
      <rect x="4" y="10" width="22" height="28" rx="2" :fill="BG" />
      <rect x="8" y="16" width="14" height="4" rx="1" :fill="ACCENT" />
      <rect x="9" y="24" width="12" height="1.5" rx="0.75" :fill="LINE" />

      <rect x="29" y="10" width="22" height="28" rx="2" :fill="BG" />
      <rect x="33" y="16" width="14" height="4" rx="1" :fill="ACCENT" />
      <rect x="34" y="24" width="12" height="1.5" rx="0.75" :fill="LINE" />

      <rect x="54" y="10" width="22" height="28" rx="2" :fill="BG" />
      <rect x="58" y="16" width="14" height="4" rx="1" :fill="ACCENT" />
      <rect x="59" y="24" width="12" height="1.5" rx="0.75" :fill="LINE" />
    </template>

    <!-- Bandeau d'annonce -->
    <template v-else-if="blockId === 'composite-announcement'">
      <rect x="4" y="14" width="72" height="20" rx="2" :fill="ACCENT" />
      <rect x="16" y="20" width="48" height="3" rx="1.5" fill="#ffffff" />
      <rect x="22" y="27" width="36" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
    </template>

    <!-- Étapes -->
    <template v-else-if="blockId === 'composite-timeline'">
      <circle cx="16" cy="18" r="6" :fill="ACCENT" />
      <text x="16" y="21" text-anchor="middle" font-size="7" font-weight="bold" fill="#ffffff">1</text>
      <line x1="22" y1="18" x2="34" y2="18" :stroke="LINE" stroke-width="1" />

      <circle cx="40" cy="18" r="6" :fill="ACCENT" />
      <text x="40" y="21" text-anchor="middle" font-size="7" font-weight="bold" fill="#ffffff">2</text>
      <line x1="46" y1="18" x2="58" y2="18" :stroke="LINE" stroke-width="1" />

      <circle cx="64" cy="18" r="6" :fill="ACCENT" />
      <text x="64" y="21" text-anchor="middle" font-size="7" font-weight="bold" fill="#ffffff">3</text>

      <rect x="8" y="28" width="14" height="1.5" rx="0.75" :fill="LINE" />
      <rect x="33" y="28" width="14" height="1.5" rx="0.75" :fill="LINE" />
      <rect x="57" y="28" width="14" height="1.5" rx="0.75" :fill="LINE" />
    </template>

    <!-- Récap commande -->
    <template v-else-if="blockId === 'composite-order-summary'">
      <rect x="8" y="4" width="64" height="40" rx="2" :fill="BG" />
      <rect x="14" y="8" width="24" height="2.5" rx="1" :fill="DARK" />
      <line x1="14" y1="14" x2="66" y2="14" :stroke="LINE" stroke-width="0.5" />
      <rect x="14" y="18" width="20" height="1.5" rx="0.75" :fill="LINE" />
      <rect x="54" y="18" width="10" height="1.5" rx="0.75" :fill="DARK" />
      <rect x="14" y="23" width="18" height="1.5" rx="0.75" :fill="LINE" />
      <rect x="54" y="23" width="10" height="1.5" rx="0.75" :fill="DARK" />
      <line x1="14" y1="28" x2="66" y2="28" :stroke="LINE" stroke-width="0.5" />
      <rect x="40" y="32" width="14" height="2.5" rx="1" :fill="DARK" />
      <rect x="56" y="32" width="10" height="2.5" rx="1" :fill="ACCENT" />
    </template>

    <!-- FAQ -->
    <template v-else-if="blockId === 'composite-faq'">
      <rect x="10" y="6" width="36" height="2.5" rx="1" :fill="DARK" />
      <rect x="62" y="7" width="6" height="1" rx="0.5" :fill="LINE" />
      <line x1="10" y1="12" x2="70" y2="12" :stroke="LINE" stroke-width="0.5" />
      <rect x="10" y="16" width="32" height="2.5" rx="1" :fill="DARK" />
      <rect x="62" y="17" width="6" height="1" rx="0.5" :fill="LINE" />
      <line x1="10" y1="22" x2="70" y2="22" :stroke="LINE" stroke-width="0.5" />
      <rect x="10" y="26" width="28" height="2.5" rx="1" :fill="DARK" />
      <rect x="62" y="27" width="6" height="1" rx="0.5" :fill="LINE" />
      <line x1="10" y1="32" x2="70" y2="32" :stroke="LINE" stroke-width="0.5" />
      <rect x="10" y="36" width="34" height="2.5" rx="1" :fill="DARK" />
      <rect x="62" y="37" width="6" height="1" rx="0.5" :fill="LINE" />
    </template>

    <!-- Équipe -->
    <template v-else-if="blockId === 'composite-team'">
      <circle cx="16" cy="14" r="7" :fill="IMG" />
      <rect x="8" y="24" width="16" height="2" rx="1" :fill="DARK" />
      <rect x="10" y="28" width="12" height="1.5" rx="0.75" :fill="ACCENT" />

      <circle cx="40" cy="14" r="7" :fill="IMG" />
      <rect x="32" y="24" width="16" height="2" rx="1" :fill="DARK" />
      <rect x="34" y="28" width="12" height="1.5" rx="0.75" :fill="ACCENT" />

      <circle cx="64" cy="14" r="7" :fill="IMG" />
      <rect x="56" y="24" width="16" height="2" rx="1" :fill="DARK" />
      <rect x="58" y="28" width="12" height="1.5" rx="0.75" :fill="ACCENT" />
    </template>

    <!-- Compte à rebours -->
    <template v-else-if="blockId === 'composite-countdown'">
      <rect x="4" y="8" width="72" height="32" rx="3" :fill="'#fef2f2'" />
      <rect x="18" y="12" width="44" height="3" rx="1" :fill="'#dc2626'" />
      <rect x="12" y="22" width="12" height="12" rx="2" fill="#ffffff" :stroke="LINE" stroke-width="0.5" />
      <rect x="28" y="22" width="12" height="12" rx="2" fill="#ffffff" :stroke="LINE" stroke-width="0.5" />
      <rect x="44" y="22" width="12" height="12" rx="2" fill="#ffffff" :stroke="LINE" stroke-width="0.5" />
      <rect x="60" y="22" width="12" height="12" rx="2" fill="#ffffff" :stroke="LINE" stroke-width="0.5" />
      <text x="18" y="31.5" text-anchor="middle" font-size="7" font-weight="bold" :fill="DARK">12</text>
      <text x="34" y="31.5" text-anchor="middle" font-size="7" font-weight="bold" :fill="DARK">05</text>
      <text x="50" y="31.5" text-anchor="middle" font-size="7" font-weight="bold" :fill="DARK">30</text>
      <text x="66" y="31.5" text-anchor="middle" font-size="7" font-weight="bold" :fill="DARK">45</text>
    </template>

    <!-- Avis client -->
    <template v-else-if="blockId === 'composite-review'">
      <!-- 5 stars -->
      <text x="22" y="14" font-size="8" :fill="'#f59e0b'">★★★★★</text>
      <rect x="14" y="18" width="52" height="2" rx="1" :fill="LINE" />
      <rect x="18" y="23" width="44" height="2" rx="1" :fill="LINE" />
      <rect x="22" y="28" width="36" height="2" rx="1" :fill="LINE" />
      <circle cx="32" cy="40" r="4" :fill="IMG" />
      <rect x="38" y="38" width="16" height="2" rx="1" :fill="DARK" />
    </template>

    <!-- Télécharger l'app -->
    <template v-else-if="blockId === 'composite-app-download'">
      <rect x="4" y="4" width="72" height="40" rx="3" :fill="BG" />
      <rect x="20" y="8" width="40" height="3" rx="1" :fill="DARK" />
      <rect x="24" y="14" width="32" height="2" rx="1" :fill="LINE" />
      <!-- App Store button -->
      <rect x="10" y="22" width="28" height="14" rx="3" :fill="'#111827'" />
      <rect x="14" y="27" width="20" height="2" rx="1" fill="#ffffff" opacity="0.8" />
      <rect x="16" y="31" width="16" height="1.5" rx="0.75" fill="#ffffff" opacity="0.4" />
      <!-- Google Play button -->
      <rect x="42" y="22" width="28" height="14" rx="3" :fill="'#111827'" />
      <rect x="46" y="27" width="20" height="2" rx="1" fill="#ffffff" opacity="0.8" />
      <rect x="48" y="31" width="16" height="1.5" rx="0.75" fill="#ffffff" opacity="0.4" />
    </template>

    <!-- ═══ FALLBACK: Variable blocks + unknown ═══ -->
    <template v-else-if="blockId.startsWith('variable-')">
      <rect x="12" y="12" width="56" height="24" rx="3" fill="none" :stroke="ACCENT" stroke-width="1" stroke-dasharray="3 2" />
      <text x="40" y="22" text-anchor="middle" font-size="6" :fill="ACCENT" font-family="monospace">{'{'}{'{'}…{'}'}{'}'}</text>
      <rect x="24" y="28" width="32" height="2" rx="1" :fill="ACCENT" opacity="0.3" />
    </template>

    <!-- Fallback: show icon placeholder -->
    <template v-else>
      <rect x="16" y="8" width="48" height="32" rx="3" :fill="BG" :stroke="LINE" stroke-width="0.5" />
      <rect x="24" y="16" width="32" height="3" rx="1" :fill="LINE" />
      <rect x="28" y="24" width="24" height="2" rx="1" :fill="LINE" opacity="0.6" />
    </template>
  </svg>
</template>

<style>
.ebb-block-preview {
  width: 100%;
  height: auto;
  display: block;
}
</style>
