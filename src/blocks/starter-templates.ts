/**
 * Starter Templates — Complete pre-built email documents that users can
 * select as a starting point instead of the blank default.
 *
 * Each template is a factory that returns a fresh EmailDocument with unique IDs.
 */
import type { EmailDocument } from '../types'
import {
  createBody,
  createSection,
  createColumn,
  createText,
  createImage,
  createButton,
  createDivider,
  createSpacer,
  createSocial,
  createSocialElement,
  createHero,
  createWrapper,
} from '../serializer/node-factory'

export interface StarterTemplate {
  id: string
  label: string
  description: string
  icon: string
  /** Color accent for the template card */
  color: string
  factory: () => EmailDocument
}

// ─── Helpers ────────────────────────────────────────────────────

function footerSection() {
  return createSection(
    [
      createColumn([
        createSocial(
          [
            createSocialElement('facebook', 'https://facebook.com/', { 'background-color': '#555555' }),
            createSocialElement('twitter', 'https://twitter.com/', { 'background-color': '#555555' }),
            createSocialElement('instagram', 'https://instagram.com/', { 'background-color': '#555555' }),
            createSocialElement('linkedin', 'https://linkedin.com/', { 'background-color': '#555555' }),
          ],
          { 'font-size': '11px', 'icon-size': '24px', mode: 'horizontal', align: 'center', padding: '0 0 15px 0', color: '#999999' },
        ),
        createText(
          '<p style="margin: 0;">Vous recevez cet email car vous êtes inscrit sur notre plateforme.<br/><a href="#" style="color: #01A8AB; text-decoration: underline;">Se désinscrire</a> &nbsp;|&nbsp; <a href="#" style="color: #01A8AB; text-decoration: underline;">Préférences</a></p>',
          { align: 'center', 'font-size': '11px', color: '#999999', 'line-height': '1.6', padding: '0 20px' },
        ),
        createText(
          '<p style="margin: 0;">&copy; 2026 Votre Entreprise. Tous droits réservés.</p>',
          { align: 'center', 'font-size': '11px', color: '#666666', padding: '10px 0 0 0' },
        ),
      ]),
    ],
    { 'background-color': '#333333', padding: '25px 20px' },
  )
}

function headerSection(logoText = 'LOGO') {
  return createSection(
    [
      createColumn([
        createImage({
          src: `https://via.placeholder.com/150x50/01A8AB/ffffff?text=${encodeURIComponent(logoText)}`,
          alt: 'Logo',
          width: '150px',
          align: 'center',
          padding: '0',
        }),
      ]),
    ],
    { 'background-color': '#ffffff', padding: '20px 0' },
  )
}

// ─── Templates ──────────────────────────────────────────────────

