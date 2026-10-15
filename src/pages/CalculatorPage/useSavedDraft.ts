import { useEffect, useState } from 'react'

import { defaultFrame } from '@/features/frames/defaultFrame'

import { parseDraft, toDraft } from './frameDraft'

const STORAGE_KEY = 'framer.draft'

function readDraft() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return (stored && parseDraft(JSON.parse(stored))) || toDraft(defaultFrame)
  } catch {
    return toDraft(defaultFrame)
  }
}

/**
 * The calculator's inputs, kept on the device so they're still there after signing in or coming back
 * later. Starts from the default frame.
 */
export function useSavedDraft() {
  const [draft, setDraft] = useState(readDraft)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
      // Not kept, but the calculator still works for this visit.
    }
  }, [draft])

  return [draft, setDraft] as const
}
