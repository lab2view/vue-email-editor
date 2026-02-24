import type { EmailNodeType, PropertyDefinition } from '../types'
import { FONT_OPTIONS } from '../constants'

const ALIGNMENT_OPTIONS = [
  { label: 'Gauche', value: 'left' },
  { label: 'Centre', value: 'center' },
  { label: 'Droite', value: 'right' },
]

const BG_SIZE_OPTIONS = [
  { label: 'Auto', value: 'auto' },
  { label: 'Cover', value: 'cover' },
  { label: 'Contain', value: 'contain' },
]

const BG_REPEAT_OPTIONS = [
  { label: 'No Repeat', value: 'no-repeat' },
  { label: 'Repeat', value: 'repeat' },
  { label: 'Repeat X', value: 'repeat-x' },
  { label: 'Repeat Y', value: 'repeat-y' },
]

const DIRECTION_OPTIONS = [
  { label: 'LTR', value: 'ltr' },
  { label: 'RTL', value: 'rtl' },
]

const VERTICAL_ALIGN_OPTIONS = [
  { label: 'Haut', value: 'top' },
  { label: 'Milieu', value: 'middle' },
  { label: 'Bas', value: 'bottom' },
]

const BORDER_STYLE_OPTIONS = [
  { label: 'Solide', value: 'solid' },
  { label: 'Tirets', value: 'dashed' },
  { label: 'Points', value: 'dotted' },
]

const SOCIAL_NAME_OPTIONS = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'GitHub', value: 'github' },
  { label: 'Pinterest', value: 'pinterest' },
]

const HERO_MODE_OPTIONS = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Fluid', value: 'fluid' },
]

