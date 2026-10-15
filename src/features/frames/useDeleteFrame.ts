import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteFrame } from './api'
import { frameQueries } from './queries'
import type { SavedFrame } from './types'

/** Deletes a frame from the user's collection. */
export function useDeleteFrame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFrame,
    onSuccess: (_, id) => {
      queryClient.setQueryData<SavedFrame[]>(
        frameQueries.list().queryKey,
        (frames) => frames?.filter((frame) => frame.id !== id),
      )
      void queryClient.invalidateQueries({ queryKey: frameQueries.all() })
    },
  })
}
