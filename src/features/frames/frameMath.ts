import type { FrameSpec } from './types'

/**
 * The finished frame's outside size: the artwork with the mat and frame on each side, less the
 * overlap on each side.
 */
export function overallSize({
  width,
  height,
  frameWidth,
  matWidth,
  overlap,
}: FrameSpec) {
  const border = (frameWidth + matWidth - overlap) * 2
  return { width: width + border, height: height + border }
}

/**
 * How thick to draw a border (the frame or the mat) in the preview, as a percentage for CSS
 * padding: half the border's share of the artwork's longer side, and at least 1% so it never
 * disappears. 0 while the border or either side of the artwork is 0.
 */
export function borderPercent(border: number, width: number, height: number) {
  if (!border || !width || !height) return 0
  return Math.max(((border / Math.max(width, height)) * 100) / 2, 1)
}

/** A length in inches for display, to at most two decimal places (`24.5"`). */
export function formatInches(inches: number) {
  return `${Math.round(inches * 100) / 100}"`
}
