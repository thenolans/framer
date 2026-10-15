import { describe, expect, it } from 'vitest'

import { artistNames, matchArtist } from './artists'
import { defaultFrame } from './defaultFrame'
import type { SavedFrame } from './types'

const saved = (artist: string, id: number): SavedFrame => ({
  ...defaultFrame,
  id,
  name: 'Untitled artwork',
  artist,
  createdAt: '2026-10-15T00:00:00Z',
})

describe('artistNames', () => {
  it('lists each artist once, A to Z', () => {
    const frames = [saved('Tom', 1), saved('ansel', 2), saved('Tom', 3)]
    expect(artistNames(frames)).toEqual(['ansel', 'Tom'])
  })

  it('keeps the most recent spelling of an artist', () => {
    const frames = [saved('Ansel Adams', 1), saved(' ansel adams ', 2)]
    expect(artistNames(frames)).toEqual(['Ansel Adams'])
  })

  it('leaves out frames without an artist', () => {
    expect(artistNames([saved('', 1), saved('  ', 2)])).toEqual([])
  })
})

describe('matchArtist', () => {
  it("uses a known artist's spelling", () => {
    expect(matchArtist(' ansel ADAMS', ['Ansel Adams'])).toBe('Ansel Adams')
  })

  it('keeps a new artist as typed, trimmed', () => {
    expect(matchArtist(' Dorothea Lange ', ['Ansel Adams'])).toBe(
      'Dorothea Lange',
    )
  })
})