export const STARTER_TEMPLATES: StarterTemplate[] = [
  // 1. Blank
  {
    id: 'blank',
    label: 'Vide',
    description: 'Commencez de zéro',
    icon: 'File',
    color: '#9ca3af',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: '' },
      body: createBody([
        createSection([
          createColumn([
            createText('<p style="margin: 0; text-align: center;">Commencez à construire votre email ici.</p>', {
              align: 'center',
              'font-size': '14px',
              color: '#999999',
            }),
          ]),
        ]),
      ]),
    }),
  },

  // 2. Newsletter
  {
    id: 'newsletter',
    label: 'Newsletter',
    description: 'Actualités et articles',
    icon: 'Newspaper',
    color: '#3b82f6',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Les dernières nouvelles de notre équipe' },
      body: createBody([
        // Header
        headerSection(),
        // Announcement bar
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">📬 Notre newsletter mensuelle — Février 2026</p>', { align: 'center', 'font-size': '13px', color: '#ffffff', padding: '0' }),
          ])],
          { 'background-color': '#01A8AB', padding: '10px 20px' },
        ),
        // Hero
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0;">Les dernières nouvelles</h1>', { align: 'center', 'font-size': '26px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Découvrez nos derniers articles, mises à jour produits et conseils d\'experts.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 40px' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px' },
        ),
        // Featured article
        createSection(
          [
            createColumn(
              [createImage({ src: 'https://via.placeholder.com/280x180/e5e7eb/6b7280?text=Article+1', alt: 'Article', 'border-radius': '8px', padding: '0' })],
              { width: '45%' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px; font-size: 10px; color: #01A8AB; font-weight: bold;">Article vedette</p>', { padding: '0 15px 5px 15px', 'font-size': '10px', color: '#01A8AB' }),
                createText('<h3 style="margin: 0;">Comment optimiser vos campagnes email</h3>', { 'font-size': '18px', color: '#333333', padding: '0 15px 8px 15px' }),
                createText('<p style="margin: 0;">Découvrez les meilleures pratiques pour améliorer vos taux d\'ouverture et de clics...</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 15px 10px 15px' }),
                createButton('Lire la suite', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '13px', 'border-radius': '6px', 'inner-padding': '10px 24px', align: 'left', padding: '0 15px' }),
              ],
              { width: '55%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        createDivider({ 'border-color': '#f3f4f6', padding: '0 40px' }),
        // Two articles
        createSection(
          [
            createColumn(
              [
                createImage({ src: 'https://via.placeholder.com/280x160/e5e7eb/6b7280?text=Article+2', alt: 'Article', 'border-radius': '8px', padding: '0 0 10px 0' }),
                createText('<h4 style="margin: 0;">5 tendances marketing 2026</h4>', { 'font-size': '15px', color: '#333333', padding: '0 5px 5px 5px' }),
                createText('<p style="margin: 0;">Les stratégies qui vont transformer votre approche...</p>', { 'font-size': '12px', color: '#666666', 'line-height': '1.5', padding: '0 5px 10px 5px' }),
                createButton('Lire →', { 'background-color': 'transparent', color: '#01A8AB', 'font-size': '13px', border: '1px solid #01A8AB', 'border-radius': '6px', 'inner-padding': '8px 20px', align: 'left', padding: '0 5px' }),
              ],
              { width: '50%' },
            ),
            createColumn(
              [
                createImage({ src: 'https://via.placeholder.com/280x160/e5e7eb/6b7280?text=Article+3', alt: 'Article', 'border-radius': '8px', padding: '0 0 10px 0' }),
                createText('<h4 style="margin: 0;">Guide : segmentation avancée</h4>', { 'font-size': '15px', color: '#333333', padding: '0 5px 5px 5px' }),
                createText('<p style="margin: 0;">Apprenez à cibler précisément vos audiences...</p>', { 'font-size': '12px', color: '#666666', 'line-height': '1.5', padding: '0 5px 10px 5px' }),
                createButton('Lire →', { 'background-color': 'transparent', color: '#01A8AB', 'font-size': '13px', border: '1px solid #01A8AB', 'border-radius': '6px', 'inner-padding': '8px 20px', align: 'left', padding: '0 5px' }),
              ],
              { width: '50%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Footer
        footerSection(),
      ]),
    }),
  },

  // 3. Promotion / Vente
  {
    id: 'promotion',
    label: 'Promotion',
    description: 'Offre commerciale',
    icon: 'Percent',
    color: '#dc2626',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Offre exceptionnelle -30% sur tout le site !' },
      body: createBody([
        // Announcement
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">🔥 Offre limitée — Fin dans 48h !</p>', { align: 'center', 'font-size': '13px', color: '#ffffff', padding: '0' }),
          ])],
          { 'background-color': '#dc2626', padding: '10px 20px' },
        ),
        // Header
        headerSection(),
        // Hero
        createSection(
          [createColumn([
            createSpacer({ height: '10px' }),
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px;">Offre exclusive</p>', { align: 'center', 'font-size': '12px', color: '#dc2626', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0; font-size: 42px;">-30%</h1>', { align: 'center', 'font-size': '42px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0; font-size: 20px;">sur toute la collection</p>', { align: 'center', 'font-size': '20px', color: '#666666', padding: '0 0 20px 0' }),
            createText('<p style="margin: 0; font-weight: bold; letter-spacing: 4px; font-size: 22px; color: #01A8AB;">MESAGOO30</p>', { align: 'center', 'font-size': '22px', color: '#01A8AB', padding: '10px 0 20px 0' }),
            createButton("J'en profite maintenant", {
              'background-color': '#dc2626',
              color: '#ffffff',
              'font-size': '16px',
              'border-radius': '6px',
              'inner-padding': '16px 40px',
              'font-weight': 'bold',
            }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        // Products
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center;">Nos meilleures ventes</h2>', { align: 'center', 'font-size': '22px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0; text-align: center;">Les favoris de nos clients</p>', { align: 'center', 'font-size': '14px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#f8f9fa', padding: '25px 20px 10px 20px' },
        ),
        createSection(
          [
            createColumn([
              createImage({ src: 'https://via.placeholder.com/180x180/ffffff/6b7280?text=Produit+1', alt: 'Produit', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Article tendance</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #999;">59,99 €</span> <strong style="color: #dc2626;">41,99 €</strong></p>', { align: 'center', 'font-size': '14px', padding: '0 5px 8px 5px' }),
              createButton('Voir', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 20px', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://via.placeholder.com/180x180/ffffff/6b7280?text=Produit+2', alt: 'Produit', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Best-seller</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #999;">89,99 €</span> <strong style="color: #dc2626;">62,99 €</strong></p>', { align: 'center', 'font-size': '14px', padding: '0 5px 8px 5px' }),
              createButton('Voir', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 20px', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://via.placeholder.com/180x180/ffffff/6b7280?text=Produit+3', alt: 'Produit', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Nouveauté</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #999;">49,99 €</span> <strong style="color: #dc2626;">34,99 €</strong></p>', { align: 'center', 'font-size': '14px', padding: '0 5px 8px 5px' }),
              createButton('Voir', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 20px', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f8f9fa', padding: '10px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Utilisez le code <strong>MESAGOO30</strong> avant le 28 février.</p>', { align: 'center', 'font-size': '14px', color: '#666666', padding: '0 0 15px 0' }),
            createButton('Voir toute la collection', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '15px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#f8f9fa', padding: '20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 4. Bienvenue
  {
    id: 'welcome',
    label: 'Bienvenue',
    description: 'Accueil nouveau client',
    icon: 'PartyPopper',
    color: '#01A8AB',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Bienvenue ! Nous sommes ravis de vous compter parmi nous.' },
      body: createBody([
        headerSection(),
        // Welcome hero
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0;">Bienvenue ! 🎉</h1>', { align: 'center', 'font-size': '28px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Merci de nous avoir rejoints. Nous sommes ravis de vous compter parmi notre communauté.</p>', { align: 'center', 'font-size': '16px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
            createImage({ src: 'https://via.placeholder.com/500x200/e0f7fa/01A8AB?text=Bienvenue', alt: 'Bienvenue', 'border-radius': '8px', padding: '0 20px' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px' },
        ),
        // Steps
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center;">Pour commencer</h2>', { align: 'center', 'font-size': '20px', color: '#333333', padding: '0 0 20px 0' }),
          ])],
          { 'background-color': '#f8f9fa', padding: '25px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; text-align: center;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 32px; height: 32px; line-height: 32px; border-radius: 50%; font-weight: bold;">1</span></p>', { align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Complétez votre profil</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 10px 5px 10px' }),
              createText('<p style="margin: 0;">Ajoutez vos informations pour personnaliser votre expérience.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 32px; height: 32px; line-height: 32px; border-radius: 50%; font-weight: bold;">2</span></p>', { align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Explorez les fonctionnalités</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 10px 5px 10px' }),
              createText('<p style="margin: 0;">Découvrez tous les outils à votre disposition.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 32px; height: 32px; line-height: 32px; border-radius: 50%; font-weight: bold;">3</span></p>', { align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Lancez-vous</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 10px 5px 10px' }),
              createText('<p style="margin: 0;">Créez votre première campagne en quelques minutes.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f8f9fa', padding: '5px 10px 25px 10px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Accéder à mon compte', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 5. Transactionnel (confirmation commande)
  {
    id: 'order-confirmation',
    label: 'Confirmation',
    description: 'Confirmation de commande',
    icon: 'CheckCircle',
    color: '#16a34a',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Votre commande a été confirmée !' },
      body: createBody([
        headerSection(),
        // Confirmation
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 48px;">✅</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Commande confirmée !</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Merci pour votre achat. Votre commande <strong>#12345</strong> est en cours de traitement.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 15px 20px' },
        ),
        // Order details
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 12px;">Détails de la commande</p>', { 'font-size': '12px', color: '#999999', padding: '0 0 12px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '10px 25px 0 25px' },
        ),
        createSection(
          [
            createColumn([createImage({ src: 'https://via.placeholder.com/80x80/f3f4f6/6b7280?text=A', alt: 'Produit', width: '60px', padding: '0' })], { width: '15%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Article premium</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Quantité : 2</p>', { 'font-size': '12px', color: '#999999', padding: '0' }),
            ], { width: '55%', 'vertical-align': 'middle' }),
            createColumn([createText('<p style="margin: 0; text-align: right; font-weight: bold;">99,98 €</p>', { 'font-size': '14px', color: '#333333', align: 'right', padding: '0' })], { width: '30%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '8px 25px' },
        ),
        createSection(
          [createColumn([createDivider({ 'border-color': '#e5e7eb', 'border-width': '1px', padding: '8px 0' })])],
          { 'background-color': '#ffffff', padding: '0 25px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0;">Sous-total</p>', { 'font-size': '13px', color: '#666666', padding: '0' }),
              createText('<p style="margin: 0;">Livraison</p>', { 'font-size': '13px', color: '#666666', padding: '4px 0 0 0' }),
              createText('<p style="margin: 0; font-weight: bold; font-size: 16px;">Total</p>', { 'font-size': '16px', color: '#333333', padding: '10px 0 0 0' }),
            ], { width: '60%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: right;">99,98 €</p>', { 'font-size': '13px', color: '#666666', align: 'right', padding: '0' }),
              createText('<p style="margin: 0; text-align: right; color: #16a34a;">Gratuite</p>', { 'font-size': '13px', color: '#16a34a', align: 'right', padding: '4px 0 0 0' }),
              createText('<p style="margin: 0; text-align: right; font-weight: bold; font-size: 16px;">99,98 €</p>', { 'font-size': '16px', color: '#333333', align: 'right', padding: '10px 0 0 0' }),
            ], { width: '40%' }),
          ],
          { 'background-color': '#ffffff', padding: '5px 25px 20px 25px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Suivre ma commande', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '15px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#f8f9fa', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 6. Événement / Invitation
  {
    id: 'event',
    label: 'Événement',
    description: 'Invitation à un événement',
    icon: 'CalendarDays',
    color: '#7c3aed',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Vous êtes invité à notre prochain événement !' },
      body: createBody([
        headerSection(),
        // Hero
        createHero(
          [
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Invitation</p>', { align: 'center', 'font-size': '12px', color: 'rgba(255,255,255,0.7)', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Conférence Annuelle 2026</h1>', { align: 'center', 'font-size': '28px', color: '#ffffff', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0;">📅 15 Mars 2026 &nbsp;|&nbsp; 📍 Paris, France &nbsp;|&nbsp; ⏰ 09:00 - 18:00</p>', { align: 'center', 'font-size': '14px', color: 'rgba(255,255,255,0.85)', padding: '0 0 25px 0' }),
            createButton("S'inscrire", { 'background-color': '#ffffff', color: '#7c3aed', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ],
          { 'background-color': '#7c3aed', 'background-height': '350px', 'background-width': '600px', padding: '50px 20px' },
        ),
        // Details
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center;">Au programme</h2>', { align: 'center', 'font-size': '20px', color: '#333333', padding: '0 0 20px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; color: #7c3aed;">09:00</p>', { 'font-size': '13px', color: '#7c3aed', padding: '0 10px 2px 10px' }),
              createText('<p style="margin: 0; font-weight: bold;">Keynote d\'ouverture</p>', { 'font-size': '14px', color: '#333333', padding: '0 10px 3px 10px' }),
              createText('<p style="margin: 0;">Présentation de la vision et des grandes annonces.</p>', { 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '50%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; color: #7c3aed;">14:00</p>', { 'font-size': '13px', color: '#7c3aed', padding: '0 10px 2px 10px' }),
              createText('<p style="margin: 0; font-weight: bold;">Ateliers pratiques</p>', { 'font-size': '14px', color: '#333333', padding: '0 10px 3px 10px' }),
              createText('<p style="margin: 0;">Sessions interactives avec nos experts.</p>', { 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '50%' }),
          ],
          { 'background-color': '#ffffff', padding: '5px 15px 25px 15px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Places limitées — Inscrivez-vous dès maintenant.</p>', { align: 'center', 'font-size': '14px', color: '#666666', padding: '0 0 15px 0' }),
            createButton('Réserver ma place', { 'background-color': '#7c3aed', color: '#ffffff', 'font-size': '15px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#f5f3ff', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 7. Notification / Alerte
  {
    id: 'notification',
    label: 'Notification',
    description: 'Alerte ou mise à jour',
    icon: 'Bell',
    color: '#f59e0b',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Action requise sur votre compte' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 40px;">🔔</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h2 style="margin: 0;">Action requise</h2>', { align: 'center', 'font-size': '22px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Une mise à jour importante nécessite votre attention. Veuillez vérifier les détails ci-dessous et prendre les mesures nécessaires.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 5px 20px' },
        ),
        // Info box
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: bold;">Détails de la notification</p>', { 'font-size': '15px', color: '#92400e', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">Votre période d\'essai expire dans <strong>3 jours</strong>. Pour continuer à utiliser toutes les fonctionnalités, mettez à jour votre abonnement.</p>', { 'font-size': '14px', color: '#78350f', 'line-height': '1.6', padding: '0 0 15px 0' }),
            createButton('Mettre à jour', { 'background-color': '#f59e0b', color: '#ffffff', 'font-size': '14px', 'border-radius': '6px', 'inner-padding': '12px 28px', 'font-weight': 'bold', align: 'left' }),
          ])],
          { 'background-color': '#fffbeb', padding: '20px 25px', border: '1px solid #fde68a', 'border-radius': '8px' },
        ),
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Si vous avez des questions, contactez-nous à <a href="mailto:support@mesagoo.com" style="color: #01A8AB;">support@mesagoo.com</a></p>', { align: 'center', 'font-size': '13px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 8. Réinitialisation mot de passe
  {
    id: 'password-reset',
    label: 'Mot de passe',
    description: 'Réinitialisation du mot de passe',
    icon: 'KeyRound',
    color: '#6366f1',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Réinitialisez votre mot de passe' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 40px;">🔐</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h2 style="margin: 0;">Réinitialisation du mot de passe</h2>', { align: 'center', 'font-size': '22px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 20px 20px 20px' }),
            createButton('Réinitialiser le mot de passe', { 'background-color': '#6366f1', color: '#ffffff', 'font-size': '15px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
            createText('<p style="margin: 0;">Ce lien expire dans 24 heures.</p>', { align: 'center', 'font-size': '12px', color: '#999999', padding: '15px 0 0 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        createSection(
          [createColumn([
            createDivider({ 'border-color': '#f3f4f6', 'border-width': '1px', padding: '0 60px' }),
            createText('<p style="margin: 0;">Si vous n\'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.</p>', { align: 'center', 'font-size': '12px', color: '#999999', 'line-height': '1.5', padding: '15px 30px 0 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 20px 20px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 9. Panier abandonné
  {
    id: 'abandoned-cart',
    label: 'Panier abandonné',
    description: 'Récupération de panier',
    icon: 'ShoppingCart',
    color: '#ea580c',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Vous avez oublié quelque chose dans votre panier !' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 40px;">🛒</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Vous avez oublié quelque chose !</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Vous avez des articles dans votre panier qui n\'attendent que vous. Finalisez votre commande avant qu\'ils ne soient plus disponibles.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Cart items
        createSection(
          [
            createColumn([createImage({ src: 'https://via.placeholder.com/100x100/f3f4f6/6b7280?text=1', alt: 'Produit', width: '80px', padding: '0', 'border-radius': '8px' })], { width: '20%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Article premium</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Taille : M &bull; Couleur : Bleu</p>', { 'font-size': '12px', color: '#999999', padding: '0' }),
            ], { width: '50%', 'vertical-align': 'middle' }),
            createColumn([createText('<p style="margin: 0; text-align: right; font-weight: bold;">49,99 €</p>', { 'font-size': '15px', color: '#333333', align: 'right', padding: '0' })], { width: '30%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '10px 25px' },
        ),
        createSection(
          [createColumn([createDivider({ 'border-color': '#f3f4f6', 'border-width': '1px', padding: '0' })])],
          { 'background-color': '#ffffff', padding: '0 25px' },
        ),
        createSection(
          [
            createColumn([createImage({ src: 'https://via.placeholder.com/100x100/f3f4f6/6b7280?text=2', alt: 'Produit', width: '80px', padding: '0', 'border-radius': '8px' })], { width: '20%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Accessoire classique</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Quantité : 1</p>', { 'font-size': '12px', color: '#999999', padding: '0' }),
            ], { width: '50%', 'vertical-align': 'middle' }),
            createColumn([createText('<p style="margin: 0; text-align: right; font-weight: bold;">29,99 €</p>', { 'font-size': '15px', color: '#333333', align: 'right', padding: '0' })], { width: '30%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '10px 25px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Finaliser ma commande', { 'background-color': '#ea580c', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '16px 40px', 'font-weight': 'bold' }),
            createText('<p style="margin: 0;">Votre panier expire dans <strong>24 heures</strong></p>', { align: 'center', 'font-size': '12px', color: '#999999', padding: '12px 0 0 0' }),
          ])],
          { 'background-color': '#fff7ed', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 10. Lancement produit
  {
    id: 'product-launch',
    label: 'Lancement produit',
    description: 'Annonce de nouveau produit',
    icon: 'Rocket',
    color: '#0891b2',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Découvrez notre dernière innovation !' },
      body: createBody([
        headerSection(),
        // Hero
        createHero(
          [
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px;">Nouveau</p>', { align: 'center', 'font-size': '12px', color: 'rgba(255,255,255,0.7)', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0; font-size: 32px;">Introducing Product X</h1>', { align: 'center', 'font-size': '32px', color: '#ffffff', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">La prochaine génération de notre technologie phare. Plus rapide, plus intelligent, plus puissant.</p>', { align: 'center', 'font-size': '16px', color: 'rgba(255,255,255,0.85)', 'line-height': '1.5', padding: '0 30px 25px 30px' }),
            createButton('Découvrir', { 'background-color': '#ffffff', color: '#0891b2', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 40px', 'font-weight': 'bold' }),
          ],
          { 'background-color': '#0891b2', 'background-height': '380px', padding: '50px 20px' },
        ),
        // Features
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center;">Pourquoi vous allez l\'adorer</h2>', { align: 'center', 'font-size': '22px', color: '#333333', padding: '0 0 25px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 28px;">⚡</p>', { align: 'center', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Ultra rapide</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 10px 5px 10px' }),
              createText('<p style="margin: 0;">Performance multipliée par 3 par rapport à la version précédente.</p>', { align: 'center', 'font-size': '12px', color: '#666666', 'line-height': '1.5', padding: '0 10px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 28px;">🎨</p>', { align: 'center', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Design repensé</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 10px 5px 10px' }),
              createText('<p style="margin: 0;">Interface intuitive et moderne pour une expérience fluide.</p>', { align: 'center', 'font-size': '12px', color: '#666666', 'line-height': '1.5', padding: '0 10px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 28px;">🔒</p>', { align: 'center', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Sécurité renforcée</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 10px 5px 10px' }),
              createText('<p style="margin: 0;">Protection avancée et chiffrement de bout en bout.</p>', { align: 'center', 'font-size': '12px', color: '#666666', 'line-height': '1.5', padding: '0 10px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#ffffff', padding: '5px 15px 25px 15px' },
        ),
        // Product image
        createSection(
          [createColumn([
            createImage({ src: 'https://via.placeholder.com/520x260/e0f2fe/0891b2?text=Product+X', alt: 'Product X', 'border-radius': '12px', padding: '0 20px' }),
          ])],
          { 'background-color': '#ffffff', padding: '10px 20px 30px 20px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Disponible dès maintenant. Offre de lancement -20%.</p>', { align: 'center', 'font-size': '14px', color: '#666666', padding: '0 0 15px 0' }),
            createButton('Commander maintenant', { 'background-color': '#0891b2', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#f0f9ff', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 11. Enquête / Feedback
  {
    id: 'survey',
    label: 'Enquête',
    description: 'Satisfaction client',
    icon: 'MessageSquare',
    color: '#059669',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Votre avis compte ! Donnez-nous votre retour.' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 40px;">💬</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Votre avis nous intéresse</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Aidez-nous à améliorer nos services en répondant à cette courte enquête. Cela ne prendra que 2 minutes !</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 25px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Rating
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: bold;">Comment évaluez-vous votre expérience ?</p>', { align: 'center', 'font-size': '15px', color: '#333333', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; font-size: 36px; letter-spacing: 8px;">⭐⭐⭐⭐⭐</p>', { align: 'center', padding: '0 0 20px 0' }),
          ])],
          { 'background-color': '#f0fdf4', padding: '25px 20px', 'border-radius': '8px' },
        ),
        createSection(
          [createColumn([
            createButton('Répondre à l\'enquête', { 'background-color': '#059669', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
            createText('<p style="margin: 0;">En remerciement, recevez <strong>10% de réduction</strong> sur votre prochain achat.</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '15px 20px 0 20px' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 12. Parrainage
  {
    id: 'referral',
    label: 'Parrainage',
    description: 'Programme de parrainage',
    icon: 'Users',
    color: '#8b5cf6',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Parrainez vos amis et gagnez des récompenses !' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 40px;">🎁</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Parrainez, gagnez !</h1>', { align: 'center', 'font-size': '26px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Invitez vos amis à nous rejoindre et recevez des récompenses exclusives pour chaque parrainage réussi.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // How it works
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; text-align: center;"><span style="display: inline-block; background: #8b5cf6; color: #fff; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; font-weight: bold; font-size: 16px;">1</span></p>', { align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Partagez</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Envoyez votre lien unique à vos amis.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center;"><span style="display: inline-block; background: #8b5cf6; color: #fff; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; font-weight: bold; font-size: 16px;">2</span></p>', { align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Ils s\'inscrivent</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Votre ami crée son compte gratuitement.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center;"><span style="display: inline-block; background: #8b5cf6; color: #fff; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; font-weight: bold; font-size: 16px;">3</span></p>', { align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Gagnez</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Vous recevez 15€ de crédit chacun.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#faf5ff', padding: '25px 15px' },
        ),
        // Referral code
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Votre code de parrainage :</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-weight: bold; letter-spacing: 4px; font-size: 24px; color: #8b5cf6;">PARRAIN2026</p>', { align: 'center', 'font-size': '24px', color: '#8b5cf6', padding: '0 0 15px 0' }),
            createButton('Partager maintenant', { 'background-color': '#8b5cf6', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 13. Réengagement
  {
    id: 're-engagement',
    label: 'Réengagement',
    description: 'Reconquérir les inactifs',
    icon: 'HeartHandshake',
    color: '#e11d48',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Vous nous manquez ! Revenez avec une offre spéciale.' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 40px;">💔</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Vous nous manquez !</h1>', { align: 'center', 'font-size': '26px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Cela fait un moment que nous n\'avons pas eu de vos nouvelles. Nous avons de belles choses à vous montrer !</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Special offer
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Offre de retour exclusive</p>', { align: 'center', 'font-size': '11px', color: '#e11d48', padding: '0 0 8px 0' }),
            createText('<h2 style="margin: 0; font-size: 38px;">-25%</h2>', { align: 'center', 'font-size': '38px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">sur votre prochaine commande</p>', { align: 'center', 'font-size': '16px', color: '#666666', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: bold; letter-spacing: 3px; color: #e11d48;">COMEBACK25</p>', { align: 'center', 'font-size': '20px', color: '#e11d48', padding: '10px 0 20px 0' }),
            createButton('Revenir maintenant', { 'background-color': '#e11d48', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 40px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#fff1f2', padding: '30px 20px', 'border-radius': '8px' },
        ),
        // What's new
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0; text-align: center;">Ce que vous avez raté</h3>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 24px;">🆕</p>', { align: 'center', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Nouvelle collection</p>', { align: 'center', 'font-size': '13px', color: '#333333', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">Plus de 50 nouveaux articles.</p>', { align: 'center', 'font-size': '11px', color: '#666666', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 24px;">🚚</p>', { align: 'center', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Livraison gratuite</p>', { align: 'center', 'font-size': '13px', color: '#333333', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">Sur toutes les commandes.</p>', { align: 'center', 'font-size': '11px', color: '#666666', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 24px;">⭐</p>', { align: 'center', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Programme fidélité</p>', { align: 'center', 'font-size': '13px', color: '#333333', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">Cumulez des points bonus.</p>', { align: 'center', 'font-size': '11px', color: '#666666', padding: '0 5px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#ffffff', padding: '5px 15px 25px 15px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 14. Webinaire
  {
    id: 'webinar',
    label: 'Webinaire',
    description: 'Invitation webinaire',
    icon: 'Video',
    color: '#2563eb',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Rejoignez notre webinaire gratuit !' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; text-align: center;">Webinaire gratuit</p>', { align: 'center', 'font-size': '11px', color: '#2563eb', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Maîtrisez l\'email marketing en 2026</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Rejoignez nos experts pour une session live de 60 minutes remplie de stratégies concrètes et de cas pratiques.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Event details
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; color: #2563eb;">📅 Date</p>', { 'font-size': '13px', color: '#2563eb', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Jeudi 20 Mars 2026</p>', { 'font-size': '14px', color: '#333333', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; color: #2563eb;">⏰ Heure</p>', { 'font-size': '13px', color: '#2563eb', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">14h00 - 15h00 (CET)</p>', { 'font-size': '14px', color: '#333333', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; color: #2563eb;">📍 Lieu</p>', { 'font-size': '13px', color: '#2563eb', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">En ligne (Zoom)</p>', { 'font-size': '14px', color: '#333333', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#eff6ff', padding: '20px 15px', 'border-radius': '8px' },
        ),
        // Speaker
        createSection(
          [
            createColumn([createImage({ src: 'https://via.placeholder.com/100x100/e5e7eb/6b7280?text=Speaker', alt: 'Intervenant', width: '80px', 'border-radius': '50%', padding: '0' })], { width: '20%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Marie Dupont</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Directrice Marketing, 15 ans d\'expérience en email marketing et automatisation.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0' }),
            ], { width: '80%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '20px 25px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('S\'inscrire gratuitement', { 'background-color': '#2563eb', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
            createText('<p style="margin: 0;">Places limitées à 200 participants</p>', { align: 'center', 'font-size': '12px', color: '#999999', padding: '10px 0 0 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '15px 20px 25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 15. Reçu de paiement
  {
    id: 'receipt',
    label: 'Reçu',
    description: 'Reçu de paiement',
    icon: 'Receipt',
    color: '#0d9488',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Votre reçu de paiement' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 40px;">🧾</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h2 style="margin: 0;">Reçu de paiement</h2>', { align: 'center', 'font-size': '22px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Transaction #TXN-2026-0001</p>', { align: 'center', 'font-size': '13px', color: '#999999', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px 10px 20px' },
        ),
        // Receipt details
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; color: #999;">Description</p>', { 'font-size': '11px', color: '#999999', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0;">Plan Professionnel</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0;">Période : Mars 2026</p>', { 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '60%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; color: #999; text-align: right;">Montant</p>', { 'font-size': '11px', color: '#999999', align: 'right', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; text-align: right; font-weight: bold; font-size: 22px;">49,00 €</p>', { 'font-size': '22px', color: '#333333', align: 'right', padding: '0' }),
            ], { width: '40%' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        createSection(
          [createColumn([createDivider({ 'border-color': '#e5e7eb', 'border-width': '1px', padding: '0' })])],
          { 'background-color': '#ffffff', padding: '0 25px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; color: #666;">Sous-total</p>', { 'font-size': '13px', color: '#666666', padding: '0' }),
              createText('<p style="margin: 0; color: #666;">TVA (20%)</p>', { 'font-size': '13px', color: '#666666', padding: '4px 0 0 0' }),
              createText('<p style="margin: 0; font-weight: bold; font-size: 15px; margin-top: 8px;">Total TTC</p>', { 'font-size': '15px', color: '#333333', padding: '8px 0 0 0' }),
            ], { width: '60%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: right;">40,83 €</p>', { 'font-size': '13px', color: '#666666', align: 'right', padding: '0' }),
              createText('<p style="margin: 0; text-align: right;">8,17 €</p>', { 'font-size': '13px', color: '#666666', align: 'right', padding: '4px 0 0 0' }),
              createText('<p style="margin: 0; text-align: right; font-weight: bold; font-size: 15px;">49,00 €</p>', { 'font-size': '15px', color: '#333333', align: 'right', padding: '8px 0 0 0' }),
            ], { width: '40%' }),
          ],
          { 'background-color': '#ffffff', padding: '10px 25px 20px 25px' },
        ),
        // Payment info
        createSection(
          [createColumn([
            createText('<p style="margin: 0;"><strong>Mode de paiement :</strong> Visa •••• 4242</p>', { 'font-size': '12px', color: '#666666', padding: '0 0 3px 0' }),
            createText('<p style="margin: 0;"><strong>Date :</strong> 25 février 2026</p>', { 'font-size': '12px', color: '#666666', padding: '0' }),
          ])],
          { 'background-color': '#f8f9fa', padding: '15px 25px', 'border-radius': '8px' },
        ),
        createSection(
          [createColumn([
            createButton('Télécharger la facture PDF', { 'background-color': '#0d9488', color: '#ffffff', 'font-size': '14px', 'border-radius': '6px', 'inner-padding': '12px 28px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 16. Expédition
  {
    id: 'shipping',
    label: 'Expédition',
    description: 'Confirmation d\'expédition',
    icon: 'Truck',
    color: '#0284c7',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Votre commande est en route !' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 40px;">📦</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Votre colis est en route !</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Bonne nouvelle ! Votre commande <strong>#12345</strong> a été expédiée et est en chemin vers vous.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Tracking steps
        createSection(
          [createColumn([
            createText('<p style="margin: 0;"><span style="color: #16a34a; font-weight: bold;">✓</span> Commande confirmée</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;"><span style="color: #16a34a; font-weight: bold;">✓</span> Préparation terminée</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;"><span style="color: #0284c7; font-weight: bold;">●</span> <strong>En transit</strong></p>', { 'font-size': '14px', color: '#0284c7', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;"><span style="color: #d1d5db;">○</span> <span style="color: #999;">Livré</span></p>', { 'font-size': '14px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#f0f9ff', padding: '20px 30px', 'border-radius': '8px' },
        ),
        // Shipping details
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Transporteur</p>', { 'font-size': '11px', color: '#999999', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Colissimo</p>', { 'font-size': '14px', color: '#333333', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999;">N° de suivi</p>', { 'font-size': '11px', color: '#999999', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">8R 123 456 789 0</p>', { 'font-size': '14px', color: '#333333', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Livraison estimée</p>', { 'font-size': '11px', color: '#999999', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">27-28 février</p>', { 'font-size': '14px', color: '#333333', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#ffffff', padding: '20px 20px' },
        ),
        createSection(
          [createColumn([
            createButton('Suivre mon colis', { 'background-color': '#0284c7', color: '#ffffff', 'font-size': '15px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#ffffff', padding: '5px 20px 25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 17. Anniversaire
  {
    id: 'birthday',
    label: 'Anniversaire',
    description: 'Voeux d\'anniversaire',
    icon: 'Cake',
    color: '#ec4899',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Joyeux anniversaire ! Un cadeau vous attend 🎂' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 48px;">🎂</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Joyeux anniversaire !</h1>', { align: 'center', 'font-size': '28px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Toute l\'équipe vous souhaite un merveilleux anniversaire. Pour célébrer cette journée spéciale, nous avons un petit cadeau pour vous !</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Gift
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 36px;">🎁</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Votre cadeau</p>', { align: 'center', 'font-size': '11px', color: '#ec4899', padding: '0 0 8px 0' }),
            createText('<h2 style="margin: 0; font-size: 36px;">-30%</h2>', { align: 'center', 'font-size': '36px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">sur tout le site, rien que pour vous !</p>', { align: 'center', 'font-size': '15px', color: '#666666', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: bold; letter-spacing: 3px; color: #ec4899;">BIRTHDAY30</p>', { align: 'center', 'font-size': '22px', color: '#ec4899', padding: '10px 0 20px 0' }),
            createButton('Ouvrir mon cadeau', { 'background-color': '#ec4899', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 40px', 'font-weight': 'bold' }),
            createText('<p style="margin: 0;">Valable pendant 7 jours</p>', { align: 'center', 'font-size': '12px', color: '#999999', padding: '10px 0 0 0' }),
          ])],
          { 'background-color': '#fdf2f8', padding: '30px 20px', 'border-radius': '8px' },
        ),
        createSpacer({ height: '10px' }),
        footerSection(),
      ]),
    }),
  },

  // 18. Soldes saisonnières
  {
    id: 'seasonal-sale',
    label: 'Soldes',
    description: 'Promotions saisonnières',
    icon: 'Snowflake',
    color: '#1d4ed8',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Les soldes sont là ! Jusqu\'à -50% sur une sélection.' },
      body: createBody([
        // Top banner
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">❄️ SOLDES D\'HIVER — Jusqu\'à -50% ❄️</p>', { align: 'center', 'font-size': '13px', color: '#ffffff', 'font-weight': 'bold', padding: '0' }),
          ])],
          { 'background-color': '#1d4ed8', padding: '10px 20px' },
        ),
        headerSection(),
        // Hero
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px;">Soldes d\'hiver</p>', { align: 'center', 'font-size': '12px', color: '#1d4ed8', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0; font-size: 40px;">-50%</h1>', { align: 'center', 'font-size': '40px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0; font-size: 18px;">sur des centaines d\'articles</p>', { align: 'center', 'font-size': '18px', color: '#666666', padding: '0 0 20px 0' }),
            createButton('Voir les offres', { 'background-color': '#1d4ed8', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '16px 40px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        // Categories
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0; text-align: center;">Par catégorie</h3>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#f8f9fa', padding: '25px 20px 10px 20px' },
        ),
        createSection(
          [
            createColumn([
              createImage({ src: 'https://via.placeholder.com/180x120/dbeafe/1d4ed8?text=Mode', alt: 'Mode', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Mode</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; color: #1d4ed8; font-weight: bold;">Jusqu\'à -50%</p>', { align: 'center', 'font-size': '13px', color: '#1d4ed8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://via.placeholder.com/180x120/dbeafe/1d4ed8?text=Maison', alt: 'Maison', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Maison</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; color: #1d4ed8; font-weight: bold;">Jusqu\'à -40%</p>', { align: 'center', 'font-size': '13px', color: '#1d4ed8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://via.placeholder.com/180x120/dbeafe/1d4ed8?text=Tech', alt: 'Tech', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Tech</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; color: #1d4ed8; font-weight: bold;">Jusqu\'à -30%</p>', { align: 'center', 'font-size': '13px', color: '#1d4ed8', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f8f9fa', padding: '5px 15px 25px 15px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 19. Onboarding SaaS
  {
    id: 'saas-onboarding',
    label: 'Onboarding',
    description: 'Onboarding application SaaS',
    icon: 'GraduationCap',
    color: '#7c3aed',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Votre guide de démarrage rapide' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0;">Démarrez en 5 minutes 🚀</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Votre compte est prêt ! Suivez ces étapes simples pour tirer le meilleur de votre nouvel outil.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Step 1
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0;"><span style="display: inline-block; background: #7c3aed; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; font-weight: bold; text-align: center;">1</span></p>', { padding: '5px 0 0 0' }),
            ], { width: '10%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Complétez votre profil</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Ajoutez votre logo, vos couleurs et vos informations d\'entreprise pour personnaliser l\'expérience.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 0 8px 0' }),
              createButton('Compléter le profil →', { 'background-color': 'transparent', color: '#7c3aed', 'font-size': '13px', border: '1px solid #7c3aed', 'border-radius': '6px', 'inner-padding': '8px 20px', align: 'left', padding: '0' }),
            ], { width: '90%' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        createSection([createColumn([createDivider({ 'border-color': '#f3f4f6', padding: '0 30px' })])], { 'background-color': '#ffffff', padding: '5px 25px' }),
        // Step 2
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0;"><span style="display: inline-block; background: #7c3aed; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; font-weight: bold; text-align: center;">2</span></p>', { padding: '5px 0 0 0' }),
            ], { width: '10%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Importez vos contacts</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Uploadez votre fichier CSV ou connectez votre CRM pour synchroniser automatiquement.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 0 8px 0' }),
              createButton('Importer les contacts →', { 'background-color': 'transparent', color: '#7c3aed', 'font-size': '13px', border: '1px solid #7c3aed', 'border-radius': '6px', 'inner-padding': '8px 20px', align: 'left', padding: '0' }),
            ], { width: '90%' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        createSection([createColumn([createDivider({ 'border-color': '#f3f4f6', padding: '0 30px' })])], { 'background-color': '#ffffff', padding: '5px 25px' }),
        // Step 3
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0;"><span style="display: inline-block; background: #7c3aed; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; font-weight: bold; text-align: center;">3</span></p>', { padding: '5px 0 0 0' }),
            ], { width: '10%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Créez votre première campagne</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Choisissez un template, personnalisez-le et envoyez votre premier email en quelques clics.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 0 8px 0' }),
              createButton('Créer une campagne →', { 'background-color': 'transparent', color: '#7c3aed', 'font-size': '13px', border: '1px solid #7c3aed', 'border-radius': '6px', 'inner-padding': '8px 20px', align: 'left', padding: '0' }),
            ], { width: '90%' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px 20px 25px' },
        ),
        // Help
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Besoin d\'aide ? Consultez notre <a href="#" style="color: #7c3aed;">centre d\'aide</a> ou écrivez-nous à <a href="mailto:support@mesagoo.com" style="color: #7c3aed;">support@mesagoo.com</a>.</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '0' }),
          ])],
          { 'background-color': '#f5f3ff', padding: '20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 20. Témoignages / Social proof
  {
    id: 'testimonials',
    label: 'Témoignages',
    description: 'Avis et témoignages clients',
    icon: 'Star',
    color: '#d97706',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Découvrez ce que nos clients disent de nous' },
      body: createBody([
        headerSection(),
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0;">Ils nous font confiance</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Rejoignez plus de 10 000 entreprises qui utilisent notre solution au quotidien.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Testimonial 1
        createSection(
          [
            createColumn([createImage({ src: 'https://via.placeholder.com/80x80/e5e7eb/6b7280?text=JD', alt: 'Jean Dupont', width: '60px', 'border-radius': '50%', padding: '0' })], { width: '15%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0;">⭐⭐⭐⭐⭐</p>', { 'font-size': '14px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-style: italic;">"Outil incroyable ! Nos taux d\'ouverture ont augmenté de 40% en 3 mois. L\'interface est intuitive et le support client est exceptionnel."</p>', { 'font-size': '14px', color: '#333333', 'line-height': '1.6', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0;"><strong>Jean Dupont</strong> — Directeur Marketing, TechCorp</p>', { 'font-size': '12px', color: '#999999', padding: '0' }),
            ], { width: '85%' }),
          ],
          { 'background-color': '#fffbeb', padding: '20px', 'border-radius': '8px' },
        ),
        createSpacer({ height: '10px' }),
        // Testimonial 2
        createSection(
          [
            createColumn([createImage({ src: 'https://via.placeholder.com/80x80/e5e7eb/6b7280?text=ML', alt: 'Marie Lefebvre', width: '60px', 'border-radius': '50%', padding: '0' })], { width: '15%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0;">⭐⭐⭐⭐⭐</p>', { 'font-size': '14px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-style: italic;">"La meilleure solution email que nous avons testée. Simple, puissant et abordable. Nous avons abandonné Mailchimp pour cette solution !"</p>', { 'font-size': '14px', color: '#333333', 'line-height': '1.6', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0;"><strong>Marie Lefebvre</strong> — CEO, StartupBox</p>', { 'font-size': '12px', color: '#999999', padding: '0' }),
            ], { width: '85%' }),
          ],
          { 'background-color': '#fffbeb', padding: '20px', 'border-radius': '8px' },
        ),
        // Stats
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 28px; color: #d97706;">10K+</p>', { align: 'center', 'font-size': '28px', color: '#d97706', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Entreprises</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 28px; color: #d97706;">4.9/5</p>', { align: 'center', 'font-size': '28px', color: '#d97706', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Note moyenne</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 28px; color: #d97706;">50M+</p>', { align: 'center', 'font-size': '28px', color: '#d97706', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Emails envoyés</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#ffffff', padding: '25px 15px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Essayer gratuitement', { 'background-color': '#d97706', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#ffffff', padding: '5px 20px 25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 21. Immobilier
  {
    id: 'real-estate',
    label: 'Immobilier',
    description: 'Annonce immobilière',
    icon: 'Home',
    color: '#15803d',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Nouveau bien : Appartement 3 pièces avec terrasse' },
      body: createBody([
        headerSection(),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://via.placeholder.com/560x280/d1fae5/15803d?text=Villa+de+charme', alt: 'Propriété', 'border-radius': '12px', padding: '0 10px' }),
          ])],
          { 'background-color': '#ffffff', padding: '15px 15px 10px 15px' },
        ),
        // Property info
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Nouveau bien</p>', { 'font-size': '11px', color: '#15803d', padding: '0 0 5px 0' }),
            createText('<h1 style="margin: 0;">Appartement 3 pièces avec terrasse</h1>', { 'font-size': '22px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">📍 Paris 11ème — Quartier Bastille</p>', { 'font-size': '14px', color: '#666666', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: bold; font-size: 24px; color: #15803d;">425 000 €</p>', { 'font-size': '24px', color: '#15803d', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '5px 25px 10px 25px' },
        ),
        // Features
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 18px;">65 m²</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Surface</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 18px;">3</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Pièces</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 18px;">2</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Chambres</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 18px;">12 m²</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Terrasse</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '25%' }),
          ],
          { 'background-color': '#f0fdf4', padding: '20px 15px', 'border-radius': '8px' },
        ),
        // Description
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Charmant appartement rénové avec goût au 4ème étage avec ascenseur. Lumineux, traversant, avec une belle terrasse exposée sud. Cuisine équipée, parquet ancien, hauteur sous plafond.</p>', { 'font-size': '14px', color: '#666666', 'line-height': '1.6', padding: '0 0 15px 0' }),
            createButton('Voir l\'annonce complète', { 'background-color': '#15803d', color: '#ffffff', 'font-size': '15px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px 25px 25px 25px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 22. Restaurant / Menu
  {
    id: 'restaurant',
    label: 'Restaurant',
    description: 'Menu et réservation',
    icon: 'UtensilsCrossed',
    color: '#b45309',
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Découvrez notre nouveau menu et réservez votre table !' },
      body: createBody([
        // Header with dark bg
        createSection(
          [createColumn([
            createImage({
              src: 'https://via.placeholder.com/150x50/1a1a2e/ffffff?text=Le+Bistrot',
              alt: 'Le Bistrot',
              width: '150px',
              align: 'center',
              padding: '0',
            }),
          ])],
          { 'background-color': '#1a1a2e', padding: '25px 0' },
        ),
        // Hero
        createSection(
          [createColumn([
            createImage({ src: 'https://via.placeholder.com/560x260/fef3c7/b45309?text=Nouveau+Menu', alt: 'Menu', 'border-radius': '0', padding: '0' }),
          ])],
          { 'background-color': '#1a1a2e', padding: '0' },
        ),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px;">Saison 2026</p>', { align: 'center', 'font-size': '11px', color: '#b45309', padding: '0 0 8px 0' }),
            createText('<h1 style="margin: 0;">Notre nouveau menu est arrivé</h1>', { align: 'center', 'font-size': '24px', color: '#1a1a2e', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Des saveurs raffinées, des produits de saison, et une carte repensée pour éveiller vos papilles.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#fffbeb', padding: '25px 20px 10px 20px' },
        ),
        // Menu highlights
        createSection(
          [createColumn([createText('<h3 style="margin: 0; text-align: center;">Nos coups de coeur</h3>', { align: 'center', 'font-size': '18px', color: '#1a1a2e', padding: '0 0 15px 0' })])],
          { 'background-color': '#fffbeb', padding: '10px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 24px;">🥗</p>', { align: 'center', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Entrée</p>', { align: 'center', 'font-size': '14px', color: '#1a1a2e', padding: '0 10px 3px 10px' }),
              createText('<p style="margin: 0;">Carpaccio de betteraves, chèvre frais et noix</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px 5px 10px' }),
              createText('<p style="margin: 0; font-weight: bold; color: #b45309;">12 €</p>', { align: 'center', 'font-size': '14px', color: '#b45309', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 24px;">🥩</p>', { align: 'center', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Plat</p>', { align: 'center', 'font-size': '14px', color: '#1a1a2e', padding: '0 10px 3px 10px' }),
              createText('<p style="margin: 0;">Filet de boeuf, sauce truffe et écrasé de pommes</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px 5px 10px' }),
              createText('<p style="margin: 0; font-weight: bold; color: #b45309;">28 €</p>', { align: 'center', 'font-size': '14px', color: '#b45309', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 24px;">🍰</p>', { align: 'center', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Dessert</p>', { align: 'center', 'font-size': '14px', color: '#1a1a2e', padding: '0 10px 3px 10px' }),
              createText('<p style="margin: 0;">Tarte tatin revisitée, glace vanille</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px 5px 10px' }),
              createText('<p style="margin: 0; font-weight: bold; color: #b45309;">10 €</p>', { align: 'center', 'font-size': '14px', color: '#b45309', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#fffbeb', padding: '0 15px 25px 15px' },
        ),
        // Reservation CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">📍 12 rue de la Gastronomie, 75003 Paris</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">📞 01 23 45 67 89 &nbsp;|&nbsp; Ouvert du mardi au samedi</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '0 0 15px 0' }),
            createButton('Réserver une table', { 'background-color': '#b45309', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#1a1a2e', padding: '25px 20px', color: '#ffffff' },
        ),
        footerSection(),
      ]),
    }),
  },
]
