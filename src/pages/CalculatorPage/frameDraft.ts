import { type FrameSpec, type Wood, woods } from '@/features/frames/types'

/** The calculator's inputs as typed: lengths stay strings so a half-typed `1.` or an empty field holds. */
export type FrameDraft = {
  width: string
  height: string
  framed: boolean
  frameWidth: string
  matWidth: string
  overlap: string
  wood: Wood
}

export type LengthField = Exclude<keyof FrameDraft, 'framed' | 'wood'>

export function toDraft(frame: FrameSpec): FrameDraft {
  return {
    width: String(frame.width),
    height: String(frame.height),
    framed: frame.framed,
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
    framed: draft.framed,
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

const lengthFields: LengthField[] = [
  'width',
  'height',
  'frameWidth',
  'matWidth',
  'overlap',
]

/**
 * `value` as a draft, if it is one (like a draft read back from storage), or `null`. A draft kept
 * before pieces could go unframed reads as framed.
 */
export function parseDraft(value: unknown): FrameDraft | null {
  if (typeof value !== 'object' || value === null) return null
  const draft = { framed: true, ...value } as Record<string, unknown>
  const isDraft =
    lengthFields.every(
      (field) =>
        typeof draft[field] === 'string' && isLengthInput(draft[field]),
    ) &&
    typeof draft.framed === 'boolean' &&
    woods.includes(draft.wood as Wood)
  return isDraft ? (draft as FrameDraft) : null
}
