import { describe, it, expect, vi } from 'vitest'
import { useEmailEvents } from '../useEmailEvents'
import type { EmailDocument, EmailNode } from '../../types'

function makeDoc(): EmailDocument {
  return {
    version: 1,
    headAttributes: { defaultStyles: {}, fonts: [], previewText: '' },
    body: { id: 'b1', type: 'mj-body', attributes: {}, children: [] },
  }
}

function makeNode(): EmailNode {
  return { id: 'n1', type: 'mj-text', attributes: {}, children: [] }
}

describe('useEmailEvents', () => {
  it('emits and receives events', () => {
    const events = useEmailEvents()
    const handler = vi.fn()
    const doc = makeDoc()

    events.on('editor:ready', handler)
    events.emit('editor:ready', { document: doc })

    expect(handler).toHaveBeenCalledOnce()
    expect(handler).toHaveBeenCalledWith({ document: doc })
  })

  it('passes payload correctly', () => {
    const events = useEmailEvents()
    const handler = vi.fn()
    const node = makeNode()

    events.on('node:selected', handler)
    events.emit('node:selected', { nodeId: 'test-123', node })

    expect(handler).toHaveBeenCalledWith({ nodeId: 'test-123', node })
  })

  it('supports multiple handlers', () => {
    const events = useEmailEvents()
    const handler1 = vi.fn()
    const handler2 = vi.fn()
    const doc = makeDoc()

    events.on('editor:change', handler1)
    events.on('editor:change', handler2)
    events.emit('editor:change', { document: doc })

    expect(handler1).toHaveBeenCalledOnce()
    expect(handler2).toHaveBeenCalledOnce()
  })

  it('removes handler with off()', () => {
    const events = useEmailEvents()
    const handler = vi.fn()
    const doc = makeDoc()

    events.on('editor:change', handler)
    events.off('editor:change', handler)
    events.emit('editor:change', { document: doc })

    expect(handler).not.toHaveBeenCalled()
  })

  it('once() fires handler only once', () => {
    const events = useEmailEvents()
    const handler = vi.fn()
    const doc = makeDoc()

    events.once('editor:ready', handler)
    events.emit('editor:ready', { document: doc })
    events.emit('editor:ready', { document: doc })

    expect(handler).toHaveBeenCalledOnce()
  })

  it('does not throw when emitting with no listeners', () => {
    const events = useEmailEvents()
    expect(() => events.emit('editor:ready', { document: makeDoc() })).not.toThrow()
  })

  it('catches errors in handlers without stopping others', () => {
    const events = useEmailEvents()
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const badHandler = () => { throw new Error('boom') }
    const goodHandler = vi.fn()
    const doc = makeDoc()

    events.on('editor:change', badHandler)
    events.on('editor:change', goodHandler)
    events.emit('editor:change', { document: doc })

    expect(goodHandler).toHaveBeenCalledOnce()
    expect(errorSpy).toHaveBeenCalled()
    errorSpy.mockRestore()
  })
})
