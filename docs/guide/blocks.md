# Blocks

Blocks are the building elements of an email. The editor ships with **43 pre-built blocks** across three categories.

## Layout Blocks (6)

Layout blocks define the structural grid of your email using MJML sections and columns.

| Block | Description | MJML Output |
|-------|-------------|-------------|
| 1 Column | Single full-width column | `mj-section` > `mj-column` |
| 2 Columns | Two equal columns (50/50) | `mj-section` > 2x `mj-column` |
| 3 Columns | Three equal columns (33/33/33) | `mj-section` > 3x `mj-column` |
| 4 Columns | Four equal columns (25 each) | `mj-section` > 4x `mj-column` |
| Sidebar Left | 33/67 split | `mj-section` > 2x `mj-column` |
| Sidebar Right | 67/33 split | `mj-section` > 2x `mj-column` |

## Content Blocks (7)

Content blocks are the individual elements you place inside columns.

| Block | Description | MJML Tag |
|-------|-------------|----------|
| Text | Rich text with inline editing | `mj-text` |
| Image | Image with URL, alt, and link | `mj-image` |
| Button | Styled CTA button | `mj-button` |
| Divider | Horizontal line separator | `mj-divider` |
| Spacer | Vertical whitespace | `mj-spacer` |
| Social | Social media icon links | `mj-social` |
| Hero | Full-width hero with background image | `mj-hero` |

## Composite Blocks (30)

Composite blocks are pre-designed combinations of layout + content. They're complete sections ready to use.

| Block | What It Creates |
|-------|----------------|
| Header | Logo centered in a section |
| Header + Nav | Logo with navigation links |
| Hero Banner | Full-width hero with title, subtitle, and CTA |
| Hero Gradient | Hero with gradient background |
| Image + Text | Two-column: image left, text right |
| Text + Image | Two-column: text left, image right |
| CTA | Centered call-to-action section |
| Image Grid | 2x2 image gallery |
| Features | Three-column feature highlights with icons |
| Testimonial | Quote with author name and photo |
| Pricing | Three-tier pricing table |
| Promo Code | Promotional code with dashed border |
| Video | Video placeholder with play button |
| Social | Social media links section |
| Footer | Full footer with links and legal text |
| Simple Footer | Minimal unsubscribe footer |
| Separator | Decorative section separator |
| Product Card | Product image, title, price, and CTA |
| Notification | Alert/notification banner |
| Statistics | Three-column stat highlights |
| Announcement | Announcement banner |
| Steps | Numbered step-by-step process |
| Order | Order summary table |
| FAQ | Question and answer pairs |
| Team | Team member cards |
| Countdown | Event countdown display |
| Review | Star rating with testimonial |
| Mobile App | App download buttons (iOS + Android) |

## Using Blocks Programmatically

### Node Factories

Create nodes in code using the factory functions:

```ts
import {
  createText,
  createImage,
  createButton,
  createSection,
  createColumn,
  createDivider,
  createSpacer,
  createSocial,
  createHero,
  createWrapper,
} from '@lab2view/vue-email-editor'

// Create a text node
const text = createText('<p>Hello world</p>', {
  'font-size': '16px',
  color: '#333333',
})

// Create an image
const img = createImage({
  src: 'https://example.com/photo.jpg',
  alt: 'Product photo',
  width: '300px',
})

// Create a button
const btn = createButton('Shop Now', {
  href: 'https://shop.example.com',
  'background-color': '#e11d48',
  color: '#ffffff',
})
```

### Insert via API

```ts
const editor = ref()

// Insert a text block into a specific column
editor.value.insertBlock(
  {
    id: 'custom-text',
    label: 'Custom Text',
    category: 'content',
    icon: 'Type',
    factory: () => createText('<p>Inserted programmatically</p>'),
  },
  'column-node-id',
  0, // index
)
```

## Custom Blocks via Plugins

See the [Plugins guide](/guide/plugins) for adding your own blocks.
