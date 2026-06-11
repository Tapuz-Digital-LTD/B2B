import { useRef } from 'react'

/**
 * Mouse drag-to-scroll for horizontal scrollers (touch scrolls natively).
 * Spread `handlers` on the scroll container and attach `ref` to it; a real
 * drag suppresses the click that would otherwise fire on release.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  const stop = () => {
    drag.current.active = false
  }

  const handlers = {
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType !== 'mouse' || !ref.current) return
      drag.current = { active: true, startX: e.clientX, startScroll: ref.current.scrollLeft, moved: false }
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!drag.current.active || !ref.current) return
      const dx = e.clientX - drag.current.startX
      if (Math.abs(dx) > 4) drag.current.moved = true
      ref.current.scrollLeft = drag.current.startScroll - dx
    },
    onPointerUp: stop,
    onPointerLeave: stop,
    onClickCapture: (e: React.MouseEvent) => {
      if (drag.current.moved) {
        e.preventDefault()
        e.stopPropagation()
      }
      drag.current.moved = false
    },
  }

  return { ref, handlers }
}
