import { matchArtist } from '../artists'
import type { FrameSpec, NewFrame } from '../types'

/** The name a frame saves with when none is given. */
export const UNTITLED = 'Untitled artwork'

/** What the save dialog asks for, as typed. */
export type FrameDetailsDraft = {
  name: string
  artist: string
}

export const toDraft = (): FrameDetailsDraft => ({ name: '', artist: '' })

/** The frame to save: `frame` with the draft's name and artist, reusing a known artist's spelling. */
export function toInput(
  draft: FrameDetailsDraft,
  frame: FrameSpec,
  knownArtists: string[],
): NewFrame {
  return {
    ...frame,
    name: draft.name.trim() || UNTITLED,
    artist: matchArtist(draft.artist, knownArtists),
  }
}
