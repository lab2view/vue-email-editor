import type { InjectionKey } from 'vue'

export interface EditorLabels {
  // ─── Toolbar & Chrome ───
  blocks: string
  styles: string
  layers: string
  search_blocks: string
  undo: string
  redo: string
  editor_title: string
  code: string
  fullscreen: string
  desktop: string
  tablet: string
  mobile: string
  init_error: string
  templates: string
  starter_templates: string
  no_blocks_found: string

  // ─── Block Categories ───
  category_layout: string
  category_content: string
  category_composite: string
  category_variable: string

  // ─── Layout Blocks ───
  block_layout_1_col: string
  block_layout_2_col: string
  block_layout_3_col: string
  block_layout_4_col: string
  block_layout_sidebar_left: string
  block_layout_sidebar_right: string

  // ─── Content Blocks ───
  block_content_text: string
  block_content_image: string
  block_content_button: string
  block_content_divider: string
  block_content_spacer: string
  block_content_social: string
  block_content_hero: string

  // ─── Composite Blocks ───
  block_comp_header: string
  block_comp_header_nav: string
  block_comp_hero_banner: string
  block_comp_hero_gradient: string
  block_comp_image_text: string
  block_comp_text_image: string
  block_comp_cta: string
  block_comp_image_grid: string
  block_comp_features: string
  block_comp_testimonial: string
  block_comp_pricing: string
  block_comp_promo_code: string
  block_comp_video: string
  block_comp_social: string
  block_comp_footer: string
  block_comp_footer_simple: string
  block_comp_separator: string
  block_comp_product_card: string
  block_comp_notification: string
  block_comp_stats: string
  block_comp_announcement: string
  block_comp_steps: string
  block_comp_order: string
  block_comp_faq: string
  block_comp_team: string
  block_comp_countdown: string
  block_comp_review: string
  block_comp_mobile_app: string

  // ─── Node Type Labels ───
  node_mj_body: string
  node_mj_section: string
  node_mj_column: string
  node_mj_text: string
  node_mj_image: string
  node_mj_button: string
  node_mj_divider: string
  node_mj_spacer: string
  node_mj_social: string
  node_mj_social_element: string
  node_mj_hero: string
  node_mj_raw: string
  node_mj_wrapper: string

  // ─── Property Groups ───
  group_background: string
  group_spacing: string
  group_border: string
  group_text: string
  group_dimensions: string
  group_layout: string
  group_image: string
  group_link: string
  group_style: string
  group_network: string

  // ─── Property Labels ───
  prop_background_color: string
  prop_background_url: string
  prop_background_size: string
  prop_background_repeat: string
  prop_background_height: string
  prop_background_width: string
  prop_padding: string
  prop_border: string
  prop_border_radius: string
  prop_border_color: string
  prop_border_width: string
  prop_border_style: string
  prop_full_width: string
  prop_direction: string
  prop_width: string
  prop_height: string
  prop_color: string
  prop_font_family: string
  prop_font_size: string
  prop_font_weight: string
  prop_line_height: string
  prop_letter_spacing: string
  prop_align: string
  prop_vertical_align: string
  prop_src: string
  prop_alt: string
  prop_href: string
  prop_inner_padding: string
  prop_outer_padding: string
  prop_text_transform: string
  prop_inner_background_color: string
  prop_icon_size: string
  prop_mode: string
  prop_social_name: string
  prop_custom_icon: string

  // ─── Property Options ───
  align_left: string
  align_center: string
  align_right: string
  vertical_top: string
  vertical_middle: string
  vertical_bottom: string
  border_solid: string
  border_dashed: string
  border_dotted: string
  bg_size_auto: string
  bg_size_cover: string
  bg_size_contain: string
  bg_repeat_none: string
  bg_repeat_repeat: string
  bg_repeat_x: string
  bg_repeat_y: string
  direction_ltr: string
  direction_rtl: string
  mode_horizontal: string
  mode_vertical: string
  mode_fixed: string
  mode_fluid: string
  transform_none: string
  transform_uppercase: string
  transform_lowercase: string
  transform_capitalize: string
  font_default: string

  // ─── Toggle ───
  toggle_yes: string
  toggle_no: string

