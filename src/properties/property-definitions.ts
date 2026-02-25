import type { EmailNodeType, PropertyDefinition } from '../types'
import { FONT_OPTIONS } from '../constants'

const ALIGNMENT_OPTIONS = [
  { label: 'align_left', value: 'left' },
  { label: 'align_center', value: 'center' },
  { label: 'align_right', value: 'right' },
]

const BG_SIZE_OPTIONS = [
  { label: 'bg_size_auto', value: 'auto' },
  { label: 'bg_size_cover', value: 'cover' },
  { label: 'bg_size_contain', value: 'contain' },
]

const BG_REPEAT_OPTIONS = [
  { label: 'bg_repeat_none', value: 'no-repeat' },
  { label: 'bg_repeat_repeat', value: 'repeat' },
  { label: 'bg_repeat_x', value: 'repeat-x' },
  { label: 'bg_repeat_y', value: 'repeat-y' },
]

const DIRECTION_OPTIONS = [
  { label: 'direction_ltr', value: 'ltr' },
  { label: 'direction_rtl', value: 'rtl' },
]

const VERTICAL_ALIGN_OPTIONS = [
  { label: 'vertical_top', value: 'top' },
  { label: 'vertical_middle', value: 'middle' },
  { label: 'vertical_bottom', value: 'bottom' },
]

const BORDER_STYLE_OPTIONS = [
  { label: 'border_solid', value: 'solid' },
  { label: 'border_dashed', value: 'dashed' },
  { label: 'border_dotted', value: 'dotted' },
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
  { label: 'mode_fixed', value: 'fixed' },
  { label: 'mode_fluid', value: 'fluid' },
]

