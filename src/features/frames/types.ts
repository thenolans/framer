export const woods = ['pine', 'oak', 'walnut'] as const

export type Wood = (typeof woods)[number]

/** A frame around a piece of artwork. Lengths are in inches. */
export type FrameSpec = {
  /** The artwork's size. */
  width: number
  height: number
  /** Whether it hangs in a frame. Without one it's the artwork alone, and the frame's sizes and wood are kept but unused. */
  framed: boolean
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
  /** The URL of the artwork's picture; `null` when none was saved. */
  artwork: string | null
  createdAt: string
}

export type NewFrame = FrameSpec & {
  name: string
  artist: string
  /** A picture of the artwork, saved with the frame. */
  artwork?: File
  /** Another saved frame whose picture to copy, when there's no `artwork` file. */
  artworkFrom?: number
}

/** Changes to a saved frame; its picture is left as it is unless `artwork` replaces it. */
export type FrameChanges = Omit<NewFrame, 'artworkFrom'>

/** The picture of the artwork in the calculator. */
export type ArtworkPicture = {
  /** A picture the user chose; `null` when there's none, and the loaded frame's (or the sample photo) shows instead. */
  file: File | null
  /** Whether the loaded frame was saved with `file`, so saving changes can leave its picture be. */
  isSaved: boolean
}
