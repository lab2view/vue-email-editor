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
]