/** Property definitions for each MJML node type */
export const PROPERTY_MAP: Partial<Record<EmailNodeType, PropertyDefinition[]>> = {
  'mj-body': [
    { key: 'background-color', label: 'prop_background_color', type: 'color', group: 'group_background', defaultValue: '#f4f4f4' },
    { key: 'width', label: 'prop_width', type: 'number', unit: 'px', group: 'group_dimensions', defaultValue: '600' },
  ],

  'mj-section': [
    { key: 'background-color', label: 'prop_background_color', type: 'color', group: 'group_background' },
    { key: 'background-url', label: 'prop_background_url', type: 'image', group: 'group_background' },
    { key: 'background-size', label: 'prop_background_size', type: 'select', options: BG_SIZE_OPTIONS, group: 'group_background' },
    { key: 'background-repeat', label: 'prop_background_repeat', type: 'select', options: BG_REPEAT_OPTIONS, group: 'group_background' },
    { key: 'padding', label: 'prop_padding', type: 'padding', group: 'group_spacing' },
    { key: 'border', label: 'prop_border', type: 'text', group: 'group_border' },
    { key: 'border-radius', label: 'prop_border_radius', type: 'text', group: 'group_border' },
    { key: 'full-width', label: 'prop_full_width', type: 'toggle', group: 'group_layout' },
    { key: 'direction', label: 'prop_direction', type: 'select', options: DIRECTION_OPTIONS, group: 'group_layout' },
  ],

  'mj-column': [
    { key: 'width', label: 'prop_width', type: 'text', group: 'group_dimensions' },
    { key: 'background-color', label: 'prop_background_color', type: 'color', group: 'group_background' },
    { key: 'inner-background-color', label: 'prop_inner_background_color', type: 'color', group: 'group_background' },
    { key: 'padding', label: 'prop_padding', type: 'padding', group: 'group_spacing' },
    { key: 'border', label: 'prop_border', type: 'text', group: 'group_border' },
    { key: 'border-radius', label: 'prop_border_radius', type: 'text', group: 'group_border' },
    { key: 'vertical-align', label: 'prop_vertical_align', type: 'select', options: VERTICAL_ALIGN_OPTIONS, group: 'group_layout' },
  ],

  'mj-text': [
    { key: 'color', label: 'prop_color', type: 'color', group: 'group_text' },
    { key: 'font-family', label: 'prop_font_family', type: 'select', options: FONT_OPTIONS, group: 'group_text' },
    { key: 'font-size', label: 'prop_font_size', type: 'number', unit: 'px', min: 8, max: 72, group: 'group_text' },
    { key: 'font-weight', label: 'prop_font_weight', type: 'text', group: 'group_text' },
    { key: 'line-height', label: 'prop_line_height', type: 'text', group: 'group_text' },
    { key: 'letter-spacing', label: 'prop_letter_spacing', type: 'text', group: 'group_text' },
    { key: 'align', label: 'prop_align', type: 'alignment', group: 'group_text' },
    { key: 'padding', label: 'prop_padding', type: 'padding', group: 'group_spacing' },
  ],

  'mj-image': [
    { key: 'src', label: 'prop_src', type: 'image', group: 'group_image' },
    { key: 'alt', label: 'prop_alt', type: 'text', group: 'group_image' },
    { key: 'href', label: 'prop_href', type: 'url', group: 'group_link' },
    { key: 'width', label: 'prop_width', type: 'number', unit: 'px', group: 'group_dimensions' },
    { key: 'height', label: 'prop_height', type: 'text', group: 'group_dimensions' },
    { key: 'align', label: 'prop_align', type: 'alignment', group: 'group_layout' },
    { key: 'border', label: 'prop_border', type: 'text', group: 'group_border' },
    { key: 'border-radius', label: 'prop_border_radius', type: 'text', group: 'group_border' },
    { key: 'padding', label: 'prop_padding', type: 'padding', group: 'group_spacing' },
  ],

  'mj-button': [
    { key: 'href', label: 'prop_href', type: 'url', group: 'group_link' },
    { key: 'background-color', label: 'prop_background_color', type: 'color', group: 'group_style' },
    { key: 'color', label: 'prop_color', type: 'color', group: 'group_style' },
    { key: 'font-family', label: 'prop_font_family', type: 'select', options: FONT_OPTIONS, group: 'group_style' },
    { key: 'font-size', label: 'prop_font_size', type: 'number', unit: 'px', min: 8, max: 36, group: 'group_style' },
    { key: 'font-weight', label: 'prop_font_weight', type: 'text', group: 'group_style' },
    { key: 'border-radius', label: 'prop_border_radius', type: 'text', group: 'group_border' },
    { key: 'border', label: 'prop_border', type: 'text', group: 'group_border' },
    { key: 'inner-padding', label: 'prop_inner_padding', type: 'padding', group: 'group_spacing' },
    { key: 'padding', label: 'prop_outer_padding', type: 'padding', group: 'group_spacing' },
    { key: 'align', label: 'prop_align', type: 'alignment', group: 'group_layout' },
    { key: 'text-transform', label: 'prop_text_transform', type: 'select', options: [
      { label: 'transform_none', value: 'none' },
      { label: 'transform_uppercase', value: 'uppercase' },
      { label: 'transform_lowercase', value: 'lowercase' },
      { label: 'transform_capitalize', value: 'capitalize' },
    ], group: 'group_style' },
  ],

  'mj-divider': [
    { key: 'border-color', label: 'prop_border_color', type: 'color', group: 'group_style' },
    { key: 'border-width', label: 'prop_border_width', type: 'number', unit: 'px', min: 1, max: 20, group: 'group_style' },
    { key: 'border-style', label: 'prop_border_style', type: 'select', options: BORDER_STYLE_OPTIONS, group: 'group_style' },
    { key: 'width', label: 'prop_width', type: 'text', group: 'group_dimensions' },
    { key: 'padding', label: 'prop_padding', type: 'padding', group: 'group_spacing' },
  ],

  'mj-spacer': [
    { key: 'height', label: 'prop_height', type: 'number', unit: 'px', min: 1, max: 200, group: 'group_dimensions' },
    { key: 'padding', label: 'prop_padding', type: 'padding', group: 'group_spacing' },
  ],

  'mj-social': [
    { key: 'align', label: 'prop_align', type: 'alignment', group: 'group_layout' },
    { key: 'icon-size', label: 'prop_icon_size', type: 'number', unit: 'px', min: 16, max: 64, group: 'group_style' },
    { key: 'font-size', label: 'prop_font_size', type: 'number', unit: 'px', min: 8, max: 24, group: 'group_style' },
    { key: 'mode', label: 'prop_mode', type: 'select', options: [
      { label: 'mode_horizontal', value: 'horizontal' },
      { label: 'mode_vertical', value: 'vertical' },
    ], group: 'group_layout' },
    { key: 'padding', label: 'prop_padding', type: 'padding', group: 'group_spacing' },
  ],

  'mj-social-element': [
    { key: 'name', label: 'prop_social_name', type: 'select', options: SOCIAL_NAME_OPTIONS, group: 'group_network' },
    { key: 'href', label: 'prop_href', type: 'url', group: 'group_link' },
    { key: 'background-color', label: 'prop_background_color', type: 'color', group: 'group_style' },
    { key: 'src', label: 'prop_custom_icon', type: 'image', group: 'group_style' },
  ],

  'mj-hero': [
    { key: 'background-color', label: 'prop_background_color', type: 'color', group: 'group_background' },
    { key: 'background-url', label: 'prop_background_url', type: 'image', group: 'group_background' },
    { key: 'background-height', label: 'prop_background_height', type: 'text', group: 'group_background' },
    { key: 'background-width', label: 'prop_background_width', type: 'text', group: 'group_background' },
    { key: 'mode', label: 'prop_mode', type: 'select', options: HERO_MODE_OPTIONS, group: 'group_background' },
    { key: 'padding', label: 'prop_padding', type: 'padding', group: 'group_spacing' },
    { key: 'width', label: 'prop_width', type: 'text', group: 'group_dimensions' },
  ],

  'mj-wrapper': [
    { key: 'background-color', label: 'prop_background_color', type: 'color', group: 'group_background' },
    { key: 'background-url', label: 'prop_background_url', type: 'image', group: 'group_background' },
    { key: 'padding', label: 'prop_padding', type: 'padding', group: 'group_spacing' },
    { key: 'border', label: 'prop_border', type: 'text', group: 'group_border' },
    { key: 'border-radius', label: 'prop_border_radius', type: 'text', group: 'group_border' },
    { key: 'full-width', label: 'prop_full_width', type: 'toggle', group: 'group_layout' },
  ],
}

/** Get the i18n label key for a node type */
export function getNodeTypeLabelKey(type: EmailNodeType): string {
  const keys: Record<EmailNodeType, string> = {
    'mj-body': 'node_mj_body',
    'mj-section': 'node_mj_section',
    'mj-column': 'node_mj_column',
    'mj-text': 'node_mj_text',
    'mj-image': 'node_mj_image',
    'mj-button': 'node_mj_button',
    'mj-divider': 'node_mj_divider',
    'mj-spacer': 'node_mj_spacer',
    'mj-social': 'node_mj_social',
    'mj-social-element': 'node_mj_social_element',
    'mj-hero': 'node_mj_hero',
    'mj-raw': 'node_mj_raw',
    'mj-wrapper': 'node_mj_wrapper',
  }
  return keys[type] || type
}
