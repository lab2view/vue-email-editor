import type { BlockDefinition } from '../types'
import { DEFAULT_THEME } from '../types'
import {
  createText,
  createImage,
  createButton,
  createDivider,
  createSpacer,
  createSocial,
  createSocialElement,
  createHero,
  createSection,
  createColumn,
} from '../serializer/node-factory'

export const contentBlocks: BlockDefinition[] = [
  {
    id: 'content-text',
    label: 'block_content_text',
    category: 'content',
    icon: 'Type',
    factory: () => createText(),
  },
  {
    id: 'content-image',
    label: 'block_content_image',
    category: 'content',
    icon: 'Image',
    factory: () => createImage(),
  },
  {
    id: 'content-button',
    label: 'block_content_button',
    category: 'content',
    icon: 'RectangleHorizontal',
    factory: () => createButton(),
  },
  {
    id: 'content-divider',
    label: 'block_content_divider',
    category: 'content',
    icon: 'Minus',
    factory: () => createDivider(),
  },
  {
    id: 'content-spacer',
    label: 'block_content_spacer',
    category: 'content',
    icon: 'MoveVertical',
    factory: () => createSpacer(),
  },
  {
    id: 'content-social',
    label: 'block_content_social',
    category: 'content',
    icon: 'Share2',
    factory: () =>
      createSocial([
        createSocialElement('facebook', 'https://facebook.com/'),
        createSocialElement('twitter', 'https://twitter.com/'),
        createSocialElement('instagram', 'https://instagram.com/'),
        createSocialElement('linkedin', 'https://linkedin.com/'),
      ]),
  },
  {
    id: 'content-hero',
    label: 'block_content_hero',
    category: 'content',
    icon: 'Maximize2',
    factory: () =>
      createHero([
        createText(
          '<h1 style="margin: 0; font-size: 28px;">Votre titre accrocheur</h1>',
          { align: 'center', color: '#ffffff', 'font-size': '28px', padding: '0 0 15px 0' },
        ),
        createText(
          '<p style="margin: 0;">Sous-titre avec une description engageante.</p>',
          { align: 'center', color: '#cccccc', 'font-size': '16px', padding: '0 40px 25px 40px' },
        ),
        createButton('Découvrir', {
          'background-color': DEFAULT_THEME.primaryColor,
          color: '#ffffff',
          'font-size': '16px',
          'border-radius': '6px',
          'inner-padding': '14px 30px',
        }),
      ]),
  },
]
