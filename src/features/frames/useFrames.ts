import { useQuery } from '@tanstack/react-query'

import { frameQueries } from './queries'

/** The user's collection of frames, newest first. */
export function useFrames() {
  return useQuery(frameQueries.list())
}
