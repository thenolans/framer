import { useQuery } from '@tanstack/react-query'

import { artistNames } from './artists'
import { frameQueries } from './queries'

/** The artists in the user's collection to suggest, or none until (or if) it loads. */
export function useArtistNames() {
  const { data } = useQuery({ ...frameQueries.list(), select: artistNames })
  return data ?? []
}
