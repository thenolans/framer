import { type RefObject } from 'react'

/**
 * Like a native select, centres the highlighted option (the chosen one, else the first) in the list
 * when it opens, even if it's far down. Pass the result as the widget's `onOpenChange`.
 */
export function revealSelected(listRef: RefObject<HTMLElement | null>) {
  return (isOpen: boolean) => {
    if (!isOpen) return
    // Two frames, so the popover has been positioned and sized to fit the screen first.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const list = listRef.current
        const scroller = list?.parentElement
        const option = list?.querySelector<HTMLElement>(
          '[data-focused], [data-selected]',
        )
        if (!scroller || !option) return
        // Scrolling only the popover: scrolling the page would close it.
        scroller.scrollTop =
          option.offsetTop - (scroller.clientHeight - option.offsetHeight) / 2
      }),
    )
  }
}
