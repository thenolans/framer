/** The value kept as JSON under `key` in local storage, or `null` when there's none or it can't be read. */
export function readStored(key: string): unknown {
  try {
    const stored = localStorage.getItem(key)
    return stored === null ? null : JSON.parse(stored)
  } catch {
    return null
  }
}

/** Keeps `value` as JSON under `key`, then removes the `replaced` keys it takes over from. */
export function keep(key: string, value: unknown, replaced: string[] = []) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    replaced.forEach((old) => localStorage.removeItem(old))
  } catch {
    // Not kept, but the calculator still works for this visit.
  }
}
