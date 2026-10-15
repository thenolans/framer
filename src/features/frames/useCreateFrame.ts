import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createFrame } from './api'
import { frameQueries } from './queries'
import type { SavedFrame } from './types'

/** Saves a frame to the user's collection, at the top of the list. */
export function useCreateFrame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFrame,
    onSuccess: (frame) => {
      queryClient.setQueryData<SavedFrame[]>(
        frameQueries.list().queryKey,
        (frames) => frames && [frame, ...frames],
      )
      void queryClient.invalidateQueries({ queryKey: frameQueries.all() })
    },
  })
}
