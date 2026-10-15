import { describe, expect, it } from 'vitest'

import { borderPercent, formatInches, overallSize } from './frameMath'
import type { FrameSpec } from './types'

const frame: FrameSpec = {
  width: 48,
  height: 24,
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
})

describe('borderPercent', () => {
  it("is half the border's share of the longer side", () => {
    expect(borderPercent(4, 48, 24)).toBeCloseTo(4.1667)
    expect(borderPercent(4, 24, 48)).toBeCloseTo(4.1667)
  })

  it('is at least 1%', () => {
    expect(borderPercent(0.25, 48, 24)).toBe(1)
  })

  it('is 0 while the border or a side is 0', () => {
    expect(borderPercent(0, 48, 24)).toBe(0)
    expect(borderPercent(4, 0, 24)).toBe(0)
    expect(borderPercent(4, 48, 0)).toBe(0)
  })
})

describe('formatInches', () => {
  it('rounds to two decimal places', () => {
    expect(formatInches(58)).toBe('58"')
    expect(formatInches(24.5)).toBe('24.5"')
    expect(formatInches(10 / 3)).toBe('3.33"')
  })
})
