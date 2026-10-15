import type { ReactNode } from 'react'

import { cx } from '@/lib/cx'

import { borderPercent } from '../frameMath'
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
 * A frame in its wood around a mat, in the artwork's proportions. It fills as much of its container
 * as it can without changing shape, so the container must be a size container (`@container-size`)
 * with a set height.
 */
export default function FrameArt({
  frame,
  children,
  annotations,
  className,
}: FrameArtProps) {
  const { width, height, frameWidth, matWidth, wood } = frame
  const ratio = `${width || 1} / ${height || 1}`

  return (
    <div
      className={cx('relative max-h-full bg-cover', className)}
      style={{
        aspectRatio: ratio,
        // Whichever of the container's width or height is tighter limits the frame, so its
        // proportions never stretch.
        width: `min(100%, 100cqh * ${ratio})`,
        padding: `${borderPercent(frameWidth, width, height)}%`,
        backgroundImage: `url(${woodTextures[wood]})`,
      }}
    >
      {annotations}
      <div
        className="size-full bg-mat"
        style={{ padding: `${borderPercent(matWidth, width, height)}%` }}
      >
        {children}
      </div>
    </div>
  )
}
