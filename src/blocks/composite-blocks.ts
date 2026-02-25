/**
 * Composite / pre-designed blocks ported from the old GrapesJS email-builder-blocks.ts.
 * Each factory returns one or more EmailNode sections ready to insert into the document.
 */
import type { BlockDefinition, EmailNode } from '../types'
import {
  createSection,
  createColumn,
  createText,
  createImage,
  createButton,
  createDivider,
  createSocial,
  createSocialElement,
  createHero,
} from '../serializer/node-factory'

export const compositeBlocks: BlockDefinition[] = [
  // ── En-tête avec logo ──
  {
    id: 'composite-header',
    label: 'block_comp_header',
    category: 'composite',
    icon: 'LayoutTemplate',
    factory: () =>
      createSection(
        [
          createColumn([
            createImage({
              src: 'https://via.placeholder.com/150x50/01A8AB/ffffff?text=LOGO',
              alt: 'Logo',
              width: '150px',
              align: 'center',
              padding: '0',
            }),
          ]),
        ],
        { 'background-color': '#ffffff', padding: '20px 0' },
      ),
  },

  // ── En-tête + Navigation ──
  {
    id: 'composite-header-nav',
    label: 'block_comp_header_nav',
    category: 'composite',
    icon: 'LayoutTemplate',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createImage({
                src: 'https://via.placeholder.com/120x40/01A8AB/ffffff?text=LOGO',
                alt: 'Logo',
                width: '120px',
                align: 'left',
                padding: '0',
              }),
            ],
            { width: '30%' },
          ),
          createColumn(
            [
              createText(
                '<a href="#" style="color: #555555; text-decoration: none; margin: 0 10px;">Accueil</a><a href="#" style="color: #555555; text-decoration: none; margin: 0 10px;">Produits</a><a href="#" style="color: #555555; text-decoration: none; margin: 0 10px;">Contact</a>',
                { align: 'right', 'font-size': '14px', color: '#555555', padding: '10px 0 0 0' },
              ),
            ],
            { width: '70%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '15px 20px' },
      ),
  },

  // ── Bannière Hero ──
  {
    id: 'composite-hero',
    label: 'block_comp_hero_banner',
    category: 'composite',
    icon: 'Monitor',
    factory: () =>
      createHero(
        [
          createText(
            '<h1 style="margin: 0;">Votre titre accrocheur ici</h1>',
            { align: 'center', 'font-size': '28px', color: '#ffffff', 'font-weight': 'bold', padding: '0 0 15px 0' },
          ),
          createText(
            '<p style="margin: 0;">Sous-titre avec une description engageante pour captiver votre audience et les inciter à agir.</p>',
            { align: 'center', 'font-size': '16px', color: '#cccccc', padding: '0 40px 25px 40px' },
          ),
          createButton('Découvrir', {
            'background-color': '#01A8AB',
            color: '#ffffff',
            'font-size': '16px',
            'border-radius': '6px',
            'inner-padding': '14px 30px',
          }),
        ],
        {
          'background-height': '400px',
          'background-width': '600px',
          'background-url': 'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=+',
          'background-color': '#1a1a2e',
          padding: '60px 20px',
        },
      ),
  },

  // ── Hero Gradient ──
  {
    id: 'composite-hero-gradient',
    label: 'block_comp_hero_gradient',
    category: 'composite',
    icon: 'Palette',
    factory: () =>
      createSection(
        [
          createColumn([
            createText(
              '<h1 style="margin: 0;">Offre Spéciale</h1>',
              { align: 'center', 'font-size': '32px', color: '#ffffff', 'font-weight': 'bold', padding: '0 0 10px 0' },
            ),
            createText(
              '<p style="margin: 0;">Profitez de -30% sur toute la collection. Offre limitée dans le temps.</p>',
              { align: 'center', 'font-size': '18px', color: 'rgba(255,255,255,0.85)', padding: '0 30px 25px 30px' },
            ),
            createButton("J'en profite", {
              'background-color': '#ffffff',
              color: '#01A8AB',
              'font-size': '16px',
              'border-radius': '6px',
              'inner-padding': '14px 30px',
              'font-weight': 'bold',
            }),
          ]),
        ],
        { 'background-color': '#01A8AB', padding: '50px 20px' },
      ),
  },

  // ── Image + Texte ──
  {
    id: 'composite-img-text',
    label: 'block_comp_image_text',
    category: 'composite',
    icon: 'LayoutList',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createImage({
                src: 'https://via.placeholder.com/300x200/e5e7eb/6b7280?text=Image',
                alt: 'Image',
                'border-radius': '8px',
                padding: '10px',
              }),
            ],
            { width: '45%' },
          ),
          createColumn(
            [
              createText(
                '<h3 style="margin: 0;">Titre de la section</h3>',
                { 'font-size': '20px', color: '#333333', 'font-weight': 'bold', padding: '10px 15px 5px 15px' },
              ),
              createText(
                '<p style="margin: 0;">Décrivez votre produit ou service ici. Utilisez un texte concis et engageant pour garder l\'attention du lecteur.</p>',
                { 'font-size': '14px', color: '#666666', 'line-height': '1.6', padding: '5px 15px 10px 15px' },
              ),
              createButton('En savoir plus', {
                'background-color': '#01A8AB',
                color: '#ffffff',
                'font-size': '14px',
                'border-radius': '6px',
                align: 'left',
                padding: '5px 15px',
                'inner-padding': '10px 24px',
              }),
            ],
            { width: '55%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '20px 0' },
      ),
  },

  // ── Texte + Image ──
  {
    id: 'composite-text-img',
    label: 'block_comp_text_image',
    category: 'composite',
    icon: 'LayoutList',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createText(
                '<h3 style="margin: 0;">Titre de la section</h3>',
                { 'font-size': '20px', color: '#333333', 'font-weight': 'bold', padding: '10px 15px 5px 15px' },
              ),
              createText(
                '<p style="margin: 0;">Décrivez votre produit ou service ici. Utilisez un texte concis et engageant pour garder l\'attention du lecteur.</p>',
                { 'font-size': '14px', color: '#666666', 'line-height': '1.6', padding: '5px 15px 10px 15px' },
              ),
              createButton('Découvrir', {
                'background-color': '#01A8AB',
                color: '#ffffff',
                'font-size': '14px',
                'border-radius': '6px',
                align: 'left',
                padding: '5px 15px',
                'inner-padding': '10px 24px',
              }),
            ],
            { width: '55%' },
          ),
          createColumn(
            [
              createImage({
                src: 'https://via.placeholder.com/300x200/e5e7eb/6b7280?text=Image',
                alt: 'Image',
                'border-radius': '8px',
                padding: '10px',
              }),
            ],
            { width: '45%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '20px 0' },
      ),
  },

  // ── Appel à l'action (CTA) ──
  {
    id: 'composite-cta',
    label: 'block_comp_cta',
    category: 'composite',
    icon: 'MousePointerClick',
    factory: () =>
      createSection(
        [
          createColumn([
            createText(
              '<h2 style="margin: 0;">Prêt à commencer ?</h2>',
              { align: 'center', 'font-size': '22px', color: '#333333', 'font-weight': 'bold', padding: '0 0 10px 0' },
            ),
            createText(
              '<p style="margin: 0;">Rejoignez des milliers de clients satisfaits et transformez votre façon de communiquer.</p>',
              { align: 'center', 'font-size': '15px', color: '#666666', padding: '0 40px 20px 40px' },
            ),
            createButton('Commencer maintenant', {
              'background-color': '#01A8AB',
              color: '#ffffff',
              'font-size': '16px',
              'border-radius': '6px',
              'inner-padding': '14px 40px',
              'font-weight': 'bold',
            }),
          ]),
        ],
        { 'background-color': '#f8f9fa', padding: '40px 20px' },
      ),
  },

  // ── Grille images 2x2 ──
  {
    id: 'composite-image-grid',
    label: 'block_comp_image_grid',
    category: 'composite',
    icon: 'Grid2x2',
    factory: (): EmailNode[] => [
      createSection(
        [
          createColumn(
            [createImage({ src: 'https://via.placeholder.com/280x200/e5e7eb/6b7280?text=Image+1', alt: 'Image 1', 'border-radius': '8px', padding: '5px' })],
            { width: '50%' },
          ),
          createColumn(
            [createImage({ src: 'https://via.placeholder.com/280x200/e5e7eb/6b7280?text=Image+2', alt: 'Image 2', 'border-radius': '8px', padding: '5px' })],
            { width: '50%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '10px 0' },
      ),
      createSection(
        [
          createColumn(
            [createImage({ src: 'https://via.placeholder.com/280x200/e5e7eb/6b7280?text=Image+3', alt: 'Image 3', 'border-radius': '8px', padding: '5px' })],
            { width: '50%' },
          ),
          createColumn(
            [createImage({ src: 'https://via.placeholder.com/280x200/e5e7eb/6b7280?text=Image+4', alt: 'Image 4', 'border-radius': '8px', padding: '5px' })],
            { width: '50%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '0 0 10px 0' },
      ),
    ],
  },

  // ── 3 colonnes fonctionnalités ──
  {
    id: 'composite-features',
    label: 'block_comp_features',
    category: 'composite',
    icon: 'ListChecks',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createImage({ src: 'https://via.placeholder.com/64x64/01A8AB/ffffff?text=%E2%9C%93', alt: 'Feature', width: '50px', align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Rapide</p>', { align: 'center', 'font-size': '16px', color: '#333333', padding: '0 5px 5px 5px' }),
              createText('<p style="margin: 0;">Envoyez vos campagnes en quelques clics.</p>', { align: 'center', 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 10px' }),
            ],
            { width: '33.33%' },
          ),
          createColumn(
            [
              createImage({ src: 'https://via.placeholder.com/64x64/01A8AB/ffffff?text=%E2%98%85', alt: 'Feature', width: '50px', align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Fiable</p>', { align: 'center', 'font-size': '16px', color: '#333333', padding: '0 5px 5px 5px' }),
              createText('<p style="margin: 0;">Un taux de délivrabilité exceptionnel.</p>', { align: 'center', 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 10px' }),
            ],
            { width: '33.33%' },
          ),
          createColumn(
            [
              createImage({ src: 'https://via.placeholder.com/64x64/01A8AB/ffffff?text=%E2%99%A5', alt: 'Feature', width: '50px', align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Simple</p>', { align: 'center', 'font-size': '16px', color: '#333333', padding: '0 5px 5px 5px' }),
              createText('<p style="margin: 0;">Interface intuitive et facile à utiliser.</p>', { align: 'center', 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 10px' }),
            ],
            { width: '33.33%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '30px 10px' },
      ),
  },

  // ── Témoignage ──
  {
    id: 'composite-testimonial',
    label: 'block_comp_testimonial',
    category: 'composite',
    icon: 'Quote',
    factory: () =>
      createSection(
        [
          createColumn([
            createText(
              '<p style="margin: 0; font-style: italic;">"Ce service a complètement transformé notre communication avec nos clients. Les résultats sont au-delà de nos attentes."</p>',
              { align: 'center', 'font-size': '18px', color: '#333333', 'line-height': '1.6', padding: '0 30px 15px 30px' },
            ),
            createImage({
              src: 'https://via.placeholder.com/60x60/cccccc/666666?text=JD',
              alt: 'Avatar',
              width: '50px',
              align: 'center',
              'border-radius': '25px',
              padding: '0 0 8px 0',
            }),
            createText('<p style="margin: 0; font-weight: bold;">Jean Dupont</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0' }),
            createText('<p style="margin: 0;">Directeur Marketing, Entreprise SA</p>', { align: 'center', 'font-size': '12px', color: '#999999', padding: '0' }),
          ]),
        ],
        { 'background-color': '#f8f9fa', padding: '30px 20px' },
      ),
  },

  // ── Offre / Prix ──
  {
    id: 'composite-pricing',
    label: 'block_comp_pricing',
    category: 'composite',
    icon: 'BadgeDollarSign',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold;">Starter</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '20px 10px 5px 10px' }),
              createText('<p style="margin: 0;">19€<span style="font-size: 16px; color: #999;">/mois</span></p>', { align: 'center', 'font-size': '36px', color: '#01A8AB', 'font-weight': 'bold', padding: '5px 10px' }),
              createText('<p style="margin: 0; line-height: 1.8;">1 000 emails/mois<br/>Support email<br/>Templates basiques</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '10px 20px' }),
              createButton('Choisir', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '14px', 'border-radius': '6px', 'inner-padding': '12px 30px', padding: '10px 0 20px 0' }),
            ],
            { width: '50%', border: '1px solid #e5e7eb', 'border-radius': '8px' },
          ),
          createColumn(
            [
              createText('<p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; color: #ffffff; background: #01A8AB; padding: 6px; text-align: center;">Populaire</p>', { padding: '0', 'font-size': '10px' }),
              createText('<p style="margin: 0; font-weight: bold;">Business</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '15px 10px 5px 10px' }),
              createText('<p style="margin: 0;">49€<span style="font-size: 16px; color: #999;">/mois</span></p>', { align: 'center', 'font-size': '36px', color: '#01A8AB', 'font-weight': 'bold', padding: '5px 10px' }),
              createText('<p style="margin: 0; line-height: 1.8;">10 000 emails/mois<br/>Support prioritaire<br/>Templates premium</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '10px 20px' }),
              createButton('Choisir', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '14px', 'border-radius': '6px', 'inner-padding': '12px 30px', padding: '10px 0 20px 0' }),
            ],
            { width: '50%', border: '2px solid #01A8AB', 'border-radius': '8px', 'background-color': '#f0fdfd' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '20px 10px' },
      ),
  },

  // ── Code promo ──
  {
    id: 'composite-coupon',
    label: 'block_comp_promo_code',
    category: 'composite',
    icon: 'Ticket',
    factory: () =>
      createSection(
        [
          createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Offre exclusive</p>', { align: 'center', 'font-size': '12px', color: '#b45309', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-weight: bold;">-30% avec le code</p>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0; font-weight: bold; letter-spacing: 4px;">MESAGOO30</p>', { align: 'center', 'font-size': '28px', color: '#01A8AB', padding: '5px 0 15px 0' }),
            createButton('Utiliser le code', {
              'background-color': '#f59e0b',
              color: '#ffffff',
              'font-size': '14px',
              'border-radius': '6px',
              'inner-padding': '12px 30px',
              'font-weight': 'bold',
            }),
          ]),
        ],
        { 'background-color': '#fffbeb', border: '2px dashed #f59e0b', 'border-radius': '8px', padding: '25px 20px' },
      ),
  },

  // ── Vidéo ──
  {
    id: 'composite-video',
    label: 'block_comp_video',
    category: 'composite',
    icon: 'Play',
    factory: () =>
      createSection(
        [
          createColumn([
            createImage({
              src: 'https://via.placeholder.com/600x340/1a1a2e/ffffff?text=%E2%96%B6+Voir+la+vid%C3%A9o',
              alt: 'Vidéo',
              href: 'https://youtube.com',
              'border-radius': '8px',
              padding: '10px 20px',
            }),
            createText('<p style="margin: 0;">Cliquez pour regarder la vidéo</p>', { align: 'center', 'font-size': '13px', color: '#999999', padding: '5px 0 0 0' }),
          ]),
        ],
        { 'background-color': '#ffffff', padding: '20px 0' },
      ),
  },

  // ── Réseaux sociaux ──
  {
    id: 'composite-social',
    label: 'block_comp_social',
    category: 'composite',
    icon: 'Users',
    factory: () =>
      createSection(
        [
          createColumn([
            createText('<p style="margin: 0; font-weight: bold;">Suivez-nous</p>', { align: 'center', 'font-size': '16px', color: '#333333', padding: '0 0 15px 0' }),
            createSocial(
              [
                createSocialElement('facebook', 'https://facebook.com/'),
                createSocialElement('twitter', 'https://twitter.com/'),
                createSocialElement('instagram', 'https://instagram.com/'),
                createSocialElement('linkedin', 'https://linkedin.com/'),
              ],
              { 'font-size': '12px', 'icon-size': '30px', mode: 'horizontal', align: 'center', padding: '0' },
            ),
          ]),
        ],
        { 'background-color': '#ffffff', padding: '20px 0' },
      ),
  },

  // ── Pied de page ──
  {
    id: 'composite-footer',
    label: 'block_comp_footer',
    category: 'composite',
    icon: 'PanelBottom',
    factory: () =>
      createSection(
        [
          createColumn([
            createSocial(
              [
                createSocialElement('facebook', 'https://facebook.com/', { 'background-color': '#333333' }),
                createSocialElement('twitter', 'https://twitter.com/', { 'background-color': '#333333' }),
                createSocialElement('instagram', 'https://instagram.com/', { 'background-color': '#333333' }),
              ],
              { 'font-size': '11px', 'icon-size': '24px', mode: 'horizontal', align: 'center', padding: '0 0 15px 0', 'icon-padding': '0 8px' },
            ),
            createText(
              '<p style="margin: 0;">Vous recevez cet email car vous êtes inscrit sur notre plateforme.</p>',
              { align: 'center', 'font-size': '12px', color: '#999999', 'line-height': '1.6', padding: '0 20px' },
            ),
            createText(
              '<p style="margin: 0;"><a href="#" style="color: #01A8AB; text-decoration: underline;">Se désinscrire</a> &nbsp;|&nbsp; <a href="#" style="color: #01A8AB; text-decoration: underline;">Préférences</a> &nbsp;|&nbsp; <a href="#" style="color: #01A8AB; text-decoration: underline;">Politique de confidentialité</a></p>',
              { align: 'center', 'font-size': '12px', padding: '10px 0 0 0' },
            ),
            createText(
              '<p style="margin: 0;">&copy; 2026 Votre Entreprise. Tous droits réservés.</p>',
              { align: 'center', 'font-size': '11px', color: '#666666', padding: '15px 0 0 0' },
            ),
          ]),
        ],
        { 'background-color': '#333333', padding: '30px 20px' },
      ),
  },

  // ── Pied de page simple ──
  {
    id: 'composite-footer-minimal',
    label: 'block_comp_footer_simple',
    category: 'composite',
    icon: 'PanelBottomClose',
    factory: () =>
      createSection(
        [
          createColumn([
            createText(
              '<p style="margin: 0;">Vous recevez cet email de la part de Votre Entreprise.<br/><a href="#" style="color: #01A8AB;">Se désinscrire</a></p>',
              { align: 'center', 'font-size': '12px', color: '#999999', 'line-height': '1.6' },
            ),
          ]),
        ],
        { 'background-color': '#f8f9fa', padding: '20px' },
      ),
  },

  // ── Séparateur décoré ──
  {
    id: 'composite-separator',
    label: 'block_comp_separator',
    category: 'composite',
    icon: 'SeparatorHorizontal',
    factory: () =>
      createSection(
        [
          createColumn([
            createDivider({ 'border-color': '#e5e7eb', 'border-width': '1px', padding: '15px 80px' }),
          ]),
        ],
        { padding: '10px 0' },
      ),
  },

  // ── Carte produit ──
  {
    id: 'composite-product-card',
    label: 'block_comp_product_card',
    category: 'composite',
    icon: 'ShoppingBag',
    factory: () =>
      createSection(
        [
          createColumn([
            createImage({
              src: 'https://via.placeholder.com/280x280/f3f4f6/6b7280?text=Produit',
              alt: 'Produit',
              'border-radius': '8px',
              padding: '0 0 10px 0',
            }),
            createText('<p style="margin: 0; font-weight: bold;">Nom du produit</p>', { align: 'center', 'font-size': '16px', color: '#333333', padding: '0 10px 4px 10px' }),
            createText('<p style="margin: 0; text-decoration: line-through; display: inline;">49,99 €</p> <span style="color: #dc2626; font-weight: bold;">29,99 €</span>', { align: 'center', 'font-size': '14px', color: '#999999', padding: '0 10px 12px 10px' }),
            createButton('Acheter', {
              'background-color': '#01A8AB',
              color: '#ffffff',
              'font-size': '14px',
              'border-radius': '6px',
              'inner-padding': '10px 28px',
              padding: '0 10px 10px 10px',
            }),
          ], { width: '33.33%', border: '1px solid #e5e7eb', 'border-radius': '8px' }),
          createColumn([
            createImage({
              src: 'https://via.placeholder.com/280x280/f3f4f6/6b7280?text=Produit',
              alt: 'Produit',
              'border-radius': '8px',
              padding: '0 0 10px 0',
            }),
            createText('<p style="margin: 0; font-weight: bold;">Nom du produit</p>', { align: 'center', 'font-size': '16px', color: '#333333', padding: '0 10px 4px 10px' }),
            createText('<p style="margin: 0;">49,99 €</p>', { align: 'center', 'font-size': '14px', color: '#333333', 'font-weight': 'bold', padding: '0 10px 12px 10px' }),
            createButton('Acheter', {
              'background-color': '#01A8AB',
              color: '#ffffff',
              'font-size': '14px',
              'border-radius': '6px',
              'inner-padding': '10px 28px',
              padding: '0 10px 10px 10px',
            }),
          ], { width: '33.33%', border: '1px solid #e5e7eb', 'border-radius': '8px' }),
          createColumn([
            createImage({
              src: 'https://via.placeholder.com/280x280/f3f4f6/6b7280?text=Produit',
              alt: 'Produit',
              'border-radius': '8px',
              padding: '0 0 10px 0',
            }),
            createText('<p style="margin: 0; font-weight: bold;">Nom du produit</p>', { align: 'center', 'font-size': '16px', color: '#333333', padding: '0 10px 4px 10px' }),
            createText('<p style="margin: 0;">49,99 €</p>', { align: 'center', 'font-size': '14px', color: '#333333', 'font-weight': 'bold', padding: '0 10px 12px 10px' }),
            createButton('Acheter', {
              'background-color': '#01A8AB',
              color: '#ffffff',
              'font-size': '14px',
              'border-radius': '6px',
              'inner-padding': '10px 28px',
              padding: '0 10px 10px 10px',
            }),
          ], { width: '33.33%', border: '1px solid #e5e7eb', 'border-radius': '8px' }),
        ],
        { 'background-color': '#ffffff', padding: '20px 10px' },
      ),
  },

  // ── Notification / Alerte ──
  {
    id: 'composite-notification',
    label: 'block_comp_notification',
    category: 'composite',
    icon: 'Bell',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createImage({
                src: 'https://via.placeholder.com/40x40/01A8AB/ffffff?text=%E2%84%B9',
                alt: 'Info',
                width: '40px',
                align: 'center',
                padding: '0',
              }),
            ],
            { width: '15%', 'vertical-align': 'middle' },
          ),
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold;">Information importante</p>', { 'font-size': '15px', color: '#1e40af', padding: '0 10px 4px 0' }),
              createText('<p style="margin: 0;">Ceci est un message de notification pour informer vos utilisateurs d\'un changement ou d\'une mise à jour.</p>', { 'font-size': '13px', color: '#1e3a5f', 'line-height': '1.5', padding: '0 10px 0 0' }),
            ],
            { width: '85%', 'vertical-align': 'middle' },
          ),
        ],
        { 'background-color': '#eff6ff', padding: '20px', border: '1px solid #bfdbfe', 'border-radius': '8px' },
      ),
  },

  // ── Statistiques / Compteurs ──
  {
    id: 'composite-stats',
    label: 'block_comp_stats',
    category: 'composite',
    icon: 'BarChart3',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold;">12 500</p>', { align: 'center', 'font-size': '32px', color: '#01A8AB', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Utilisateurs</p>', { align: 'center', 'font-size': '11px', color: '#999999', padding: '0' }),
            ],
            { width: '33.33%' },
          ),
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold;">98,5%</p>', { align: 'center', 'font-size': '32px', color: '#01A8AB', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Satisfaction</p>', { align: 'center', 'font-size': '11px', color: '#999999', padding: '0' }),
            ],
            { width: '33.33%' },
          ),
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold;">1M+</p>', { align: 'center', 'font-size': '32px', color: '#01A8AB', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Messages</p>', { align: 'center', 'font-size': '11px', color: '#999999', padding: '0' }),
            ],
            { width: '33.33%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '30px 10px' },
      ),
  },

  // ── Bandeau d'annonce ──
  {
    id: 'composite-announcement',
    label: 'block_comp_announcement',
    category: 'composite',
    icon: 'Megaphone',
    factory: () =>
      createSection(
        [
          createColumn([
            createText(
              '<p style="margin: 0;">🎉 <strong>Nouveau !</strong> Découvrez notre dernière fonctionnalité. <a href="#" style="color: #ffffff; text-decoration: underline;">En savoir plus →</a></p>',
              { align: 'center', 'font-size': '14px', color: '#ffffff', padding: '0' },
            ),
          ]),
        ],
        { 'background-color': '#01A8AB', padding: '12px 20px' },
      ),
  },

  // ── Timeline / Étapes ──
  {
    id: 'composite-timeline',
    label: 'block_comp_steps',
    category: 'composite',
    icon: 'GitBranch',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold; text-align: center;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; text-align: center;">1</span></p>', { align: 'center', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Inscription</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;">Créez votre compte en 2 minutes.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 5px' }),
            ],
            { width: '33.33%' },
          ),
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold; text-align: center;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; text-align: center;">2</span></p>', { align: 'center', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Configuration</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;">Configurez vos préférences.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 5px' }),
            ],
            { width: '33.33%' },
          ),
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold; text-align: center;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; text-align: center;">3</span></p>', { align: 'center', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Envoi</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;">Lancez votre première campagne.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 5px' }),
            ],
            { width: '33.33%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '30px 10px' },
      ),
  },

  // ── Récapitulatif commande ──
  {
    id: 'composite-order-summary',
    label: 'block_comp_order',
    category: 'composite',
    icon: 'Receipt',
    factory: (): EmailNode[] => [
      createSection(
        [
          createColumn([
            createText('<h3 style="margin: 0;">Récapitulatif de commande</h3>', { 'font-size': '18px', color: '#333333', 'font-weight': 'bold', padding: '0 0 15px 0' }),
          ]),
        ],
        { 'background-color': '#ffffff', padding: '25px 25px 5px 25px' },
      ),
      createSection(
        [
          createColumn(
            [
              createImage({ src: 'https://via.placeholder.com/80x80/f3f4f6/6b7280?text=A', alt: 'Produit', width: '60px', padding: '0' }),
            ],
            { width: '15%', 'vertical-align': 'middle' },
          ),
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold;">Article premium</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Quantité : 1</p>', { 'font-size': '12px', color: '#999999', padding: '0' }),
            ],
            { width: '60%', 'vertical-align': 'middle' },
          ),
          createColumn(
            [
              createText('<p style="margin: 0; font-weight: bold; text-align: right;">49,99 €</p>', { 'font-size': '14px', color: '#333333', align: 'right', padding: '0' }),
            ],
            { width: '25%', 'vertical-align': 'middle' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '10px 25px' },
      ),
      createSection(
        [
          createColumn([
            createDivider({ 'border-color': '#e5e7eb', 'border-width': '1px', padding: '10px 0' }),
          ]),
        ],
        { 'background-color': '#ffffff', padding: '0 25px' },
      ),
      createSection(
        [
          createColumn(
            [
              createText('<p style="margin: 0;">Sous-total</p>', { 'font-size': '13px', color: '#666666', padding: '0' }),
              createText('<p style="margin: 0;">Livraison</p>', { 'font-size': '13px', color: '#666666', padding: '4px 0 0 0' }),
              createText('<p style="margin: 0; font-weight: bold; font-size: 16px;">Total</p>', { 'font-size': '16px', color: '#333333', padding: '10px 0 0 0' }),
            ],
            { width: '60%' },
          ),
          createColumn(
            [
              createText('<p style="margin: 0; text-align: right;">49,99 €</p>', { 'font-size': '13px', color: '#666666', align: 'right', padding: '0' }),
              createText('<p style="margin: 0; text-align: right;">Gratuite</p>', { 'font-size': '13px', color: '#16a34a', align: 'right', padding: '4px 0 0 0' }),
              createText('<p style="margin: 0; text-align: right; font-weight: bold; font-size: 16px;">49,99 €</p>', { 'font-size': '16px', color: '#333333', align: 'right', padding: '10px 0 0 0' }),
            ],
            { width: '40%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '5px 25px 25px 25px' },
      ),
    ],
  },

  // ── FAQ ──
  {
    id: 'composite-faq',
    label: 'block_comp_faq',
    category: 'composite',
    icon: 'HelpCircle',
    factory: () =>
      createSection(
        [
          createColumn([
            createText('<h3 style="margin: 0; text-align: center;">Questions fréquentes</h3>', { align: 'center', 'font-size': '20px', color: '#333333', 'font-weight': 'bold', padding: '0 0 20px 0' }),
            createText('<p style="margin: 0; font-weight: bold;">Comment ça marche ?</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0;">Inscrivez-vous, configurez votre compte et commencez à envoyer des messages en quelques minutes.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.6', padding: '0 0 15px 0' }),
            createDivider({ 'border-color': '#f3f4f6', 'border-width': '1px', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; font-weight: bold;">Puis-je annuler à tout moment ?</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0;">Oui, vous pouvez annuler votre abonnement à tout moment sans frais supplémentaires.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.6', padding: '0 0 15px 0' }),
            createDivider({ 'border-color': '#f3f4f6', 'border-width': '1px', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; font-weight: bold;">Quel support proposez-vous ?</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0;">Notre équipe est disponible par email et chat du lundi au vendredi de 9h à 18h.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.6', padding: '0' }),
          ]),
        ],
        { 'background-color': '#ffffff', padding: '30px 25px' },
      ),
  },

  // ── Carte équipe ──
  {
    id: 'composite-team',
    label: 'block_comp_team',
    category: 'composite',
    icon: 'UsersRound',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createImage({ src: 'https://via.placeholder.com/100x100/e5e7eb/6b7280?text=JD', alt: 'Avatar', width: '80px', align: 'center', 'border-radius': '40px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Jean Dupont</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0;">CEO & Fondateur</p>', { align: 'center', 'font-size': '12px', color: '#01A8AB', padding: '0 5px' }),
            ],
            { width: '33.33%' },
          ),
          createColumn(
            [
              createImage({ src: 'https://via.placeholder.com/100x100/e5e7eb/6b7280?text=ML', alt: 'Avatar', width: '80px', align: 'center', 'border-radius': '40px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Marie Laurent</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0;">Directrice Technique</p>', { align: 'center', 'font-size': '12px', color: '#01A8AB', padding: '0 5px' }),
            ],
            { width: '33.33%' },
          ),
          createColumn(
            [
              createImage({ src: 'https://via.placeholder.com/100x100/e5e7eb/6b7280?text=PB', alt: 'Avatar', width: '80px', align: 'center', 'border-radius': '40px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Pierre Bernard</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0;">Responsable Marketing</p>', { align: 'center', 'font-size': '12px', color: '#01A8AB', padding: '0 5px' }),
            ],
            { width: '33.33%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '30px 10px' },
      ),
  },

  // ── Compte à rebours ──
  {
    id: 'composite-countdown',
    label: 'block_comp_countdown',
    category: 'composite',
    icon: 'Timer',
    factory: () =>
      createSection(
        [
          createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Fin de l\'offre dans</p>', { align: 'center', 'font-size': '12px', color: '#dc2626', padding: '0 0 15px 0' }),
          ]),
        ],
        { 'background-color': '#fef2f2', padding: '25px 20px 5px 20px' },
      ),
  },

  // ── Avis client ──
  {
    id: 'composite-review',
    label: 'block_comp_review',
    category: 'composite',
    icon: 'Star',
    factory: () =>
      createSection(
        [
          createColumn([
            createText('<p style="margin: 0; font-size: 24px; text-align: center;">⭐⭐⭐⭐⭐</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-style: italic;">"Service exceptionnel ! L\'intégration a été ultra rapide et le support est très réactif. Je recommande à 100%."</p>', { align: 'center', 'font-size': '15px', color: '#333333', 'line-height': '1.6', padding: '0 30px 15px 30px' }),
            createDivider({ 'border-color': '#e5e7eb', 'border-width': '1px', padding: '0 100px 10px 100px' }),
            createText('<p style="margin: 0; font-weight: bold;">Sophie Martin</p>', { align: 'center', 'font-size': '13px', color: '#333333', padding: '0' }),
            createText('<p style="margin: 0;">Responsable communication</p>', { align: 'center', 'font-size': '11px', color: '#999999', padding: '0' }),
          ]),
        ],
        { 'background-color': '#ffffff', padding: '25px 20px' },
      ),
  },

  // ── Lien app mobile ──
  {
    id: 'composite-app-download',
    label: 'block_comp_mobile_app',
    category: 'composite',
    icon: 'Smartphone',
    factory: () =>
      createSection(
        [
          createColumn(
            [
              createText('<h3 style="margin: 0;">Téléchargez notre app</h3>', { 'font-size': '20px', color: '#333333', 'font-weight': 'bold', padding: '10px 15px 5px 15px' }),
              createText('<p style="margin: 0;">Restez connecté où que vous soyez. Disponible sur iOS et Android.</p>', { 'font-size': '14px', color: '#666666', 'line-height': '1.5', padding: '5px 15px 15px 15px' }),
              createButton('App Store', {
                'background-color': '#000000',
                color: '#ffffff',
                'font-size': '13px',
                'border-radius': '6px',
                'inner-padding': '10px 20px',
                align: 'left',
                padding: '0 15px 8px 15px',
              }),
              createButton('Google Play', {
                'background-color': '#000000',
                color: '#ffffff',
                'font-size': '13px',
                'border-radius': '6px',
                'inner-padding': '10px 20px',
                align: 'left',
                padding: '0 15px 10px 15px',
              }),
            ],
            { width: '55%' },
          ),
          createColumn(
            [
              createImage({
                src: 'https://via.placeholder.com/250x300/f3f4f6/6b7280?text=App+Preview',
                alt: 'App mobile',
                padding: '10px',
              }),
            ],
            { width: '45%' },
          ),
        ],
        { 'background-color': '#ffffff', padding: '20px 0' },
      ),
  },
]
