import { useEffect, useState } from 'react'

import { keep, readStored } from './localStore'

const STORAGE_KEY = 'framer.loadedFrame'

function readId() {
  const stored = readStored(STORAGE_KEY)
  return Number.isInteger(stored) ? (stored as number) : null
}

/**
 * The id of the frame last loaded from the collection or saved to it, which saving can update. Kept on
 * the device, so it's still there when the page is opened again.
 */
export function useLoadedFrameId() {
  const [id, setId] = useState(readId)

  useEffect(() => {
    keep(STORAGE_KEY, id)
  }, [id])

  return [id, setId] as const
}
