import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type ScaleStageProps = {
  designWidth: number
  designHeight: number
  className?: string
  children: ReactNode
}

/**
 * Renders children on a fixed design-size canvas and scales it to the
 * container width, preserving the exact composition ratio at every
 * viewport size (no element overlap when the browser shrinks).
 */
export default function ScaleStage({ designWidth, designHeight, className = '', children }: ScaleStageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth / designWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [designWidth])

  return (
    // relative + absolute left-0 anchor the oversized canvas physically left even in RTL
    <div ref={ref} className={`relative ${className}`} style={{ height: designHeight * scale }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
