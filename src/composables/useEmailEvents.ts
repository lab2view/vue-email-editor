/**
 * Typed event emitter composable for the email editor.
 *
 * Provides a strongly-typed pub/sub bus based on EditorEventMap.
 * Each composable receives this optionally so event emission is additive,
 * not a breaking change for existing consumers.
 */

import type { EditorEventMap } from '../types'

type Handler<T = unknown> = (payload: T) => void

export interface UseEmailEventsReturn {
  emit: <K extends keyof EditorEventMap>(event: K, payload: EditorEventMap[K]) => void
  on: <K extends keyof EditorEventMap>(event: K, handler: Handler<EditorEventMap[K]>) => void
  off: <K extends keyof EditorEventMap>(event: K, handler: Handler<EditorEventMap[K]>) => void
  once: <K extends keyof EditorEventMap>(event: K, handler: Handler<EditorEventMap[K]>) => void
}

export function useEmailEvents(): UseEmailEventsReturn {
  const listeners = new Map<keyof EditorEventMap, Set<Handler>>()

  function on<K extends keyof EditorEventMap>(event: K, handler: Handler<EditorEventMap[K]>) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set())
    }
    listeners.get(event)!.add(handler as Handler)
  }

  function off<K extends keyof EditorEventMap>(event: K, handler: Handler<EditorEventMap[K]>) {
    listeners.get(event)?.delete(handler as Handler)
  }

  function once<K extends keyof EditorEventMap>(event: K, handler: Handler<EditorEventMap[K]>) {
    const wrapper: Handler<EditorEventMap[K]> = (payload) => {
      off(event, wrapper)
      handler(payload)
    }
    on(event, wrapper)
  }

  function emit<K extends keyof EditorEventMap>(event: K, payload: EditorEventMap[K]) {
    const handlers = listeners.get(event)
    if (!handlers) return
    for (const handler of handlers) {
      try {
        handler(payload)
      } catch (err) {
        console.error(`[EmailEditor] Error in event handler for "${event}":`, err)
      }
    }
  }

  return { emit, on, off, once }
}
