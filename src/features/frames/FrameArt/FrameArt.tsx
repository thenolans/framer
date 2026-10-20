import type { ReactNode } from 'react'

import { cx } from '@/lib/cx'

import { previewLayout } from '../frameMath'
import type { FrameSpec } from '../types'
import { woodTextures } from '../woodTextures'

type FrameArtProps = {
  frame: FrameSpec
  /** What the mat surrounds: the artwork. */
  children: ReactNode
  /** Drawn over the frame, positioned against its outside edge (like measurements). */
  annotations?: ReactNode
  className?: string
}

/**
 * A frame in its wood around a mat, drawn to scale, with the artwork filling the opening. It fills as much of its container as it can without changing shape,
 * so the container must be a size container (`@container-size`) with a set height.
 */
export default function FrameArt({
  frame,
  children,
  annotations,
  className,
}: FrameArtProps) {
  const { ratio, framePadding, matPadding } = previewLayout(frame)

  return (
    <div
      className={cx('relative max-h-full bg-cover', className)}
      style={{
        aspectRatio: ratio,
        // Whichever of the container's width or height is tighter limits the frame, so its
        // proportions never stretch.
        width: `min(100%, 100cqh * ${ratio})`,
        backgroundImage: `url(${woodTextures[frame.wood]})`,
      }}
    >
      {annotations}
      {/* CSS takes padding percentages from the parent's width, so each border is padding on a
          child of the box it's a share of. */}
      <div className="size-full" style={{ padding: `${framePadding}%` }}>
        <div className="size-full bg-mat" style={{ padding: `${matPadding}%` }}>
          {children}
        </div>
      </div>
    </div>
  )
}