/** Property definitions for each MJML node type */
export const PROPERTY_MAP: Partial<Record<EmailNodeType, PropertyDefinition[]>> = {
  'mj-body': [
    { key: 'background-color', label: 'Couleur de fond', type: 'color', group: 'Fond', defaultValue: '#f4f4f4' },
    { key: 'width', label: 'Largeur', type: 'number', unit: 'px', group: 'Dimensions', defaultValue: '600' },
  ],

  'mj-section': [
    { key: 'background-color', label: 'Couleur de fond', type: 'color', group: 'Fond' },
    { key: 'background-url', label: 'Image de fond', type: 'image', group: 'Fond' },
    { key: 'background-size', label: 'Taille du fond', type: 'select', options: BG_SIZE_OPTIONS, group: 'Fond' },
    { key: 'background-repeat', label: 'Répétition du fond', type: 'select', options: BG_REPEAT_OPTIONS, group: 'Fond' },
    { key: 'padding', label: 'Padding', type: 'padding', group: 'Espacement' },
    { key: 'border', label: 'Bordure', type: 'text', group: 'Bordure' },
    { key: 'border-radius', label: 'Rayon de bordure', type: 'text', group: 'Bordure' },
    { key: 'full-width', label: 'Pleine largeur', type: 'toggle', group: 'Disposition' },
    { key: 'direction', label: 'Direction', type: 'select', options: DIRECTION_OPTIONS, group: 'Disposition' },
  ],

  'mj-column': [
    { key: 'width', label: 'Largeur', type: 'text', group: 'Dimensions' },
    { key: 'background-color', label: 'Couleur de fond', type: 'color', group: 'Fond' },
    { key: 'inner-background-color', label: 'Fond intérieur', type: 'color', group: 'Fond' },
    { key: 'padding', label: 'Padding', type: 'padding', group: 'Espacement' },
    { key: 'border', label: 'Bordure', type: 'text', group: 'Bordure' },
    { key: 'border-radius', label: 'Rayon de bordure', type: 'text', group: 'Bordure' },
    { key: 'vertical-align', label: 'Alignement vertical', type: 'select', options: VERTICAL_ALIGN_OPTIONS, group: 'Disposition' },
  ],

  'mj-text': [
    { key: 'color', label: 'Couleur du texte', type: 'color', group: 'Texte' },
    { key: 'font-family', label: 'Police', type: 'select', options: FONT_OPTIONS, group: 'Texte' },
    { key: 'font-size', label: 'Taille', type: 'number', unit: 'px', min: 8, max: 72, group: 'Texte' },
    { key: 'font-weight', label: 'Graisse', type: 'text', group: 'Texte' },
    { key: 'line-height', label: 'Interligne', type: 'text', group: 'Texte' },
    { key: 'letter-spacing', label: 'Espacement lettres', type: 'text', group: 'Texte' },
    { key: 'align', label: 'Alignement', type: 'alignment', group: 'Texte' },
    { key: 'padding', label: 'Padding', type: 'padding', group: 'Espacement' },
  ],

  'mj-image': [
    { key: 'src', label: 'URL de l\'image', type: 'image', group: 'Image' },
    { key: 'alt', label: 'Texte alternatif', type: 'text', group: 'Image' },
    { key: 'href', label: 'Lien', type: 'url', group: 'Lien' },
    { key: 'width', label: 'Largeur', type: 'number', unit: 'px', group: 'Dimensions' },
    { key: 'height', label: 'Hauteur', type: 'text', group: 'Dimensions' },
    { key: 'align', label: 'Alignement', type: 'alignment', group: 'Disposition' },
    { key: 'border', label: 'Bordure', type: 'text', group: 'Bordure' },
    { key: 'border-radius', label: 'Rayon de bordure', type: 'text', group: 'Bordure' },
    { key: 'padding', label: 'Padding', type: 'padding', group: 'Espacement' },
  ],

  'mj-button': [
    { key: 'href', label: 'URL du lien', type: 'url', group: 'Lien' },
    { key: 'background-color', label: 'Couleur de fond', type: 'color', group: 'Style' },
    { key: 'color', label: 'Couleur du texte', type: 'color', group: 'Style' },
    { key: 'font-family', label: 'Police', type: 'select', options: FONT_OPTIONS, group: 'Style' },
    { key: 'font-size', label: 'Taille', type: 'number', unit: 'px', min: 8, max: 36, group: 'Style' },
    { key: 'font-weight', label: 'Graisse', type: 'text', group: 'Style' },
    { key: 'border-radius', label: 'Rayon de bordure', type: 'text', group: 'Bordure' },
    { key: 'border', label: 'Bordure', type: 'text', group: 'Bordure' },
    { key: 'inner-padding', label: 'Padding intérieur', type: 'padding', group: 'Espacement' },
    { key: 'padding', label: 'Padding extérieur', type: 'padding', group: 'Espacement' },
    { key: 'align', label: 'Alignement', type: 'alignment', group: 'Disposition' },
    { key: 'text-transform', label: 'Transformation', type: 'select', options: [
      { label: 'Aucune', value: 'none' },
      { label: 'Majuscules', value: 'uppercase' },
      { label: 'Minuscules', value: 'lowercase' },
      { label: 'Capitalize', value: 'capitalize' },
    ], group: 'Style' },
  ],

  'mj-divider': [
    { key: 'border-color', label: 'Couleur', type: 'color', group: 'Style' },
    { key: 'border-width', label: 'Épaisseur', type: 'number', unit: 'px', min: 1, max: 20, group: 'Style' },
    { key: 'border-style', label: 'Style', type: 'select', options: BORDER_STYLE_OPTIONS, group: 'Style' },
    { key: 'width', label: 'Largeur', type: 'text', group: 'Dimensions' },
    { key: 'padding', label: 'Padding', type: 'padding', group: 'Espacement' },
  ],

  'mj-spacer': [
    { key: 'height', label: 'Hauteur', type: 'number', unit: 'px', min: 1, max: 200, group: 'Dimensions' },
    { key: 'padding', label: 'Padding', type: 'padding', group: 'Espacement' },
  ],

  'mj-social': [
    { key: 'align', label: 'Alignement', type: 'alignment', group: 'Disposition' },
    { key: 'icon-size', label: 'Taille icônes', type: 'number', unit: 'px', min: 16, max: 64, group: 'Style' },
    { key: 'font-size', label: 'Taille texte', type: 'number', unit: 'px', min: 8, max: 24, group: 'Style' },
    { key: 'mode', label: 'Mode', type: 'select', options: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
    ], group: 'Disposition' },
    { key: 'padding', label: 'Padding', type: 'padding', group: 'Espacement' },
  ],

  'mj-social-element': [
    { key: 'name', label: 'Réseau', type: 'select', options: SOCIAL_NAME_OPTIONS, group: 'Réseau' },
    { key: 'href', label: 'URL', type: 'url', group: 'Lien' },
    { key: 'background-color', label: 'Couleur de fond', type: 'color', group: 'Style' },
    { key: 'src', label: 'Icône personnalisée', type: 'image', group: 'Style' },
  ],

  'mj-hero': [
    { key: 'background-color', label: 'Couleur de fond', type: 'color', group: 'Fond' },
    { key: 'background-url', label: 'Image de fond', type: 'image', group: 'Fond' },
    { key: 'background-height', label: 'Hauteur du fond', type: 'text', group: 'Fond' },
    { key: 'background-width', label: 'Largeur du fond', type: 'text', group: 'Fond' },
    { key: 'mode', label: 'Mode', type: 'select', options: HERO_MODE_OPTIONS, group: 'Fond' },
    { key: 'padding', label: 'Padding', type: 'padding', group: 'Espacement' },
    { key: 'width', label: 'Largeur', type: 'text', group: 'Dimensions' },
  ],

  'mj-wrapper': [
    { key: 'background-color', label: 'Couleur de fond', type: 'color', group: 'Fond' },
    { key: 'background-url', label: 'Image de fond', type: 'image', group: 'Fond' },
    { key: 'padding', label: 'Padding', type: 'padding', group: 'Espacement' },
    { key: 'border', label: 'Bordure', type: 'text', group: 'Bordure' },
    { key: 'border-radius', label: 'Rayon de bordure', type: 'text', group: 'Bordure' },
    { key: 'full-width', label: 'Pleine largeur', type: 'toggle', group: 'Disposition' },
  ],
}

/** Get the label for a node type */
export function getNodeTypeLabel(type: EmailNodeType): string {
  const labels: Record<EmailNodeType, string> = {
    'mj-body': 'Corps',
    'mj-section': 'Section',
    'mj-column': 'Colonne',
    'mj-text': 'Texte',
    'mj-image': 'Image',
    'mj-button': 'Bouton',
    'mj-divider': 'Séparateur',
    'mj-spacer': 'Espacement',
    'mj-social': 'Réseaux sociaux',
    'mj-social-element': 'Réseau social',
    'mj-hero': 'Hero',
    'mj-raw': 'HTML brut',
    'mj-wrapper': 'Wrapper',
  }
  return labels[type] || type
}
