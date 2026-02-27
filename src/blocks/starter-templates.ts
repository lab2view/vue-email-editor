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

export type TemplateCategory = 'marketing' | 'transactionnel' | 'engagement' | 'evenement' | 'industrie'

export interface StarterTemplate {
  id: string
  label: string
  description: string
  icon: string
  /** Color accent for the template card */
  color: string
  /** Template category for filtering */
  category: TemplateCategory
  /** Search/filter tags */
  tags: string[]
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
          '<p style="margin: 0;">You\'re receiving this email because you signed up on our platform.<br/><a href="#" style="color: #01A8AB; text-decoration: underline;">Unsubscribe</a> &nbsp;|&nbsp; <a href="#" style="color: #01A8AB; text-decoration: underline;">Preferences</a></p>',
          { align: 'center', 'font-size': '11px', color: '#999999', 'line-height': '1.6', padding: '0 20px' },
        ),
        createText(
          '<p style="margin: 0;">&copy; 2026 Your Company. All rights reserved.</p>',
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
    label: 'Blank',
    description: 'Start from scratch',
    icon: 'File',
    color: '#9ca3af',
    category: 'marketing',
    tags: ['empty', 'blank', 'new'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: '' },
      body: createBody([
        createSection([
          createColumn([
            createText('<p style="margin: 0; text-align: center;">Start building your email here.</p>', {
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
    description: 'News and articles',
    icon: 'Newspaper',
    color: '#3b82f6',
    category: 'marketing',
    tags: ['newsletter', 'content', 'blog', 'articles'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'The latest news from our team — February 2026' },
      body: createBody([
        // Top bar
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">View in browser &nbsp;|&nbsp; Unsubscribe</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0' }),
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
              createText('<p style="margin: 0; text-align: right;"><a href="#" style="color: #94a3b8; text-decoration: none; font-size: 13px;">Blog</a> &nbsp;&nbsp;&nbsp; <a href="#" style="color: #94a3b8; text-decoration: none; font-size: 13px;">Products</a> &nbsp;&nbsp;&nbsp; <a href="#" style="color: #94a3b8; text-decoration: none; font-size: 13px;">Contact</a></p>', { align: 'right', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
            ], { width: '70%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#0f172a', padding: '18px 30px' },
        ),
        // Hero image full-width
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop', alt: 'Collaborative team', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Hero text overlay section
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Newsletter — February 2026</p>', { align: 'center', 'font-size': '11px', color: '#01A8AB', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.15;">Innovation at the heart<br/>of your digital strategy</h1>', { align: 'center', 'font-size': '30px', color: '#0f172a', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Discover the trends, tools and strategies transforming marketing in 2026. Our experts share their exclusive insights.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 40px' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px 30px 20px' },
        ),
        // Featured article — large
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Featured article</p>', { align: 'left', 'font-size': '10px', color: '#01A8AB', padding: '0 0 15px 0' }),
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
            createText('<h2 style="margin: 0; line-height: 1.25;">How AI is revolutionizing email marketing in 2026</h2>', { 'font-size': '22px', color: '#0f172a', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">From hyper-targeted personalization to behavior prediction, discover how the highest-performing marketing teams are using artificial intelligence to triple their results...</p>', { 'font-size': '14px', color: '#64748b', 'line-height': '1.65', padding: '0 0 15px 0' }),
            createButton('Read full article', { 'background-color': '#0f172a', color: '#ffffff', 'font-size': '13px', 'border-radius': '8px', 'inner-padding': '12px 28px', 'font-weight': '600', align: 'left', padding: '0' }),
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
                createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Strategy</p>', { 'font-size': '10px', color: '#01A8AB', padding: '0 5px 6px 5px' }),
                createText('<h3 style="margin: 0; line-height: 1.3;">5 growth marketing frameworks to adopt right now</h3>', { 'font-size': '16px', color: '#0f172a', padding: '0 5px 8px 5px' }),
                createText('<p style="margin: 0;">The methodologies that make the difference between teams that stagnate and those that explode...</p>', { 'font-size': '12px', color: '#64748b', 'line-height': '1.55', padding: '0 5px 12px 5px' }),
                createButton('Read →', { 'background-color': 'transparent', color: '#0f172a', 'font-size': '13px', border: '2px solid #0f172a', 'border-radius': '8px', 'inner-padding': '8px 22px', align: 'left', padding: '0 5px', 'font-weight': '600' }),
              ],
              { width: '50%' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=280&h=180&fit=crop', alt: 'Email on laptop', 'border-radius': '10px', padding: '0 0 12px 0' }),
                createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Practical guide</p>', { 'font-size': '10px', color: '#01A8AB', padding: '0 5px 6px 5px' }),
                createText('<h3 style="margin: 0; line-height: 1.3;">Advanced segmentation: the definitive guide</h3>', { 'font-size': '16px', color: '#0f172a', padding: '0 5px 8px 5px' }),
                createText('<p style="margin: 0;">Learn to create ultra-targeted segments that convert 4x better than mass sends...</p>', { 'font-size': '12px', color: '#64748b', 'line-height': '1.55', padding: '0 5px 12px 5px' }),
                createButton('Read →', { 'background-color': 'transparent', color: '#0f172a', 'font-size': '13px', border: '2px solid #0f172a', 'border-radius': '8px', 'inner-padding': '8px 22px', align: 'left', padding: '0 5px', 'font-weight': '600' }),
              ],
              { width: '50%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '25px 25px' },
        ),
        // Quote / Highlight banner
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic; font-size: 20px; line-height: 1.5; color: #ffffff;">"The best time to invest in your email strategy was 5 years ago. The second best time is right now."</p>', { align: 'center', 'font-size': '20px', color: '#ffffff', 'line-height': '1.5', padding: '0 30px 10px 30px' }),
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
                createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Resource</p>', { 'font-size': '10px', color: '#01A8AB', padding: '0 15px 6px 15px' }),
                createText('<h3 style="margin: 0; line-height: 1.3;">Checklist: 25 points for the perfect email</h3>', { 'font-size': '16px', color: '#0f172a', padding: '0 15px 8px 15px' }),
                createText('<p style="margin: 0;">From subject line to footer, every detail counts. Download our complete checklist used by 2000+ marketers.</p>', { 'font-size': '12px', color: '#64748b', 'line-height': '1.55', padding: '0 15px 12px 15px' }),
                createButton('Download for free', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '13px', 'border-radius': '8px', 'inner-padding': '10px 24px', align: 'left', padding: '0 15px', 'font-weight': '600' }),
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
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Subscribers</p>', { align: 'center', 'font-size': '10px', color: '#94a3b8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 28px; color: #01A8AB;">48%</p>', { align: 'center', 'font-size': '28px', color: '#01A8AB', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Open rate</p>', { align: 'center', 'font-size': '10px', color: '#94a3b8', padding: '0' }),
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
    description: 'Sales offer',
    icon: 'Percent',
    color: '#dc2626',
    category: 'marketing',
    tags: ['promotion', 'sale', 'deals', 'offer'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Flash sale -40% on the entire collection — 48 hours only!' },
      body: createBody([
        // Urgency bar
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; letter-spacing: 1px;">FLASH SALE — ENDS IN 47:59:32</p>', { align: 'center', 'font-size': '12px', color: '#ffffff', padding: '0' }),
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
              createText('<p style="margin: 0; text-align: right;"><a href="#" style="color: #666; text-decoration: none; font-size: 12px;">Women</a> &nbsp;&nbsp; <a href="#" style="color: #666; text-decoration: none; font-size: 12px;">Men</a> &nbsp;&nbsp; <a href="#" style="color: #666; text-decoration: none; font-size: 12px;">Accessories</a> &nbsp;&nbsp; <a href="#" style="color: #dc2626; text-decoration: none; font-size: 12px; font-weight: 700;">SALE</a></p>', { align: 'right', 'font-size': '12px', color: '#666', padding: '0' }),
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
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 4px; font-weight: 600;">Exclusive members offer</p>', { align: 'center', 'font-size': '11px', color: '#dc2626', padding: '0 0 8px 0' }),
            createText('<h1 style="margin: 0; font-size: 64px; line-height: 1; font-weight: 900; letter-spacing: -2px;">-40%</h1>', { align: 'center', 'font-size': '64px', color: '#1a1a1a', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0; font-size: 18px;">on the entire spring-summer collection</p>', { align: 'center', 'font-size': '18px', color: '#666666', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; display: inline-block; border: 2px dashed #dc2626; padding: 8px 24px; font-weight: 800; letter-spacing: 5px; font-size: 20px; color: #dc2626;">FLASH40</p>', { align: 'center', 'font-size': '20px', color: '#dc2626', padding: '5px 0 20px 0' }),
            createButton('SHOP NOW', {
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
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">Top picks right now</h2>', { align: 'center', 'font-size': '22px', color: '#1a1a1a', padding: '0 0 3px 0' }),
            createText('<p style="margin: 0; text-align: center;">The most coveted pieces of the season</p>', { align: 'center', 'font-size': '13px', color: '#999999', padding: '0' }),
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
              createButton('Add to cart', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=180&h=220&fit=crop', alt: 'Handbag', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Sac Elégance</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">229,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">137,40 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Add to cart', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=180&h=220&fit=crop', alt: 'Watch', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Montre Classic</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">199,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">119,40 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Add to cart', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#fafafa', padding: '10px 15px' },
        ),
        // Product row 2
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=180&h=220&fit=crop', alt: 'Jacket', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Veste Oversize</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">189,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">113,40 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Add to cart', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=180&h=220&fit=crop', alt: 'Sunglasses', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Lunettes Aviator</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">129,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">77,40 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Add to cart', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=180&h=220&fit=crop', alt: 'Perfume', 'border-radius': '8px', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Parfum Signature</p>', { align: 'center', 'font-size': '13px', color: '#1a1a1a', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #bbb; font-size: 12px;">95,00 €</span></p>', { align: 'center', 'font-size': '12px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #dc2626;">57,00 €</p>', { align: 'center', 'font-size': '16px', color: '#dc2626', padding: '0 5px 8px 5px' }),
              createButton('Add to cart', { 'background-color': '#1a1a1a', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 18px', padding: '0', 'font-weight': '600' }),
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
            createText('<p style="margin: 0; font-weight: 800; font-size: 16px;">Last few hours to take advantage!</p>', { align: 'center', 'font-size': '16px', color: '#1a1a1a', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">Promo code <strong style="color: #dc2626; letter-spacing: 3px; font-size: 18px;">FLASH40</strong> — Valid until February 28 at midnight</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '0 0 18px 0' }),
            createButton('VIEW THE FULL COLLECTION', { 'background-color': '#dc2626', color: '#ffffff', 'font-size': '14px', 'border-radius': '0', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        // Guarantees
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 700;">🚚</p>', { align: 'center', 'font-size': '20px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Free shipping</p>', { align: 'center', 'font-size': '11px', color: '#1a1a1a', padding: '0' }),
              createText('<p style="margin: 0;">On orders over €50</p>', { align: 'center', 'font-size': '10px', color: '#999', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700;">↩️</p>', { align: 'center', 'font-size': '20px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Free returns</p>', { align: 'center', 'font-size': '11px', color: '#1a1a1a', padding: '0' }),
              createText('<p style="margin: 0;">Within 30 days</p>', { align: 'center', 'font-size': '10px', color: '#999', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700;">🔒</p>', { align: 'center', 'font-size': '20px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Secure payment</p>', { align: 'center', 'font-size': '11px', color: '#1a1a1a', padding: '0' }),
              createText('<p style="margin: 0;">Card, PayPal, Apple Pay</p>', { align: 'center', 'font-size': '10px', color: '#999', padding: '0' }),
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
    label: 'Welcome',
    description: 'New customer onboarding',
    icon: 'PartyPopper',
    color: '#01A8AB',
    category: 'engagement',
    tags: ['welcome', 'onboarding', 'signup', 'new user'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Welcome to the community! Your adventure starts here.' },
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
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Welcome</p>', { align: 'center', 'font-size': '11px', color: '#01A8AB', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">We\'re thrilled to have<br/>you with us!</h1>', { align: 'center', 'font-size': '30px', color: '#1a1a2e', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">You\'ve joined a community of over 10,000 professionals transforming their communication. Ready to create memorable campaigns?</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
            createButton('Access my dashboard', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '14px 40px', 'font-weight': '700' }),
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
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">3 steps to get started</h2>', { align: 'center', 'font-size': '22px', color: '#1a1a2e', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Follow this quick guide and launch your first campaign in less than 10 minutes.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
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
              createText('<p style="margin: 0; font-weight: 700;">Customize your profile</p>', { 'font-size': '16px', color: '#1a1a2e', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Logo, colors, information. Your brand, your identity.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.5', padding: '0 15px 10px 15px' }),
              createButton('Complete profile →', { 'background-color': 'transparent', color: '#01A8AB', 'font-size': '13px', border: '2px solid #01A8AB', 'border-radius': '8px', 'inner-padding': '8px 20px', align: 'left', padding: '0 15px', 'font-weight': '600' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        // Step 2
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0;"><span style="display: inline-block; background: #01A8AB; color: #fff; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; font-weight: 800; text-align: center; font-size: 13px;">2</span></p>', { padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 700;">Import your contacts</p>', { 'font-size': '16px', color: '#1a1a2e', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">CSV, Excel or connect your CRM. It\'s automatic.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.5', padding: '0 15px 10px 15px' }),
              createButton('Import my contacts →', { 'background-color': 'transparent', color: '#01A8AB', 'font-size': '13px', border: '2px solid #01A8AB', 'border-radius': '8px', 'inner-padding': '8px 20px', align: 'left', padding: '0 15px', 'font-weight': '600' }),
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
              createText('<p style="margin: 0; font-weight: 700;">Launch your campaign</p>', { 'font-size': '16px', color: '#1a1a2e', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Choose a template, customize it and send. Let\'s go!</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.5', padding: '0 15px 10px 15px' }),
              createButton('Create my campaign →', { 'background-color': 'transparent', color: '#01A8AB', 'font-size': '13px', border: '2px solid #01A8AB', 'border-radius': '8px', 'inner-padding': '8px 20px', align: 'left', padding: '0 15px', 'font-weight': '600' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        // Stats trust bar
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 24px; color: #ffffff;">10K+</p>', { align: 'center', 'font-size': '24px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Users</p>', { align: 'center', 'font-size': '11px', color: 'rgba(255,255,255,0.7)', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 24px; color: #ffffff;">50M+</p>', { align: 'center', 'font-size': '24px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Emails sent</p>', { align: 'center', 'font-size': '11px', color: 'rgba(255,255,255,0.7)', padding: '0' }),
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
            createText('<p style="margin: 0; font-weight: 700;">Need help?</p>', { align: 'center', 'font-size': '15px', color: '#1a1a2e', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0;">Our team is here to support you. <a href="mailto:support@mesagoo.com" style="color: #01A8AB; font-weight: 600;">Contact us</a> or visit our <a href="#" style="color: #01A8AB; font-weight: 600;">help center</a>.</p>', { align: 'center', 'font-size': '13px', color: '#64748b', 'line-height': '1.6', padding: '0 30px' }),
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
    label: 'Order Confirmation',
    description: 'Order receipt',
    icon: 'CheckCircle',
    color: '#16a34a',
    category: 'transactionnel',
    tags: ['order', 'confirmation', 'purchase', 'transactional'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Your order has been confirmed!' },
      body: createBody([
        headerSection(),
        // Confirmation
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 48px;">✅</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0;">Order confirmed!</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Thank you for your purchase. Your order <strong>#12345</strong> is being processed.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 15px 20px' },
        ),
        // Order details
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 12px;">Order details</p>', { 'font-size': '12px', color: '#999999', padding: '0 0 12px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '10px 25px 0 25px' },
        ),
        createSection(
          [
            createColumn([createImage({ src: 'https://picsum.photos/seed/avatarA/80/80', alt: 'Product', width: '60px', padding: '0' })], { width: '15%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Premium item</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Quantity: 2</p>', { 'font-size': '12px', color: '#999999', padding: '0' }),
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
              createText('<p style="margin: 0;">Subtotal</p>', { 'font-size': '13px', color: '#666666', padding: '0' }),
              createText('<p style="margin: 0;">Shipping</p>', { 'font-size': '13px', color: '#666666', padding: '4px 0 0 0' }),
              createText('<p style="margin: 0; font-weight: bold; font-size: 16px;">Total</p>', { 'font-size': '16px', color: '#333333', padding: '10px 0 0 0' }),
            ], { width: '60%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: right;">99,98 €</p>', { 'font-size': '13px', color: '#666666', align: 'right', padding: '0' }),
              createText('<p style="margin: 0; text-align: right; color: #16a34a;">Free</p>', { 'font-size': '13px', color: '#16a34a', align: 'right', padding: '4px 0 0 0' }),
              createText('<p style="margin: 0; text-align: right; font-weight: bold; font-size: 16px;">99,98 €</p>', { 'font-size': '16px', color: '#333333', align: 'right', padding: '10px 0 0 0' }),
            ], { width: '40%' }),
          ],
          { 'background-color': '#ffffff', padding: '5px 25px 20px 25px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Track my order', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '15px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
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
    label: 'Event',
    description: 'Event invitation',
    icon: 'CalendarDays',
    color: '#7c3aed',
    category: 'evenement',
    tags: ['event', 'invitation', 'conference'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'You\'re invited: Annual Conference 2026 — Paris' },
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
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 4px; font-weight: 700;">Exclusive invitation</p>', { align: 'center', 'font-size': '10px', color: '#7c3aed', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.15; font-weight: 900;">Annual Conference<br/>2026</h1>', { align: 'center', 'font-size': '32px', color: '#1a1a2e', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; font-size: 15px;">The unmissable event for digital marketing leaders. Inspiring keynotes, practical workshops, and exclusive networking.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.65', padding: '0 30px 20px 30px' }),
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
              createText('<p style="margin: 0;">Congress Palace</p>', { align: 'center', 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #7c3aed;">9h — 18h</p>', { align: 'center', 'font-size': '16px', color: '#7c3aed', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Full day</p>', { align: 'center', 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f5f3ff', padding: '20px 15px', 'border-radius': '8px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('RESERVE MY SEAT', { 'background-color': '#7c3aed', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
            createText('<p style="margin: 0;">Early bird price: <strong style="color: #7c3aed;">€199</strong> instead of <span style="text-decoration: line-through;">€349</span></p>', { align: 'center', 'font-size': '13px', color: '#64748b', padding: '12px 0 0 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Speakers header
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">Our speakers</h2>', { align: 'center', 'font-size': '22px', color: '#1a1a2e', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Recognized experts share their vision.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
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
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">Schedule</h2>', { align: 'center', 'font-size': '20px', color: '#ffffff', padding: '0 0 20px 0' }),
          ])],
          { 'background-color': '#1a1a2e', padding: '30px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #a78bfa;">09:00</p>', { 'font-size': '14px', color: '#a78bfa', padding: '0 0 3px 0' }),
            ], { width: '20%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #ffffff;">Opening keynote</p>', { 'font-size': '14px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Vision 2026: AI in the service of marketing</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
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
              createText('<p style="margin: 0; font-weight: 700; color: #ffffff;">Round tables</p>', { 'font-size': '14px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Personalization, automation and ROI</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
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
              createText('<p style="margin: 0; font-weight: 700; color: #ffffff;">Practical workshops</p>', { 'font-size': '14px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Hands-on: build your email strategy live</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
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
              createText('<p style="margin: 0; font-weight: 700; color: #ffffff;">Networking cocktail</p>', { 'font-size': '14px', color: '#ffffff', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Meet the speakers and attendees</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
            ], { width: '80%' }),
          ],
          { 'background-color': '#1a1a2e', padding: '8px 30px 30px 30px' },
        ),
        // Final CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700;">Only <strong style="color: #7c3aed;">47 spots</strong> remaining</p>', { align: 'center', 'font-size': '15px', color: '#1a1a2e', padding: '0 0 15px 0' }),
            createButton('BOOK NOW', { 'background-color': '#7c3aed', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
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
    description: 'Alert or update',
    icon: 'Bell',
    color: '#f59e0b',
    category: 'transactionnel',
    tags: ['notification', 'alert', 'update'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Action required on your account' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#f59e0b', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=240&fit=crop', alt: 'Important notification', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main content
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Notification</p>', { align: 'center', 'font-size': '11px', color: '#f59e0b', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Action required</h1>', { align: 'center', 'font-size': '26px', color: '#1a1a2e', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">An important update requires your attention. Please review the details below and take the necessary action.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 5px 20px' },
        ),
        // Info box
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: bold;">Notification details</p>', { 'font-size': '15px', color: '#92400e', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">Your trial period expires in <strong>3 days</strong>. To continue using all features, please update your subscription.</p>', { 'font-size': '14px', color: '#78350f', 'line-height': '1.6', padding: '0 0 15px 0' }),
            createButton('Update now', { 'background-color': '#f59e0b', color: '#ffffff', 'font-size': '14px', 'border-radius': '8px', 'inner-padding': '12px 28px', 'font-weight': '700', align: 'left' }),
          ])],
          { 'background-color': '#fffbeb', padding: '20px 25px', border: '1px solid #fde68a', 'border-radius': '8px' },
        ),
        // Social links
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">If you have any questions, contact our <a href="#" style="color: #f59e0b; font-weight: 600;">help center</a> or write to <a href="mailto:support@mesagoo.com" style="color: #f59e0b; font-weight: 600;">support@mesagoo.com</a></p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', 'line-height': '1.6', padding: '0 20px' }),
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
    label: 'Password Reset',
    description: 'Password reset request',
    icon: 'KeyRound',
    color: '#6366f1',
    category: 'transactionnel',
    tags: ['password', 'security', 'reset'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Reset your password' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#6366f1', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=240&fit=crop', alt: 'Security', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main content
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Security</p>', { align: 'center', 'font-size': '11px', color: '#6366f1', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Password<br/>reset</h1>', { align: 'center', 'font-size': '26px', color: '#1a1a2e', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">We received a request to reset the password for your account. Click the button below to choose a new password.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 20px 20px 20px' }),
            createButton('Reset my password', { 'background-color': '#6366f1', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '14px 36px', 'font-weight': '700' }),
            createText('<p style="margin: 0;">This link expires in 24 hours.</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '15px 0 0 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        createSection(
          [createColumn([
            createDivider({ 'border-color': '#e2e8f0', 'border-width': '1px', padding: '0 60px' }),
            createText('<p style="margin: 0;">If you didn\'t request this reset, you can safely ignore this email.</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', 'line-height': '1.5', padding: '15px 30px 0 30px' }),
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
    label: 'Abandoned Cart',
    description: 'Cart recovery',
    icon: 'ShoppingCart',
    color: '#ea580c',
    category: 'marketing',
    tags: ['cart', 'abandoned', 'e-commerce', 'recovery'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'You left something in your cart!' },
      body: createBody([
        // Branded header
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 20px; letter-spacing: -0.5px;">BOUTIQUE</p>', { 'font-size': '20px', color: '#1a1a1a', padding: '0' }),
            ], { width: '30%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; text-align: right;"><a href="#" style="color: #666; text-decoration: none; font-size: 12px;">My account</a> &nbsp;&nbsp; <a href="#" style="color: #ea580c; text-decoration: none; font-size: 12px; font-weight: 700;">My cart</a></p>', { align: 'right', 'font-size': '12px', color: '#666', padding: '0' }),
            ], { width: '70%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '18px 25px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=260&fit=crop', alt: 'Shopping bags', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main content
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Reminder</p>', { align: 'center', 'font-size': '11px', color: '#ea580c', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">You forgot<br/>something!</h1>', { align: 'center', 'font-size': '26px', color: '#1a1a2e', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">Your items are waiting for you. Complete your order before they sell out.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Cart items
        createSection(
          [
            createColumn([createImage({ src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop', alt: 'Product', width: '80px', padding: '0', 'border-radius': '8px' })], { width: '20%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Sneakers Urban</p>', { 'font-size': '14px', color: '#1a1a2e', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Size: 42 &bull; Color: Black</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
            ], { width: '50%', 'vertical-align': 'middle' }),
            createColumn([createText('<p style="margin: 0; text-align: right; font-weight: bold;">89,00 €</p>', { 'font-size': '15px', color: '#1a1a2e', align: 'right', padding: '0' })], { width: '30%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '10px 25px' },
        ),
        createSection(
          [createColumn([createDivider({ 'border-color': '#e2e8f0', 'border-width': '1px', padding: '0' })])],
          { 'background-color': '#ffffff', padding: '0 25px' },
        ),
        createSection(
          [
            createColumn([createImage({ src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop', alt: 'Product', width: '80px', padding: '0', 'border-radius': '8px' })], { width: '20%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold;">Montre Classic</p>', { 'font-size': '14px', color: '#1a1a2e', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Quantity: 1</p>', { 'font-size': '12px', color: '#94a3b8', padding: '0' }),
            ], { width: '50%', 'vertical-align': 'middle' }),
            createColumn([createText('<p style="margin: 0; text-align: right; font-weight: bold;">149,00 €</p>', { 'font-size': '15px', color: '#1a1a2e', align: 'right', padding: '0' })], { width: '30%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '10px 25px' },
        ),
        // Urgency CTA
        createSection(
          [createColumn([
            createButton('Complete my order', { 'background-color': '#ea580c', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '16px 40px', 'font-weight': '700' }),
            createText('<p style="margin: 0;">Your cart expires in <strong>24 hours</strong> — <span style="color: #ea580c; font-weight: 600;">Free shipping included</span></p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '12px 0 0 0' }),
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
    label: 'Product Launch',
    description: 'New product announcement',
    icon: 'Rocket',
    color: '#0891b2',
    category: 'marketing',
    tags: ['product', 'launch', 'new', 'announcement'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Discover AuraX — Our latest innovation is here' },
      body: createBody([
        // Dark hero with product
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 5px; font-weight: 600;">New</p>', { align: 'center', 'font-size': '11px', color: '#67e8f9', padding: '0 0 15px 0' }),
            createText('<h1 style="margin: 0; font-size: 38px; line-height: 1.1; font-weight: 900; letter-spacing: -1px;">AuraX</h1>', { align: 'center', 'font-size': '38px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-size: 16px;">The next generation has arrived.</p>', { align: 'center', 'font-size': '16px', color: 'rgba(255,255,255,0.7)', padding: '0 0 25px 0' }),
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
            createButton('DISCOVER AURAX', { 'background-color': '#06b6d4', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
            createText('<p style="margin: 0;">Launch offer: <strong style="color: #67e8f9;">-20%</strong> with code <strong style="letter-spacing: 2px;">LAUNCH20</strong></p>', { align: 'center', 'font-size': '13px', color: 'rgba(255,255,255,0.6)', padding: '12px 0 0 0' }),
          ])],
          { 'background-color': '#0c1222', padding: '0 20px 40px 20px' },
        ),
        // Features header
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">Why AuraX changes everything</h2>', { align: 'center', 'font-size': '22px', color: '#0f172a', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">An experience redesigned from the ground up.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
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
              createText('<p style="margin: 0; font-weight: 800; color: #06b6d4;">3x faster</p>', { 'font-size': '16px', color: '#06b6d4', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Completely rewritten engine. Response time cut by 3. Your workflow has never been smoother.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.55', padding: '0 15px' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px' },
        ),
        // Feature 2
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #06b6d4;">Premium design</p>', { 'font-size': '16px', color: '#06b6d4', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Redesigned interface with premium materials, fluid animations, and intuitive ergonomics.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.55', padding: '0 15px' }),
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
              createText('<p style="margin: 0; font-weight: 800; color: #06b6d4;">Maximum security</p>', { 'font-size': '16px', color: '#06b6d4', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">E2E encryption, biometric authentication, and native GDPR compliance. Your data is fully protected.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.55', padding: '0 15px' }),
            ], { width: '60%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px 25px 25px' },
        ),
        // Testimonial
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic; font-size: 18px; line-height: 1.5;">"AuraX transformed the way we work. The performance difference is immediately noticeable."</p>', { align: 'center', 'font-size': '18px', color: '#0f172a', 'line-height': '1.5', padding: '0 30px 10px 30px' }),
            createText('<p style="margin: 0; font-weight: 600;">— Claire Petit, CTO @ InnovateCorp</p>', { align: 'center', 'font-size': '12px', color: '#06b6d4', padding: '0' }),
          ])],
          { 'background-color': '#f0f9ff', padding: '30px 20px' },
        ),
        // Final CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px;">Ready to take it to the next level?</p>', { align: 'center', 'font-size': '18px', color: '#ffffff', padding: '0 0 15px 0' }),
            createButton('ORDER AURAX', { 'background-color': '#06b6d4', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800', 'letter-spacing': '1px' }),
            createText('<p style="margin: 0;">Free shipping — 30-day money-back guarantee</p>', { align: 'center', 'font-size': '11px', color: 'rgba(255,255,255,0.5)', padding: '10px 0 0 0' }),
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
    label: 'Survey',
    description: 'Customer satisfaction',
    icon: 'MessageSquare',
    color: '#059669',
    category: 'engagement',
    tags: ['survey', 'feedback', 'satisfaction', 'review'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Your opinion matters! Share your feedback with us.' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#059669', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=240&fit=crop', alt: 'Feedback and reviews', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main content
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Your opinion</p>', { align: 'center', 'font-size': '11px', color: '#059669', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Your opinion<br/>matters to us</h1>', { align: 'center', 'font-size': '26px', color: '#1a1a2e', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">Help us improve our services by answering this short survey. It will only take 2 minutes!</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Rating
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: bold;">How would you rate your experience?</p>', { align: 'center', 'font-size': '15px', color: '#1a1a2e', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; font-size: 36px; letter-spacing: 8px;">⭐⭐⭐⭐⭐</p>', { align: 'center', padding: '0 0 20px 0' }),
          ])],
          { 'background-color': '#f0fdf4', padding: '25px 20px', 'border-radius': '8px' },
        ),
        createSection(
          [createColumn([
            createButton('Take the survey', { 'background-color': '#059669', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '14px 36px', 'font-weight': '700' }),
            createText('<p style="margin: 0;">As a thank-you, receive <strong style="color: #059669;">10% off</strong> your next purchase.</p>', { align: 'center', 'font-size': '13px', color: '#64748b', padding: '15px 20px 0 20px' }),
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
    label: 'Referral',
    description: 'Referral program',
    icon: 'Users',
    color: '#8b5cf6',
    category: 'engagement',
    tags: ['referral', 'reference', 'reward', 'friends'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Refer your friends and earn rewards!' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#8b5cf6', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=260&fit=crop', alt: 'Partnership and referral', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Referral program</p>', { align: 'center', 'font-size': '11px', color: '#8b5cf6', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Refer, earn!</h1>', { align: 'center', 'font-size': '28px', color: '#1a1a2e', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Invite your friends to join us and receive exclusive rewards for every successful referral.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // How it works
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; text-align: center;"><span style="display: inline-block; background: #8b5cf6; color: #fff; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; font-weight: bold; font-size: 16px;">1</span></p>', { align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Share</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Send your unique link to your friends.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center;"><span style="display: inline-block; background: #8b5cf6; color: #fff; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; font-weight: bold; font-size: 16px;">2</span></p>', { align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">They sign up</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Your friend creates their account for free.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center;"><span style="display: inline-block; background: #8b5cf6; color: #fff; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; font-weight: bold; font-size: 16px;">3</span></p>', { align: 'center', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Earn</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">You each receive €15 in credit.</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0 10px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#faf5ff', padding: '25px 15px' },
        ),
        // Referral code
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Your referral code:</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-weight: bold; letter-spacing: 4px; font-size: 24px; color: #8b5cf6;">PARRAIN2026</p>', { align: 'center', 'font-size': '24px', color: '#8b5cf6', padding: '0 0 15px 0' }),
            createButton('Share now', { 'background-color': '#8b5cf6', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
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
    label: 'Re-engagement',
    description: 'Win back inactive users',
    icon: 'HeartHandshake',
    color: '#e11d48',
    category: 'engagement',
    tags: ['re-engagement', 'inactive', 'win-back', 'loyalty'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'We miss you! Come back with a special offer.' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#e11d48', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=260&fit=crop', alt: 'We miss you', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">We miss you</p>', { align: 'center', 'font-size': '11px', color: '#e11d48', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Come back, we have<br/>great things for you!</h1>', { align: 'center', 'font-size': '26px', color: '#1a1a2e', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">It\'s been a while since we heard from you. We have some exciting things to show you!</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Special offer
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Exclusive comeback offer</p>', { align: 'center', 'font-size': '11px', color: '#e11d48', padding: '0 0 8px 0' }),
            createText('<h2 style="margin: 0; font-size: 38px;">-25%</h2>', { align: 'center', 'font-size': '38px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">on your next order</p>', { align: 'center', 'font-size': '16px', color: '#666666', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: bold; letter-spacing: 3px; color: #e11d48;">COMEBACK25</p>', { align: 'center', 'font-size': '20px', color: '#e11d48', padding: '10px 0 20px 0' }),
            createButton('Come back now', { 'background-color': '#e11d48', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 40px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#fff1f2', padding: '30px 20px', 'border-radius': '8px' },
        ),
        // What's new
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0; text-align: center;">What you\'ve missed</h3>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 24px;">🆕</p>', { align: 'center', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">New collection</p>', { align: 'center', 'font-size': '13px', color: '#333333', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">Over 50 new items.</p>', { align: 'center', 'font-size': '11px', color: '#666666', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 24px;">🚚</p>', { align: 'center', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Free shipping</p>', { align: 'center', 'font-size': '13px', color: '#333333', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">On all orders.</p>', { align: 'center', 'font-size': '11px', color: '#666666', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; text-align: center; font-size: 24px;">⭐</p>', { align: 'center', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Loyalty program</p>', { align: 'center', 'font-size': '13px', color: '#333333', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">Accumulate bonus points.</p>', { align: 'center', 'font-size': '11px', color: '#666666', padding: '0 5px' }),
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
    label: 'Webinar',
    description: 'Webinar invitation',
    icon: 'Video',
    color: '#2563eb',
    category: 'evenement',
    tags: ['webinar', 'online', 'presentation', 'training'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Join our free webinar!' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#2563eb', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=260&fit=crop', alt: 'Conference and webinar', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main content
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Free webinar</p>', { align: 'center', 'font-size': '11px', color: '#2563eb', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Master email marketing in 2026</h1>', { align: 'center', 'font-size': '26px', color: '#1a1a2e', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">Join our experts for a 60-minute live session packed with concrete strategies and real-world case studies.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Event details
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 11px;">Date</p>', { 'font-size': '11px', color: '#2563eb', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Thursday March 20, 2026</p>', { 'font-size': '14px', color: '#1a1a2e', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 11px;">Time</p>', { 'font-size': '11px', color: '#2563eb', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">2:00 PM - 3:00 PM (CET)</p>', { 'font-size': '14px', color: '#1a1a2e', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 11px;">Location</p>', { 'font-size': '11px', color: '#2563eb', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Online (Zoom)</p>', { 'font-size': '14px', color: '#1a1a2e', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#eff6ff', padding: '20px 15px', 'border-radius': '8px' },
        ),
        // Speaker
        createSection(
          [
            createColumn([createImage({ src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop', alt: 'Speaker', width: '80px', 'border-radius': '50%', padding: '0' })], { width: '20%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700;">Marie Dupont</p>', { 'font-size': '15px', color: '#1a1a2e', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Marketing Director, 15 years of experience in email marketing and automation.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.5', padding: '0' }),
            ], { width: '80%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '20px 25px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Sign up for free', { 'background-color': '#2563eb', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '14px 36px', 'font-weight': '700' }),
            createText('<p style="margin: 0;">Limited to 200 attendees</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '10px 0 0 0' }),
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
    label: 'Receipt',
    description: 'Payment receipt',
    icon: 'Receipt',
    color: '#0d9488',
    category: 'transactionnel',
    tags: ['receipt', 'payment', 'invoice', 'transaction'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Your payment receipt' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#0d9488', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=240&fit=crop', alt: 'Payment receipt', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0;">Payment receipt</h2>', { align: 'center', 'font-size': '22px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Transaction #TXN-2026-0001</p>', { align: 'center', 'font-size': '13px', color: '#999999', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px 10px 20px' },
        ),
        // Receipt details
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; color: #999;">Description</p>', { 'font-size': '11px', color: '#999999', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0;">Professional Plan</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0;">Period: March 2026</p>', { 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '60%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; color: #999; text-align: right;">Amount</p>', { 'font-size': '11px', color: '#999999', align: 'right', padding: '0 0 10px 0' }),
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
              createText('<p style="margin: 0; color: #666;">Subtotal</p>', { 'font-size': '13px', color: '#666666', padding: '0' }),
              createText('<p style="margin: 0; color: #666;">VAT (20%)</p>', { 'font-size': '13px', color: '#666666', padding: '4px 0 0 0' }),
              createText('<p style="margin: 0; font-weight: bold; font-size: 15px; margin-top: 8px;">Total incl. tax</p>', { 'font-size': '15px', color: '#333333', padding: '8px 0 0 0' }),
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
            createText('<p style="margin: 0;"><strong>Payment method:</strong> Visa •••• 4242</p>', { 'font-size': '12px', color: '#666666', padding: '0 0 3px 0' }),
            createText('<p style="margin: 0;"><strong>Date:</strong> February 25, 2026</p>', { 'font-size': '12px', color: '#666666', padding: '0' }),
          ])],
          { 'background-color': '#f8f9fa', padding: '15px 25px', 'border-radius': '8px' },
        ),
        createSection(
          [createColumn([
            createButton('Download PDF invoice', { 'background-color': '#0d9488', color: '#ffffff', 'font-size': '14px', 'border-radius': '6px', 'inner-padding': '12px 28px', 'font-weight': 'bold' }),
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
    label: 'Shipping',
    description: 'Shipping confirmation',
    icon: 'Truck',
    color: '#0284c7',
    category: 'transactionnel',
    tags: ['shipping', 'delivery', 'package', 'tracking'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Your order is on its way!' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#0284c7', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=240&fit=crop', alt: 'Package delivery', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0;">Your package is on its way!</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Great news! Your order <strong>#12345</strong> has been shipped and is on its way to you.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Tracking steps
        createSection(
          [createColumn([
            createText('<p style="margin: 0;"><span style="color: #16a34a; font-weight: bold;">✓</span> Order confirmed</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;"><span style="color: #16a34a; font-weight: bold;">✓</span> Preparation complete</p>', { 'font-size': '14px', color: '#333333', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;"><span style="color: #0284c7; font-weight: bold;">●</span> <strong>In transit</strong></p>', { 'font-size': '14px', color: '#0284c7', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;"><span style="color: #d1d5db;">○</span> <span style="color: #999;">Delivered</span></p>', { 'font-size': '14px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#f0f9ff', padding: '20px 30px', 'border-radius': '8px' },
        ),
        // Shipping details
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Carrier</p>', { 'font-size': '11px', color: '#999999', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Colissimo</p>', { 'font-size': '14px', color: '#333333', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Tracking no.</p>', { 'font-size': '11px', color: '#999999', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">8R 123 456 789 0</p>', { 'font-size': '14px', color: '#333333', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Estimated delivery</p>', { 'font-size': '11px', color: '#999999', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Feb 27-28</p>', { 'font-size': '14px', color: '#333333', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#ffffff', padding: '20px 20px' },
        ),
        createSection(
          [createColumn([
            createButton('Track my package', { 'background-color': '#0284c7', color: '#ffffff', 'font-size': '15px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
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
    label: 'Birthday',
    description: 'Birthday wishes',
    icon: 'Cake',
    color: '#ec4899',
    category: 'engagement',
    tags: ['birthday', 'celebration', 'special offer', 'gift'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Happy birthday! A gift is waiting for you 🎂' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#ec4899', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=240&fit=crop', alt: 'Birthday celebration', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0;">Happy birthday!</h1>', { align: 'center', 'font-size': '28px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">The whole team wishes you a wonderful birthday. To celebrate this special day, we have a little gift for you!</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Gift
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-align: center; font-size: 36px;">🎁</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px;">Your gift</p>', { align: 'center', 'font-size': '11px', color: '#ec4899', padding: '0 0 8px 0' }),
            createText('<h2 style="margin: 0; font-size: 36px;">-30%</h2>', { align: 'center', 'font-size': '36px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">on everything, just for you!</p>', { align: 'center', 'font-size': '15px', color: '#666666', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: bold; letter-spacing: 3px; color: #ec4899;">BIRTHDAY30</p>', { align: 'center', 'font-size': '22px', color: '#ec4899', padding: '10px 0 20px 0' }),
            createButton('Open my gift', { 'background-color': '#ec4899', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 40px', 'font-weight': 'bold' }),
            createText('<p style="margin: 0;">Valid for 7 days</p>', { align: 'center', 'font-size': '12px', color: '#999999', padding: '10px 0 0 0' }),
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
    label: 'Seasonal Sale',
    description: 'Seasonal promotions',
    icon: 'Snowflake',
    color: '#1d4ed8',
    category: 'marketing',
    tags: ['sale', 'season', 'promotion', 'discount'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'The sales are here! Up to -50% on selected items.' },
      body: createBody([
        // Top banner
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">❄️ WINTER SALE — Up to -50% ❄️</p>', { align: 'center', 'font-size': '13px', color: '#ffffff', 'font-weight': 'bold', padding: '0' }),
          ])],
          { 'background-color': '#1d4ed8', padding: '10px 20px' },
        ),
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#1d4ed8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=240&fit=crop', alt: 'Winter sale', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Hero
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px;">Winter sale</p>', { align: 'center', 'font-size': '12px', color: '#1d4ed8', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0; font-size: 40px;">-50%</h1>', { align: 'center', 'font-size': '40px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0; font-size: 18px;">on hundreds of items</p>', { align: 'center', 'font-size': '18px', color: '#666666', padding: '0 0 20px 0' }),
            createButton('See deals', { 'background-color': '#1d4ed8', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '16px 40px', 'font-weight': 'bold' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        // Categories
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0; text-align: center;">By category</h3>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#f8f9fa', padding: '25px 20px 10px 20px' },
        ),
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1558171813-01f29a37a4d1?w=180&h=120&fit=crop', alt: 'Fashion', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Fashion</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; color: #1d4ed8; font-weight: bold;">Up to -50%</p>', { align: 'center', 'font-size': '13px', color: '#1d4ed8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=180&h=120&fit=crop', alt: 'Home', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Home</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; color: #1d4ed8; font-weight: bold;">Up to -40%</p>', { align: 'center', 'font-size': '13px', color: '#1d4ed8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=180&h=120&fit=crop', alt: 'Tech', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: bold;">Tech</p>', { align: 'center', 'font-size': '14px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; color: #1d4ed8; font-weight: bold;">Up to -30%</p>', { align: 'center', 'font-size': '13px', color: '#1d4ed8', padding: '0' }),
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
    label: 'SaaS Onboarding',
    description: 'App onboarding sequence',
    icon: 'GraduationCap',
    color: '#7c3aed',
    category: 'engagement',
    tags: ['onboarding', 'saas', 'welcome', 'getting started'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Your quick start guide' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#7c3aed', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=240&fit=crop', alt: 'Team onboarding', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0;">Get started in 5 minutes 🚀</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Your account is ready! Follow these simple steps to get the most out of your new tool.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
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
              createText('<p style="margin: 0; font-weight: bold;">Complete your profile</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Add your logo, colors and company information to personalize the experience.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 0 8px 0' }),
              createButton('Complete profile →', { 'background-color': 'transparent', color: '#7c3aed', 'font-size': '13px', border: '1px solid #7c3aed', 'border-radius': '6px', 'inner-padding': '8px 20px', align: 'left', padding: '0' }),
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
              createText('<p style="margin: 0; font-weight: bold;">Import your contacts</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Upload your CSV file or connect your CRM to sync automatically.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 0 8px 0' }),
              createButton('Import contacts →', { 'background-color': 'transparent', color: '#7c3aed', 'font-size': '13px', border: '1px solid #7c3aed', 'border-radius': '6px', 'inner-padding': '8px 20px', align: 'left', padding: '0' }),
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
              createText('<p style="margin: 0; font-weight: bold;">Create your first campaign</p>', { 'font-size': '15px', color: '#333333', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Choose a template, customize it and send your first email in just a few clicks.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.5', padding: '0 0 8px 0' }),
              createButton('Create a campaign →', { 'background-color': 'transparent', color: '#7c3aed', 'font-size': '13px', border: '1px solid #7c3aed', 'border-radius': '6px', 'inner-padding': '8px 20px', align: 'left', padding: '0' }),
            ], { width: '90%' }),
          ],
          { 'background-color': '#ffffff', padding: '15px 25px 20px 25px' },
        ),
        // Help
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Need help? Visit our <a href="#" style="color: #7c3aed;">help center</a> or write to us at <a href="mailto:support@mesagoo.com" style="color: #7c3aed;">support@mesagoo.com</a>.</p>', { align: 'center', 'font-size': '13px', color: '#666666', padding: '0' }),
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
    label: 'Testimonials',
    description: 'Customer reviews & social proof',
    icon: 'Star',
    color: '#d97706',
    category: 'marketing',
    tags: ['testimonials', 'reviews', 'customers', 'social proof'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Discover what our customers are saying about us' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#d97706', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=240&fit=crop', alt: 'Happy customers', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0;">They trust us</h1>', { align: 'center', 'font-size': '24px', color: '#333333', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Join over 10,000 companies that use our solution every day.</p>', { align: 'center', 'font-size': '15px', color: '#666666', 'line-height': '1.6', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Testimonial 1
        createSection(
          [
            createColumn([createImage({ src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', alt: 'Jean Dupont', width: '60px', 'border-radius': '50%', padding: '0' })], { width: '15%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0;">⭐⭐⭐⭐⭐</p>', { 'font-size': '14px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-style: italic;">"Incredible tool! Our open rates increased by 40% in 3 months. The interface is intuitive and the customer support is exceptional."</p>', { 'font-size': '14px', color: '#333333', 'line-height': '1.6', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0;"><strong>Jean Dupont</strong> — Marketing Director, TechCorp</p>', { 'font-size': '12px', color: '#999999', padding: '0' }),
            ], { width: '85%' }),
          ],
          { 'background-color': '#fffbeb', padding: '20px', 'border-radius': '8px' },
        ),
        createSpacer({ height: '10px' }),
        // Testimonial 2
        createSection(
          [
            createColumn([createImage({ src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', alt: 'Marie Lefebvre', width: '60px', 'border-radius': '50%', padding: '0' })], { width: '15%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0;">⭐⭐⭐⭐⭐</p>', { 'font-size': '14px', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0; font-style: italic;">"The best email solution we\'ve tested. Simple, powerful and affordable. We abandoned Mailchimp for this!"</p>', { 'font-size': '14px', color: '#333333', 'line-height': '1.6', padding: '0 0 8px 0' }),
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
              createText('<p style="margin: 0;">Companies</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 28px; color: #d97706;">4.9/5</p>', { align: 'center', 'font-size': '28px', color: '#d97706', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Average rating</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 28px; color: #d97706;">50M+</p>', { align: 'center', 'font-size': '28px', color: '#d97706', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Emails sent</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#ffffff', padding: '25px 15px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Try for free', { 'background-color': '#d97706', color: '#ffffff', 'font-size': '16px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
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
    label: 'Real Estate',
    description: 'Property listing',
    icon: 'Home',
    color: '#15803d',
    category: 'industrie',
    tags: ['real estate', 'listing', 'property', 'agency'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'New listing: 3-room apartment with terrace' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#15803d', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=560&h=280&fit=crop', alt: 'Property', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),

        // Property info
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">New listing</p>', { 'font-size': '11px', color: '#15803d', padding: '0 0 5px 0' }),
            createText('<h1 style="margin: 0;">3-room apartment with terrace</h1>', { 'font-size': '22px', color: '#333333', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">📍 Paris 11th — Bastille district</p>', { 'font-size': '14px', color: '#666666', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: bold; font-size: 24px; color: #15803d;">425 000 €</p>', { 'font-size': '24px', color: '#15803d', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '5px 25px 10px 25px' },
        ),
        // Features
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 18px;">65 m²</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Floor area</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 18px;">3</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Rooms</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 18px;">2</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Bedrooms</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '25%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: bold; font-size: 18px;">12 m²</p>', { align: 'center', 'font-size': '18px', color: '#333333', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Terrace</p>', { align: 'center', 'font-size': '12px', color: '#666666', padding: '0' }),
            ], { width: '25%' }),
          ],
          { 'background-color': '#f0fdf4', padding: '20px 15px', 'border-radius': '8px' },
        ),
        // Description
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Charming tastefully renovated apartment on the 4th floor with elevator. Bright, through-plan layout, with a beautiful south-facing terrace. Fitted kitchen, original hardwood floors, high ceilings.</p>', { 'font-size': '14px', color: '#666666', 'line-height': '1.6', padding: '0 0 15px 0' }),
            createButton('View full listing', { 'background-color': '#15803d', color: '#ffffff', 'font-size': '15px', 'border-radius': '6px', 'inner-padding': '14px 36px', 'font-weight': 'bold' }),
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
    description: 'Menu & reservation',
    icon: 'UtensilsCrossed',
    color: '#b45309',
    category: 'industrie',
    tags: ['restaurant', 'menu', 'reservation', 'gastronomy'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'New seasonal menu — Book your table at Le Comptoir' },
      body: createBody([
        // Restaurant name on dark
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 300; font-size: 28px; letter-spacing: 8px; text-transform: uppercase;">Le Comptoir</p>', { align: 'center', 'font-size': '28px', color: '#d4a574', padding: '0 0 3px 0' }),
            createText('<p style="margin: 0; letter-spacing: 3px; text-transform: uppercase;">French gastronomic cuisine</p>', { align: 'center', 'font-size': '10px', color: 'rgba(255,255,255,0.5)', padding: '0' }),
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
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 4px; font-weight: 600;">New menu</p>', { align: 'center', 'font-size': '10px', color: '#b45309', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0; font-weight: 300; font-size: 28px; line-height: 1.3;">Seasonal Menu<br/><em>Spring 2026</em></h1>', { align: 'center', 'font-size': '28px', color: '#1a1a1a', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">A menu reimagined around seasonal produce, elevated by our Michelin-starred Chef. Every dish tells a story.</p>', { align: 'center', 'font-size': '14px', color: '#78716c', 'line-height': '1.7', padding: '0 30px' }),
          ])],
          { 'background-color': '#faf8f5', padding: '35px 20px 25px 20px' },
        ),
        // Menu items with photos
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=260&h=200&fit=crop', alt: 'Starter', 'border-radius': '10px', padding: '0' }),
            ], { width: '45%', 'vertical-align': 'top' }),
            createColumn([
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Starter</p>', { 'font-size': '10px', color: '#b45309', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 700; font-size: 16px;">Carpaccio de Saint-Jacques</p>', { 'font-size': '16px', color: '#1a1a1a', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Citrus, Aquitaine caviar, toasted hazelnut oil and Guérande fleur de sel.</p>', { 'font-size': '12px', color: '#78716c', 'line-height': '1.55', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #b45309;">24 €</p>', { 'font-size': '18px', color: '#b45309', padding: '0 15px' }),
            ], { width: '55%', 'vertical-align': 'top' }),
          ],
          { 'background-color': '#faf8f5', padding: '15px 25px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Main course</p>', { 'font-size': '10px', color: '#b45309', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 700; font-size: 16px;">Wagyu Beef Fillet</p>', { 'font-size': '16px', color: '#1a1a1a', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Périgueux sauce, crispy Dauphine potatoes, garden vegetables glazed with hazelnut butter.</p>', { 'font-size': '12px', color: '#78716c', 'line-height': '1.55', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #b45309;">42 €</p>', { 'font-size': '18px', color: '#b45309', padding: '0 15px' }),
            ], { width: '55%', 'vertical-align': 'top' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=260&h=200&fit=crop', alt: 'Main course', 'border-radius': '10px', padding: '0' }),
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
              createText('<p style="margin: 0; font-weight: 700; font-size: 16px;">Grand Marnier Soufflé</p>', { 'font-size': '16px', color: '#1a1a1a', padding: '0 15px 5px 15px' }),
              createText('<p style="margin: 0;">Madagascar vanilla crème anglaise, lace tuile and candied orange zest.</p>', { 'font-size': '12px', color: '#78716c', 'line-height': '1.55', padding: '0 15px 8px 15px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #b45309;">16 €</p>', { 'font-size': '18px', color: '#b45309', padding: '0 15px' }),
            ], { width: '55%', 'vertical-align': 'top' }),
          ],
          { 'background-color': '#faf8f5', padding: '15px 25px' },
        ),
        // Menu degustation
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Tasting menu</p>', { align: 'center', 'font-size': '10px', color: 'rgba(255,255,255,0.6)', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-weight: 300; font-size: 22px;">5 courses &nbsp;•&nbsp; wine pairing</p>', { align: 'center', 'font-size': '22px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-weight: 800; font-size: 32px; color: #d4a574;">€85 / person</p>', { align: 'center', 'font-size': '32px', color: '#d4a574', padding: '0 0 20px 0' }),
            createButton('BOOK NOW', { 'background-color': '#b45309', color: '#ffffff', 'font-size': '14px', 'border-radius': '0', 'inner-padding': '14px 40px', 'font-weight': '700', 'letter-spacing': '2px' }),
          ])],
          { 'background-color': '#1a1a1a', padding: '35px 20px' },
        ),
        // Info
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #b45309;">Address</p>', { 'font-size': '11px', color: '#b45309', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">12 rue de la Gastronomie<br/>75003 Paris</p>', { 'font-size': '13px', color: '#78716c', 'line-height': '1.5', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; color: #b45309;">Hours</p>', { 'font-size': '11px', color: '#b45309', padding: '0 0 5px 0' }),
              createText('<p style="margin: 0;">Tue - Sat: 12pm-2pm / 7pm-10pm<br/>Sunday: 12pm-3pm</p>', { 'font-size': '13px', color: '#78716c', 'line-height': '1.5', padding: '0' }),
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

  // 23. Flash Sale
  {
    id: 'flash-sale',
    label: 'Flash Sale',
    description: 'Limited-time flash sale',
    icon: 'Zap',
    color: '#e11d48',
    category: 'marketing',
    tags: ['flash', 'sale', 'urgent', 'limited'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: '⚡ Flash Sale — Up to 60% off today only!' },
      body: createBody([
        // Urgency countdown bar
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; letter-spacing: 2px;">⚡ FLASH SALE — ENDS IN 23:59:00 — ⚡ FLASH SALE</p>', { align: 'center', 'font-size': '12px', color: '#ffffff', padding: '0' }),
          ])],
          { 'background-color': '#e11d48', padding: '10px 20px' },
        ),
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#e11d48', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '18px 20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=280&fit=crop', alt: 'Flash sale', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main headline
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">Today Only</p>', { align: 'center', 'font-size': '11px', color: '#e11d48', padding: '0 0 10px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.1; font-weight: 900;">Up to 60% OFF<br/>Everything</h1>', { align: 'center', 'font-size': '32px', color: '#1a1a2e', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Incredible deals on our best products — limited stock, while supplies last.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.6', padding: '0 40px 20px 40px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // 3 featured products
        createSection(
          [
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop', alt: 'Watch', 'border-radius': '10px', padding: '0 0 10px 0' }),
                createText('<p style="margin: 0; text-decoration: line-through; color: #94a3b8;">$199</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0 5px 2px 5px' }),
                createText('<p style="margin: 0; font-weight: 800; color: #e11d48;">$79</p>', { align: 'center', 'font-size': '20px', color: '#e11d48', padding: '0 5px 5px 5px' }),
                createText('<p style="margin: 0; font-weight: 600;">Premium Watch</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 5px 5px' }),
                createButton('Buy now', { 'background-color': '#e11d48', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 18px', 'font-weight': '700' }),
              ],
              { width: '33.33%' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&h=200&fit=crop', alt: 'Sneakers', 'border-radius': '10px', padding: '0 0 10px 0' }),
                createText('<p style="margin: 0; text-decoration: line-through; color: #94a3b8;">$149</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0 5px 2px 5px' }),
                createText('<p style="margin: 0; font-weight: 800; color: #e11d48;">$59</p>', { align: 'center', 'font-size': '20px', color: '#e11d48', padding: '0 5px 5px 5px' }),
                createText('<p style="margin: 0; font-weight: 600;">Sport Sneakers</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 5px 5px' }),
                createButton('Buy now', { 'background-color': '#e11d48', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 18px', 'font-weight': '700' }),
              ],
              { width: '33.33%' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop', alt: 'Camera', 'border-radius': '10px', padding: '0 0 10px 0' }),
                createText('<p style="margin: 0; text-decoration: line-through; color: #94a3b8;">$299</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0 5px 2px 5px' }),
                createText('<p style="margin: 0; font-weight: 800; color: #e11d48;">$119</p>', { align: 'center', 'font-size': '20px', color: '#e11d48', padding: '0 5px 5px 5px' }),
                createText('<p style="margin: 0; font-weight: 600;">Instant Camera</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 5px 5px' }),
                createButton('Buy now', { 'background-color': '#e11d48', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 18px', 'font-weight': '700' }),
              ],
              { width: '33.33%' },
            ),
          ],
          { 'background-color': '#fff5f7', padding: '20px 15px 25px 15px' },
        ),
        // Big CTA
        createSection(
          [createColumn([
            createButton('SHOP NOW — 60% OFF', { 'background-color': '#e11d48', color: '#ffffff', 'font-size': '17px', 'border-radius': '8px', 'inner-padding': '18px 50px', 'font-weight': '900', 'letter-spacing': '1px' }),
            createText('<p style="margin: 0;">Free shipping on orders over $50 &nbsp;·&nbsp; No code needed</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '10px 0 0 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px' },
        ),
        // Promo code section
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Extra 10% off with code:</p>', { align: 'center', 'font-size': '13px', color: '#64748b', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: 900; font-size: 28px; letter-spacing: 6px; color: #e11d48; border: 2px dashed #e11d48; display: inline-block; padding: 8px 20px; border-radius: 6px;">FLASH10</p>', { align: 'center', 'font-size': '28px', color: '#e11d48', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Valid today only · Cannot be combined with other offers</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#fff5f7', padding: '25px 20px', border: '2px dashed #fecdd3' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 24. Loyalty Program
  {
    id: 'loyalty-program',
    label: 'Loyalty Program',
    description: 'Loyalty rewards update',
    icon: 'Award',
    color: '#7c3aed',
    category: 'marketing',
    tags: ['loyalty', 'rewards', 'points', 'program'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Your rewards are waiting — 2,450 points to redeem!' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#7c3aed', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=280&fit=crop', alt: 'Loyalty rewards', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Welcome + tier status
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Loyalty Program</p>', { align: 'center', 'font-size': '11px', color: '#7c3aed', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Your rewards<br/>are waiting, Alex!</h1>', { align: 'center', 'font-size': '28px', color: '#1a1a2e', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0; display: inline-block; background: #f5f3ff; border: 1px solid #7c3aed; color: #7c3aed; font-weight: 700; padding: 6px 18px; border-radius: 20px;">★ GOLD MEMBER</p>', { align: 'center', 'font-size': '13px', color: '#7c3aed', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Points balance
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Your balance</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-weight: 900; font-size: 48px; color: #7c3aed; line-height: 1;">2,450</p>', { align: 'center', 'font-size': '48px', color: '#7c3aed', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0; font-weight: 600;">points available</p>', { align: 'center', 'font-size': '15px', color: '#1a1a2e', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">You need <strong style="color: #7c3aed;">550 more points</strong> to reach Platinum status.</p>', { align: 'center', 'font-size': '13px', color: '#64748b', padding: '0 30px' }),
          ])],
          { 'background-color': '#f5f3ff', padding: '25px 20px' },
        ),
        // 3 rewards to redeem
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center;">Redeem your points</h2>', { align: 'center', 'font-size': '20px', color: '#1a1a2e', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Choose a reward below and enjoy an exclusive benefit.</p>', { align: 'center', 'font-size': '14px', color: '#64748b', padding: '0 0 5px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn(
              [
                createText('<p style="margin: 0; font-size: 28px;">🎁</p>', { align: 'center', 'font-size': '28px', color: '#1a1a2e', padding: '0 0 8px 0' }),
                createText('<p style="margin: 0; font-weight: 700;">$10 Voucher</p>', { align: 'center', 'font-size': '14px', color: '#1a1a2e', padding: '0 5px 4px 5px' }),
                createText('<p style="margin: 0; font-weight: 800; color: #7c3aed;">500 pts</p>', { align: 'center', 'font-size': '16px', color: '#7c3aed', padding: '0 5px 8px 5px' }),
                createButton('Redeem', { 'background-color': '#7c3aed', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 20px', 'font-weight': '700' }),
              ],
              { width: '33.33%' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; font-size: 28px;">🚚</p>', { align: 'center', 'font-size': '28px', color: '#1a1a2e', padding: '0 0 8px 0' }),
                createText('<p style="margin: 0; font-weight: 700;">Free Shipping</p>', { align: 'center', 'font-size': '14px', color: '#1a1a2e', padding: '0 5px 4px 5px' }),
                createText('<p style="margin: 0; font-weight: 800; color: #7c3aed;">200 pts</p>', { align: 'center', 'font-size': '16px', color: '#7c3aed', padding: '0 5px 8px 5px' }),
                createButton('Redeem', { 'background-color': '#7c3aed', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 20px', 'font-weight': '700' }),
              ],
              { width: '33.33%' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; font-size: 28px;">⭐</p>', { align: 'center', 'font-size': '28px', color: '#1a1a2e', padding: '0 0 8px 0' }),
                createText('<p style="margin: 0; font-weight: 700;">VIP Early Access</p>', { align: 'center', 'font-size': '14px', color: '#1a1a2e', padding: '0 5px 4px 5px' }),
                createText('<p style="margin: 0; font-weight: 800; color: #7c3aed;">1,000 pts</p>', { align: 'center', 'font-size': '16px', color: '#7c3aed', padding: '0 5px 8px 5px' }),
                createButton('Redeem', { 'background-color': '#7c3aed', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 20px', 'font-weight': '700' }),
              ],
              { width: '33.33%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '10px 15px 20px 15px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('View my rewards', { 'background-color': '#7c3aed', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800' }),
            createText('<p style="margin: 0;">Points expire 12 months after your last activity.</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '10px 0 0 0' }),
          ])],
          { 'background-color': '#f5f3ff', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 25. Case Study
  {
    id: 'case-study',
    label: 'Case Study',
    description: 'Customer success story',
    icon: 'TrendingUp',
    color: '#0891b2',
    category: 'marketing',
    tags: ['case study', 'success', 'results', 'story'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'How TechFlow achieved +150% revenue with Mesagoo' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#0891b2', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=280&fit=crop', alt: 'Business results', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Header text
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">Customer Success Story</p>', { align: 'center', 'font-size': '11px', color: '#0891b2', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">How TechFlow grew<br/>revenue by 150%</h1>', { align: 'center', 'font-size': '28px', color: '#0f172a', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Discover how this B2B SaaS company transformed their email marketing strategy and achieved record-breaking results in just 6 months.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Company spotlight
        createSection(
          [
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=280&h=200&fit=crop', alt: 'TechFlow office', 'border-radius': '10px', padding: '0' }),
              ],
              { width: '45%', 'vertical-align': 'middle' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: #0891b2;">Company Spotlight</p>', { 'font-size': '10px', color: '#0891b2', padding: '0 15px 8px 15px' }),
                createText('<h2 style="margin: 0; line-height: 1.3;">TechFlow</h2>', { 'font-size': '22px', color: '#0f172a', padding: '0 15px 6px 15px' }),
                createText('<p style="margin: 0; font-weight: 600; color: #0891b2;">B2B SaaS · 120 employees</p>', { 'font-size': '13px', color: '#0891b2', padding: '0 15px 8px 15px' }),
                createText('<p style="margin: 0;">TechFlow struggled with low email open rates and poor lead nurturing before partnering with Mesagoo to overhaul their entire communication strategy.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.6', padding: '0 15px' }),
              ],
              { width: '55%', 'vertical-align': 'middle' },
            ),
          ],
          { 'background-color': '#f0f9ff', padding: '25px 20px' },
        ),
        // 3 key metrics
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">The results</h2>', { align: 'center', 'font-size': '22px', color: '#ffffff', padding: '0 0 20px 0' }),
          ])],
          { 'background-color': '#0f172a', padding: '30px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 900; font-size: 36px; color: #38bdf8;">+150%</p>', { align: 'center', 'font-size': '36px', color: '#38bdf8', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; font-weight: 600; color: #ffffff;">Revenue</p>', { align: 'center', 'font-size': '13px', color: '#ffffff', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">In 6 months</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 900; font-size: 36px; color: #38bdf8;">-40%</p>', { align: 'center', 'font-size': '36px', color: '#38bdf8', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; font-weight: 600; color: #ffffff;">Costs</p>', { align: 'center', 'font-size': '13px', color: '#ffffff', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Marketing spend</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 900; font-size: 36px; color: #38bdf8;">3× ROI</p>', { align: 'center', 'font-size': '36px', color: '#38bdf8', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; font-weight: 600; color: #ffffff;">Return</p>', { align: 'center', 'font-size': '13px', color: '#ffffff', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">On investment</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#0f172a', padding: '5px 20px 30px 20px' },
        ),
        // Client quote
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-size: 40px; color: #0891b2; line-height: 1;">"</p>', { align: 'center', 'font-size': '40px', color: '#0891b2', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0; font-style: italic; line-height: 1.6;">Mesagoo completely transformed how we communicate with our prospects. Our email campaigns now feel personal, timely, and relevant — the results speak for themselves.</p>', { align: 'center', 'font-size': '15px', color: '#334155', 'line-height': '1.6', padding: '0 30px 15px 30px' }),
            createText('<p style="margin: 0; font-weight: 700; color: #0f172a;">Sarah Martinez</p>', { align: 'center', 'font-size': '14px', color: '#0f172a', padding: '0 0 3px 0' }),
            createText('<p style="margin: 0;">VP Marketing, TechFlow</p>', { align: 'center', 'font-size': '12px', color: '#0891b2', padding: '0' }),
          ])],
          { 'background-color': '#f0f9ff', padding: '25px 20px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700;">Want similar results for your business?</p>', { align: 'center', 'font-size': '16px', color: '#0f172a', padding: '0 0 15px 0' }),
            createButton('Read the full case study', { 'background-color': '#0891b2', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '15px 40px', 'font-weight': '700' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 26. Account Verification
  {
    id: 'account-verification',
    label: 'Account Verification',
    description: 'Email verification request',
    icon: 'ShieldCheck',
    color: '#059669',
    category: 'transactionnel',
    tags: ['verification', 'account', 'email', 'confirm'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Verify your email address to get started' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#059669', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=600&h=240&fit=crop', alt: 'Security verification', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main message
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Account Security</p>', { align: 'center', 'font-size': '11px', color: '#059669', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Verify your<br/>email address</h1>', { align: 'center', 'font-size': '28px', color: '#0f172a', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Thanks for signing up! Please verify your email address to activate your account and start using all features.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 5px 20px' },
        ),
        // 6-digit code display
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Your verification code</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0; font-weight: 900; font-size: 42px; letter-spacing: 14px; color: #059669; font-family: monospace;">483 921</p>', { align: 'center', 'font-size': '42px', color: '#059669', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">Or click the button below to verify automatically.</p>', { align: 'center', 'font-size': '13px', color: '#64748b', padding: '0 0 15px 0' }),
            createButton('Verify my email', { 'background-color': '#059669', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '15px 40px', 'font-weight': '700' }),
          ])],
          { 'background-color': '#ecfdf5', padding: '25px 20px', border: '1px solid #6ee7b7' },
        ),
        // Expiry notice
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">⏱ This code expires in <strong>24 hours</strong>. After that, you will need to request a new one.</p>', { align: 'center', 'font-size': '13px', color: '#78716c', 'line-height': '1.6', padding: '0 20px' }),
          ])],
          { 'background-color': '#fffbeb', padding: '15px 20px', border: '1px solid #fde68a' },
        ),
        // Security tips
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; color: #0f172a;">Security tips</p>', { 'font-size': '14px', color: '#0f172a', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">✓ &nbsp;We will never ask for your password by email.</p>', { 'font-size': '13px', color: '#64748b', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">✓ &nbsp;Never share your verification code with anyone.</p>', { 'font-size': '13px', color: '#64748b', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">✓ &nbsp;If you did not create an account, please ignore this email.</p>', { 'font-size': '13px', color: '#64748b', padding: '0' }),
          ])],
          { 'background-color': '#f8fafc', padding: '20px 25px', border: '1px solid #e2e8f0' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 27. Subscription Renewal
  {
    id: 'subscription-renewal',
    label: 'Subscription Renewal',
    description: 'Renewal reminder',
    icon: 'RefreshCw',
    color: '#d97706',
    category: 'transactionnel',
    tags: ['subscription', 'renewal', 'billing', 'plan'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Your Professional Plan renews on March 1 — manage your subscription' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#d97706', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=240&fit=crop', alt: 'Subscription renewal', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main message
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Renewal Notice</p>', { align: 'center', 'font-size': '11px', color: '#d97706', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Your subscription<br/>renews soon</h1>', { align: 'center', 'font-size': '28px', color: '#0f172a', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Hi Alex, just a friendly heads-up that your Professional Plan is set to renew automatically. No action needed unless you want to make changes.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 5px 20px' },
        ),
        // Current plan details
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Current Plan</p>', { 'font-size': '11px', color: '#d97706', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: 800; font-size: 22px; color: #0f172a;">Professional Plan</p>', { 'font-size': '22px', color: '#0f172a', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0; font-weight: 700; font-size: 24px; color: #d97706;">$49 / month</p>', { 'font-size': '24px', color: '#d97706', padding: '0 0 12px 0' }),
            createDivider({ 'border-color': '#fed7aa', 'border-width': '1px', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0; font-weight: 700; color: #92400e;">Renewal date: <span style="color: #d97706;">March 1, 2026</span></p>', { 'font-size': '14px', color: '#92400e', padding: '0' }),
          ])],
          { 'background-color': '#fffbeb', padding: '20px 25px', border: '1px solid #fed7aa' },
        ),
        // What's included
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center;">What\'s included</h2>', { align: 'center', 'font-size': '18px', color: '#0f172a', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0;">✓ &nbsp;Up to 50,000 emails per month</p>', { 'font-size': '14px', color: '#374151', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0;">✓ &nbsp;Advanced automation workflows</p>', { 'font-size': '14px', color: '#374151', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0;">✓ &nbsp;A/B testing & analytics dashboard</p>', { 'font-size': '14px', color: '#374151', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0;">✓ &nbsp;Priority customer support (24/7)</p>', { 'font-size': '14px', color: '#374151', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0;">✓ &nbsp;Custom domain & white-label options</p>', { 'font-size': '14px', color: '#374151', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 25px' },
        ),
        // CTA + payment link
        createSection(
          [createColumn([
            createButton('Manage my subscription', { 'background-color': '#d97706', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '15px 40px', 'font-weight': '700' }),
            createText('<p style="margin: 0; padding-top: 12px;"><a href="#" style="color: #d97706; text-decoration: underline; font-size: 13px;">Update payment method</a> &nbsp;·&nbsp; <a href="#" style="color: #94a3b8; text-decoration: underline; font-size: 13px;">Cancel subscription</a></p>', { align: 'center', 'font-size': '13px', color: '#64748b', padding: '0' }),
          ])],
          { 'background-color': '#fffbeb', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 28. Invoice
  {
    id: 'invoice',
    label: 'Invoice',
    description: 'Monthly invoice',
    icon: 'FileText',
    color: '#334155',
    category: 'transactionnel',
    tags: ['invoice', 'billing', 'payment', 'monthly'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Invoice #INV-2026-0042 — $147.00 due March 1, 2026' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#334155', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=200&fit=crop', alt: 'Invoice', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Invoice header
        createSection(
          [
            createColumn(
              [
                createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">Invoice</p>', { 'font-size': '11px', color: '#334155', padding: '0 0 6px 0' }),
                createText('<p style="margin: 0; font-weight: 900; font-size: 24px; color: #0f172a;">#INV-2026-0042</p>', { 'font-size': '24px', color: '#0f172a', padding: '0' }),
              ],
              { width: '60%', 'vertical-align': 'middle' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; font-weight: 700; color: #ffffff; background: #22c55e; display: inline-block; padding: 5px 14px; border-radius: 20px; font-size: 12px;">PAID</p>', { align: 'right', 'font-size': '12px', color: '#22c55e', padding: '0' }),
              ],
              { width: '40%', 'vertical-align': 'middle' },
            ),
          ],
          { 'background-color': '#f8fafc', padding: '20px 25px' },
        ),
        // Invoice metadata
        createSection(
          [
            createColumn(
              [
                createText('<p style="margin: 0; font-weight: 600; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Invoice date</p>', { 'font-size': '11px', color: '#64748b', padding: '0 0 4px 0' }),
                createText('<p style="margin: 0; font-weight: 700; color: #0f172a;">February 1, 2026</p>', { 'font-size': '14px', color: '#0f172a', padding: '0' }),
              ],
              { width: '33.33%' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; font-weight: 600; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Due date</p>', { 'font-size': '11px', color: '#64748b', padding: '0 0 4px 0' }),
                createText('<p style="margin: 0; font-weight: 700; color: #0f172a;">March 1, 2026</p>', { 'font-size': '14px', color: '#0f172a', padding: '0' }),
              ],
              { width: '33.33%' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; font-weight: 600; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Billed to</p>', { 'font-size': '11px', color: '#64748b', padding: '0 0 4px 0' }),
                createText('<p style="margin: 0; font-weight: 700; color: #0f172a;">Alex Martin</p>', { 'font-size': '14px', color: '#0f172a', padding: '0' }),
              ],
              { width: '33.33%' },
            ),
          ],
          { 'background-color': '#f8fafc', padding: '5px 25px 20px 25px' },
        ),
        // Line items
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Description</p>', { 'font-size': '11px', color: '#64748b', padding: '0 0 0 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px 25px 0 25px' },
        ),
        createSection(
          [
            createColumn(
              [createText('<p style="margin: 0; font-weight: 600;">Professional Plan (Monthly)</p><p style="margin: 2px 0 0 0; font-size: 12px; color: #94a3b8;">Feb 1 – Feb 28, 2026</p>', { 'font-size': '14px', color: '#0f172a', padding: '10px 0' })],
              { width: '70%' },
            ),
            createColumn(
              [createText('<p style="margin: 0; font-weight: 700; text-align: right;">$49.00</p>', { align: 'right', 'font-size': '14px', color: '#0f172a', padding: '10px 0' })],
              { width: '30%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '0 25px', border: '0 0 1px 0' },
        ),
        createSection(
          [
            createColumn(
              [createText('<p style="margin: 0; font-weight: 600;">Email Overage (10,000 emails)</p><p style="margin: 2px 0 0 0; font-size: 12px; color: #94a3b8;">$8 per 10K above plan limit</p>', { 'font-size': '14px', color: '#0f172a', padding: '10px 0' })],
              { width: '70%' },
            ),
            createColumn(
              [createText('<p style="margin: 0; font-weight: 700; text-align: right;">$8.00</p>', { align: 'right', 'font-size': '14px', color: '#0f172a', padding: '10px 0' })],
              { width: '30%' },
            ),
          ],
          { 'background-color': '#f8fafc', padding: '0 25px' },
        ),
        createSection(
          [
            createColumn(
              [createText('<p style="margin: 0; font-weight: 600;">Custom Domain SSL</p><p style="margin: 2px 0 0 0; font-size: 12px; color: #94a3b8;">Annual add-on (monthly billing)</p>', { 'font-size': '14px', color: '#0f172a', padding: '10px 0' })],
              { width: '70%' },
            ),
            createColumn(
              [createText('<p style="margin: 0; font-weight: 700; text-align: right;">$5.00</p>', { align: 'right', 'font-size': '14px', color: '#0f172a', padding: '10px 0' })],
              { width: '30%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '0 25px' },
        ),
        // Totals
        createSection(
          [createColumn([
            createDivider({ 'border-color': '#e2e8f0', 'border-width': '1px', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '5px 25px' },
        ),
        createSection(
          [
            createColumn(
              [
                createText('<p style="margin: 0;">Subtotal</p>', { align: 'right', 'font-size': '13px', color: '#64748b', padding: '3px 0' }),
                createText('<p style="margin: 0;">Tax (20%)</p>', { align: 'right', 'font-size': '13px', color: '#64748b', padding: '3px 0' }),
                createText('<p style="margin: 0; font-weight: 800; font-size: 16px; color: #0f172a; padding-top: 8px; border-top: 2px solid #e2e8f0; margin-top: 8px;">Total</p>', { align: 'right', 'font-size': '16px', color: '#0f172a', padding: '8px 0 3px 0' }),
              ],
              { width: '70%' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0;">$62.00</p>', { align: 'right', 'font-size': '13px', color: '#64748b', padding: '3px 0' }),
                createText('<p style="margin: 0;">$12.40</p>', { align: 'right', 'font-size': '13px', color: '#64748b', padding: '3px 0' }),
                createText('<p style="margin: 0; font-weight: 800; font-size: 16px; color: #334155;">$74.40</p>', { align: 'right', 'font-size': '16px', color: '#334155', padding: '8px 0 3px 0' }),
              ],
              { width: '30%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '5px 25px 20px 25px' },
        ),
        // CTA buttons
        createSection(
          [createColumn([
            createButton('Pay now', { 'background-color': '#334155', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '14px 40px', 'font-weight': '700' }),
            createText('<p style="margin: 0; padding-top: 10px;"><a href="#" style="color: #334155; text-decoration: underline; font-size: 13px; font-weight: 600;">Download PDF</a></p>', { align: 'center', 'font-size': '13px', color: '#334155', padding: '0' }),
          ])],
          { 'background-color': '#f8fafc', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 29. Feedback Request
  {
    id: 'feedback-request',
    label: 'Feedback Request',
    description: 'Post-purchase feedback',
    icon: 'MessageSquare',
    color: '#8b5cf6',
    category: 'engagement',
    tags: ['feedback', 'review', 'rating', 'experience'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'How was your experience? Share your feedback in 2 minutes!' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#8b5cf6', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=240&fit=crop', alt: 'Share your feedback', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main heading
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">We value your opinion</p>', { align: 'center', 'font-size': '11px', color: '#8b5cf6', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">How was your<br/>experience?</h1>', { align: 'center', 'font-size': '28px', color: '#0f172a', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Your feedback helps us improve and serve you better. It takes less than 2 minutes.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 40px 20px 40px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 5px 20px' },
        ),
        // 5-star rating visual
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">Rate your experience</p>', { align: 'center', 'font-size': '12px', color: '#64748b', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0; font-size: 36px; letter-spacing: 4px;">★ ★ ★ ★ ★</p>', { align: 'center', 'font-size': '36px', color: '#f59e0b', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0; font-size: 12px; color: #94a3b8;">Click a star to rate · Takes less than 2 minutes</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#faf5ff', padding: '25px 20px', border: '1px solid #e9d5ff' },
        ),
        // Order reference
        createSection(
          [
            createColumn(
              [
                createText('<p style="margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">Your recent order</p>', { 'font-size': '11px', color: '#64748b', padding: '0 0 8px 0' }),
                createText('<p style="margin: 0; font-weight: 700; color: #0f172a;">Order #ORD-2026-8847</p>', { 'font-size': '14px', color: '#0f172a', padding: '0 0 4px 0' }),
                createText('<p style="margin: 0; color: #64748b;">Placed on February 18, 2026</p>', { 'font-size': '13px', color: '#64748b', padding: '0' }),
              ],
              { width: '60%', 'vertical-align': 'middle' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop', alt: 'Order item', 'border-radius': '8px', width: '70px', padding: '0' }),
              ],
              { width: '40%', 'vertical-align': 'middle' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '20px 25px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Leave a review', { 'background-color': '#8b5cf6', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '16px 44px', 'font-weight': '800' }),
            createText('<p style="margin: 0; padding-top: 10px; font-style: italic;">Takes less than 2 minutes · Completely anonymous</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#faf5ff', padding: '25px 20px' },
        ),
        // Appreciation note
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic; color: #ffffff; line-height: 1.6;">"Every review makes our product better. Thank you for taking the time to share your thoughts — they matter more than you know."</p>', { align: 'center', 'font-size': '14px', color: '#ffffff', 'line-height': '1.6', padding: '0 20px 10px 20px' }),
            createText('<p style="margin: 0; font-weight: 600; color: rgba(255,255,255,0.7);">— The Mesagoo Team</p>', { align: 'center', 'font-size': '12px', color: 'rgba(255,255,255,0.7)', padding: '0' }),
          ])],
          { 'background-color': '#8b5cf6', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 30. Milestone
  {
    id: 'milestone',
    label: 'Milestone',
    description: 'Achievement celebration',
    icon: 'Trophy',
    color: '#eab308',
    category: 'engagement',
    tags: ['milestone', 'achievement', 'celebration', 'anniversary'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Congratulations on 1 incredible year with us — you deserve this!' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#eab308', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1607827448452-c60fb7bb2d90?w=600&h=280&fit=crop', alt: 'Celebration', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main heading
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">1 Year Anniversary</p>', { align: 'center', 'font-size': '11px', color: '#eab308', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Congratulations!<br/>1 Year With Us</h1>', { align: 'center', 'font-size': '30px', color: '#1a1a2e', padding: '0 20px 14px 20px' }),
            createText('<p style="margin: 0;">One year ago, you took a bold step and joined Mesagoo. Today, we want to celebrate everything you\'ve built, sent, and achieved. Thank you for being part of our community.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px 10px 20px' },
        ),
        // Achievement badge section
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-size: 60px; line-height: 1;">🏆</p>', { align: 'center', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">Champion Badge Unlocked</p>', { align: 'center', 'font-size': '13px', color: '#92400e', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0;">You\'ve reached <strong>Gold Status</strong> — a milestone achieved by only 12% of our users. You\'re officially part of our top tier.</p>', { align: 'center', 'font-size': '14px', color: '#78350f', 'line-height': '1.6', padding: '0 20px' }),
          ])],
          { 'background-color': '#fefce8', padding: '25px 20px', border: '2px solid #fde047' },
        ),
        // Stats section
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; text-align: center; font-weight: 800;">Your Year in Numbers</h2>', { align: 'center', 'font-size': '20px', color: '#1a1a2e', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Look how far you\'ve come in just 12 months.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 15px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 28px; color: #eab308;">52</p>', { align: 'center', 'font-size': '28px', color: '#eab308', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Campaigns Sent</p>', { align: 'center', 'font-size': '12px', color: '#1a1a2e', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">One a week, every week</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 28px; color: #eab308;">125K</p>', { align: 'center', 'font-size': '28px', color: '#eab308', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Emails Delivered</p>', { align: 'center', 'font-size': '12px', color: '#1a1a2e', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">To real, engaged inboxes</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 28px; color: #eab308;">38%</p>', { align: 'center', 'font-size': '28px', color: '#eab308', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Avg. Open Rate</p>', { align: 'center', 'font-size': '12px', color: '#1a1a2e', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">2× the industry average</p>', { align: 'center', 'font-size': '11px', color: '#94a3b8', padding: '0 5px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#fffbeb', padding: '20px 15px 25px 15px' },
        ),
        // Special loyalty offer
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Your Anniversary Gift</p>', { align: 'center', 'font-size': '11px', color: '#eab308', padding: '0 0 10px 0' }),
            createText('<h2 style="margin: 0; font-size: 42px; font-weight: 900; color: #1a1a2e;">-25%</h2>', { align: 'center', 'font-size': '42px', color: '#1a1a2e', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0; font-size: 16px; color: #64748b;">on your next 3 months of subscription</p>', { align: 'center', 'font-size': '16px', color: '#64748b', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0; font-weight: 800; letter-spacing: 4px; color: #eab308; font-size: 18px;">ANNIV25</p>', { align: 'center', 'font-size': '18px', color: '#eab308', padding: '8px 0 20px 0' }),
            createText('<p style="margin: 0; font-size: 12px; color: #94a3b8;">Valid until March 31, 2026. Applied automatically at checkout.</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0 20px 20px 20px' }),
            createButton('Claim My Reward', { 'background-color': '#eab308', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '14px 44px', 'font-weight': '800' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px', border: '2px solid #fde68a' },
        ),
        // Closing message
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Here\'s to another year of growth, creativity, and remarkable campaigns. We\'re honored to be part of your journey. 🎉</p>', { align: 'center', 'font-size': '14px', color: '#64748b', 'line-height': '1.7', padding: '0 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px 20px 10px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 31. Win-Back
  {
    id: 'win-back',
    label: 'Win-Back',
    description: 'Reactivation campaign',
    icon: 'Heart',
    color: '#dc2626',
    category: 'engagement',
    tags: ['win-back', 'reactivation', 'comeback', 'inactive'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'We miss you — and we have something special waiting for you inside' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#dc2626', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=280&fit=crop', alt: 'We want you back', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Emotional heading
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">We miss you</p>', { align: 'center', 'font-size': '11px', color: '#dc2626', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">It hasn\'t been the same<br/>without you.</h1>', { align: 'center', 'font-size': '28px', color: '#1a1a2e', padding: '0 20px 14px 20px' }),
            createText('<p style="margin: 0;">You haven\'t opened a campaign in a while, and honestly — we\'re a little heartbroken. We\'ve been working hard on new features and improvements, and we\'d love to have you back to see what you\'ve been missing.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px 10px 20px' },
        ),
        // What's new section header
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; font-weight: 800;">Here\'s what\'s new since you left</h2>', { align: 'center', 'font-size': '20px', color: '#1a1a2e', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">A lot has changed — all for the better.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#fff5f5', padding: '25px 20px 10px 20px' },
        ),
        // 3 feature highlights
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-size: 26px;">🤖</p>', { align: 'center', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">AI-Powered Subject Lines</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 5px 5px' }),
              createText('<p style="margin: 0;">Let AI write irresistible subject lines that boost open rates by up to 40%.</p>', { align: 'center', 'font-size': '11px', color: '#64748b', 'line-height': '1.5', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-size: 26px;">📊</p>', { align: 'center', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Advanced Analytics</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 5px 5px' }),
              createText('<p style="margin: 0;">Deep heatmaps, click tracking, and conversion reports — all in one dashboard.</p>', { align: 'center', 'font-size': '11px', color: '#64748b', 'line-height': '1.5', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-size: 26px;">⚡</p>', { align: 'center', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Automation Flows</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 5px 5px' }),
              createText('<p style="margin: 0;">Build powerful drip campaigns with our new visual automation builder.</p>', { align: 'center', 'font-size': '11px', color: '#64748b', 'line-height': '1.5', padding: '0 5px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#fff5f5', padding: '10px 15px 25px 15px' },
        ),
        // Exclusive comeback offer
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Exclusive Comeback Offer</p>', { align: 'center', 'font-size': '11px', color: '#dc2626', padding: '0 0 10px 0' }),
            createText('<h2 style="margin: 0; font-size: 48px; font-weight: 900; color: #dc2626;">50% OFF</h2>', { align: 'center', 'font-size': '48px', color: '#dc2626', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0; font-size: 16px; color: #64748b;">your first 3 months back</p>', { align: 'center', 'font-size': '16px', color: '#64748b', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0; font-weight: 800; letter-spacing: 4px; color: #dc2626; font-size: 20px;">COMEBACK50</p>', { align: 'center', 'font-size': '20px', color: '#dc2626', padding: '8px 0 8px 0' }),
            createText('<p style="margin: 0; font-size: 12px; color: #94a3b8;">Offer expires in 7 days. One-time use per account.</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0 20px 20px 20px' }),
            createButton('Come Back Now', { 'background-color': '#dc2626', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '14px 44px', 'font-weight': '800' }),
            createText('<p style="margin: 0;"><a href="#" style="color: #94a3b8; text-decoration: underline; font-size: 12px;">Update my preferences instead</a></p>', { align: 'center', padding: '14px 0 0 0' }),
          ])],
          { 'background-color': '#fff1f2', padding: '30px 20px', border: '2px solid #fecaca' },
        ),
        // Reassurance
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">No commitment required. Cancel anytime. We just want to earn your trust back — one campaign at a time.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', 'line-height': '1.6', padding: '0 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 32. Conference
  {
    id: 'conference',
    label: 'Conference',
    description: 'Conference invitation',
    icon: 'Users',
    color: '#4f46e5',
    category: 'evenement',
    tags: ['conference', 'event', 'summit', 'networking'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'You\'re invited to Digital Summit 2026 — secure your seat before it sells out' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#4f46e5', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=280&fit=crop', alt: 'Conference hall', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Event title
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 4px; font-weight: 700;">Official Invitation</p>', { align: 'center', 'font-size': '10px', color: '#4f46e5', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.15; font-weight: 900;">Digital Summit 2026</h1>', { align: 'center', 'font-size': '34px', color: '#1a1a2e', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">The premier gathering for digital marketing innovators, growth leaders, and technology visionaries. Two days. Hundreds of insights. One unmissable event.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.65', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Event details badges
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #4f46e5; font-size: 16px;">APRIL 8–9</p>', { align: 'center', 'font-size': '16px', color: '#4f46e5', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">2026</p>', { align: 'center', 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #4f46e5; font-size: 16px;">NEW YORK</p>', { align: 'center', 'font-size': '16px', color: '#4f46e5', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Javits Center</p>', { align: 'center', 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; color: #4f46e5; font-size: 16px;">2,000+</p>', { align: 'center', 'font-size': '16px', color: '#4f46e5', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0;">Attendees</p>', { align: 'center', 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#eef2ff', padding: '20px 15px' },
        ),
        // Keynote speakers header
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; font-weight: 800;">Keynote Speakers</h2>', { align: 'center', 'font-size': '20px', color: '#1a1a2e', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">World-class experts sharing their boldest ideas.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 15px 20px' },
        ),
        // Speakers grid
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&fit=crop', alt: 'Speaker 1', width: '90px', 'border-radius': '50%', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">James Harrington</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0;">CEO, FutureStack</p>', { align: 'center', 'font-size': '11px', color: '#4f46e5', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop', alt: 'Speaker 2', width: '90px', 'border-radius': '50%', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Priya Chandran</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0;">CMO, GrowthLab</p>', { align: 'center', 'font-size': '11px', color: '#4f46e5', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop', alt: 'Speaker 3', width: '90px', 'border-radius': '50%', padding: '0 0 10px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Marcus Webb</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0;">Head of AI, NexaMedia</p>', { align: 'center', 'font-size': '11px', color: '#4f46e5', padding: '0 5px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#ffffff', padding: '10px 15px 25px 15px' },
        ),
        // Agenda highlights
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; font-weight: 800;">Agenda Highlights</h2>', { align: 'center', 'font-size': '20px', color: '#1a1a2e', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; border-left: 3px solid #4f46e5; padding-left: 12px;"><strong>Day 1 — 9:00 AM:</strong> The Future of AI in Marketing — Automation, Personalization &amp; Prediction</p>', { 'font-size': '14px', color: '#374151', 'line-height': '1.5', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0; border-left: 3px solid #4f46e5; padding-left: 12px;"><strong>Day 1 — 2:00 PM:</strong> Growth Hacking at Scale — Case Studies from 100M+ Email Senders</p>', { 'font-size': '14px', color: '#374151', 'line-height': '1.5', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0; border-left: 3px solid #4f46e5; padding-left: 12px;"><strong>Day 2 — 10:30 AM:</strong> Privacy-First Marketing — GDPR, Zero-Party Data &amp; Building Trust</p>', { 'font-size': '14px', color: '#374151', 'line-height': '1.5', padding: '0 20px 5px 20px' }),
          ])],
          { 'background-color': '#f8f8ff', padding: '25px 10px' },
        ),
        // Early bird pricing & CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Early Bird Pricing</p>', { align: 'center', 'font-size': '11px', color: '#4f46e5', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;"><span style="font-size: 36px; font-weight: 900; color: #4f46e5;">$299</span> <span style="font-size: 18px; color: #94a3b8; text-decoration: line-through;">$499</span></p>', { align: 'center', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0; font-size: 13px; color: #dc2626; font-weight: 600;">⏰ Early bird ends March 15, 2026</p>', { align: 'center', 'font-size': '13px', color: '#dc2626', padding: '0 0 20px 0' }),
            createButton('Register Now', { 'background-color': '#4f46e5', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '14px 48px', 'font-weight': '800' }),
            createText('<p style="margin: 0; font-size: 12px; color: #94a3b8;">Group discounts available for 3+ attendees.</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '12px 20px 0 20px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 33. Workshop
  {
    id: 'workshop',
    label: 'Workshop',
    description: 'Workshop registration',
    icon: 'BookOpen',
    color: '#0d9488',
    category: 'evenement',
    tags: ['workshop', 'training', 'learn', 'hands-on'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Only 12 spots left — Reserve your seat for our Email Marketing Masterclass Workshop' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#0d9488', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=280&fit=crop', alt: 'Workshop session', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Workshop title
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Hands-On Workshop</p>', { align: 'center', 'font-size': '11px', color: '#0d9488', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Master Email Marketing</h1>', { align: 'center', 'font-size': '30px', color: '#1a1a2e', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">A full-day, hands-on workshop designed to take you from foundational knowledge to advanced execution. Work directly on your own campaigns and leave with actionable strategies you can implement immediately.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px 10px 20px' },
        ),
        // What you'll learn
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; font-weight: 800;">What You\'ll Learn</h2>', { align: 'center', 'font-size': '20px', color: '#1a1a2e', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; padding: 8px 0;"><span style="color: #0d9488; font-weight: 700;">✓</span> &nbsp;Build high-converting email sequences that nurture leads from cold to loyal customer</p>', { 'font-size': '14px', color: '#374151', 'line-height': '1.5', padding: '0' }),
            createText('<p style="margin: 0; padding: 8px 0;"><span style="color: #0d9488; font-weight: 700;">✓</span> &nbsp;Master A/B testing: subject lines, CTAs, send times, and layout optimization</p>', { 'font-size': '14px', color: '#374151', 'line-height': '1.5', padding: '0' }),
            createText('<p style="margin: 0; padding: 8px 0;"><span style="color: #0d9488; font-weight: 700;">✓</span> &nbsp;Design emails that render perfectly on every device using MJML and modern CSS</p>', { 'font-size': '14px', color: '#374151', 'line-height': '1.5', padding: '0' }),
            createText('<p style="margin: 0; padding: 8px 0;"><span style="color: #0d9488; font-weight: 700;">✓</span> &nbsp;Set up automated workflows for onboarding, re-engagement, and post-purchase flows</p>', { 'font-size': '14px', color: '#374151', 'line-height': '1.5', padding: '0' }),
          ])],
          { 'background-color': '#f0fdfa', padding: '25px 30px' },
        ),
        // Instructor profile
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop', alt: 'Instructor', width: '80px', 'border-radius': '50%', padding: '0' }),
            ], { width: '25%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Your Instructor</p>', { 'font-size': '10px', color: '#0d9488', padding: '0 0 5px 15px' }),
              createText('<p style="margin: 0; font-weight: 800;">Sarah Chen</p>', { 'font-size': '16px', color: '#1a1a2e', padding: '0 0 3px 15px' }),
              createText('<p style="margin: 0;">Head of Email Strategy, Mesagoo — 10+ years experience, 500M+ emails delivered, speaker at MarTech Summit and Email Innovations Conference.</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.5', padding: '0 15px' }),
            ], { width: '75%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#ffffff', padding: '25px 20px' },
        ),
        // Date/time/format details
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 10px; color: #0d9488;">Date</p>', { 'font-size': '10px', color: '#0d9488', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Friday, March 28</p>', { 'font-size': '13px', color: '#1a1a2e', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">2026</p>', { 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 10px; color: #0d9488;">Time</p>', { 'font-size': '10px', color: '#0d9488', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">9:00 AM – 5:00 PM</p>', { 'font-size': '13px', color: '#1a1a2e', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">EST (UTC-5)</p>', { 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 10px; color: #0d9488;">Format</p>', { 'font-size': '10px', color: '#0d9488', padding: '0 0 4px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Live Online</p>', { 'font-size': '13px', color: '#1a1a2e', padding: '0 0 2px 0' }),
              createText('<p style="margin: 0;">Zoom + Slack</p>', { 'font-size': '12px', color: '#64748b', padding: '0' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f0fdfa', padding: '20px 20px' },
        ),
        // Limited spots notice + CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-size: 13px; font-weight: 700; color: #dc2626;">⚠️ Only 12 spots remaining out of 30 total</p>', { align: 'center', 'font-size': '13px', color: '#dc2626', padding: '0 0 16px 0' }),
            createButton('Reserve My Spot', { 'background-color': '#0d9488', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '14px 44px', 'font-weight': '800' }),
            createText('<p style="margin: 0; font-size: 12px; color: #94a3b8;">$149 per person. Includes workbook, templates &amp; 30-day replay access.</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '12px 20px 0 20px' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 34. Fitness
  {
    id: 'fitness',
    label: 'Fitness',
    description: 'Fitness & wellness newsletter',
    icon: 'Dumbbell',
    color: '#16a34a',
    category: 'industrie',
    tags: ['fitness', 'health', 'wellness', 'gym'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'Your weekly workout plan is here — plus a nutrition tip you\'ll want to save' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#16a34a', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=280&fit=crop', alt: 'Fitness training', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Heading
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Weekly Program</p>', { align: 'center', 'font-size': '11px', color: '#16a34a', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">This Week\'s Training Plan</h1>', { align: 'center', 'font-size': '28px', color: '#1a1a2e', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Three focused sessions designed to build strength, improve endurance, and keep your motivation high. Each workout is optimized for maximum results in minimum time.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Exercise cards header
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; font-weight: 800;">Your 3 Workouts This Week</h2>', { align: 'center', 'font-size': '20px', color: '#1a1a2e', padding: '0 0 5px 0' }),
          ])],
          { 'background-color': '#f0fdf4', padding: '20px 20px 5px 20px' },
        ),
        // Exercise cards (3 columns)
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=140&fit=crop', alt: 'Strength training', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; color: #16a34a;">Monday</p>', { 'font-size': '10px', color: '#16a34a', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0; font-weight: 700;">Upper Body Strength</p>', { 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;">4 sets · 45 min · Intermediate</p>', { 'font-size': '11px', color: '#64748b', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=200&h=140&fit=crop', alt: 'Cardio workout', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; color: #16a34a;">Wednesday</p>', { 'font-size': '10px', color: '#16a34a', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0; font-weight: 700;">HIIT Cardio Blast</p>', { 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;">6 rounds · 30 min · High</p>', { 'font-size': '11px', color: '#64748b', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=140&fit=crop', alt: 'Full body workout', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; color: #16a34a;">Friday</p>', { 'font-size': '10px', color: '#16a34a', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0; font-weight: 700;">Full Body &amp; Core</p>', { 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;">5 exercises · 50 min · All levels</p>', { 'font-size': '11px', color: '#64748b', padding: '0 5px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f0fdf4', padding: '10px 15px 20px 15px' },
        ),
        // Nutrition tip
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Nutrition Tip of the Week</p>', { 'font-size': '10px', color: '#16a34a', padding: '0 0 10px 0' }),
            createText('<h3 style="margin: 0; line-height: 1.3;">Fuel your workouts with pre-exercise carbs</h3>', { 'font-size': '18px', color: '#1a1a2e', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;">Eating a small carbohydrate-rich snack 30–60 minutes before training can improve performance by up to 20%. Think: banana + peanut butter, oat bar, or a small bowl of oatmeal. Combine with protein post-workout to maximize recovery and muscle synthesis.</p>', { 'font-size': '14px', color: '#374151', 'line-height': '1.65', padding: '0 0 10px 0' }),
          ])],
          { 'background-color': '#dcfce7', padding: '22px 28px', border: '1px solid #86efac' },
        ),
        // Progress tracking reminder
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-size: 26px;">📈</p>', { align: 'center', padding: '0 0 8px 0' }),
            createText('<h3 style="margin: 0; font-weight: 700;">Track Your Progress</h3>', { align: 'center', 'font-size': '18px', color: '#1a1a2e', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">Log your workouts, weight, and metrics to see your growth over time. Consistent tracking is the #1 predictor of long-term fitness success. Your dashboard is updated in real time.</p>', { align: 'center', 'font-size': '14px', color: '#64748b', 'line-height': '1.6', padding: '0 20px 20px 20px' }),
            createButton('View My Program', { 'background-color': '#16a34a', color: '#ffffff', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '14px 44px', 'font-weight': '700' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 35. Travel
  {
    id: 'travel',
    label: 'Travel',
    description: 'Travel deals & destinations',
    icon: 'Plane',
    color: '#0ea5e9',
    category: 'industrie',
    tags: ['travel', 'vacation', 'destination', 'deals'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'This week\'s top destinations — deals up to 40% off, for a limited time only' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#0ea5e9', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&h=280&fit=crop', alt: 'Dream destination', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Heading
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Deals This Week</p>', { align: 'center', 'font-size': '11px', color: '#0ea5e9', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">This Week\'s Top Destinations</h1>', { align: 'center', 'font-size': '28px', color: '#1a1a2e', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Handpicked deals from our travel experts. Limited availability — these prices won\'t last long. Book with confidence thanks to our free cancellation guarantee.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px 10px 20px' },
        ),
        // Destination cards
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=130&fit=crop', alt: 'Santorini', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: 800;">Santorini</p>', { 'font-size': '14px', color: '#1a1a2e', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">Greece · 7 nights</p>', { 'font-size': '11px', color: '#64748b', padding: '0 5px 5px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #94a3b8;">$1,890</span></p>', { 'font-size': '11px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #0ea5e9; font-size: 16px;">$1,140</p>', { 'font-size': '16px', color: '#0ea5e9', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=200&h=130&fit=crop', alt: 'Bali', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: 800;">Bali</p>', { 'font-size': '14px', color: '#1a1a2e', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">Indonesia · 10 nights</p>', { 'font-size': '11px', color: '#64748b', padding: '0 5px 5px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #94a3b8;">$2,100</span></p>', { 'font-size': '11px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #0ea5e9; font-size: 16px;">$1,380</p>', { 'font-size': '16px', color: '#0ea5e9', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=200&h=130&fit=crop', alt: 'Marrakech', 'border-radius': '8px', padding: '0 0 8px 0' }),
              createText('<p style="margin: 0; font-weight: 800;">Marrakech</p>', { 'font-size': '14px', color: '#1a1a2e', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">Morocco · 5 nights</p>', { 'font-size': '11px', color: '#64748b', padding: '0 5px 5px 5px' }),
              createText('<p style="margin: 0;"><span style="text-decoration: line-through; color: #94a3b8;">$980</span></p>', { 'font-size': '11px', padding: '0 5px 2px 5px' }),
              createText('<p style="margin: 0; font-weight: 800; color: #0ea5e9; font-size: 16px;">$649</p>', { 'font-size': '16px', color: '#0ea5e9', padding: '0 5px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#f0f9ff', padding: '20px 15px 25px 15px' },
        ),
        // Why book with us
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; font-weight: 800;">Why Book With Us?</h2>', { align: 'center', 'font-size': '20px', color: '#1a1a2e', padding: '0 0 5px 0' }),
            createText('<p style="margin: 0;">Travel smarter with these 3 guarantees.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 20px 10px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-size: 24px;">🔒</p>', { align: 'center', padding: '0 0 6px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Free Cancellation</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;">Cancel up to 48 hours before departure, no fees.</p>', { align: 'center', 'font-size': '11px', color: '#64748b', 'line-height': '1.5', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-size: 24px;">💰</p>', { align: 'center', padding: '0 0 6px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">Price Match</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;">Found it cheaper? We\'ll match it, guaranteed.</p>', { align: 'center', 'font-size': '11px', color: '#64748b', 'line-height': '1.5', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-size: 24px;">🌟</p>', { align: 'center', padding: '0 0 6px 0' }),
              createText('<p style="margin: 0; font-weight: 700;">24/7 Support</p>', { align: 'center', 'font-size': '13px', color: '#1a1a2e', padding: '0 5px 4px 5px' }),
              createText('<p style="margin: 0;">Our travel experts are always here when you need them.</p>', { align: 'center', 'font-size': '11px', color: '#64748b', 'line-height': '1.5', padding: '0 5px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#ffffff', padding: '10px 15px 20px 15px' },
        ),
        // Flash deal countdown
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; color: #ffffff;">Flash Deal — Ending Soon</p>', { align: 'center', 'font-size': '11px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<h2 style="margin: 0; color: #ffffff; font-size: 22px; line-height: 1.3;">Extra 15% off when you book<br/>any trip before midnight tonight</h2>', { align: 'center', 'font-size': '22px', color: '#ffffff', padding: '0 20px 16px 20px' }),
            createText('<p style="margin: 0; font-weight: 800; letter-spacing: 4px; color: #fef3c7; font-size: 18px;">FLASH15</p>', { align: 'center', 'font-size': '18px', color: '#fef3c7', padding: '0 0 20px 0' }),
            createButton('Explore All Deals', { 'background-color': '#ffffff', color: '#0ea5e9', 'font-size': '15px', 'border-radius': '8px', 'inner-padding': '13px 40px', 'font-weight': '800' }),
          ])],
          { 'background-color': '#0ea5e9', padding: '28px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 36. Education
  {
    id: 'education',
    label: 'Education',
    description: 'Online course promotion',
    icon: 'GraduationCap',
    color: '#6366f1',
    category: 'industrie',
    tags: ['education', 'course', 'learning', 'online'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: {}, fonts: [], previewText: 'New course alert: Advanced Email Marketing Masterclass — early enrollment now open' },
      body: createBody([
        // Branded header
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MESAGOO</p>', { align: 'center', 'font-size': '18px', color: '#6366f1', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '20px' },
        ),
        // Hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=280&fit=crop', alt: 'Online learning', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // New course heading
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">New Course Available</p>', { align: 'center', 'font-size': '11px', color: '#6366f1', padding: '0 0 12px 0' }),
            createText('<h1 style="margin: 0; line-height: 1.2;">Advanced Email Marketing<br/>Masterclass</h1>', { align: 'center', 'font-size': '28px', color: '#1a1a2e', padding: '0 20px 12px 20px' }),
            createText('<p style="margin: 0;">Go beyond the basics. This comprehensive course is designed for marketers ready to build high-performing email programs that drive real, measurable business results.</p>', { align: 'center', 'font-size': '15px', color: '#64748b', 'line-height': '1.7', padding: '0 30px 20px 30px' }),
          ])],
          { 'background-color': '#ffffff', padding: '35px 20px 10px 20px' },
        ),
        // What's included
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; font-weight: 800;">What\'s Included</h2>', { align: 'center', 'font-size': '20px', color: '#1a1a2e', padding: '0 0 15px 0' }),
          ])],
          { 'background-color': '#eef2ff', padding: '25px 20px 5px 20px' },
        ),
        createSection(
          [
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 24px; color: #6366f1;">6</p>', { align: 'center', 'font-size': '24px', color: '#6366f1', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Modules</p>', { align: 'center', 'font-size': '12px', color: '#1a1a2e', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">From strategy to execution</p>', { align: 'center', 'font-size': '11px', color: '#64748b', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 24px; color: #6366f1;">12h</p>', { align: 'center', 'font-size': '24px', color: '#6366f1', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Video Content</p>', { align: 'center', 'font-size': '12px', color: '#1a1a2e', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">HD lessons + exercises</p>', { align: 'center', 'font-size': '11px', color: '#64748b', padding: '0 5px' }),
            ], { width: '33.33%' }),
            createColumn([
              createText('<p style="margin: 0; font-weight: 800; font-size: 24px; color: #6366f1;">✓</p>', { align: 'center', 'font-size': '24px', color: '#6366f1', padding: '0 0 3px 0' }),
              createText('<p style="margin: 0; font-weight: 600;">Certificate</p>', { align: 'center', 'font-size': '12px', color: '#1a1a2e', padding: '0 5px 3px 5px' }),
              createText('<p style="margin: 0;">Shareable on LinkedIn</p>', { align: 'center', 'font-size': '11px', color: '#64748b', padding: '0 5px' }),
            ], { width: '33.33%' }),
          ],
          { 'background-color': '#eef2ff', padding: '10px 15px 25px 15px' },
        ),
        // Module list
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0; font-weight: 700;">Course Curriculum</h3>', { 'font-size': '17px', color: '#1a1a2e', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0; padding: 7px 0; border-bottom: 1px solid #e2e8f0;"><strong style="color: #6366f1;">Module 1:</strong> Email Strategy &amp; List Building Fundamentals</p>', { 'font-size': '14px', color: '#374151', padding: '0 20px' }),
            createText('<p style="margin: 0; padding: 7px 0; border-bottom: 1px solid #e2e8f0;"><strong style="color: #6366f1;">Module 2:</strong> Copywriting &amp; Subject Line Mastery</p>', { 'font-size': '14px', color: '#374151', padding: '0 20px' }),
            createText('<p style="margin: 0; padding: 7px 0; border-bottom: 1px solid #e2e8f0;"><strong style="color: #6366f1;">Module 3:</strong> Design Principles &amp; Responsive Email Templates</p>', { 'font-size': '14px', color: '#374151', padding: '0 20px' }),
            createText('<p style="margin: 0; padding: 7px 0; border-bottom: 1px solid #e2e8f0;"><strong style="color: #6366f1;">Module 4:</strong> Segmentation, Personalization &amp; Dynamic Content</p>', { 'font-size': '14px', color: '#374151', padding: '0 20px' }),
            createText('<p style="margin: 0; padding: 7px 0; border-bottom: 1px solid #e2e8f0;"><strong style="color: #6366f1;">Module 5:</strong> Automation Workflows &amp; Behavioral Triggers</p>', { 'font-size': '14px', color: '#374151', padding: '0 20px' }),
            createText('<p style="margin: 0; padding: 7px 0;"><strong style="color: #6366f1;">Module 6:</strong> Analytics, Testing &amp; Continuous Optimization</p>', { 'font-size': '14px', color: '#374151', padding: '0 20px' }),
          ])],
          { 'background-color': '#ffffff', padding: '25px 10px' },
        ),
        // Instructor profile
        createSection(
          [
            createColumn([
              createImage({ src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop', alt: 'Instructor', width: '80px', 'border-radius': '50%', padding: '0' }),
            ], { width: '25%', 'vertical-align': 'middle' }),
            createColumn([
              createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Your Instructor</p>', { 'font-size': '10px', color: '#6366f1', padding: '0 0 5px 15px' }),
              createText('<p style="margin: 0; font-weight: 800;">David Okafor</p>', { 'font-size': '16px', color: '#1a1a2e', padding: '0 0 3px 15px' }),
              createText('<p style="margin: 0;">Email marketing veteran with 15 years of experience. Former Marketing Director at SendGrid. Taught 20,000+ students across 85 countries. Author of "The Modern Email Playbook."</p>', { 'font-size': '13px', color: '#64748b', 'line-height': '1.5', padding: '0 15px' }),
            ], { width: '75%', 'vertical-align': 'middle' }),
          ],
          { 'background-color': '#f8f8ff', padding: '22px 20px' },
        ),
        // Student reviews/rating
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-size: 28px; font-weight: 900; color: #6366f1;">4.9 ★★★★★</p>', { align: 'center', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0; font-size: 13px; color: #64748b;">Based on 1,247 student reviews</p>', { align: 'center', 'font-size': '13px', color: '#64748b', padding: '0 0 15px 0' }),
            createText('<p style="margin: 0; font-style: italic;">"This course completely transformed how I approach email marketing. My open rates went from 18% to 41% in just 8 weeks. Worth every penny."</p>', { align: 'center', 'font-size': '14px', color: '#374151', 'line-height': '1.6', padding: '0 30px 8px 30px' }),
            createText('<p style="margin: 0; font-weight: 600; color: #6366f1;">— Jessica M., Marketing Manager</p>', { align: 'center', 'font-size': '12px', color: '#6366f1', padding: '0' }),
          ])],
          { 'background-color': '#eef2ff', padding: '25px 20px' },
        ),
        // Early enrollment pricing + CTA
        createSection(
          [createColumn([
            createText('<p style="margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Early Enrollment Pricing</p>', { align: 'center', 'font-size': '11px', color: '#6366f1', padding: '0 0 10px 0' }),
            createText('<p style="margin: 0;"><span style="font-size: 40px; font-weight: 900; color: #6366f1;">$97</span> <span style="font-size: 18px; color: #94a3b8; text-decoration: line-through;">$197</span></p>', { align: 'center', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0; font-size: 13px; color: #dc2626; font-weight: 600;">⏰ Early bird price ends March 10, 2026</p>', { align: 'center', 'font-size': '13px', color: '#dc2626', padding: '0 0 6px 0' }),
            createText('<p style="margin: 0; font-size: 13px; color: #64748b;">Lifetime access · 30-day money-back guarantee · Instant start</p>', { align: 'center', 'font-size': '13px', color: '#64748b', padding: '0 20px 20px 20px' }),
            createButton('Enroll Now', { 'background-color': '#6366f1', color: '#ffffff', 'font-size': '16px', 'border-radius': '8px', 'inner-padding': '14px 52px', 'font-weight': '800' }),
            createText('<p style="margin: 0; font-size: 12px; color: #94a3b8;">No subscription required. One-time payment. Instant access.</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '12px 20px 0 20px' }),
          ])],
          { 'background-color': '#ffffff', padding: '30px 20px' },
        ),
        footerSection(),
      ]),
    }),
  },

  // 37. Fashion Gift Guide
  {
    id: 'fashion-gift-guide',
    label: 'Fashion Gift Guide',
    description: 'Elegant fashion gift guide with product sections',
    icon: 'Gift',
    color: '#2d5a3d',
    category: 'marketing',
    tags: ['fashion', 'gift', 'e-commerce', 'luxury'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }, { name: 'Playfair Display', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap' }], previewText: 'Shamrock Style: Your Elegant Gift Guide' },
      body: createBody([
        // Header banner
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0; font-size: 32px; font-weight: 700; line-height: 1.2;">SHAMROCK STYLE:</h1>', { align: 'center', 'font-size': '32px', color: '#ffffff', padding: '0 0 8px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<p style="margin: 0; letter-spacing: 1px;">YOUR ELEGANT GIFT GUIDE</p>', { align: 'center', 'font-size': '14px', color: '#c5d9cc', padding: '0' }),
          ])],
          { 'background-color': '#2d5a3d', padding: '32px 20px' },
        ),
        // Shamrock decoration
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-size: 28px;">&#9752;</p>', { align: 'center', 'font-size': '28px', padding: '0' }),
          ])],
          { 'background-color': '#f0ede6', padding: '16px 0' },
        ),
        // FOR HER heading
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; letter-spacing: 2px;">FOR HER</h2>', { align: 'center', 'font-size': '20px', color: '#2d5a3d', padding: '0 0 16px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
          ])],
          { 'background-color': '#f0ede6', padding: '0 24px' },
        ),
        // FOR HER featured — two columns
        createSection(
          [
            createColumn(
              [createImage({ src: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=250&h=300&fit=crop', alt: 'Green Dress', 'border-radius': '8px', padding: '0' })],
              { width: '50%', 'padding-right': '8px' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=120&h=80&fit=crop', alt: 'Necklace', 'border-radius': '6px', padding: '0 0 8px 0' }),
                createText('<p style="margin: 0; font-size: 11px; color: #666;">SHAMROCK &amp; GOLD<br/>DRAGON PENDANT<br/><strong style="color: #2d5a3d;">$89</strong></p>', { 'font-size': '11px', color: '#666666', padding: '4px 0' }),
                createButton('SHOP NOW', { 'background-color': '#2d5a3d', color: '#ffffff', 'font-size': '10px', 'border-radius': '4px', 'inner-padding': '6px 14px', 'font-weight': '600', align: 'left', padding: '0' }),
              ],
              { width: '50%', padding: '8px 0 0 8px' },
            ),
          ],
          { 'background-color': '#f0ede6', padding: '0 24px 20px 24px' },
        ),
        // FOR HER products grid — four columns
        createSection(
          [
            createColumn([createImage({ src: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&h=100&fit=crop', alt: 'Heels', 'border-radius': '6px', width: '80px', padding: '0' })], { width: '25%' }),
            createColumn([createImage({ src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop', alt: 'Watch', 'border-radius': '6px', width: '80px', padding: '0' })], { width: '25%' }),
            createColumn([createImage({ src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop', alt: 'Bag', 'border-radius': '6px', width: '80px', padding: '0' })], { width: '25%' }),
            createColumn([createImage({ src: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=100&h=100&fit=crop', alt: 'Scarf', 'border-radius': '6px', width: '80px', padding: '0' })], { width: '25%' }),
          ],
          { 'background-color': '#f0ede6', padding: '0 24px 24px 24px' },
        ),
        // FOR HIM heading
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; letter-spacing: 2px;">FOR HIM</h2>', { align: 'center', 'font-size': '20px', color: '#2d5a3d', padding: '0 0 16px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
          ])],
          { 'background-color': '#f0ede6', padding: '0 24px' },
        ),
        // FOR HIM featured
        createSection(
          [
            createColumn(
              [createImage({ src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=250&h=200&fit=crop', alt: 'Suit', 'border-radius': '8px', padding: '0' })],
              { width: '50%', 'padding-right': '8px' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; font-size: 11px; color: #666;">SHAMROCK &amp; CO<br/>LUXE TIMEPIECE<br/><strong style="color: #2d5a3d;">$249</strong></p>', { 'font-size': '11px', color: '#666666', padding: '4px 0' }),
                createButton('SHOP NOW', { 'background-color': '#2d5a3d', color: '#ffffff', 'font-size': '10px', 'border-radius': '4px', 'inner-padding': '6px 14px', 'font-weight': '600', align: 'left', padding: '0' }),
              ],
              { width: '50%', 'padding-left': '8px' },
            ),
          ],
          { 'background-color': '#f0ede6', padding: '0 24px 20px 24px' },
        ),
        // LUXURY LEATHER GOODS
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; letter-spacing: 1px;">LUXURY LEATHER GOODS</h2>', { align: 'center', 'font-size': '18px', color: '#2d5a3d', padding: '0 0 16px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
          ])],
          { 'background-color': '#f0ede6', padding: '0 24px' },
        ),
        createSection(
          [
            createColumn(
              [createImage({ src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=250&h=160&fit=crop', alt: 'Leather Bag', 'border-radius': '8px', padding: '0' })],
              { width: '50%', 'padding-right': '8px' },
            ),
            createColumn(
              [
                createText('<p style="margin: 0; font-size: 11px; color: #666;">LUXE<br/>LEATHER GLOVES<br/><strong style="color: #2d5a3d;">$65</strong></p>', { 'font-size': '11px', color: '#666666', padding: '4px 0' }),
                createButton('SHOP NOW', { 'background-color': '#2d5a3d', color: '#ffffff', 'font-size': '10px', 'border-radius': '4px', 'inner-padding': '6px 14px', 'font-weight': '600', align: 'left', padding: '0' }),
              ],
              { width: '50%', 'padding-left': '8px' },
            ),
          ],
          { 'background-color': '#f0ede6', padding: '0 24px 16px 24px' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0;"><a href="#" style="color: #c5d9cc; text-decoration: underline; margin: 0 8px;">Unsubscribe</a> | <a href="#" style="color: #c5d9cc; text-decoration: underline; margin: 0 8px;">View in Browser</a></p>', { align: 'center', 'font-size': '11px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-style: italic; font-size: 22px;">Happy Gifting!</p>', { align: 'center', 'font-size': '22px', color: '#c5d9cc', padding: '0', 'font-family': "'Playfair Display', Georgia, serif" }),
          ])],
          { 'background-color': '#2d5a3d', padding: '20px' },
        ),
      ], { 'background-color': '#f0ede6' }),
    }),
  },

  // 38. Women's Day Elegant
  {
    id: 'womens-day',
    label: "Women's Day Elegant",
    description: 'Elegant celebration for International Women\'s Day',
    icon: 'Heart',
    color: '#8b3a5a',
    category: 'evenement',
    tags: ['womens day', 'celebration', 'holiday', 'event'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }, { name: 'Playfair Display', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap' }], previewText: 'Happy International Women\'s Day — Celebrate with a special offer' },
      body: createBody([
        // Hero
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic;">Happy</p>', { align: 'center', 'font-size': '18px', color: '#c47a8a', padding: '0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<p style="margin: 0; letter-spacing: 2px;">INTERNATIONAL</p>', { align: 'center', 'font-size': '16px', color: '#c47a8a', padding: '4px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<h1 style="margin: 0; font-style: italic; line-height: 1.1;">Women\'s Day</h1>', { align: 'center', 'font-size': '42px', color: '#8b3a5a', padding: '0', 'font-family': "'Playfair Display', Georgia, serif" }),
          ])],
          { 'background-color': '#fff0f3', padding: '40px 24px 20px 24px' },
        ),
        // Photo of women
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=552&h=220&fit=crop', alt: 'Women celebrating', 'border-radius': '12px', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 24px' },
        ),
        // Message
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic;">Dear [Name],</p>', { 'font-size': '16px', color: '#8b3a5a', padding: '0 0 12px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<p style="margin: 0;">This year this event is all about the Mercy and News stories. I\'d not manager them Biotics\'s win at all round many It also tried out bet be solar driven reservations send on let cow then anything per sorbity.</p>', { 'font-size': '13px', color: '#666666', 'line-height': '1.7', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '24px 32px' },
        ),
        // Offer box
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">To mark this special occasion...<br/>a special <strong>20% discount</strong> on all our<br/>[Product Category] items.</p>', { align: 'center', 'font-size': '13px', color: '#8b3a5a', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; font-weight: 700;">Use code <span style="background: #8b3a5a; color: white; padding: 2px 8px; border-radius: 4px;">*WOMENSDAY2024*</span></p>', { align: 'center', 'font-size': '14px', color: '#8b3a5a', padding: '8px 0 0 0' }),
          ])],
          { 'background-color': '#fff0f3', padding: '24px', 'border-radius': '12px' },
        ),
        // Product image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=200&fit=crop', alt: 'Product', 'border-radius': '8px', width: '120px', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 24px 16px 24px' },
        ),
        // Company
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">The Team at <strong>[Your Company Name]</strong></p>', { align: 'center', 'font-size': '13px', color: '#8b3a5a', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 24px 16px 24px' },
        ),
        // Social
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Join the conversation:</p>', { align: 'center', 'font-size': '12px', color: '#999999', padding: '0 0 8px 0' }),
            createSocial(
              [
                createSocialElement('facebook', 'https://facebook.com/', { 'background-color': '#8b3a5a' }),
                createSocialElement('twitter', 'https://twitter.com/', { 'background-color': '#8b3a5a' }),
                createSocialElement('instagram', 'https://instagram.com/', { 'background-color': '#8b3a5a' }),
              ],
              { 'icon-size': '32px', mode: 'horizontal', align: 'center', padding: '0', color: '#ffffff' },
            ),
          ])],
          { 'background-color': '#ffffff', padding: '16px 0' },
        ),
        // Closing
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic;">With warmth and appreciation,</p>', { align: 'center', 'font-size': '14px', color: '#c47a8a', padding: '0', 'font-family': "'Playfair Display', Georgia, serif" }),
          ])],
          { 'background-color': '#ffffff', padding: '16px 24px 8px 24px' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Your Company Name | Your Address | Your Contact/Email | Unsubscribe</p>', { align: 'center', 'font-size': '10px', color: '#c47a8a', padding: '0' }),
          ])],
          { 'background-color': '#fff0f3', padding: '16px 24px', 'border-top': '1px solid #f5e0e5' },
        ),
      ], { 'background-color': '#fff5f7' }),
    }),
  },

  // 39. Chinese New Year
  {
    id: 'chinese-new-year',
    label: 'Chinese New Year',
    description: 'Festive Chinese New Year celebration email',
    icon: 'Sparkles',
    color: '#8b1a1a',
    category: 'evenement',
    tags: ['chinese new year', 'lunar', 'festive', 'holiday'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }, { name: 'Playfair Display', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap' }], previewText: 'Happy Chinese New Year — Gong Xi Fa Cai! Celebrate with 15% OFF' },
      body: createBody([
        // Hero
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic; line-height: 1.2;">Happy Chinese</p>', { align: 'center', 'font-size': '28px', color: '#ffd700', padding: '0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<h1 style="margin: 0; font-style: italic; line-height: 1.1;">New Year</h1>', { align: 'center', 'font-size': '40px', color: '#ffd700', padding: '0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<p style="margin: 0; letter-spacing: 1px;">Gong Xi Fa Cai</p>', { align: 'center', 'font-size': '13px', color: '#f0c878', padding: '8px 0 0 0' }),
          ])],
          { 'background-color': '#a02020', padding: '40px 24px 20px 24px' },
        ),
        // Dragon image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=500&h=200&fit=crop', alt: 'Chinese Dragon', 'border-radius': '8px', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { 'background-color': '#8b1a1a', padding: '0 24px' },
        ),
        // Greeting
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Dear [Customer Name],</p>', { align: 'center', 'font-size': '16px', color: '#ffd700', padding: '0 0 8px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<p style="margin: 0;">As Chinese New Year from the be in the Year of Dragon.<br/>May Your the Dragon.<br/>Your &quot;Foo Clans the property is Your try over lived lot top<br/>another that too me the Jungle.</p>', { align: 'center', 'font-size': '13px', color: '#f0d0a0', 'line-height': '1.7', padding: '0' }),
          ])],
          { 'background-color': '#8b1a1a', padding: '24px 32px' },
        ),
        // Offer
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-size: 28px; font-weight: 700;">15% OFF</p>', { align: 'center', 'font-size': '28px', color: '#8b1a1a', padding: '0' }),
            createText('<p style="margin: 0;">All Red &amp; Gold Items!</p>', { align: 'center', 'font-size': '14px', color: '#8b1a1a', padding: '4px 0 12px 0' }),
            createButton('Explore Our Festive Collection', { 'background-color': '#8b1a1a', color: '#ffd700', 'font-size': '13px', 'border-radius': '6px', 'inner-padding': '10px 28px', 'font-weight': '600', padding: '0' }),
          ])],
          { 'background-color': '#ffd700', padding: '24px', 'border-radius': '12px' },
        ),
        // Feast section
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0;">Feast for the Feasts and Best dance!</h3>', { align: 'center', 'font-size': '18px', color: '#ffd700', padding: '0 0 8px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<p style="margin: 0;">Each My are or fact you must. Check May in of<br/>attraction at and the on meet the market.</p>', { align: 'center', 'font-size': '12px', color: '#f0c878', 'line-height': '1.6', padding: '0' }),
          ])],
          { 'background-color': '#8b1a1a', padding: '24px 32px' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-style: italic; font-size: 22px;">Gong Xi Fa Cai!</p>', { align: 'center', 'font-size': '22px', color: '#ffd700', padding: '0 0 8px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<p style="margin: 0;">Your Company Name | <a href="#" style="color: #f0c878; text-decoration: underline;">A Gift for a Lucky Reader! View!</a></p>', { align: 'center', 'font-size': '11px', color: '#d4a574', padding: '0' }),
          ])],
          { 'background-color': '#6b1515', padding: '20px 24px' },
        ),
      ], { 'background-color': '#8b1a1a' }),
    }),
  },

  // 40. Travel Newsletter
  {
    id: 'travel-newsletter',
    label: 'Travel Newsletter',
    description: 'Travel destination newsletter with activities',
    icon: 'Plane',
    color: '#2c8fa0',
    category: 'marketing',
    tags: ['travel', 'newsletter', 'destination', 'vacation'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }, { name: 'Playfair Display', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap' }], previewText: 'Your Next Escape Awaits — Discover tropical paradise destinations' },
      body: createBody([
        // Nav bar
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Travel. More.</p>', { align: 'right', 'font-size': '11px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '12px 24px' },
        ),
        // Hero — text overlaid on background image
        createHero(
          [
            createText('<h1 style="margin: 0; line-height: 1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.3);">YOUR NEXT ESCAPE AWAITS</h1>', { align: 'left', 'font-size': '32px', color: '#ffffff', padding: '0 0 4px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
            createText('<p style="margin: 0; font-style: italic; text-shadow: 0 2px 8px rgba(0,0,0,0.3);">to Tropical Paradise!</p>', { align: 'left', 'font-size': '18px', color: '#e0f0f8', padding: '0', 'font-family': "'Playfair Display', Georgia, serif" }),
          ],
          {
            'background-url': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=300&fit=crop',
            'background-height': '300px',
            'background-width': '600px',
            'background-color': '#1a3a4a',
            mode: 'fluid',
            padding: '20px 24px 40px 24px',
            'vertical-align': 'top',
          },
        ),
        // Destination section
        createSection(
          [
            createColumn(
              [
                createText('<h2 style="margin: 0;">Destination:</h2>', { 'font-size': '22px', color: '#2c3e50', padding: '0 0 4px 0', 'font-family': "'Playfair Display', Georgia, serif" }),
                createText('<p style="margin: 0; font-weight: 600;">Isles</p>', { 'font-size': '14px', color: '#2c3e50', padding: '0 0 12px 0' }),
                createText('<p style="margin: 0; line-height: 1.7;">untouched beauty. Explore<br/>n coves, snokel among colorful<br/>t, and stone one the world\'s<br/>sts.</p>', { 'font-size': '12px', color: '#666666', 'line-height': '1.7', padding: '0' }),
              ],
              { width: '65%' },
            ),
            createColumn(
              [createImage({ src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=120&fit=crop', alt: 'Resort', 'border-radius': '8px', padding: '0' })],
              { width: '35%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '24px' },
        ),
        // Adventure image + badge in same column
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=552&h=200&fit=crop', alt: 'Adventure', 'border-radius': '8px', padding: '0', 'fluid-on-mobile': 'true' }),
            createText('<p style="margin: -40px 0 0 0; position: relative;"><span style="display: inline-block; background: #2c8fa0; color: white; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 600;">ADVENTURE<br/>AWAITS!</span></p>', { align: 'left', 'font-size': '11px', color: '#ffffff', padding: '0 16px 0 16px' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 24px' },
        ),
        // Activities — three columns
        createSection(
          [
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1544551763-77932ade4276?w=150&h=100&fit=crop', alt: 'Kayaking', 'border-radius': '8px', padding: '0 0 6px 0', 'fluid-on-mobile': 'true' }),
                createText('<p style="margin: 0; font-weight: 600;">Kayaking Tours</p>', { align: 'center', 'font-size': '11px', color: '#333333', padding: '0' }),
              ],
              { width: '33.33%', padding: '8px' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=150&h=100&fit=crop', alt: 'Island Cuisine', 'border-radius': '8px', padding: '0 0 6px 0', 'fluid-on-mobile': 'true' }),
                createText('<p style="margin: 0; font-weight: 600;">Island Cuisine</p>', { align: 'center', 'font-size': '11px', color: '#333333', padding: '0' }),
              ],
              { width: '33.33%', padding: '8px' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=150&h=100&fit=crop', alt: 'Jungle Treks', 'border-radius': '8px', padding: '0 0 6px 0', 'fluid-on-mobile': 'true' }),
                createText('<p style="margin: 0; font-weight: 600;">Jungle Treks</p>', { align: 'center', 'font-size': '11px', color: '#333333', padding: '0' }),
              ],
              { width: '33.33%', padding: '8px' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '24px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0;">Dream Vacation</h3>', { 'font-size': '15px', color: '#2c3e50', padding: '0 0 4px 0' }),
            createButton('Begin', { 'background-color': '#2c8fa0', color: '#ffffff', 'font-size': '12px', 'border-radius': '6px', 'inner-padding': '8px 20px', 'font-weight': '600', align: 'left', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 24px 16px 24px' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">&copy; 2024 Travel Adventures. All rights reserved. <a href="#" style="color: #2c8fa0; text-decoration: underline;">Unsubscribe</a></p>', { align: 'center', 'font-size': '10px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#2c3e50', padding: '16px 24px' },
        ),
      ], { 'background-color': '#f0f4f8' }),
    }),
  },

  // 41. Product Launch Aurora
  {
    id: 'product-launch-aurora',
    label: 'Product Launch',
    description: 'Dark-themed tech product launch announcement',
    icon: 'Rocket',
    color: '#8b5cf6',
    category: 'marketing',
    tags: ['product', 'launch', 'tech', 'announcement'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }], previewText: 'Introducing AUROON — Your Sound, Electrified!' },
      body: createBody([
        // Hero
        createSection(
          [createColumn([
            createText('<p style="margin: 0; letter-spacing: 4px;">AURORA SOUND</p>', { align: 'center', 'font-size': '12px', color: '#8b5cf6', padding: '0 0 8px 0' }),
            createImage({ src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop', alt: 'Headphones', 'border-radius': '12px', width: '260px', padding: '0' }),
          ])],
          { 'background-color': '#1a0a30', padding: '40px 24px 20px 24px' },
        ),
        // Intro
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0; font-weight: 800; line-height: 1.2;">Introducing<br/>AUROON - Your Sound, Electrified!</h1>', { 'font-size': '24px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">and for your first time too top on the<br/>ing the for Gunr\' and now. At top our<br/>hy causing store for yours old now\'</p>', { 'font-size': '12px', color: '#94a3b8', 'line-height': '1.6', padding: '0' }),
          ])],
          { 'background-color': '#0a0a14', padding: '24px 24px 16px 24px' },
        ),
        // Features
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0;">What Makes AUROON Electrifying?</h2>', { 'font-size': '20px', color: '#8b5cf6', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">Aurora. Live the crystal-clear highs,<br/>sound.<br/>ty With incredible 40 hours of battery life...<br/>start the extended wear.<br/>int. Engineered extended wear.<br/>Bluetooth 5.3.</p>', { 'font-size': '12px', color: '#c4b5fd', 'line-height': '1.6', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0; display: inline-block; background: #8b5cf6; color: white; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 700;">40 HOURS</p>', { 'font-size': '11px', color: '#ffffff', padding: '0' }),
          ])],
          { 'background-color': '#140a28', padding: '16px 24px' },
        ),
        // Lifestyle image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=200&fit=crop', alt: 'Person with headphones', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Launch offer
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; font-size: 10px; background: #8b5cf6; color: white; padding: 3px 10px; border-radius: 4px; display: inline-block;">NOW!</p>', { align: 'center', 'font-size': '10px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<h3 style="margin: 0;">Launch Offer!</h3>', { align: 'center', 'font-size': '18px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">um carrying case.</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0 0 12px 0' }),
            createButton('Watch the Teaser Video', { 'background-color': '#8b5cf6', color: '#ffffff', 'font-size': '13px', 'border-radius': '8px', 'inner-padding': '12px 32px', 'font-weight': '700', padding: '0' }),
          ])],
          { 'background-color': '#0a0a14', padding: '24px' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">You received this because you have ordered the AUROON community. <a href="#" style="color: #8b5cf6; text-decoration: underline;">Unsubscribe</a></p>', { align: 'center', 'font-size': '10px', color: '#64748b', padding: '0' }),
          ])],
          { 'background-color': '#0a0a14', padding: '16px 24px', 'border-top': '1px solid #1f1f3a' },
        ),
      ], { 'background-color': '#0a0a14' }),
    }),
  },

  // 42. Holiday Sale Christmas
  {
    id: 'holiday-sale-christmas',
    label: 'Holiday Sale',
    description: 'Christmas holiday sale with festive deals',
    icon: 'TreePine',
    color: '#c41e3a',
    category: 'marketing',
    tags: ['holiday', 'christmas', 'sale', 'e-commerce'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }, { name: 'Playfair Display', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap' }], previewText: 'Merry Savings! Your Ultimate Christmas Holiday Sale is HERE — Up to 50% OFF' },
      body: createBody([
        // Hero banner
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0; font-family: Playfair Display, Georgia, serif; line-height: 1.1;">Merry Savings!</h1>', { align: 'center', 'font-size': '36px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">Your Ultimate Christmas Holiday Sale is HERE!</p>', { align: 'center', 'font-size': '13px', color: '#f0c0c8', padding: '0' }),
          ])],
          { 'background-color': '#c41e3a', padding: '32px 24px' },
        ),
        // Christmas image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=600&h=180&fit=crop', alt: 'Christmas decorations', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Sale banner
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-family: Playfair Display, Georgia, serif; font-style: italic;">Christmas</p>', { align: 'center', 'font-size': '22px', color: '#ffd700', padding: '0' }),
            createText('<p style="margin: 0; font-weight: 700; letter-spacing: 2px;">SALE BANNER</p>', { align: 'center', 'font-size': '14px', color: '#ffffff', padding: '4px 0' }),
            createText('<p style="margin: 0;">UP TO <span style="font-size: 40px; font-weight: 800; color: #ffd700;">50<sup style="font-size: 20px;">%</sup></span> OFF</p>', { align: 'center', 'font-size': '12px', color: '#ffffff', padding: '4px 0' }),
          ])],
          { 'background-color': '#c41e3a', padding: '20px' },
        ),
        // Main content
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0;">Get Ready to Unwrap Incredible Deals!</h2>', { align: 'center', 'font-size': '20px', color: '#2c3e50', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">This warming season did our editor material. Strong our uses wide lots under available they your saves to fall to play and of over the sale saving gold cards.</p>', { align: 'center', 'font-size': '12px', color: '#666666', 'line-height': '1.7', padding: '0 0 16px 0' }),
            createText('<p style="margin: 0; font-weight: 700;">Sale Ends: December 25th at Midnight</p>', { align: 'center', 'font-size': '13px', color: '#c41e3a', padding: '0 0 16px 0' }),
            createButton('Shop All Christmas Deals', { 'background-color': '#2c3e50', color: '#ffffff', 'font-size': '13px', 'border-radius': '6px', 'inner-padding': '10px 28px', 'font-weight': '600', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '24px' },
        ),
        // What's under the tree
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0;">&#10024; What\'s Under Our Christmas Tree? &#10024;</h3>', { align: 'center', 'font-size': '16px', color: '#c41e3a', padding: '0 0 12px 0' }),
            createText('<p style="margin: 0;">&#127873; Up to 50% OFF Select Categories!<br/>&#127873; Up to 30% OFF Categories... FREE Shipping...<br/>&#127873; FREE Shipping...</p>', { 'font-size': '12px', color: '#555555', 'line-height': '1.8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 24px 24px 24px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Explore Our Best Sellers!', { 'background-color': '#c41e3a', color: '#ffffff', 'font-size': '14px', 'border-radius': '6px', 'inner-padding': '12px 32px', 'font-weight': '700', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 24px 24px 24px' },
        ),
        // Footer image + link
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=100&fit=crop', alt: 'Christmas scene', 'border-radius': '8px', padding: '0 0 8px 0', 'fluid-on-mobile': 'true' }),
            createText('<p style="margin: 0;"><a href="#" style="color: #c41e3a; text-decoration: underline;">yoursweaterretailwebsite.com</a></p>', { align: 'center', 'font-size': '10px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#f5f0eb', padding: '16px 24px' },
        ),
      ], { 'background-color': '#f5f0eb' }),
    }),
  },

  // 43. Welcome Series
  {
    id: 'welcome-series',
    label: 'Welcome Series',
    description: 'Onboarding welcome email with getting started steps',
    icon: 'Handshake',
    color: '#01A8AB',
    category: 'engagement',
    tags: ['welcome', 'onboarding', 'getting started', 'series'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }], previewText: 'Welcome to [Your Company]! Let\'s get started.' },
      body: createBody([
        // Hero
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0;">Welcome to [Your Company/Product]!</h1>', { align: 'center', 'font-size': '24px', color: '#1a1a2e', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0; font-style: italic;">Let\'s get started.</p>', { align: 'center', 'font-size': '14px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '40px 24px 24px 24px' },
        ),
        // Handshake image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f2a?w=400&h=200&fit=crop', alt: 'Welcome handshake', 'border-radius': '12px', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 40px 24px 40px' },
        ),
        // Welcome text
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Hi [User Name], Welcome aboard! We\'re thrilled you join the [Your Company/Product] family. We\'re excited to help you Declare some Specific Benefit of your product / offer.</p>', { 'font-size': '13px', color: '#475569', 'line-height': '1.7', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 32px 24px 32px' },
        ),
        // Getting started heading
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700;">Here\'s how to get started:</p>', { 'font-size': '14px', color: '#1a1a2e', padding: '0 0 12px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 32px' },
        ),
        // Getting started steps
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">1. Getting Started Guide <a href="#" style="color: #01A8AB; font-weight: 500; float: right;">Explore Our Features</a></p>', { 'font-size': '12px', color: '#475569', padding: '8px 0' }),
            createDivider({ 'border-color': '#f0f0f0', 'border-width': '1px', padding: '0' }),
            createText('<p style="margin: 0;">2. Explore Our Features <a href="#" style="color: #01A8AB; font-weight: 500; float: right;">Join Our Community</a></p>', { 'font-size': '12px', color: '#475569', padding: '8px 0' }),
            createDivider({ 'border-color': '#f0f0f0', 'border-width': '1px', padding: '0' }),
            createText('<p style="margin: 0;">3. Join Our Community <span style="display: inline-block; width: 20px; height: 20px; background: #e8f5e9; border-radius: 50%; text-align: center; line-height: 20px; font-size: 10px; color: #16a34a; float: right;">&#10003;</span></p>', { 'font-size': '12px', color: '#475569', padding: '8px 0' }),
            createDivider({ 'border-color': '#f0f0f0', 'border-width': '1px', padding: '0' }),
            createText('<p style="margin: 0;">4. Watch Our Tutorial Videos <span style="display: inline-block; width: 20px; height: 20px; background: #e8f5e9; border-radius: 50%; text-align: center; line-height: 20px; font-size: 10px; color: #16a34a; float: right;">&#10003;</span></p>', { 'font-size': '12px', color: '#475569', padding: '8px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 32px 24px 32px' },
        ),
        // CTA
        createSection(
          [createColumn([
            createButton('Dive In', { 'background-color': '#01A8AB', color: '#ffffff', 'font-size': '14px', 'border-radius': '8px', 'inner-padding': '12px 40px', 'font-weight': '600', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 32px 24px 32px' },
        ),
        // Help
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Questions? We\'re here to help!</p>', { align: 'center', 'font-size': '12px', color: '#94a3b8', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0;"><a href="#" style="color: #01A8AB; text-decoration: underline;">[Contact Email/Link]</a></p>', { align: 'center', 'font-size': '12px', color: '#01A8AB', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 32px 24px 32px' },
        ),
        // Sign off
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Best,</p>', { 'font-size': '13px', color: '#475569', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0; font-weight: 600;">The Team at [Your Company]</p>', { 'font-size': '13px', color: '#1a1a2e', padding: '0' }),
            createText('<p style="margin: 0;"><a href="#" style="color: #01A8AB;">[Your Website Link]</a></p>', { 'font-size': '12px', color: '#01A8AB', padding: '4px 0 0 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 32px 16px 32px' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">[Company Address] | <a href="#" style="color: #01A8AB;">Unsubscribe</a></p>', { align: 'center', 'font-size': '10px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#f8fafc', padding: '16px 24px', 'border-top': '1px solid #e5e7eb' },
        ),
      ], { 'background-color': '#f0f4f8' }),
    }),
  },

  // 44. Summer Promo
  {
    id: 'summer-promo',
    label: 'Summer Promo',
    description: 'Vibrant summer sale promotion with beach vibes',
    icon: 'Sun',
    color: '#e65100',
    category: 'marketing',
    tags: ['summer', 'sale', 'beach', 'promotion'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }], previewText: 'SUMMER SALE — Up to 40% Off! Dive Into Amazing Deals' },
      body: createBody([
        // Hero banner
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; font-size: 11px; background: #c41e3a; color: white; padding: 4px 12px; border-radius: 4px; display: inline-block;">Up To 40% Off!</p>', { align: 'center', 'font-size': '11px', color: '#ffffff', padding: '0 0 8px 0' }),
            createText('<h1 style="margin: 0; font-weight: 800; line-height: 1; text-shadow: 2px 2px 0px rgba(0,0,0,0.1);">SUMMER<br/>SALE</h1>', { align: 'center', 'font-size': '48px', color: '#ffffff', padding: '0' }),
            createText('<p style="margin: 0; font-style: italic;">Dive Into Amazing Deals!</p>', { align: 'center', 'font-size': '13px', color: '#fff3e0', padding: '8px 0 0 0' }),
          ])],
          { 'background-color': '#ff9800', padding: '32px 24px' },
        ),
        // Beach hero image
        createSection(
          [createColumn([
            createImage({ src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=160&fit=crop', alt: 'Beach', padding: '0', 'fluid-on-mobile': 'true' }),
          ])],
          { padding: '0' },
        ),
        // Main heading
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; font-weight: 800;">Hello, Sunshine &amp; Savings!</h2>', { align: 'center', 'font-size': '26px', color: '#e65100', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">Soak up the sunshine sun and incredible discounts! Our offers with scorching deals on all your beach essentials and more.</p>', { align: 'center', 'font-size': '12px', color: '#666666', 'line-height': '1.6', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '24px 24px 16px 24px' },
        ),
        // Products — three columns
        createSection(
          [
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150&h=120&fit=crop', alt: 'Swimsuit', 'border-radius': '8px', padding: '0 0 6px 0' }),
                createText('<p style="margin: 0; font-weight: 600;">Swimsuit</p>', { align: 'center', 'font-size': '11px', color: '#333333', padding: '0' }),
                createText('<p style="margin: 0; font-weight: 700;">$9</p>', { align: 'center', 'font-size': '11px', color: '#e65100', padding: '2px 0' }),
              ],
              { width: '33.33%' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=120&fit=crop', alt: 'Beach Towel', 'border-radius': '8px', padding: '0 0 6px 0' }),
                createText('<p style="margin: 0; font-weight: 600;">Sunset Stripe Beach Towel</p>', { align: 'center', 'font-size': '11px', color: '#333333', padding: '0' }),
                createText('<p style="margin: 0;"><s>$129.95</s></p>', { align: 'center', 'font-size': '11px', color: '#999999', padding: '2px 0' }),
                createButton('SHOP NOW', { 'background-color': '#e65100', color: '#ffffff', 'font-size': '9px', 'border-radius': '3px', 'inner-padding': '4px 10px', 'font-weight': '600', padding: '0' }),
              ],
              { width: '33.33%' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=150&h=120&fit=crop', alt: 'Explorer', 'border-radius': '8px', padding: '0 0 6px 0' }),
                createText('<p style="margin: 0; font-weight: 600;">Explorer Art...</p>', { align: 'center', 'font-size': '11px', color: '#333333', padding: '0' }),
                createText('<p style="margin: 0; font-weight: 700;">$1</p>', { align: 'center', 'font-size': '11px', color: '#e65100', padding: '2px 0' }),
              ],
              { width: '33.33%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '0 16px' },
        ),
        // Free shipping banner
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; letter-spacing: 1px;">FREE SHIPPING ON ALL ORDERS OVER $50!</p>', { align: 'center', 'font-size': '13px', color: '#ffffff', padding: '0' }),
          ])],
          { 'background-color': '#01A8AB', padding: '12px' },
        ),
        // Summer adventure — two columns
        createSection(
          [
            createColumn(
              [createImage({ src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=260&h=200&fit=crop', alt: 'Beach woman', 'border-radius': '8px', padding: '0' })],
              { width: '50%' },
            ),
            createColumn(
              [
                createText('<h3 style="margin: 0;">Summer Adventure<br/>Shop Collection</h3>', { 'font-size': '16px', color: '#333333', padding: '0 0 8px 0' }),
                createImage({ src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=60&fit=crop', alt: 'Swimwear', 'border-radius': '6px', width: '100px', padding: '0 0 4px 0' }),
                createText('<p style="margin: 0; font-weight: 600;">Swimwear</p>', { 'font-size': '10px', color: '#e65100', padding: '0 0 8px 0' }),
                createButton('SHOP ALL', { 'background-color': '#e65100', color: '#ffffff', 'font-size': '10px', 'border-radius': '4px', 'inner-padding': '6px 16px', 'font-weight': '600', align: 'left', padding: '0' }),
              ],
              { width: '50%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '16px 24px' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">&copy; 2024 Beach Vibes Co. | <a href="#" style="color: #e65100; text-decoration: underline;">Privacy Policy</a> | <a href="#" style="color: #e65100; text-decoration: underline;">Unsubscribe</a></p>', { align: 'center', 'font-size': '10px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#fff8e1', padding: '16px 24px', 'border-top': '1px solid #ffe0b2' },
        ),
      ], { 'background-color': '#fff8e1' }),
    }),
  },

  // 45. Order Confirmation Phone
  {
    id: 'order-confirmation-phone',
    label: 'Order Confirmation',
    description: 'Minimalist order confirmation with item details',
    icon: 'Package',
    color: '#1a1a1a',
    category: 'transactionnel',
    tags: ['order', 'confirmation', 'minimalist', 'transactional'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }], previewText: 'Thank You for Your Order, John! — Order confirmation from Minimalist Goods' },
      body: createBody([
        // Logo
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700; font-size: 18px; background: #1a1a1a; color: #ffffff; width: 40px; height: 40px; line-height: 40px; border-radius: 8px; display: inline-block; text-align: center;">M</p>', { align: 'center', 'font-size': '18px', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '24px' },
        ),
        // Heading
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0; font-weight: 700;">Thank You for Your Order, John!</h1>', { align: 'center', 'font-size': '24px', color: '#1a1a1a', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0;">We\'re thrilled to confirm your recent purchase from<br/>Minimalist Goods.</p>', { align: 'center', 'font-size': '13px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 32px 24px 32px' },
        ),
        // Order details — wrapped in bordered container
        createWrapper(
          [
            // Order details header
            createSection(
              [createColumn([
                createText('<p style="margin: 0; font-weight: 700;">Order Details</p>', { 'font-size': '14px', color: '#1a1a1a', padding: '12px 16px' }),
              ])],
              { 'background-color': '#f8fafc', padding: '0' },
            ),
            // Order items header row + items
            createSection(
              [createColumn([
                createText('<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-size: 12px; font-weight: 600; color: #94a3b8;">Items in Your Order</td><td style="text-align: right; font-size: 12px; font-weight: 600; color: #94a3b8;">Order Detail</td></tr></table>', { 'font-size': '12px', color: '#94a3b8', padding: '10px 16px' }),
                createDivider({ 'border-color': '#f0f0f0', 'border-width': '1px', padding: '0 16px' }),
                // Item 1
                createText('<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-size: 12px; color: #475569;">Product Name 1</td><td style="text-align: right; font-size: 12px; color: #475569;">x 1</td><td style="text-align: right; font-size: 12px; font-weight: 600; color: #1a1a1a; width: 80px;">$85.00</td></tr></table>', { 'font-size': '12px', color: '#475569', padding: '10px 16px' }),
                createDivider({ 'border-color': '#f0f0f0', 'border-width': '1px', padding: '0 16px' }),
                // Item 2
                createText('<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-size: 12px; color: #475569;">Product Name 2</td><td style="text-align: right; font-size: 12px; color: #475569;">x 3</td><td style="text-align: right; font-size: 12px; font-weight: 600; color: #1a1a1a; width: 80px;">$36.00</td></tr></table>', { 'font-size': '12px', color: '#475569', padding: '10px 16px' }),
                createDivider({ 'border-color': '#f0f0f0', 'border-width': '1px', padding: '0 16px' }),
                // Item 3
                createText('<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-size: 12px; color: #475569;">Product Name 3</td><td style="text-align: right; font-size: 12px; color: #475569;">x 1</td><td style="text-align: right; font-size: 12px; font-weight: 600; color: #1a1a1a; width: 80px;">$99.00</td></tr></table>', { 'font-size': '12px', color: '#475569', padding: '10px 16px' }),
                createDivider({ 'border-color': '#f0f0f0', 'border-width': '1px', padding: '0 16px' }),
              ])],
              { 'background-color': '#ffffff', padding: '0' },
            ),
            // Total
            createSection(
              [createColumn([
                createText('<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-size: 13px; font-weight: 700; color: #1a1a1a;">Total</td><td style="text-align: right; font-size: 13px; font-weight: 700; color: #1a1a1a;">$220.00</td></tr></table>', { 'font-size': '13px', color: '#1a1a1a', padding: '12px 16px' }),
              ])],
              { 'background-color': '#f8fafc', padding: '0' },
            ),
          ],
          { padding: '0 32px 24px 32px', border: '1px solid #e5e7eb', 'border-radius': '12px' },
        ),
        // Shipping info
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0;">Shipping Information</h3>', { 'font-size': '14px', color: '#1a1a1a', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; line-height: 1.6;">Estimated Delivery: 3-5 Business Days<br/>Addr: ABC15 D5596<br/><a href="#" style="color: #01A8AB; text-decoration: underline;">trackinfo@tracked.com</a></p>', { 'font-size': '12px', color: '#94a3b8', 'line-height': '1.6', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '24px 32px' },
        ),
        // Need help
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0;">Need Help?</h3>', { 'font-size': '14px', color: '#1a1a1a', padding: '0 0 8px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '0 32px' },
        ),
        createSection(
          [
            createColumn(
              [createText('<div style="width: 48px; height: 48px; background: #f0f4f8; border-radius: 8px; margin: 0 auto; line-height: 48px; font-size: 20px; text-align: center;">&#128172;</div>', { align: 'center', 'font-size': '20px', padding: '8px' })],
              { width: '50%' },
            ),
            createColumn(
              [createText('<p style="margin: 0; font-weight: 600; color: #01A8AB;">Check out our latest all mill.</p>', { 'font-size': '11px', color: '#01A8AB', padding: '8px' })],
              { width: '50%' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '0 32px 24px 32px' },
        ),
        // Thank you
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 600;">Thank You Wells</p>', { align: 'center', 'font-size': '14px', color: '#1a1a1a', padding: '0' }),
          ])],
          { 'background-color': '#f8fafc', padding: '16px 32px', 'border-top': '1px solid #e5e7eb' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0;"><a href="#" style="color: #94a3b8; text-decoration: underline;">Privacy Policy</a> &nbsp;&nbsp; <a href="#" style="color: #94a3b8; text-decoration: underline;">Unsubscribe</a></p>', { align: 'center', 'font-size': '10px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '16px 24px' },
        ),
      ], { 'background-color': '#f5f5f5' }),
    }),
  },

  // 46. Weekly Digest
  {
    id: 'weekly-digest',
    label: 'Weekly Digest',
    description: 'Content digest with featured and curated articles',
    icon: 'BookOpen',
    color: '#e65100',
    category: 'marketing',
    tags: ['weekly', 'digest', 'newsletter', 'articles'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }, { name: 'Playfair Display', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap' }], previewText: 'Weekly Digest from Innovate Hub — Machine Learning is Transforming Industries' },
      body: createBody([
        // Preheader
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Digest from Weekly Digest</p>', { 'font-size': '11px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#ffffff', padding: '8px 24px' },
        ),
        // Header
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0; font-weight: 800; letter-spacing: 2px;">WEEKLY DIGEST</h1>', { align: 'center', 'font-size': '28px', color: '#ffffff', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0;">from Innovate Hub</p>', { align: 'center', 'font-size': '12px', color: '#ffccbc', padding: '0' }),
          ])],
          { 'background-color': '#e65100', padding: '24px' },
        ),
        // Featured article — hero with background image overlay
        createHero(
          [
            createText('<p style="margin: 0; font-weight: 700; font-size: 10px; background: #e65100; color: white; padding: 2px 8px; border-radius: 3px; display: inline-block;">Top Pick</p>', { 'font-size': '10px', color: '#ffffff', padding: '0 0 6px 0' }),
            createText('<h2 style="margin: 0; font-weight: 700; line-height: 1.3;">New Frontier:<br/>Machine Learning is<br/>Transforming Industries</h2>', { 'font-size': '20px', color: '#ffffff', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0; line-height: 1.5;">Exclusively, all believe it to the mean long game transforming from the attention to influence, and else a Wurea of luck.</p>', { 'font-size': '11px', color: '#d1d5db', padding: '0 0 8px 0' }),
            createButton('MORE', { 'background-color': '#e65100', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '6px 16px', 'font-weight': '600', align: 'left', padding: '0' }),
          ],
          {
            'background-url': 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&h=340&fit=crop',
            'background-height': '340px',
            'background-width': '600px',
            'background-color': '#1a1a2e',
            mode: 'fluid',
            padding: '80px 24px 16px 24px',
            'vertical-align': 'bottom',
          },
        ),
        // Divider bar
        createSection(
          [createColumn([
            createSpacer({ height: '3px' }),
          ])],
          { 'background-color': '#e65100', padding: '0' },
        ),
        // Articles heading
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0; font-weight: 700; letter-spacing: 1px;">ARTICLES</h3>', { 'font-size': '14px', color: '#e65100', padding: '0 0 16px 0' }),
          ])],
          { 'background-color': '#ffffff', padding: '24px 24px 0 24px' },
        ),
        // Articles grid — four columns
        createSection(
          [
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&h=80&fit=crop', alt: 'Routines', 'border-radius': '6px', padding: '0 0 4px 0' }),
                createText('<p style="margin: 0; font-weight: 600; line-height: 1.3;">Routines of<br/>Dreamworkers</p>', { align: 'center', 'font-size': '10px', color: '#333333', padding: '0' }),
              ],
              { width: '25%', padding: '4px' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&h=80&fit=crop', alt: 'Mindfulness', 'border-radius': '6px', padding: '0 0 4px 0' }),
                createText('<p style="margin: 0; font-weight: 600; line-height: 1.3;">Mindfulness in<br/>the Digital Age</p>', { align: 'center', 'font-size': '10px', color: '#333333', padding: '0' }),
              ],
              { width: '25%', padding: '4px' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=120&h=80&fit=crop', alt: 'Reading', 'border-radius': '6px', padding: '0 0 4px 0' }),
                createText('<p style="margin: 0; font-weight: 600; line-height: 1.3;">Reading List: Top 5<br/>Business Books</p>', { align: 'center', 'font-size': '10px', color: '#333333', padding: '0' }),
              ],
              { width: '25%', padding: '4px' },
            ),
            createColumn(
              [
                createImage({ src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=80&fit=crop', alt: 'Trends', 'border-radius': '6px', padding: '0 0 4px 0' }),
                createText('<p style="margin: 0; font-weight: 600; line-height: 1.3;">Global Remote<br/>Trends 2024</p>', { align: 'center', 'font-size': '10px', color: '#333333', padding: '0' }),
              ],
              { width: '25%', padding: '4px' },
            ),
          ],
          { 'background-color': '#ffffff', padding: '0 24px 24px 24px' },
        ),
        // Miss these section — bordered card
        createSection(
          [createColumn([
            createText('<h4 style="margin: 0; font-weight: 700; letter-spacing: 1px;">MISS THESE:</h4>', { 'font-size': '12px', color: '#e65100', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; line-height: 1.5;">one of Sustainable Tech<br/>smartly Explore\'d</p>', { 'font-size': '12px', color: '#475569', padding: '0 0 12px 0' }),
            createButton('VISIT OUR BLOG', { 'background-color': '#e65100', color: '#ffffff', 'font-size': '11px', 'border-radius': '4px', 'inner-padding': '8px 20px', 'font-weight': '600', align: 'left', padding: '0' }),
          ], { border: '1px solid #e5e7eb', 'border-radius': '8px', padding: '16px' })],
          { 'background-color': '#ffffff', padding: '0 24px 24px 24px' },
        ),
        // Social
        createSection(
          [createColumn([
            createSocial(
              [
                createSocialElement('twitter', 'https://twitter.com/', { 'background-color': '#333333' }),
                createSocialElement('linkedin', 'https://linkedin.com/', { 'background-color': '#333333' }),
              ],
              { 'icon-size': '28px', mode: 'horizontal', align: 'right', padding: '0', color: '#ffffff' },
            ),
          ])],
          { 'background-color': '#ffffff', padding: '0 24px 8px 24px' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">&copy; 123 Tech Lane, Silicon Valley, CA. &copy; 2024. All Year reserved.</p>', { align: 'center', 'font-size': '9px', color: '#94a3b8', padding: '0' }),
          ])],
          { 'background-color': '#f8fafc', padding: '12px 24px', 'border-top': '1px solid #e5e7eb' },
        ),
      ], { 'background-color': '#f5f5f5' }),
    }),
  },

  // 47. Black Friday Deal
  {
    id: 'black-friday-deal',
    label: 'Black Friday Deal',
    description: 'Bold neon-styled Black Friday sale campaign',
    icon: 'Zap',
    color: '#ff00ff',
    category: 'marketing',
    tags: ['black friday', 'sale', 'deals', 'e-commerce'],
    factory: (): EmailDocument => ({
      version: 1,
      headAttributes: { defaultStyles: { 'mj-all': { 'font-family': "'Inter', Arial, sans-serif" } }, fonts: [{ name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap' }], previewText: 'BLACK FRIDAY DEALS ARE HERE! Up to 70% Off Everything!' },
      body: createBody([
        // Top banner
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-weight: 700;">BLACK FRIDAY DEALS ARE HERE! Up to 70% Off Everything!</p>', { align: 'center', 'font-size': '12px', color: '#ffffff', padding: '0' }),
          ])],
          { 'background-color': '#ff00ff', padding: '10px' },
        ),
        // Sub banner
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Don\'t miss out! Our biggest sale the year starts NOW.</p>', { align: 'center', 'font-size': '10px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#0a0a0a', padding: '4px' },
        ),
        // Main hero with neon border box
        createSection(
          [createColumn([
            createText('<h1 style="margin: 0; font-weight: 900; letter-spacing: 2px; text-shadow: 0 0 20px rgba(255,0,255,0.5);">BLACK FRIDAY</h1>', { align: 'center', 'font-size': '48px', color: '#ff00ff', padding: '0' }),
            createText('<p style="margin: 0; font-weight: 900; letter-spacing: 4px; text-shadow: 0 0 20px rgba(0,255,255,0.5);">SALE</p>', { align: 'center', 'font-size': '64px', color: '#00ffff', padding: '0' }),
          ], { border: '3px solid #ff00ff', 'border-radius': '16px' })],
          { 'background-color': '#0a0a0a', padding: '32px 24px' },
        ),
        // Neon Tech Deals heading
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0;"><span style="display: inline-block; width: 8px; height: 8px; background: #00ff88; border-radius: 50%; margin-right: 6px;"></span>NEON TECH DEALS</h2>', { 'font-size': '16px', color: '#00ff88', padding: '0 0 4px 0' }),
          ])],
          { 'background-color': '#0a0a0a', padding: '24px 24px 0 24px' },
        ),
        // Deal cards — three columns
        createSection(
          [
            createColumn(
              [
                createText('<div style="width: 40px; height: 40px; background: #2a2a4e; border-radius: 8px; margin: 0 auto 6px;"></div>', { align: 'center', 'font-size': '10px', padding: '12px 8px 0 8px' }),
                createText('<p style="margin: 0; font-weight: 600;">Classic Tech Deals</p>', { align: 'center', 'font-size': '10px', color: '#cccccc', padding: '0 8px 2px 8px' }),
                createText('<p style="margin: 0;">Top trending favorites</p>', { align: 'center', 'font-size': '9px', color: '#666666', padding: '0 8px 6px 8px' }),
                createButton('NOW $99.C', { 'background-color': 'transparent', color: '#00ffff', 'font-size': '8px', border: '1px solid #00ffff', 'border-radius': '3px', 'inner-padding': '3px 8px', 'font-weight': '600', padding: '0' }),
              ],
              { width: '33.33%', 'background-color': '#1a1a2e', border: '1px solid #333333', 'border-radius': '8px' },
            ),
            createColumn(
              [
                createText('<div style="width: 40px; height: 40px; background: #2a2a4e; border-radius: 8px; margin: 0 auto 6px;"></div>', { align: 'center', 'font-size': '10px', padding: '12px 8px 0 8px' }),
                createText('<p style="margin: 0; font-weight: 600;">Glowing Fashion Finds</p>', { align: 'center', 'font-size': '10px', color: '#cccccc', padding: '0 8px 2px 8px' }),
                createText('<p style="margin: 0;">Buy one and our anything!</p>', { align: 'center', 'font-size': '9px', color: '#666666', padding: '0 8px 6px 8px' }),
                createButton('NOW $99.C', { 'background-color': 'transparent', color: '#ff00ff', 'font-size': '8px', border: '1px solid #ff00ff', 'border-radius': '3px', 'inner-padding': '3px 8px', 'font-weight': '600', padding: '0' }),
              ],
              { width: '33.33%', 'background-color': '#1a1a2e', border: '1px solid #333333', 'border-radius': '8px' },
            ),
            createColumn(
              [
                createText('<div style="width: 40px; height: 40px; background: #2a2a4e; border-radius: 8px; margin: 0 auto 6px;"></div>', { align: 'center', 'font-size': '10px', padding: '12px 8px 0 8px' }),
                createText('<p style="margin: 0; font-weight: 600;">Glowing Fashion Fr...</p>', { align: 'center', 'font-size': '10px', color: '#cccccc', padding: '0 8px 2px 8px' }),
                createText('<p style="margin: 0;">Buy one and our anything!</p>', { align: 'center', 'font-size': '9px', color: '#666666', padding: '0 8px 6px 8px' }),
                createButton('NOW $99.C', { 'background-color': 'transparent', color: '#ff00ff', 'font-size': '8px', border: '1px solid #ff00ff', 'border-radius': '3px', 'inner-padding': '3px 8px', 'font-weight': '600', padding: '0' }),
              ],
              { width: '33.33%', 'background-color': '#1a1a2e', border: '1px solid #333333', 'border-radius': '8px' },
            ),
          ],
          { 'background-color': '#0a0a0a', padding: '12px 24px 24px 24px' },
        ),
        // Limited time doorbusters — dashed neon border wrapping heading + buttons
        createWrapper(
          [
            createSection(
              [createColumn([
                createText('<h3 style="margin: 0;">LIMITED TIME DOORBUSTERS! &#9888;</h3>', { align: 'center', 'font-size': '14px', color: '#ff00ff', padding: '0 0 8px 0' }),
              ])],
              { 'background-color': '#0a0a0a', padding: '16px 24px 0 24px' },
            ),
            createSection(
              [
                createColumn(
                  [createButton('SHOP FASHION DEALS', { 'background-color': '#ff00ff', color: '#ffffff', 'font-size': '10px', 'border-radius': '4px', 'inner-padding': '8px 16px', 'font-weight': '700', padding: '0' })],
                  { width: '50%' },
                ),
                createColumn(
                  [createButton('SHOP DOORBUSTERS', { 'background-color': '#00ffff', color: '#0a0a0a', 'font-size': '10px', 'border-radius': '4px', 'inner-padding': '8px 16px', 'font-weight': '700', padding: '0' })],
                  { width: '50%' },
                ),
              ],
              { 'background-color': '#0a0a0a', padding: '0 24px 16px 24px' },
            ),
          ],
          { border: '2px dashed #ff00ff', 'border-radius': '8px', 'background-color': '#0a0a0a', padding: '0' },
        ),
        // Promo badge
        createSection(
          [createColumn([
            createText('<p style="margin: 0; font-size: 10px;">PROMO CODE</p>', { align: 'center', 'font-size': '10px', color: '#ffc0ff', padding: '0' }),
            createText('<p style="margin: 0; font-weight: 900; font-size: 32px;">20% OFF</p>', { align: 'center', 'font-size': '32px', color: '#ffffff', padding: '4px 0' }),
          ])],
          { 'background-color': '#8b00ff', padding: '16px 24px', 'border-radius': '12px' },
        ),
        // Why shop with us
        createSection(
          [createColumn([
            createText('<h3 style="margin: 0;">WHY SHOP WITH US</h3>', { 'font-size': '12px', color: '#00ffff', padding: '0 0 8px 0' }),
            createText('<p style="margin: 0; line-height: 1.6;">smart or extended our<br/>and times and in grayer<br/>hosting your found are\'s<br/>tout Just et found\'au.</p>', { 'font-size': '11px', color: '#999999', padding: '0' }),
          ])],
          { 'background-color': '#0a0a0a', padding: '16px 24px' },
        ),
        // Big CTA
        createSection(
          [createColumn([
            createText('<h2 style="margin: 0; font-weight: 900;">SHOP ALL BLACK FRIDAY</h2>', { align: 'center', 'font-size': '28px', color: '#ffffff', padding: '0 0 4px 0' }),
            createText('<p style="margin: 0; font-weight: 900;">DEALS NOW</p>', { align: 'center', 'font-size': '24px', color: '#fff700', padding: '0' }),
          ])],
          { 'background-color': '#ff00ff', padding: '24px' },
        ),
        // Follow us
        createSection(
          [createColumn([
            createSocial(
              [
                createSocialElement('instagram', 'https://instagram.com/', { 'background-color': '#ff00ff' }),
              ],
              { 'icon-size': '32px', mode: 'horizontal', align: 'center', padding: '0 0 6px 0', color: '#ffffff' },
            ),
            createText('<p style="margin: 0;">FOLLOW US</p>', { align: 'center', 'font-size': '10px', color: '#666666', padding: '0' }),
          ])],
          { 'background-color': '#0a0a0a', padding: '16px' },
        ),
        // Footer
        createSection(
          [createColumn([
            createText('<p style="margin: 0;">Unsubscribe at entire unknown\'s your to remove. | send a mail on tom.</p>', { align: 'center', 'font-size': '9px', color: '#666666', padding: '0' }),
          ])],
          { 'background-color': '#0a0a0a', padding: '12px 24px', 'border-top': '1px solid #222222' },
        ),
      ], { 'background-color': '#0a0a0a' }),
    }),
  },

]
