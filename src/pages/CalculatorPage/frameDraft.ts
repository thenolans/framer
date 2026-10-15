import type { FrameSpec, Wood } from '@/features/frames/types'

/** The calculator's inputs as typed: lengths stay strings so a half-typed `1.` or an empty field holds. */
export type FrameDraft = {
  width: string
  height: string
  frameWidth: string
  matWidth: string
  overlap: string
  wood: Wood
}

export type LengthField = Exclude<keyof FrameDraft, 'wood'>

export function toDraft(frame: FrameSpec): FrameDraft {
  return {
    width: String(frame.width),
    height: String(frame.height),
    frameWidth: String(frame.frameWidth),
    matWidth: String(frame.matWidth),
    overlap: String(frame.overlap),
    wood: frame.wood,
  }
}

/** The frame the draft describes, reading an empty or unfinished length as 0. */
export function toFrame(draft: FrameDraft): FrameSpec {
  const length = (value: string) => Number(value) || 0

  return {
    width: length(draft.width),
    height: length(draft.height),
    frameWidth: length(draft.frameWidth),
    matWidth: length(draft.matWidth),
    overlap: length(draft.overlap),
    wood: draft.wood,
  }
}

/** Whether `value` could be a length being typed: digits with at most one decimal point. */
export function isLengthInput(value: string) {
  return /^\d*\.?\d*$/.test(value)
}