  // ─── UI Actions ───
  delete_node: string
  duplicate_node: string
  move_up: string
  move_down: string
  select_parent: string
  content_label: string
  close: string

  // ─── Global Styles Panel ───
  global_styles: string
  inbox_preview: string
  preview_text: string
  preview_text_placeholder: string
  preview_text_hint: string
  colors: string
  email_background: string
  text_color: string
  typography: string
  default_font: string
  select_element_hint: string

  // ─── Layers Panel ───
  section_label: string
  column_label: string
  empty_canvas_hint: string

  // ─── Merge Tags ───
  merge_tags: string
  merge_tags_empty: string
  insert_merge_tag: string

  // ─── Image Upload ───
  image_upload: string
  image_browse: string
  image_drop_hint: string
  image_uploading: string
  image_upload_error: string
  image_max_size: string
  image_invalid_type: string
  image_remove: string
  image_change: string
  image_no_preview: string

  // ─── Conditional Content ───
  condition: string
  condition_add: string
  condition_remove: string
  condition_variable: string
  condition_operator: string
  condition_value: string
  condition_equals: string
  condition_not_equals: string
  condition_contains: string
  condition_not_contains: string
  condition_exists: string
  condition_not_exists: string
  condition_active: string

  // ─── AI ───
  ai_generate: string
  ai_improve: string
  ai_shorten: string
  ai_expand: string
  ai_translate: string
  ai_prompt_placeholder: string
  ai_loading: string
  ai_error: string

  // ─── AI Chat ───
  ai_chat: string
  ai_chat_placeholder: string
  ai_chat_send: string
  ai_chat_apply: string
  ai_chat_discard: string
  ai_chat_new: string
  ai_chat_thinking: string
  ai_chat_success: string
  ai_chat_parse_error: string
  ai_chat_welcome: string
  ai_chat_welcome_hint: string
  ai_chat_retry: string
  ai_chat_context_sent: string
  ai_chat_attach: string
  ai_chat_attach_hint: string
  ai_chat_file_too_large: string
  ai_chat_preview: string
  ai_chat_preview_hint: string

  // ─── Dark Mode Preview ───
  dark_mode_preview: string

  // ─── Status Messages ───
  loading: string

  // ─── Inline Toolbar ───
  bold: string
  italic: string
  underline: string
  strikethrough: string
  link: string
  unlink: string
  align_text_left: string
  align_text_center: string
  align_text_right: string
  text_color_label: string
  link_url_prompt: string
}

