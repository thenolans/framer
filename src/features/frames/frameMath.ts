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
 * How to draw a frame to scale in the preview, as CSS percentages: the outside in the overall size's
 * proportions (`ratio`, its width over its height), the frame `framePadding` percent of the outside's
 * width thick, and the mat `matPadding` percent of the width inside the frame. The opening is the
 * artwork less the overlap on each side. Just the artwork while a side of it is 0 or the overlap
 * leaves no opening.
 */
export function previewLayout(spec: FrameSpec) {
  const { width, height, frameWidth, matWidth, overlap } = spec
  const outside = overallSize(spec)
  const insideWidth = outside.width - frameWidth * 2
  if (!width || !height || overlap * 2 >= Math.min(width, height)) {
    return {
      ratio: (width || 1) / (height || 1),
      framePadding: 0,
      matPadding: 0,
    }
  }
  return {
    ratio: outside.width / outside.height,
    framePadding: (frameWidth / outside.width) * 100,
    matPadding: (matWidth / insideWidth) * 100,
  }
}

/** A length in inches for display, to at most two decimal places (`24.5"`). */
export function formatInches(inches: number) {
  return `${Math.round(inches * 100) / 100}"`
}
