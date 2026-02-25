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
          src: `https://picsum.photos/seed/${encodeURIComponent(logoText)}/150/50`,
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
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Les dernières nouvelles de notre équipe — Février 2026' },
      body: createBody([
        // Top bar
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Voir dans le navigateur &nbsp;|&nbsp; Se désinscrire</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#0f172a', padding: '8px 20px' },
        ),
        // Header nav
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 22px; color: #ffffff; letter-spacing: -0.5px;">MESAGOO</p>', { 'font-size': '22px', color: '#ffffff', padding: '0' }),
            ], { width: '30%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; text-align: right;"><a href="#" style="color: #94a3b8; text-decoration: none; font-size: 13px;">Blog</a> &nbsp;&nbsp;&nbsp; <a href="#" style="color: #94a3b8; text-decoration: none; font-size: 13px;">Produits</a> &nbsp;&nbsp;&nbsp; <a href="#" style="color: #94a3b8; text-decoration: none; font-size: 13px;">Contact</a></p>', { align: 'right', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
            ], { width: '70%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#0f172a', padding: '18px 30px' },
        ),
        // Hero image full-width
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop', alt: 'Equipe collaborative', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Hero text overlay section
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Newsletter — Février 2026</p>', { align: 'center', 'font-size': '11px', color: '#01A8AB', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.15;">L\'innovation au coeur<br/>de votre stratégie digitale</h1>', { align: 'center', 'font-size': '30px', color: '#0f172a', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Découvrez les tendances, outils et stratégies qui transforment le marketing en 2026. Nos experts partagent leurs insights exclusifs.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 40px' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px 30px 20px' },
        ),
        // Featured article — large
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Article vedette</p>', { align: 'left', 'font-size': '10px', color: '#01A8AB', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#f8fafc', padding: '30px 30px 0 30px' },
        ),
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=560&h=280&fit=crop', alt: 'Data analytics dashboard', 'border-radius': '12px', padding: '0' }),
          ])],
          { 'background-color': '#f8fafc', padding: '0 30px 15px 30px' },
        ),
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; line-height: 1.25;">Comment l\'IA révolutionne le marketing par email en 2026</h2>', { 'font-size': '22px', color: '#0f172a', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">De la personnalisation hyper-ciblée aux prédictions de comportement, découvrez comment les équipes marketing les plus performantes utilisent l\'intelligence artificielle pour multiplier par 3 leurs résultats...</p>', { 'font-size': '14px', color: '#64748b', 'line-height': '1.65', padding: '0 0 15px 0' }),
            createButton('Lire l\'article complet', { 'background-color': '#0f172a', color: '#ffffff', 'font-size': '13px', 'border-radius': '8px', 'inner-padding': '12px 28px', 'font-weight': '600', align: 'left', padding: '0' }),
          ])],
          { 'background-color': '#f8fafc', padding: '0 30px 30px 30px' },
        ),
        // Divider
        createSection(
          [createColumn([createDivider({ 'border-color': '#e2e8f0', 'border-width': '1px', padding: '0 20px' })])],
          { 'background-color': '#ffffff', padding: '5px 20px' },
        ),
        // Two articles side by side
        createSection(
          [
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=280&h=180&fit=crop', alt: 'Team working', 'border-radius': '10px', padding: '0 0 12px 0' }),
                createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Stratégie</p>', { 'font-size': '10px', color: '#01A8AB', padding: '0 5px 6px 5px' }),
                createText('<h3 style="margin: 0; line-height: 1.3;">5 frameworks de growth marketing à adopter maintenant</h3>', { 'font-size': '16px', color: '#0f172a', padding: '0 5px 8px 5px' }),
                createText('<p style="margin: 0;">Les méthodologies qui font la différence entre les équipes qui stagnent et celles qui explosent...</p>', { 'font-size': '12px', color: '#64748b', 'line-height': '1.55', padding: '0 5px 12px 5px' }),
                createButton('Lire →', { 'background-color': 'transparent', color: '#0f172a', 'font-size': '13px', border: '2px solid #0f172a', 'border-radius': '8px', 'inner-padding': '8px 22px', align: 'left', padding: '0 5px', 'font-weight': '600' }),
              ],
              { width: '50%' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=280&h=180&fit=crop', alt: 'Email on laptop', 'border-radius': '10px', padding: '0 0 12px 0' }),
                createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Guide pratique</p>', { 'font-size': '10px', color: '#01A8AB', padding: '0 5px 6px 5px' }),
                createText('<h3 style="margin: 0; line-height: 1.3;">Segmentation avancée : le guide définitif</h3>', { 'font-size': '16px', color: '#0f172a', padding: '0 5px 8px 5px' }),
                createText('<p style="margin: 0;">Apprenez à créer des segments ultra-ciblés qui convertissent 4x mieux que les envois de masse...</p>', { 'font-size': '12px', color: '#64748b', 'line-height': '1.55', padding: '0 5px 12px 5px' }),
                createButton('Lire →', { 'background-color': 'transparent', color: '#0f172a', 'font-size': '13px', border: '2px solid #0f172a', 'border-radius': '8px', 'inner-padding': '8px 22px', align: 'left', padding: '0 5px', 'font-weight': '600' }),
              ],
              { width: '50%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '25px 25px' },
        ),
        // Quote / Highlight banner
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic; font-size: 20px; line-height: 1.5; color: #ffffff;">"Le meilleur moment pour investir dans votre stratégie email, c\'était il y a 5 ans. Le deuxième meilleur moment, c\'est maintenant."</p>', { align: 'center', 'font-size': '20px', color: '#ffffff', 'line-height': '1.5', padding: '0 30px 10px 30px' }),
            createText('<p style="margin: 0; font-weight: 600;">— Sarah Martin, VP Marketing @ TechFlow</p>', { align: 'center', 'font-size': '12px', color: 'rgba(255,255,255,0.7)', padding: '0' }),
          ])],
          { 'background-color': '#0f172a', padding: '35px 20px' },
        ),
        // Third article - horizontal
        createSection(
          [
            createColumn(
              [createImage({ src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=240&h=200&fit=crop', alt: 'Workshop', 'border-radius': '10px', padding: '0' })],
              { width: '40%', 'vertical-align': 'middle' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Ressource</p>', { 'font-size': '10px', color: '#01A8AB', padding: '0 15px 6px 15px' }),
                createText('<h3 style="margin: 0; line-height: 1.3;">Checklist : 25 points pour un email parfait</h3>', { 'font-size': '16px', color: '#0f172a', padding: '0 15px 8px 15px' }),
                createText('<p style="margin: 0;">De l\'objet au footer, chaque détail compte. Téléchargez notre checklist complète utilisée par +2000 marketeurs.</p>', { 'font-size': '12px', color: '#64748b', 'line-height': '1.55', padding: '0 15px 12px 15px' }),
                createButton('Télécharger gratuitement', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '13px', 'border-radius': '8px', 'inner-padding': '10px 24px', align: 'left', padding: '0 15px', 'font-weight': '600' }),
              ],
              { width: '60%', 'vertical-align': 'middle' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '25px 25px' },
        ),
        // Stats bar
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 28px; color: #01A8AB;">12K+</p>', { align: 'center', 'font-size': '28px', color: '#01A8AB', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Abonnés</p>', { align: 'center', 'font-size': '10px', color: '#94a3b8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 28px; color: #01A8AB;">48%</p>', { align: 'center', 'font-size': '28px', color: '#01A8AB', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Taux d\'ouverture</p>', { align: 'center', 'font-size': '10px', color: '#94a3b8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 28px; color: #01A8AB;">96%</p>', { align: 'center', 'font-size': '28px', color: '#01A8AB', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Satisfaction</p>', { align: 'center', 'font-size': '10px', color: '#94a3b8', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f8fafc', padding: '25px 20px' },
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
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Vente flash -40% sur toute la collection — 48h seulement !' },
      body: createBody([
        // Urgency bar
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; letter-spacing: 1px;">VENTE FLASH — FIN DANS 47:59:32</p>', { align: 'center', 'font-size': '12px', color: '#ffffff', padding: '0' }),
          ])],
          { 'background-color': '#dc2626', padding: '10px 20px' },
        ),
        // Header
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 20px; letter-spacing: -0.5px;">BOUTIQUE</p>', { 'font-size': '20px', color: '#1a1a1a', padding: '0' }),
            ], { width: '30%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; text-align: right;"><a href="#" style="color: #666; text-decoration: none; font-size: 12px;">Femme</a> &nbsp;&nbsp; <a href="#" style="color: #666; text-decoration: none; font-size: 12px;">Homme</a> &nbsp;&nbsp; <a href="#" style="color: #666; text-decoration: none; font-size: 12px;">Accessoires</a> &nbsp;&nbsp; <a href="#" style="color: #dc2626; text-decoration: none; font-size: 12px; font-weight: 700;">SOLDES</a></p>', { align: 'right', 'font-size': '12px', color: '#666', padding: '0' }),
            ], { width: '70%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '18px 25px' },
        ),
        // Hero full-width lifestyle image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=320&fit=crop', alt: 'Shopping lifestyle', padding: '0' }),
          ])],
          { padding: '0' },
        ),
        // Big discount text
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 4px; font-weight: 600;">Offre exclusive membres</p>', { align: 'center', 'font-size': '11px', color: '#dc2626', padding: '0 0 8px 0' }),
            createText('<h1 style="margin: 0; font-size: 64px; line-height: 1; font-weight: 900; letter-spacing: -2px;">-40%</h1>', { align: 'center', 'font-size': '64px', color: '#1a1a1a', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0; font-size: 18px;">sur toute la collection printemps-été</p>', { align: 'center', 'font-size': '18px', color: '#666666', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; display: inline-block; border: 2px dashed #dc2626; padding: 8px 24px; font-weight: 800; letter-spacing: 5px; font-size: 20px; color: #dc2626;">FLASH40</p>', { align: 'center', 'font-size': '20px', color: '#dc2626', padding: '5px 0 20px 0' }),
            createButton('SHOPPER MAINTENANT', {
              'background-color': '#dc2626',
              color: '#ffffff',
              'font-size': '15px',
              'border-radius': '0',
              'inner-padding': '16px 50px',
              'font-weight': '800',
              'letter-spacing': '2px',
            }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px' },
        ),
        // Product grid header
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">Sélection du moment</h2>', { align: 'center', 'font-size': '22px', color: '#1a1a1a', padding: '0 0 3px 0' }),
            createText('<p style="margin: 0; text-align: center;">Les pièces les plus convoitées de la saison</p>', { align: 'center', 'font-size': '13px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#fafafa', padding: '30px 20px 15px 20px' },
        ),
        // Product row 1
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=180&h=220&fit=crop', alt: 'Sneakers', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Sneakers Urban</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">149,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">89,40 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Ajouter au panier', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=180&h=220&fit=crop', alt: 'Sac à main', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Sac Elégance</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">229,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">137,40 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Ajouter au panier', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=180&h=220&fit=crop', alt: 'Montre', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Montre Classic</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">199,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">119,40 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Ajouter au panier', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#fafafa', padding: '10px 15px' },
        ),
        // Product row 2
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=180&h=220&fit=crop', alt: 'Veste', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Veste Oversize</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">189,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">113,40 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Ajouter au panier', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=180&h=220&fit=crop', alt: 'Lunettes', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Lunettes Aviator</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">129,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">77,40 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Ajouter au panier', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=180&h=220&fit=crop', alt: 'Parfum', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Parfum Signature</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">95,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">57,00 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Ajouter au panier', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#fafafa', padding: '10px 15px 20px 15px' },
        ),
        // Banner lifestyle
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=560&h=200&fit=crop', alt: 'Fashion lifestyle', padding: '0' }),
          ])],
          { padding: '0' },
        ),
        // Code + urgency
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 16px;">Dernières heures pour en profiter !</p>', { align: 'center', 'font-size': '16px', color: '#1a1a1a', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">Code promo <strong style="color: #dc2626; letter-spacing: 3px; font-size: 18px;">FLASH40</strong> — Valable jusqu\'au 28 février minuit</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '0 0 18px 0' }),
            createButton('VOIR TOUTE LA COLLECTION', { 'background-color': '#dc2626', color: '#ffffff', 'font-size': '14px', 'border-radius': '0', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        // Guarantees
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 700;">🚚</p>', { align: 'center', 'font-size': '20px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Livraison gratuite</p>', { align: 'center', 'font-size': '11px', color: '#1a1a1a', padding: '0' }),
              createText('<p style="margin: 0;">Dès 50€ d\'achat</p>', { align: 'center', 'font-size': '10px', color: '#999', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700;">↩️</p>', { align: 'center', 'font-size': '20px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Retours gratuits</p>', { align: 'center', 'font-size': '11px', color: '#1a1a1a', padding: '0' }),
              createText('<p style="margin: 0;">Sous 30 jours</p>', { align: 'center', 'font-size': '10px', color: '#999', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700;">🔒</p>', { align: 'center', 'font-size': '20px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Paiement sécurisé</p>', { align: 'center', 'font-size': '11px', color: '#1a1a1a', padding: '0' }),
              createText('<p style="margin: 0;">CB, PayPal, Apple Pay</p>', { align: 'center', 'font-size': '10px', color: '#999', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f8f9fa', padding: '20px 15px' },
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
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Bienvenue dans la communauté ! Votre aventure commence ici.' },
      body: createBody([
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=280&fit=crop', alt: 'Team celebration', padding: '0' }),
          ])],
          { padding: '0' },
        ),
        // Welcome text
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Bienvenue</p>', { align: 'center', 'font-size': '11px', color: '#01A8AB', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Ravi de vous compter<br/>parmi nous !</h1>', { align: 'center', 'font-size': '30px', color: '#1a1a2e', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Vous avez rejoint une communauté de plus de 10 000 professionnels qui transforment leur communication. Prêt à créer des campagnes mémorables ?</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
            createButton('Accéder à mon espace', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '14px 40px', 'font-weight': '700' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px' },
        ),
        // Divider
        createSection(
          [createColumn([createDivider({ 'border-color': '#e2e8f0', 'border-width': '1px', padding: '0 60px' })])],
          { 'background-color': '#ffffff', padding: '0' },
        ),
        // Steps header
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">3 étapes pour démarrer</h2>', { align: 'center', 'font-size': '22px', color: '#1a1a2e', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Suivez ce guide rapide et lancez votre première campagne en moins de 10 minutes.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 15px 20px' },
        ),
        // Step 1
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=220&h=160&fit=crop', alt: 'Profile setup', 'border-radius': '10px', padding: '0' }),
            ], { width: '40%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; font-weight: 800; text-align: center; font-size: 13px;">1</span></p>', { padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 700;">Personnalisez votre profil</p>', { 'font-size': '16px', color: '#1a1a2e', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Logo, couleurs, informations. Votre marque, votre identité.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.5', padding: '0 15px 10px 15px' }),
              createButton('Compléter le profil →', { 'background-color': 'transparent', color: '#01A8AB', 'font-size': '13px', border: '2px solid #01A8AB', 'border-radius': '8px', 'inner-padding': '8px 20px', align: 'left', padding: '0 15px', 'font-weight': '600' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        // Step 2
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; font-weight: 800; text-align: center; font-size: 13px;">2</span></p>', { padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 700;">Importez vos contacts</p>', { 'font-size': '16px', color: '#1a1a2e', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">CSV, Excel ou connectez votre CRM. C\'est automatique.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.5', padding: '0 15px 10px 15px' }),
              createButton('Importer mes contacts →', { 'background-color': 'transparent', color: '#01A8AB', 'font-size': '13px', border: '2px solid #01A8AB', 'border-radius': '8px', 'inner-padding': '8px 20px', align: 'left', padding: '0 15px', 'font-weight': '600' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=220&h=160&fit=crop', alt: 'Import contacts', 'border-radius': '10px', padding: '0' }),
            ], { width: '40%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        // Step 3
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=220&h=160&fit=crop', alt: 'Send campaign', 'border-radius': '10px', padding: '0' }),
            ], { width: '40%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; font-weight: 800; text-align: center; font-size: 13px;">3</span></p>', { padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 700;">Lancez votre campagne</p>', { 'font-size': '16px', color: '#1a1a2e', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Choisissez un template, personnalisez et envoyez. C\'est parti !</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.5', padding: '0 15px 10px 15px' }),
              createButton('Créer ma campagne →', { 'background-color': 'transparent', color: '#01A8AB', 'font-size': '13px', border: '2px solid #01A8AB', 'border-radius': '8px', 'inner-padding': '8px 20px', align: 'left', padding: '0 15px', 'font-weight': '600' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        // Stats trust bar
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 24px; color: #ffffff;">10K+</p>', { align: 'center', 'font-size': '24px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Utilisateurs</p>', { align: 'center', 'font-size': '11px', color: 'rgba(255,255,255,0.7)', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 24px; color: #ffffff;">50M+</p>', { align: 'center', 'font-size': '24px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Emails envoyés</p>', { align: 'center', 'font-size': '11px', color: 'rgba(255,255,255,0.7)', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 24px; color: #ffffff;">99.9%</p>', { align: 'center', 'font-size': '24px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Uptime</p>', { align: 'center', 'font-size': '11px', color: 'rgba(255,255,255,0.7)', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 24px; color: #ffffff;">4.9/5</p>', { align: 'center', 'font-size': '24px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Satisfaction</p>', { align: 'center', 'font-size': '11px', color: 'rgba(255,255,255,0.7)', padding: '0' }),
            ], { width: '25%' }),
          ],
          { 'background-color': '#01A8AB', padding: '25px 15px' },
        ),
        // Help section
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700;">Besoin d\'aide ?</p>', { align: 'center', 'font-size': '15px', color: '#1a1a2e', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0;">Notre équipe est là pour vous accompagner. <a href="mailto:support@mesagoo.com" style="color: #01A8AB; font-weight: 600;">Contactez-nous</a> ou consultez notre <a href="#" style="color: #01A8AB; font-weight: 600;">centre d\'aide</a>.</p>', { align: 'center', 'font-size': '13px', color: '#64748b', 'line-height': '1.6', padding: '0 30px' }),
          ])],
          { 'background-color': '#f8fafc', padding: '25px 20px' },
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
            createColumn([createImage({ src: 'https://picsum.photos/seed/avatarA/80/80', alt: 'Produit', width: '60px', padding: '0' })], { width: '15%', 'vertical-align': 'middle' }),
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
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Vous êtes invité : Conférence Annuelle 2026 — Paris' },
      body: createBody([
        // Full-width conference hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=320&fit=crop', alt: 'Conference hall', padding: '0' }),
          ])],
          { padding: '0' },
        ),
        // Event title overlay
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 4px; font-weight: 700;">Invitation exclusive</p>', { align: 'center', 'font-size': '10px', color: '#7c3aed', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.15; font-weight: 900;">Conférence Annuelle<br/>2026</h1>', { align: 'center', 'font-size': '32px', color: '#1a1a2e', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; font-size: 15px;">L\'événement incontournable pour les leaders du marketing digital. Keynotes inspirantes, ateliers pratiques et networking exclusif.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.65', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Event info badges
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #7c3aed;">15 MARS</p>', { align: 'center', 'font-size': '16px', color: '#7c3aed', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">2026</p>', { align: 'center', 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #7c3aed;">PARIS</p>', { align: 'center', 'font-size': '16px', color: '#7c3aed', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Palais des Congrès</p>', { align: 'center', 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #7c3aed;">9h — 18h</p>', { align: 'center', 'font-size': '16px', color: '#7c3aed', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Journée complète</p>', { align: 'center', 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f5f3ff', padding: '20px 15px', 'border-radius': '8px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('RÉSERVER MA PLACE', { 'background-color': '#7c3aed', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
            createText('<p style="margin: 0;">Tarif early bird : <strong style="color: #7c3aed;">199€</strong> au lieu de <span style="text-decoration: line-through;">349€</span></p>', { align: 'center', 'font-size': '13px', color: '#64748b', padding: '12px 0 0 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Speakers header
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">Nos intervenants</h2>', { align: 'center', 'font-size': '22px', color: '#1a1a2e', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Des experts reconnus partagent leur vision.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 15px 20px' },
        ),
        // Speakers grid
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&fit=crop', alt: 'Speaker 1', width: '100px', 'border-radius': '50%', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Thomas Durand</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0;">CEO, TechVision</p>', { align: 'center', 'font-size': '11px', color: '#7c3aed', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop', alt: 'Speaker 2', width: '100px', 'border-radius': '50%', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Sophie Moreau</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0;">VP Marketing, DataFlow</p>', { align: 'center', 'font-size': '11px', color: '#7c3aed', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop', alt: 'Speaker 3', width: '100px', 'border-radius': '50%', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Marc Leblanc</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0;">CTO, CloudScale</p>', { align: 'center', 'font-size': '11px', color: '#7c3aed', padding: '0 5px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#ffffff', padding: '5px 20px 25px 20px' },
        ),
        // Schedule
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">Programme</h2>', { align: 'center', 'font-size': '20px', color: '#ffffff', padding: '0 0 20px 0' }),
          ])],
          { 'background-color': '#1a1a2e', padding: '30px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #a78bfa;">09:00</p>', { 'font-size': '14px', color: '#a78bfa', padding: '0 0 3px 0' }),
            ], { width: '20%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #ffffff;">Keynote d\'ouverture</p>', { 'font-size': '14px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Vision 2026 : l\'IA au service du marketing</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
            ], { width: '80%' }),
          ],
          { 'background-color': '#1a1a2e', padding: '8px 30px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #a78bfa;">11:00</p>', { 'font-size': '14px', color: '#a78bfa', padding: '0 0 3px 0' }),
            ], { width: '20%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #ffffff;">Tables rondes</p>', { 'font-size': '14px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Personnalisation, automation et ROI</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
            ], { width: '80%' }),
          ],
          { 'background-color': '#1a1a2e', padding: '8px 30px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #a78bfa;">14:00</p>', { 'font-size': '14px', color: '#a78bfa', padding: '0 0 3px 0' }),
            ], { width: '20%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #ffffff;">Ateliers pratiques</p>', { 'font-size': '14px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Hands-on : créez votre stratégie email en live</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
            ], { width: '80%' }),
          ],
          { 'background-color': '#1a1a2e', padding: '8px 30px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #a78bfa;">17:00</p>', { 'font-size': '14px', color: '#a78bfa', padding: '0 0 3px 0' }),
            ], { width: '20%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #ffffff;">Cocktail networking</p>', { 'font-size': '14px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Rencontrez les speakers et les participants</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
            ], { width: '80%' }),
          ],
          { 'background-color': '#1a1a2e', padding: '8px 30px 30px 30px' },
        ),
        // Final CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700;">Plus que <strong style="color: #7c3aed;">47 places</strong> disponibles</p>', { align: 'center', 'font-size': '15px', color: '#1a1a2e', padding: '0 0 15px 0' }),
            createButton('JE RÉSERVE MAINTENANT', { 'background-color': '#7c3aed', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
          ])],
          { 'background-color': '#f5f3ff', padding: '30px 20px' },
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
            createColumn([createImage({ src: 'https://picsum.photos/seed/cart1/100/100', alt: 'Produit', width: '80px', padding: '0', 'border-radius': '8px' })], { width: '20%', 'vertical-align': 'middle' }),
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
            createColumn([createImage({ src: 'https://picsum.photos/seed/cart2/100/100', alt: 'Produit', width: '80px', padding: '0', 'border-radius': '8px' })], { width: '20%', 'vertical-align': 'middle' }),
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
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Découvrez AuraX — Notre dernière innovation est là' },
      body: createBody([
        // Dark hero with product
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 5px; font-weight: 600;">Nouveau</p>', { align: 'center', 'font-size': '11px', color: '#67e8f9', padding: '0 0 15px 0' }),
            createText('<h1 style="margin: 0; font-size: 38px; line-height: 1.1; font-weight: 900; letter-spacing: -1px;">AuraX</h1>', { align: 'center', 'font-size': '38px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-size: 16px;">La prochaine génération est arrivée.</p>', { align: 'center', 'font-size': '16px', color: 'rgba(255,255,255,0.7)', padding: '0 0 25px 0' }),
          ])],
          { 'background-color': '#0c1222', padding: '50px 20px 20px 20px' },
        ),
        // Product image on dark
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop', alt: 'Product AuraX', padding: '0 30px', 'border-radius': '16px' }),
          ])],
          { 'background-color': '#0c1222', padding: '0 20px 30px 20px' },
        ),
        // CTA on dark
        createSection(
          [createColumn([
            createButton('DÉCOUVRIR AURAX', { 'background-color': '#06b6d4', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
            createText('<p style="margin: 0;">Offre de lancement : <strong style="color: #67e8f9;">-20%</strong> avec le code <strong style="letter-spacing: 2px;">LAUNCH20</strong></p>', { align: 'center', 'font-size': '13px', color: 'rgba(255,255,255,0.6)', padding: '12px 0 0 0' }),
          ])],
          { 'background-color': '#0c1222', padding: '0 20px 40px 20px' },
        ),
        // Features header
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">Pourquoi AuraX change tout</h2>', { align: 'center', 'font-size': '22px', color: '#0f172a', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Une expérience repensée de A à Z.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px 15px 20px' },
        ),
        // Feature 1
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=240&h=160&fit=crop', alt: 'Speed', 'border-radius': '10px', padding: '0' }),
            ], { width: '40%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #06b6d4;">3x plus rapide</p>', { 'font-size': '16px', color: '#06b6d4', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Moteur entièrement réécrit. Temps de réponse divisé par 3. Votre workflow n\'a jamais été aussi fluide.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.55', padding: '0 15px' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        // Feature 2
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #06b6d4;">Design premium</p>', { 'font-size': '16px', color: '#06b6d4', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Interface repensée avec des matériaux premium, des animations fluides et une ergonomie intuitive.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.55', padding: '0 15px' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=240&h=160&fit=crop', alt: 'Design', 'border-radius': '10px', padding: '0' }),
            ], { width: '40%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        // Feature 3
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=240&h=160&fit=crop', alt: 'Security', 'border-radius': '10px', padding: '0' }),
            ], { width: '40%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #06b6d4;">Sécurité maximale</p>', { 'font-size': '16px', color: '#06b6d4', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Chiffrement E2E, authentification biométrique et conformité RGPD native. Vos données sont sanctuarisées.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.55', padding: '0 15px' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px 25px 25px' },
        ),
        // Testimonial
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic; font-size: 18px; line-height: 1.5;">"AuraX a transformé notre façon de travailler. La différence de performance est immédiatement perceptible."</p>', { align: 'center', 'font-size': '18px', color: '#0f172a', 'line-height': '1.5', padding: '0 30px 10px 30px' }),
            createText('<p style="margin: 0; font-weight: 600;">— Claire Petit, CTO @ InnovateCorp</p>', { align: 'center', 'font-size': '12px', color: '#06b6d4', padding: '0' }),
          ])],
          { 'background-color': '#f0f9ff', padding: '30px 20px' },
        ),
        // Final CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px;">Prêt à passer au niveau supérieur ?</p>', { align: 'center', 'font-size': '18px', color: '#ffffff', padding: '0 0 15px 0' }),
            createButton('COMMANDER AURAX', { 'background-color': '#06b6d4', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
            createText('<p style="margin: 0;">Livraison gratuite — Satisfait ou remboursé 30 jours</p>', { align: 'center', 'font-size': '11px', color: 'rgba(255,255,255,0.5)', padding: '10px 0 0 0' }),
          ])],
          { 'background-color': '#0c1222', padding: '35px 20px' },
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
            createColumn([createImage({ src: 'https://picsum.photos/seed/speaker/100/100', alt: 'Intervenant', width: '80px', 'border-radius': '50%', padding: '0' })], { width: '20%', 'vertical-align': 'middle' }),
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
              createImage({ src: 'https://picsum.photos/seed/fashion/180/120', alt: 'Mode', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Mode</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; color: #1d4ed8; font-weight: bold;">Jusqu\'à -50%</p>', { align: 'center', 'font-size': '13px', color: '#1d4ed8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://picsum.photos/seed/home/180/120', alt: 'Maison', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Maison</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; color: #1d4ed8; font-weight: bold;">Jusqu\'à -40%</p>', { align: 'center', 'font-size': '13px', color: '#1d4ed8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://picsum.photos/seed/tech/180/120', alt: 'Tech', 'border-radius': '8px', padding: '0 0 8px 0' }),
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
            createColumn([createImage({ src: 'https://picsum.photos/seed/jd/80/80', alt: 'Jean Dupont', width: '60px', 'border-radius': '50%', padding: '0' })], { width: '15%', 'vertical-align': 'top' }),
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
            createColumn([createImage({ src: 'https://picsum.photos/seed/ml/80/80', alt: 'Marie Lefebvre', width: '60px', 'border-radius': '50%', padding: '0' })], { width: '15%', 'vertical-align': 'top' }),
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
            createImage({ src: 'https://picsum.photos/seed/villa/560/280', alt: 'Propriété', 'border-radius': '12px', padding: '0 10px' }),
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
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Nouveau menu de saison — Réservez votre table chez Le Comptoir' },
      body: createBody([
        // Restaurant name on dark
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 300; font-size: 28px; letter-spacing: 8px; text-transform: uppercase;">Le Comptoir</p>', { align: 'center', 'font-size': '28px', color: '#d4a574', padding: '0 0 3px 0' }),
            createText('<p style="margin: 0; letter-spacing: 3px; text-transform: uppercase;">Cuisine gastronomique française</p>', { align: 'center', 'font-size': '10px', color: 'rgba(255,255,255,0.5)', padding: '0' }),
          ])],
          { 'background-color': '#1a1a1a', padding: '30px 20px' },
        ),
        // Hero food image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=320&fit=crop', alt: 'Fine dining', padding: '0' }),
          ])],
          { padding: '0' },
        ),
        // Menu intro
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 4px; font-weight: 600;">Nouvelle carte</p>', { align: 'center', 'font-size': '10px', color: '#b45309', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0; font-weight: 300; font-size: 28px; line-height: 1.3;">Menu de Saison<br/><em>Printemps 2026</em></h1>', { align: 'center', 'font-size': '28px', color: '#1a1a1a', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">Une carte repensée autour des produits de saison, sublimés par notre Chef étoilé. Chaque plat raconte une histoire.</p>', { align: 'center', 'font-size': '14px', color: '#78716c', 'line-height': '1.7', padding: '0 30px' }),
          ])],
          { 'background-color': '#faf8f5', padding: '35px 20px 25px 20px' },
        ),
        // Menu items with photos
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=260&h=200&fit=crop', alt: 'Entrée', 'border-radius': '10px', padding: '0' }),
            ], { width: '45%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Entrée</p>', { 'font-size': '10px', color: '#b45309', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 700; font-size: 16px;">Carpaccio de Saint-Jacques</p>', { 'font-size': '16px', color: '#1a1a1a', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Agrumes, caviar d\'Aquitaine, huile de noisette torréfiée et fleur de sel de Guérande.</p>', { 'font-size': '12px', color: '#78716c', 'line-height': '1.55', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #b45309;">24 €</p>', { 'font-size': '18px', color: '#b45309', padding: '0 15px' }),
            ], { width: '55%', 'vertical-align': 'top' }),
          ],
          { 'background-color': '#faf8f5', padding: '15px 25px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Plat</p>', { 'font-size': '10px', color: '#b45309', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 700; font-size: 16px;">Filet de Boeuf Wagyu</p>', { 'font-size': '16px', color: '#1a1a1a', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Sauce périgueux, pommes dauphines croustillantes, légumes du jardin glacés au beurre noisette.</p>', { 'font-size': '12px', color: '#78716c', 'line-height': '1.55', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #b45309;">42 €</p>', { 'font-size': '18px', color: '#b45309', padding: '0 15px' }),
            ], { width: '55%', 'vertical-align': 'top' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=260&h=200&fit=crop', alt: 'Plat principal', 'border-radius': '10px', padding: '0' }),
            ], { width: '45%', 'vertical-align': 'top' }),
          ],
          { 'background-color': '#faf8f5', padding: '15px 25px' },
        ),
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=260&h=200&fit=crop', alt: 'Dessert', 'border-radius': '10px', padding: '0' }),
            ], { width: '45%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Dessert</p>', { 'font-size': '10px', color: '#b45309', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 700; font-size: 16px;">Soufflé au Grand Marnier</p>', { 'font-size': '16px', color: '#1a1a1a', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Crème anglaise à la vanille de Madagascar, tuile dentelle et zestes d\'orange confits.</p>', { 'font-size': '12px', color: '#78716c', 'line-height': '1.55', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #b45309;">16 €</p>', { 'font-size': '18px', color: '#b45309', padding: '0 15px' }),
            ], { width: '55%', 'vertical-align': 'top' }),
          ],
          { 'background-color': '#faf8f5', padding: '15px 25px' },
        ),
        // Menu degustation
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Menu dégustation</p>', { align: 'center', 'font-size': '10px', color: 'rgba(255,255,255,0.6)', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-weight: 300; font-size: 22px;">5 plats &nbsp;•&nbsp; accord mets-vins</p>', { align: 'center', 'font-size': '22px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-weight: 800; font-size: 32px; color: #d4a574;">85 € / personne</p>', { align: 'center', 'font-size': '32px', color: '#d4a574', padding: '0 0 20px 0' }),
            createButton('RÉSERVER MAINTENANT', { 'background-color': '#b45309', color: '#ffffff', 'font-size': '14px', 'border-radius': '0', 'inner-padding': '14px 40px', 'font-weight': '700', 'letter-spacing': '2px' }),
          ])],
          { 'background-color': '#1a1a1a', padding: '35px 20px' },
        ),
        // Info
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #b45309;">Adresse</p>', { 'font-size': '11px', color: '#b45309', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">12 rue de la Gastronomie<br/>75003 Paris</p>', { 'font-size': '13px', color: '#78716c', 'line-height': '1.5', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #b45309;">Horaires</p>', { 'font-size': '11px', color: '#b45309', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Mar - Sam : 12h-14h / 19h-22h<br/>Dimanche : 12h-15h</p>', { 'font-size': '13px', color: '#78716c', 'line-height': '1.5', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #b45309;">Contact</p>', { 'font-size': '11px', color: '#b45309', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">01 23 45 67 89<br/>contact@lecomptoir.fr</p>', { 'font-size': '13px', color: '#78716c', 'line-height': '1.5', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#faf8f5', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },
]
