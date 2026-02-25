import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useEmailHistory } from '../useEmailHistory'
import type { EmailDocument } from '../../types'

function makeDoc(previewText = ''): EmailDocument {
  return {
    version: 1,
    headAttributes: {
      defaultStyles: {},
      fonts: [],
      previewText,
    },
    body: {
      id: 'body-1',
      type: 'mj-body',
      attributes: {},
      children: [],
    },
  }
}

describe('useEmailHistory', () => {
  it('starts with canUndo=false and canRedo=false', () => {
    const doc = ref(makeDoc())
    const history = useEmailHistory(doc)
    expect(history.canUndo.value).toBe(false)
    expect(history.canRedo.value).toBe(false)
  })

  it('can undo after commit + mutation', () => {
    const doc = ref(makeDoc())
    const history = useEmailHistory(doc)

    // Commit initial state, then mutate
    history.commit()
    doc.value = makeDoc('changed')

    expect(history.canUndo.value).toBe(true)
  })

  it('undo restores previous state', () => {
    const doc = ref(makeDoc('original'))
    const history = useEmailHistory(doc)

    // Commit v1
    history.commit()
    doc.value = makeDoc('modified')

    // Undo should go back to 'original'
    history.undo()
    expect(doc.value.headAttributes.previewText).toBe('original')
  })

  it('redo restores undone state', () => {
    const doc = ref(makeDoc('v1'))
    const history = useEmailHistory(doc)

    history.commit()
    doc.value = makeDoc('v2')
    history.commit()

    history.undo()
    expect(history.canRedo.value).toBe(true)

    history.redo()
    expect(doc.value.headAttributes.previewText).toBe('v2')
  })

  it('undo does nothing when no history', () => {
    const doc = ref(makeDoc('original'))
    const history = useEmailHistory(doc)

    history.undo()
    expect(doc.value.headAttributes.previewText).toBe('original')
  })

  it('redo does nothing when no redo stack', () => {
    const doc = ref(makeDoc('original'))
    const history = useEmailHistory(doc)

    history.redo()
    expect(doc.value.headAttributes.previewText).toBe('original')
  })
})
