/**
 * Manages the iframe content and postMessage communication bridge.
 *
 * The iframe renders compiled HTML email with injected scripts for
 * click/hover/drag event forwarding via postMessage.
 */

import { ref, watch, type Ref } from 'vue'
import type { IframeMessage } from '../types'

export interface UseEmailIframeSyncReturn {
  iframeRef: Ref<HTMLIFrameElement | null>
  /** Set the iframe ref after mount */
  setIframeRef: (el: HTMLIFrameElement | null) => void
  /** Update iframe content with new HTML */
  updateContent: (html: string) => void
  /** Register a handler for iframe messages */
  onMessage: (handler: (msg: IframeMessage) => void) => void
  /** Remove the message handler */
  offMessage: () => void
  /** Get bounding rect of a node in the iframe, relative to iframe viewport */
  getNodeRect: (nodeId: string) => DOMRect | null
}

/** Script injected into the iframe for event forwarding */
const IFRAME_BRIDGE_SCRIPT = `
<script>
(function() {
  function getNodeId(el) {
    while (el && el !== document.body) {
      if (el.dataset && el.dataset.nodeId) return el.dataset.nodeId;
      el = el.parentElement;
    }
    return null;
  }

  // After load, find all elements with ebb-node-* class and set data-node-id
  function annotateNodes() {
    document.querySelectorAll('[class*="ebb-node-"]').forEach(function(el) {
      var classes = el.className.split(/\\s+/);
      for (var i = 0; i < classes.length; i++) {
        if (classes[i].indexOf('ebb-node-') === 0) {
          el.dataset.nodeId = classes[i].replace('ebb-node-', '');
          break;
        }
      }
    });
    window.parent.postMessage({ type: 'ebb:ready' }, '*');
  }

  // Run annotation after DOM is ready
  if (document.readyState === 'complete') {
    annotateNodes();
  } else {
    window.addEventListener('load', annotateNodes);
  }

  // Click to select
  document.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var nodeId = getNodeId(e.target);
    if (nodeId) {
      var el = e.target.closest('[data-node-id]');
      var rect = el ? el.getBoundingClientRect() : null;
      window.parent.postMessage({ type: 'ebb:select', nodeId: nodeId, rect: rect }, '*');
    } else {
      window.parent.postMessage({ type: 'ebb:deselect' }, '*');
    }
  });

  // Double-click for inline editing
  document.addEventListener('dblclick', function(e) {
    e.preventDefault();
    var nodeId = getNodeId(e.target);
    if (nodeId) {
      var el = e.target.closest('[data-node-id]');
      var rect = el ? el.getBoundingClientRect() : null;
      window.parent.postMessage({ type: 'ebb:dblclick', nodeId: nodeId, rect: rect }, '*');
    }
  });

  // Hover highlight
  var lastHovered = null;
  document.addEventListener('mouseover', function(e) {
    var nodeId = getNodeId(e.target);
    if (nodeId && nodeId !== lastHovered) {
      lastHovered = nodeId;
      var el = e.target.closest('[data-node-id]');
      var rect = el ? el.getBoundingClientRect() : null;
      window.parent.postMessage({ type: 'ebb:hover', nodeId: nodeId, rect: rect }, '*');
    }
  });

  document.addEventListener('mouseout', function(e) {
    var related = e.relatedTarget;
    var nodeId = related ? getNodeId(related) : null;
    if (!nodeId) {
      lastHovered = null;
      window.parent.postMessage({ type: 'ebb:hover-end' }, '*');
    }
  });

  // Drag-and-drop support
  document.addEventListener('dragover', function(e) {
    e.preventDefault();
    var nodeId = getNodeId(e.target);
    if (nodeId) {
      var el = e.target.closest('[data-node-id]');
      if (el) {
        var rect = el.getBoundingClientRect();
        var midY = rect.top + rect.height / 2;
        var position = e.clientY < midY ? 'before' : 'after';
        window.parent.postMessage({
          type: 'ebb:drag-over',
          nodeId: nodeId,
          position: position,
          rect: rect
        }, '*');
      }
    }
  });

  document.addEventListener('drop', function(e) {
    e.preventDefault();
    var nodeId = getNodeId(e.target);
    if (nodeId) {
      var el = e.target.closest('[data-node-id]');
      if (el) {
        var rect = el.getBoundingClientRect();
        var midY = rect.top + rect.height / 2;
        var position = e.clientY < midY ? 'before' : 'after';
        window.parent.postMessage({
          type: 'ebb:drop',
          nodeId: nodeId,
          position: position
        }, '*');
      }
    }
  });
})();
<\/script>
`

export function useEmailIframeSync(): UseEmailIframeSyncReturn {
  const iframeRef = ref<HTMLIFrameElement | null>(null)
  let messageHandler: ((msg: IframeMessage) => void) | null = null
  let windowListener: ((e: MessageEvent) => void) | null = null

  function setIframeRef(el: HTMLIFrameElement | null) {
    iframeRef.value = el
  }

  function updateContent(html: string) {
    const iframe = iframeRef.value
    if (!iframe) return

    // Wrap the compiled HTML in a full document with our bridge script
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { margin: 0; padding: 0; background-color: #f4f4f4; }
    /* Highlight hovered node */
    [data-node-id]:hover { outline: 1px dashed rgba(1, 168, 171, 0.4); outline-offset: -1px; cursor: pointer; }
    /* Prevent text selection during drag */
    body.is-dragging * { user-select: none !important; }
  </style>
</head>
<body>
  ${html}
  ${IFRAME_BRIDGE_SCRIPT}
</body>
</html>`

    iframe.srcdoc = fullHtml
  }

  function onMessage(handler: (msg: IframeMessage) => void) {
    messageHandler = handler

    // Clean up previous listener
    if (windowListener) {
      window.removeEventListener('message', windowListener)
    }

    windowListener = (e: MessageEvent) => {
      // Only handle messages from our iframe
      if (!e.data || typeof e.data.type !== 'string' || !e.data.type.startsWith('ebb:')) return
      messageHandler?.(e.data as IframeMessage)
    }

    window.addEventListener('message', windowListener)
  }

  function offMessage() {
    messageHandler = null
    if (windowListener) {
      window.removeEventListener('message', windowListener)
      windowListener = null
    }
  }

  function getNodeRect(nodeId: string): DOMRect | null {
    const iframe = iframeRef.value
    if (!iframe?.contentDocument) return null
    const el = iframe.contentDocument.querySelector(`[data-node-id="${nodeId}"]`)
    return el ? el.getBoundingClientRect() : null
  }

  return {
    iframeRef,
    setIframeRef,
    updateContent,
    onMessage,
    offMessage,
    getNodeRect,
  }
}
