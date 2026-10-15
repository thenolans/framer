import { queryOptions } from '@tanstack/react-query'

import { fetchFrames } from './api'

/** Query definitions for frames. Keys nest under `['frames']`. */
export const frameQueries = {
  all: () => ['frames'] as const,

  /** The user's collection, newest first. */
  list: () =>
    queryOptions({
      queryKey: [...frameQueries.all(), 'list'] as const,
      queryFn: fetchFrames,
    }),
}
