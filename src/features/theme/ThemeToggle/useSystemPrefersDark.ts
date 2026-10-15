import { useSyncExternalStore } from 'react'

const query = '(prefers-color-scheme: dark)'

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(query)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

/** Whether the OS is in dark mode, following it as it changes. */
export function useSystemPrefersDark() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches)
}
