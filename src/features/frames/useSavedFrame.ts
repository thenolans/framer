import { useQuery } from '@tanstack/react-query'

import { frameQueries } from './queries'

/** The frame in the user's collection with `id`, or `null` while there's no `id` or no such frame. */
export function useSavedFrame(id: number | null) {
  const { data } = useQuery({
    ...frameQueries.list(),
    enabled: id !== null,
    select: (frames) => frames.find((frame) => frame.id === id) ?? null,
  })
  return data ?? null
}
