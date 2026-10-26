import { matchArtist } from '../artists'
import type { FrameChanges, FrameSpec, SavedFrame } from '../types'

/** The name a frame saves with when none is given. */
export const UNTITLED = 'Untitled artwork'

/** Whether saving updates the loaded frame or adds a new one. */
export type SaveMode = 'update' | 'create'

/** What the save dialog asks for, as typed. */
export type FrameDetailsDraft = {
  name: string
  artist: string
  mode: SaveMode
}

/**
 * A blank draft, or, with a frame loaded from the collection, its name and artist. Either way it
 * saves as a new frame, so updating the loaded one is a choice rather than something that overwrites
 * it by default.
 */
export const toDraft = (loaded?: SavedFrame | null): FrameDetailsDraft => ({
  name: loaded?.name ?? '',
  artist: loaded?.artist ?? '',
  mode: 'create',
})

/** The frame to save: `frame` with the draft's name and artist, reusing a known artist's spelling. */
export function toInput(
  draft: FrameDetailsDraft,
  frame: FrameSpec,
  knownArtists: string[],
): FrameChanges {
  return {
    ...frame,
    name: draft.name.trim() || UNTITLED,
    artist: matchArtist(draft.artist, knownArtists),
  }
}
