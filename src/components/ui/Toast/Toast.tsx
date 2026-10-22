import { useEffect, useEffectEvent, useState } from 'react'

import CheckIcon from '@/components/icons/CheckIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import IconButton from '@/components/ui/IconButton'

/** How long a toast stays before leaving by itself. */
const DISPLAY_TIME = 3000
/** How long it takes to leave, matching `animate-toast-out`. */
const LEAVE_TIME = 160

type ToastProps = {
  title: string
  message: string
  /** Called once it has left, so it can be removed. */
  onDismiss: () => void
}

/**
 * A short confirmation that something worked, in the bottom corner (across the bottom on phones). It
 * leaves by itself after a few seconds, or when closed. Render it to show it; give it a new `key` to
 * show another in its place.
 */
export default function Toast({ title, message, onDismiss }: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false)
  const dismiss = useEffectEvent(onDismiss)

  useEffect(() => {
    const timer = setTimeout(() => setIsLeaving(true), DISPLAY_TIME)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLeaving) return
    const timer = setTimeout(dismiss, LEAVE_TIME)
    return () => clearTimeout(timer)
  }, [isLeaving])

  return (
    <div
      role="status"
      data-closing={isLeaving || undefined}
      className="fixed inset-x-4 bottom-4 z-30 flex items-start gap-2 rounded-md border border-border bg-surface p-4 shadow-raised motion-safe:animate-toast-in motion-safe:data-closing:animate-toast-out sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-72"
    >
      <span className="grid size-6 flex-none place-items-center rounded-full bg-accent-soft text-accent">
        <CheckIcon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-sm font-bold text-ink-strong">
          {title}
        </span>
        <span className="block text-xs text-muted">{message}</span>
      </span>
      <IconButton
        size="sm"
        onClick={() => setIsLeaving(true)}
        aria-label="Dismiss"
        className="-mt-1 -mr-1"
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}
