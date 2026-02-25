import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useEmailDocument } from '../useEmailDocument'
import { createText, createSection, createColumn } from '../../serializer/node-factory'
import type { EmailDocument, EmailDesignJson } from '../../types'

// Mock mjml-browser
vi.mock('mjml-browser', () => ({
  default: (mjml: string) => ({
    html: '<html>' + mjml + '</html>',
    errors: [],
  }),
}))

// Mock nanoid for deterministic IDs
let counter = 0
vi.mock('nanoid', () => ({
  nanoid: () => `id-${++counter}`,
}))

beforeEach(() => {
  counter = 0
  vi.clearAllMocks()
})

describe('useEmailDocument', () => {
  it('creates a default document on init', () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    expect(document.value).toBeDefined()
    expect(document.value.version).toBe(1)
    expect(document.value.body).toBeDefined()
    expect(document.value.body.type).toBe('mj-body')
    expect(document.value.headAttributes).toBeDefined()
  })

  it('loadFromProps with designJson loads the document', () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, loadFromProps } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const customDocument: EmailDocument = {
      version: 1,
      headAttributes: {
        defaultStyles: {},
        fonts: [],
        previewText: 'Custom preview',
      },
      body: createSection([createColumn([createText('Hello World')])]),
    }

    const designJson: EmailDesignJson = {
      _editor: 'mesagoo-email-editor',
      _version: 1,
      document: customDocument,
    }

    loadFromProps('', designJson as any)

    expect(document.value.headAttributes.previewText).toBe('Custom preview')
    expect(document.value.body.type).toBe('mj-section')
  })

  it('updateNodeAttribute changes the attribute', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, updateNodeAttribute } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const nodeId = document.value.body.id

    updateNodeAttribute(nodeId, 'background-color', '#ff0000')

    expect(document.value.body.attributes['background-color']).toBe('#ff0000')

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
    expect(onDesignJsonChange).toHaveBeenCalled()
  })

  it('deleteNode removes a node', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, deleteNode } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    // Create a section with a column
    const section = createSection([createColumn([createText('Test')])])
    document.value.body.children.push(section)

    const columnId = section.children[0].id
    const initialChildCount = section.children.length

    deleteNode(columnId)

    expect(section.children.length).toBe(initialChildCount - 1)
    expect(section.children.find((c) => c.id === columnId)).toBeUndefined()

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })

  it('duplicateNode creates a copy', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, duplicateNode } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    // Create a section with a column
    const textNode = createText('Original text')
    const column = createColumn([textNode])
    const section = createSection([column])
    document.value.body.children.push(section)

    const initialChildCount = section.children.length
    const originalColumnId = column.id

    const newColumnId = duplicateNode(originalColumnId)

    expect(newColumnId).toBeDefined()
    expect(newColumnId).not.toBe(originalColumnId)
    expect(section.children.length).toBe(initialChildCount + 1)

    const newColumn = section.children.find((c) => c.id === newColumnId)
    expect(newColumn).toBeDefined()
    expect(newColumn!.type).toBe('mj-column')

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })

  it('replaceDocument replaces entire document', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, replaceDocument } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const newDocument: EmailDocument = {
      version: 1,
      headAttributes: {
        defaultStyles: {},
        fonts: [],
        previewText: 'New document',
      },
      body: createSection([createColumn([createText('New content')])]),
    }

    replaceDocument(newDocument)

    expect(document.value.headAttributes.previewText).toBe('New document')
    expect(document.value.body.type).toBe('mj-section')

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })

  it('triggerEmit calls onMjmlChange and onDesignJsonChange callbacks', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { triggerEmit } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    await triggerEmit()

    expect(onMjmlChange).toHaveBeenCalled()
    expect(onHtmlChange).toHaveBeenCalled()
    expect(onDesignJsonChange).toHaveBeenCalled()

    // Check the emitted values
    const mjml = onMjmlChange.mock.calls[0][0] as string
    expect(mjml).toContain('<mjml>')

    const html = onHtmlChange.mock.calls[0][0] as string
    expect(html).toContain('<html>')

    const designJson = onDesignJsonChange.mock.calls[0][0] as EmailDesignJson
    expect(designJson._editor).toBe('mesagoo-email-editor')
    expect(designJson._version).toBe(1)
  })

  it('history.undo restores previous state after updateNodeAttribute', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, updateNodeAttribute, history } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const nodeId = document.value.body.id

    // Initial state - default document has background-color set to #f4f4f4
    const initialBgColor = document.value.body.attributes['background-color']
    expect(initialBgColor).toBe('#f4f4f4')

    // Make a change
    updateNodeAttribute(nodeId, 'background-color', '#ff0000')
    expect(document.value.body.attributes['background-color']).toBe('#ff0000')

    // Undo should restore previous state
    history.undo()
    expect(document.value.body.attributes['background-color']).toBe(initialBgColor)
  })

  it('history canUndo and canRedo work correctly', () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, updateNodeAttribute, history } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const nodeId = document.value.body.id

    // Initially cannot undo or redo
    expect(history.canUndo.value).toBe(false)
    expect(history.canRedo.value).toBe(false)

    // Make a change
    updateNodeAttribute(nodeId, 'background-color', '#ff0000')

    // Now can undo, but not redo
    expect(history.canUndo.value).toBe(true)
    expect(history.canRedo.value).toBe(false)

    // Undo
    history.undo()

    // Now cannot undo (back to initial state), but can redo
    expect(history.canUndo.value).toBe(false)
    expect(history.canRedo.value).toBe(true)

    // Redo
    history.redo()

    // Can undo again, cannot redo
    expect(history.canUndo.value).toBe(true)
    expect(history.canRedo.value).toBe(false)
  })

  it('insertNode adds a node at the correct position', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, insertNode } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const section = createSection([createColumn([createText('First')])])
    document.value.body.children.push(section)

    const columnId = section.children[0].id
    const newText = createText('Second')

    insertNode(columnId, 0, newText)

    expect(section.children[0].children.length).toBe(2)
    expect(section.children[0].children[0].id).toBe(newText.id)

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })

  it('insertNodesAfter adds nodes after a reference node', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, insertNodesAfter } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const firstText = createText('First')
    const column = createColumn([firstText])
    const section = createSection([column])
    document.value.body.children.push(section)

    const secondText = createText('Second')
    const thirdText = createText('Third')

    insertNodesAfter(firstText.id, [secondText, thirdText])

    expect(column.children.length).toBe(3)
    expect(column.children[0].id).toBe(firstText.id)
    expect(column.children[1].id).toBe(secondText.id)
    expect(column.children[2].id).toBe(thirdText.id)

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })

  it('loadFromProps with MJML string parses it', () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, loadFromProps } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const mjml = `<mjml>
  <mj-head>
    <mj-preview>Test preview</mj-preview>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>Hello from MJML</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`

    loadFromProps(mjml, null)

    expect(document.value.headAttributes.previewText).toBe('Test preview')
    expect(document.value.body.type).toBe('mj-body')
    expect(document.value.body.children.length).toBeGreaterThan(0)
  })

  it('updateNodeContent changes htmlContent', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, updateNodeContent } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const textNode = createText('Original')
    const column = createColumn([textNode])
    const section = createSection([column])
    document.value.body.children.push(section)

    updateNodeContent(textNode.id, '<p>Updated content</p>')

    expect(textNode.htmlContent).toBe('<p>Updated content</p>')

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })

  it('updateHeadStyle changes default styles', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, updateHeadStyle } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    updateHeadStyle('mj-text', 'font-family', 'Arial, sans-serif')

    expect(document.value.headAttributes.defaultStyles['mj-text']).toBeDefined()
    expect(document.value.headAttributes.defaultStyles['mj-text']['font-family']).toBe(
      'Arial, sans-serif',
    )

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })

  it('updatePreviewText changes preview text', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, updatePreviewText } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    updatePreviewText('New preview text')

    expect(document.value.headAttributes.previewText).toBe('New preview text')

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })

  it('moveNodeUp moves a node up in the children array', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, moveNodeUp } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const firstText = createText('First')
    const secondText = createText('Second')
    const column = createColumn([firstText, secondText])
    const section = createSection([column])
    document.value.body.children.push(section)

    const result = moveNodeUp(secondText.id)

    expect(result).toBe(true)
    expect(column.children[0].id).toBe(secondText.id)
    expect(column.children[1].id).toBe(firstText.id)

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })

  it('moveNodeDown moves a node down in the children array', async () => {
    const onMjmlChange = vi.fn()
    const onHtmlChange = vi.fn()
    const onDesignJsonChange = vi.fn()

    const { document, moveNodeDown } = useEmailDocument({
      onMjmlChange,
      onHtmlChange,
      onDesignJsonChange,
    })

    const firstText = createText('First')
    const secondText = createText('Second')
    const column = createColumn([firstText, secondText])
    const section = createSection([column])
    document.value.body.children.push(section)

    const result = moveNodeDown(firstText.id)

    expect(result).toBe(true)
    expect(column.children[0].id).toBe(secondText.id)
    expect(column.children[1].id).toBe(firstText.id)

    // Wait for debounced emit
    await new Promise((resolve) => setTimeout(resolve, 350))

    expect(onMjmlChange).toHaveBeenCalled()
  })
})
