import { describe, expect, it } from 'vitest'

import { formatInches, overallSize, previewLayout } from './frameMath'
import type { FrameSpec } from './types'

const frame: FrameSpec = {
  width: 48,
  height: 24,
  framed: true,
  frameWidth: 1.5,
  matWidth: 4,
  overlap: 0.5,
  wood: 'pine',
}

describe('overallSize', () => {
  it('adds the mat and frame on each side, less the overlap', () => {
    expect(overallSize(frame)).toEqual({ width: 58, height: 34 })
  })

  it('is the artwork alone with no frame, mat or overlap', () => {
    expect(
      overallSize({ ...frame, frameWidth: 0, matWidth: 0, overlap: 0 }),
    ).toEqual({ width: 48, height: 24 })
  })

  it("is the artwork alone when it isn't framed, whatever the frame's sizes", () => {
    expect(overallSize({ ...frame, framed: false })).toEqual({
      width: 48,
      height: 24,
    })
  })
})

describe('previewLayout', () => {
  it("draws the outside in the overall size's proportions", () => {
    expect(previewLayout(frame).ratio).toBeCloseTo(58 / 34)
  })

  it('draws the frame and mat to scale', () => {
    // The frame is 1.5 of the 58 outside, the mat 4 of the 55 inside the frame.
    const layout = previewLayout(frame)
    expect(layout.framePadding).toBeCloseTo((1.5 / 58) * 100)
    expect(layout.matPadding).toBeCloseTo((4 / 55) * 100)
  })

  it('leaves an opening of the artwork less the overlap', () => {
    // 8 wide: a 6 × 8 artwork with a 1.5 frame and no mat, overlapping it by 0.5 on each side.
    const { ratio, framePadding } = previewLayout({
      ...frame,
      width: 6,
      height: 8,
      frameWidth: 1.5,
      matWidth: 0,
    })
    expect(ratio).toBeCloseTo(8 / 10)
    // 1.5 off each side of 8 leaves 5, the artwork's 6 less 0.5 on each side.
    expect(8 * (1 - (framePadding / 100) * 2)).toBeCloseTo(5)
  })

  it('is just the artwork while a side is 0 or the overlap leaves no opening', () => {
    const artOnly = { framePadding: 0, matPadding: 0 }
    expect(previewLayout({ ...frame, width: 0 })).toEqual({
      ratio: 1 / 24,
      ...artOnly,
    })
    expect(previewLayout({ ...frame, overlap: 12 })).toEqual({
      ratio: 2,
      ...artOnly,
    })
  })

  it("is just the artwork when it isn't framed", () => {
    expect(previewLayout({ ...frame, framed: false })).toEqual({
      ratio: 2,
      framePadding: 0,
      matPadding: 0,
    })
  })
})

describe('formatInches', () => {
  it('rounds to two decimal places', () => {
    expect(formatInches(58)).toBe('58"')
    expect(formatInches(24.5)).toBe('24.5"')
    expect(formatInches(10 / 3)).toBe('3.33"')
  })
})
