import type { SavedFrame } from './types'

const key = (artist: string) => artist.trim().toLowerCase()

/**
 * Each artist in the collection once, A to Z, for suggesting when saving a frame. An artist saved with
 * different capitals is listed in its most recent spelling (the collection is newest first).
 */
export function artistNames(frames: SavedFrame[]) {
  const names = new Map<string, string>()
  for (const { artist } of frames) {
    const trimmed = artist.trim()
    if (trimmed && !names.has(key(trimmed))) names.set(key(trimmed), trimmed)
  }
  return [...names.values()].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  )
}

/** `artist` trimmed, in a known artist's spelling when it's the same name with other capitals. */
export function matchArtist(artist: string, known: string[]) {
  return known.find((name) => key(name) === key(artist)) ?? artist.trim()
}
