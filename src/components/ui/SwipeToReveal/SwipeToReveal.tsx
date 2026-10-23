import {
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

import { cx } from '@/lib/cx'

type SwipeToRevealProps = {
  /** The act hidden behind the row, at its right: a button, like deleting the row. */
  action: ReactNode
  children: ReactNode
  className?: string
}

/** How far a finger moves before it counts as a swipe rather than a tap or a scroll. */
const SLOP = 8

/**
 * A row that slides left under the finger to reveal an act behind it, as rows do on a phone. It
 * stays open past halfway, and closes on a tap anywhere or once the act is pressed. The act opens
 * the row when it's focused, so it's in reach of the keyboard and screen readers too.
 */
export default function SwipeToReveal({
  action,
  children,
  className,
}: SwipeToRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const actionRef = useRef<HTMLDivElement>(null)
  // The row's offset at rest: 0 shut, or the act's width to the left, open.
  const [restX, setRestX] = useState(0)
  // Its offset while it's dragged.
  const [dragX, setDragX] = useState<number>()
  const swipe = useRef<{
    x: number
    y: number
    from: number
    sliding: boolean
  }>(undefined)
  // Set by a tap that closed the open row, so the click it makes doesn't also press the row.
  const tapClosed = useRef(false)
  const isOpen = restX < 0

  const width = () => actionRef.current?.offsetWidth ?? 0
  const open = () => setRestX(-width())
  const close = () => setRestX(0)

  // A press anywhere else closes it.
  useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setRestX(0)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [isOpen])

  const handlePointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return
    tapClosed.current = false
    swipe.current = {
      x: event.clientX,
      y: event.clientY,
      from: restX,
      sliding: false,
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = swipe.current
    if (!current) return
    const dx = event.clientX - current.x
    if (!current.sliding) {
      // Moving up or down first, it's a scroll.
      if (Math.abs(event.clientY - current.y) > SLOP) {
        swipe.current = undefined
        return
      }
      if (Math.abs(dx) <= SLOP) return
      current.sliding = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    setDragX(Math.min(0, Math.max(-width(), current.from + dx)))
  }

  const handlePointerUp = () => {
    const current = swipe.current
    swipe.current = undefined
    if (current?.sliding && dragX !== undefined) {
      if (dragX < -width() / 2) open()
      else close()
    }
    // A tap on an open row closes it.
    else if (current && isOpen) {
      tapClosed.current = true
      close()
    }
    setDragX(undefined)
  }

  const offset = dragX ?? restX
  const slides =
    dragX === undefined &&
    'transition-[transform,width] duration-slide ease-out-quint motion-reduce:transition-none'

  return (
    <div ref={rootRef} className={cx('relative overflow-hidden', className)}>
      {/* Clipped to the width the row has slid, so the row needs no surface of its own to hide it. */}
      <div
        // Only the keyboard's focus: a dialog the act opened hands focus back on closing, after a tap.
        onFocus={(event) => {
          if (event.target.matches(':focus-visible')) open()
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) close()
        }}
        onClickCapture={close}
        style={{ width: -offset }}
        className={cx(
          'absolute inset-y-0 right-0 flex justify-end overflow-hidden',
          slides,
        )}
      >
        <div ref={actionRef} className="flex shrink-0">
          {action}
        </div>
      </div>
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={(event) => {
          if (!tapClosed.current) return
          tapClosed.current = false
          event.preventDefault()
          event.stopPropagation()
        }}
        style={{ transform: `translateX(${offset}px)` }}
        className={cx('touch-pan-y select-none', slides)}
      >
        {children}
      </div>
    </div>
  )
}
