import { describe, expect, it } from 'vitest'

import { defaultFrame } from '../defaultFrame'
import { toInput, UNTITLED } from './frameDetailsDraft'

describe('toInput', () => {
  it('names an unnamed frame', () => {
    expect(toInput({ name: ' ', artist: '' }, defaultFrame, []).name).toBe(
      UNTITLED,
    )
  })

  it("reuses a known artist's spelling", () => {
    const input = toInput(
      { name: 'Moonrise', artist: 'ansel adams' },
      defaultFrame,
      ['Ansel Adams'],
    )
    expect(input).toMatchObject({ name: 'Moonrise', artist: 'Ansel Adams' })
  })
})
