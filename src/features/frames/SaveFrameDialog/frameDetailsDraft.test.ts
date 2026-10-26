import { describe, expect, it } from 'vitest'

import { defaultFrame } from '../defaultFrame'
import type { SavedFrame } from '../types'
import { toDraft, toInput, UNTITLED } from './frameDetailsDraft'

const saved: SavedFrame = {
  ...defaultFrame,
  id: 1,
  name: 'Moonrise',
  artist: 'Ansel Adams',
  artwork: null,
  createdAt: '2026-10-21T00:00:00Z',
}

describe('toDraft', () => {
  it('starts a new frame without a name', () => {
    expect(toDraft()).toEqual({ name: '', artist: '', mode: 'create' })
  })

  it('saves a loaded frame as a new one, under its name and artist', () => {
    expect(toDraft(saved)).toEqual({
      name: 'Moonrise',
      artist: 'Ansel Adams',
      mode: 'create',
    })
  })
})

describe('toInput', () => {
  it('names an unnamed frame', () => {
    expect(
      toInput({ name: ' ', artist: '', mode: 'create' }, defaultFrame, []).name,
    ).toBe(UNTITLED)
  })

  it("reuses a known artist's spelling", () => {
    const input = toInput(
      { name: 'Moonrise', artist: 'ansel adams', mode: 'create' },
      defaultFrame,
      ['Ansel Adams'],
    )
    expect(input).toMatchObject({ name: 'Moonrise', artist: 'Ansel Adams' })
  })
})