export const DEFAULT_LABELS: EditorLabels = {
  // ─── Toolbar & Chrome ───
  blocks: 'Blocks',
  styles: 'Styles',
  layers: 'Layers',
  search_blocks: 'Search blocks...',
  undo: 'Undo',
  redo: 'Redo',
  editor_title: 'Email Editor',
  code: 'Code',
  fullscreen: 'Fullscreen',
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
  init_error: 'Editor initialization error',
  templates: 'Templates',
  starter_templates: 'Starter Templates',
  no_blocks_found: 'No blocks found for',

  // ─── Block Categories ───
  category_layout: 'Layout',
  category_content: 'Content',
  category_composite: 'Ready-made',
  category_variable: 'Variables',

  // ─── Layout Blocks ───
  block_layout_1_col: '1 column',
  block_layout_2_col: '2 columns',
  block_layout_3_col: '3 columns',
  block_layout_4_col: '4 columns',
  block_layout_sidebar_left: 'Sidebar left',
  block_layout_sidebar_right: 'Sidebar right',

  // ─── Content Blocks ───
  block_content_text: 'Text',
  block_content_image: 'Image',
  block_content_button: 'Button',
  block_content_divider: 'Divider',
  block_content_spacer: 'Spacer',
  block_content_social: 'Social',
  block_content_hero: 'Hero',

  // ─── Composite Blocks ───
  block_comp_header: 'Header',
  block_comp_header_nav: 'Header + Nav',
  block_comp_hero_banner: 'Hero Banner',
  block_comp_hero_gradient: 'Hero Gradient',
  block_comp_image_text: 'Image + Text',
  block_comp_text_image: 'Text + Image',
  block_comp_cta: 'CTA',
  block_comp_image_grid: 'Image Grid',
  block_comp_features: 'Features',
  block_comp_testimonial: 'Testimonial',
  block_comp_pricing: 'Pricing',
  block_comp_promo_code: 'Promo Code',
  block_comp_video: 'Video',
  block_comp_social: 'Social',
  block_comp_footer: 'Footer',
  block_comp_footer_simple: 'Simple Footer',
  block_comp_separator: 'Separator',
  block_comp_product_card: 'Product Card',
  block_comp_notification: 'Notification',
  block_comp_stats: 'Statistics',
  block_comp_announcement: 'Announcement',
  block_comp_steps: 'Steps',
  block_comp_order: 'Order',
  block_comp_faq: 'FAQ',
  block_comp_team: 'Team',
  block_comp_countdown: 'Countdown',
  block_comp_review: 'Review',
  block_comp_mobile_app: 'Mobile App',

  // ─── Node Type Labels ───
  node_mj_body: 'Body',
  node_mj_section: 'Section',
  node_mj_column: 'Column',
  node_mj_text: 'Text',
  node_mj_image: 'Image',
  node_mj_button: 'Button',
  node_mj_divider: 'Divider',
  node_mj_spacer: 'Spacer',
  node_mj_social: 'Social',
  node_mj_social_element: 'Social Link',
  node_mj_hero: 'Hero',
  node_mj_raw: 'Raw HTML',
  node_mj_wrapper: 'Wrapper',

  // ─── Property Groups ───
  group_background: 'Background',
  group_spacing: 'Spacing',
  group_border: 'Border',
  group_text: 'Text',
  group_dimensions: 'Dimensions',
  group_layout: 'Layout',
  group_image: 'Image',
  group_link: 'Link',
  group_style: 'Style',
  group_network: 'Network',

  // ─── Property Labels ───
  prop_background_color: 'Background color',
  prop_background_url: 'Background image',
  prop_background_size: 'Background size',
  prop_background_repeat: 'Background repeat',
  prop_background_height: 'Background height',
  prop_background_width: 'Background width',
  prop_padding: 'Padding',
  prop_border: 'Border',
  prop_border_radius: 'Border radius',
  prop_border_color: 'Color',
  prop_border_width: 'Width',
  prop_border_style: 'Style',
  prop_full_width: 'Full width',
  prop_direction: 'Direction',
  prop_width: 'Width',
  prop_height: 'Height',
  prop_color: 'Text color',
  prop_font_family: 'Font',
  prop_font_size: 'Size',
  prop_font_weight: 'Weight',
  prop_line_height: 'Line height',
  prop_letter_spacing: 'Letter spacing',
  prop_align: 'Alignment',
  prop_vertical_align: 'Vertical alignment',
  prop_src: 'Image URL',
  prop_alt: 'Alt text',
  prop_href: 'Link URL',
  prop_inner_padding: 'Inner padding',
  prop_outer_padding: 'Outer padding',
  prop_text_transform: 'Transform',
  prop_inner_background_color: 'Inner background',
  prop_icon_size: 'Icon size',
  prop_mode: 'Mode',
  prop_social_name: 'Network',
  prop_custom_icon: 'Custom icon',

  // ─── Property Options ───
  align_left: 'Left',
  align_center: 'Center',
  align_right: 'Right',
  vertical_top: 'Top',
  vertical_middle: 'Middle',
  vertical_bottom: 'Bottom',
  border_solid: 'Solid',
  border_dashed: 'Dashed',
  border_dotted: 'Dotted',
  bg_size_auto: 'Auto',
  bg_size_cover: 'Cover',
  bg_size_contain: 'Contain',
  bg_repeat_none: 'No Repeat',
  bg_repeat_repeat: 'Repeat',
  bg_repeat_x: 'Repeat X',
  bg_repeat_y: 'Repeat Y',
  direction_ltr: 'LTR',
  direction_rtl: 'RTL',
  mode_horizontal: 'Horizontal',
  mode_vertical: 'Vertical',
  mode_fixed: 'Fixed',
  mode_fluid: 'Fluid',
  transform_none: 'None',
  transform_uppercase: 'Uppercase',
  transform_lowercase: 'Lowercase',
  transform_capitalize: 'Capitalize',
  font_default: '— Default —',

  // ─── Toggle ───
  toggle_yes: 'Yes',
  toggle_no: 'No',

  // ─── UI Actions ───
  delete_node: 'Delete',
  duplicate_node: 'Duplicate',
  move_up: 'Move up',
  move_down: 'Move down',
  select_parent: 'Select parent',
  content_label: 'Content',
  close: 'Close',

  // ─── Global Styles Panel ───
  global_styles: 'Global styles',
  inbox_preview: 'Inbox preview',
  preview_text: 'Preview text',
  preview_text_placeholder: 'Summary visible before opening...',
  preview_text_hint: 'Visible in the recipient\'s email list',
  colors: 'Colors',
  email_background: 'Email background',
  text_color: 'Text color',
  typography: 'Typography',
  default_font: 'Default font',
  select_element_hint: 'Click an element on the canvas to edit its properties',

  // ─── Layers Panel ───
  section_label: 'Section',
  column_label: 'Column',
  empty_canvas_hint: 'Drag blocks to the canvas to build your email',

  // ─── Merge Tags ───
  merge_tags: 'Merge tags',
  merge_tags_empty: 'No merge tags configured',
  insert_merge_tag: 'Insert merge tag',

  // ─── Image Upload ───
  image_upload: 'Upload image',
  image_browse: 'Browse assets',
  image_drop_hint: 'Drop an image or click to upload',
  image_uploading: 'Uploading...',
  image_upload_error: 'Upload failed',
  image_max_size: 'Max file size: 5MB',
  image_invalid_type: 'Only JPG, PNG, GIF, SVG, and WebP are allowed',
  image_remove: 'Remove image',
  image_change: 'Change image',
  image_no_preview: 'No image selected',

  // ─── Conditional Content ───
  condition: 'Condition',
  condition_add: 'Add condition',
  condition_remove: 'Remove condition',
  condition_variable: 'Variable',
  condition_operator: 'Operator',
  condition_value: 'Value',
  condition_equals: 'Equals',
  condition_not_equals: 'Does not equal',
  condition_contains: 'Contains',
  condition_not_contains: 'Does not contain',
  condition_exists: 'Exists',
  condition_not_exists: 'Does not exist',
  condition_active: 'Conditional',

  // ─── AI ───
  ai_generate: 'Generate with AI',
  ai_improve: 'Improve',
  ai_shorten: 'Shorten',
  ai_expand: 'Expand',
  ai_translate: 'Translate',
  ai_prompt_placeholder: 'Describe what you want...',
  ai_loading: 'AI is thinking...',
  ai_error: 'AI generation failed',

  // ─── AI Chat ───
  ai_chat: 'AI',
  ai_chat_placeholder: 'Describe the email you want...',
  ai_chat_send: 'Generate',
  ai_chat_apply: 'Apply template',
  ai_chat_discard: 'Discard',
  ai_chat_new: 'New conversation',
  ai_chat_thinking: 'Generating template...',
  ai_chat_success: 'Template generated!',
  ai_chat_parse_error: 'Could not parse the AI response',
  ai_chat_welcome: "Describe the email you'd like to create",
  ai_chat_welcome_hint: 'Be specific about layout, colors, content...',
  ai_chat_retry: 'Retry',
  ai_chat_context_sent: 'Current template sent as context',
  ai_chat_attach: 'Attach image or document',
  ai_chat_attach_hint: 'Add a screenshot, Figma export, or document for reference',
  ai_chat_file_too_large: 'File too large (max 10 MB)',
  ai_chat_preview: 'Preview',
  ai_chat_preview_hint: 'Preview of the generated template',

  // ─── Dark Mode Preview ───
  dark_mode_preview: 'Dark mode preview',

  // ─── Status Messages ───
  loading: 'Loading...',

  // ─── Inline Toolbar ───
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikethrough: 'Strikethrough',
  link: 'Link',
  unlink: 'Remove link',
  align_text_left: 'Align left',
  align_text_center: 'Center',
  align_text_right: 'Align right',
  text_color_label: 'Text color',
  link_url_prompt: 'Link URL:',
}

export const EMAIL_LABELS_KEY: InjectionKey<EditorLabels> = Symbol('email-labels')
