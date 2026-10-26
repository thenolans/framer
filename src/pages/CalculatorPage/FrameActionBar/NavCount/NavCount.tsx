import type { ComponentProps } from 'react'

import { cx } from '@/lib/cx'

type NavCountProps = Omit<ComponentProps<'span'>, 'children'> & {
  count: number
  /** What's counted, read after the number by screen readers ("frames in the collection"). */
  label: string
  /** Whether it sits on the active section, which has the accent behind it. */
  active?: boolean
}

/** A small count on a nav item, such as the frames in the collection. */
export default function NavCount({
  count,
  label,
  active,
  className,
  ...props
}: NavCountProps) {
  return (
    <span
      className={cx(
        'inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-display text-xs font-bold',
        active ? 'bg-on-accent text-accent' : 'bg-accent text-on-accent',
        className,
      )}
      {...props}
    >
      {count}
      <span className="sr-only"> {label}</span>
    </span>
  )
}
