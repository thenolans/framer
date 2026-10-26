import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateFrame } from './api'
import { frameQueries } from './queries'
import type { SavedFrame } from './types'

/** Saves changes to a frame in the user's collection, in its place in the list. */
export function useUpdateFrame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateFrame,
    onSuccess: (frame) => {
      queryClient.setQueryData<SavedFrame[]>(
        frameQueries.list().queryKey,
        (frames) =>
          frames?.map((saved) => (saved.id === frame.id ? frame : saved)),
      )
      void queryClient.invalidateQueries({ queryKey: frameQueries.all() })
    },
  })
}
