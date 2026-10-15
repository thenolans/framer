export const woods = ['pine', 'oak', 'walnut'] as const

export type Wood = (typeof woods)[number]

/** A frame around a piece of artwork. Lengths are in inches. */
export type FrameSpec = {
  /** The artwork's size. */
  width: number
  height: number
  /** How wide the wood is on each side. */
  frameWidth: number
  /** How wide the mat is on each side. */
  matWidth: number
  /** How far the mat covers the artwork's edge, and the frame the mat's, on each side. */
  overlap: number
  wood: Wood
}

/** A frame saved to the user's collection. */
export type SavedFrame = FrameSpec & {
  id: number
  name: string
  /** `''` when none was given. */
  artist: string
  createdAt: string
}

export type NewFrame = FrameSpec & {
  name: string
  artist: string
}
