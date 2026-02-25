import { describe, it, expect } from 'vitest'
import { findNode, findParent, removeNode, moveNode, cloneSubtree, getAncestorPath, getNodeIndex } from '../tree'
import type { EmailNode } from '../../types'

function makeTree(): EmailNode {
  return {
    id: 'body',
    type: 'mj-body',
    attributes: {},
    children: [
      {
        id: 'section-1',
        type: 'mj-section',
        attributes: { 'background-color': '#ffffff' },
        children: [
          {
            id: 'col-1',
            type: 'mj-column',
            attributes: {},
            children: [
              { id: 'text-1', type: 'mj-text', attributes: {}, children: [], htmlContent: '<p>Hello</p>' },
              { id: 'image-1', type: 'mj-image', attributes: { src: 'img.png' }, children: [] },
            ],
          },
          {
            id: 'col-2',
            type: 'mj-column',
            attributes: {},
            children: [
              { id: 'button-1', type: 'mj-button', attributes: {}, children: [], htmlContent: 'Click' },
            ],
          },
        ],
      },
      {
        id: 'section-2',
        type: 'mj-section',
        attributes: {},
        children: [],
      },
    ],
  }
}

describe('findNode', () => {
  it('finds the root node', () => {
    const tree = makeTree()
    expect(findNode(tree, 'body')?.id).toBe('body')
  })

  it('finds a deeply nested node', () => {
    const tree = makeTree()
    expect(findNode(tree, 'text-1')?.type).toBe('mj-text')
    expect(findNode(tree, 'text-1')?.htmlContent).toBe('<p>Hello</p>')
  })

  it('returns null for non-existent node', () => {
    const tree = makeTree()
    expect(findNode(tree, 'nonexistent')).toBeNull()
  })
})

describe('findParent', () => {
  it('finds parent of a child node', () => {
    const tree = makeTree()
    expect(findParent(tree, 'text-1')?.id).toBe('col-1')
  })

  it('finds parent of a section', () => {
    const tree = makeTree()
    expect(findParent(tree, 'section-1')?.id).toBe('body')
  })

  it('returns null for root node', () => {
    const tree = makeTree()
    expect(findParent(tree, 'body')).toBeNull()
  })

  it('returns null for non-existent node', () => {
    const tree = makeTree()
    expect(findParent(tree, 'nonexistent')).toBeNull()
  })
})

describe('getAncestorPath', () => {
  it('returns path from root to target', () => {
    const tree = makeTree()
    expect(getAncestorPath(tree, 'text-1')).toEqual(['body', 'section-1', 'col-1', 'text-1'])
  })

  it('returns just root for the root node', () => {
    const tree = makeTree()
    expect(getAncestorPath(tree, 'body')).toEqual(['body'])
  })

  it('returns empty array for non-existent node', () => {
    const tree = makeTree()
    expect(getAncestorPath(tree, 'nonexistent')).toEqual([])
  })
})

describe('removeNode', () => {
  it('removes a direct child', () => {
    const tree = makeTree()
    expect(removeNode(tree, 'section-2')).toBe(true)
    expect(tree.children).toHaveLength(1)
  })

  it('removes a deeply nested node', () => {
    const tree = makeTree()
    expect(removeNode(tree, 'text-1')).toBe(true)
    const col = findNode(tree, 'col-1')!
    expect(col.children).toHaveLength(1)
    expect(col.children[0].id).toBe('image-1')
  })

  it('returns false for non-existent node', () => {
    const tree = makeTree()
    expect(removeNode(tree, 'nonexistent')).toBe(false)
  })
})

describe('moveNode', () => {
  it('moves a node to a new parent', () => {
    const tree = makeTree()
    expect(moveNode(tree, 'text-1', 'col-2', 0)).toBe(true)
    const col1 = findNode(tree, 'col-1')!
    const col2 = findNode(tree, 'col-2')!
    expect(col1.children).toHaveLength(1)
    expect(col2.children).toHaveLength(2)
    expect(col2.children[0].id).toBe('text-1')
  })

  it('moves a node to a specific index', () => {
    const tree = makeTree()
    moveNode(tree, 'text-1', 'col-2', 1)
    const col2 = findNode(tree, 'col-2')!
    expect(col2.children[1].id).toBe('text-1')
  })

  it('clamps index to array length', () => {
    const tree = makeTree()
    moveNode(tree, 'text-1', 'col-2', 999)
    const col2 = findNode(tree, 'col-2')!
    expect(col2.children[col2.children.length - 1].id).toBe('text-1')
  })

  it('returns false for non-existent node', () => {
    const tree = makeTree()
    expect(moveNode(tree, 'nonexistent', 'col-2', 0)).toBe(false)
  })
})

describe('cloneSubtree', () => {
  it('creates a deep clone with new IDs', () => {
    const tree = makeTree()
    const section = findNode(tree, 'section-1')!
    const cloned = cloneSubtree(section)

    expect(cloned.id).not.toBe('section-1')
    expect(cloned.type).toBe('mj-section')
    expect(cloned.children).toHaveLength(2)
    expect(cloned.children[0].id).not.toBe('col-1')
    expect(cloned.children[0].children[0].id).not.toBe('text-1')
  })

  it('preserves attributes and content', () => {
    const tree = makeTree()
    const section = findNode(tree, 'section-1')!
    const cloned = cloneSubtree(section)

    expect(cloned.attributes['background-color']).toBe('#ffffff')
    expect(cloned.children[0].children[0].htmlContent).toBe('<p>Hello</p>')
  })

  it('does not share references with original', () => {
    const tree = makeTree()
    const section = findNode(tree, 'section-1')!
    const cloned = cloneSubtree(section)

    cloned.attributes['background-color'] = '#000000'
    expect(section.attributes['background-color']).toBe('#ffffff')
  })
})

describe('getNodeIndex', () => {
  it('returns the correct index', () => {
    const tree = makeTree()
    expect(getNodeIndex(tree, 'image-1')).toBe(1)
    expect(getNodeIndex(tree, 'text-1')).toBe(0)
  })

  it('returns -1 for non-existent node', () => {
    const tree = makeTree()
    expect(getNodeIndex(tree, 'nonexistent')).toBe(-1)
  })
})
