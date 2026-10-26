import { useEffect, useMemo, useState } from 'react'

import type { ArtworkPicture } from '@/features/frames/types'

const NONE: ArtworkPicture = { file: null, isSaved: false }

/**
 * The picture of the artwork the user chose for the calculator, with an object URL released when
 * another replaces it or the page closes. Without one, `url` is `null` and the loaded frame's saved
 * picture shows, or the sample photo.
 */
export function useArtwork() {
  const [artwork, setArtwork] = useState(NONE)
  const url = useMemo(
    () => artwork.file && URL.createObjectURL(artwork.file),
    [artwork.file],
  )

  useEffect(() => {
    if (!url) return
    return () => URL.revokeObjectURL(url)
  }, [url])

  return {
    ...artwork,
    url,
    /** Shows a picture the user chose. */
    choose: (file: File) => setArtwork({ file, isSaved: false }),
    /** Shows the loaded frame's saved picture, if it has one, in place of a chosen one. */
    showSaved: () => setArtwork(NONE),
    /** Notes that the frame was just saved with this picture. */
    markSaved: () => setArtwork({ file: artwork.file, isSaved: true }),
  }
}
