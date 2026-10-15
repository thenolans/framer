import { useQuery } from '@tanstack/react-query'

import { queryState } from '@/lib/queryState'

import { frameQueries } from './queries'

/** The user's collection of frames, newest first. */
export function useFrames() {
  const query = useQuery(frameQueries.list())
  return { frames: query.data ?? [], ...queryState(query) }
}
