import { useEffect, useState } from 'react'

/** The artwork in the preview: a picture the user chose, or a saved frame's. */
export type Artwork = {
  url: string
  /** The picture the user chose, to save with the frame; unset for a saved frame's. */
  file?: File
}

/**
 * The artwork shown in the calculator, `null` for the sample photo. A chosen picture gets an object URL,
 * released when another replaces it or the page closes.
 */
export function useArtwork() {
  const [artwork, setArtwork] = useState<Artwork | null>(null)

  useEffect(() => {
    if (!artwork?.file) return
    return () => URL.revokeObjectURL(artwork.url)
  }, [artwork])

  return {
    artwork,
    /** Shows a picture the user chose. */
    choose: (file: File) =>
      setArtwork({ url: URL.createObjectURL(file), file }),
    /** Shows a saved frame's picture, or the sample photo for `null`. */
    show: (url: string | null) => setArtwork(url ? { url } : null),
  }
}
