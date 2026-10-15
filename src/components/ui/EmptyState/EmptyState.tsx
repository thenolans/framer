import type { ReactNode } from 'react'

import FramerIcon from '@/components/icons/FramerIcon'
import Heading from '@/components/ui/Heading'
import { cx } from '@/lib/cx'

const sizes = {
  /** Fills a page's main area. */
  page: {
    root: 'px-4 pt-24 pb-32',
    icon: 48,
    heading: 'title',
    text: 'mt-2 max-w-xs text-lg leading-relaxed',
  },
  /** Fills a panel or drawer. */
  panel: {
    root: 'px-4 py-8',
    icon: 32,
    heading: 'card',
    text: 'mt-1 max-w-xs text-sm',
  },
} as const

type EmptyStateProps = {
  title: string
  children: ReactNode
  /** A way forward, such as a button. */
  action?: ReactNode
  size?: keyof typeof sizes
}

/** Fills the space where there's nothing to show. */
export default function EmptyState({
  title,
  children,
  action,
  size = 'page',
}: EmptyStateProps) {
  const sizing = sizes[size]

  return (
    <div className={cx('flex flex-col items-center text-center', sizing.root)}>
      <FramerIcon size={sizing.icon} className="mb-4 text-accent" />
      <Heading as="h2" variant={sizing.heading}>
        {title}
      </Heading>
      <p className={cx('text-muted', sizing.text)}>{children}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
