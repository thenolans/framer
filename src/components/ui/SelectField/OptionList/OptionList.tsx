import type { ReactNode, RefObject } from 'react'
import { ListBox, ListBoxItem, Popover } from 'react-aria-components'

import CheckIcon from '@/components/icons/CheckIcon'
import { cx } from '@/lib/cx'

import type { ListItem } from '../options'

type OptionListProps = {
  /** The list's options. Leave out when the widget was given them as `items`. */
  items?: ListItem[]
  listRef: RefObject<HTMLDivElement | null>
  /** Shown in place of the options when none match. */
  emptyState?: ReactNode
}

/**
 * The popover list of a select or combo box, below its control and at least as wide, with a check by
 * the chosen option. Must be inside a `Select` or `ComboBox`.
 */
export default function OptionList({
  items,
  listRef,
  emptyState,
}: OptionListProps) {
  return (
    <Popover
      placement="bottom start"
      offset={4}
      // 256px, or less to fit the screen. A class can't set it: the popover sets an inline max height.
      maxHeight={256}
      className="min-w-(--trigger-width) overflow-y-auto rounded-sm border border-border bg-surface p-1 shadow-raised outline-none data-entering:animate-fade-in"
    >
      <ListBox
        ref={listRef}
        // Only when given: a combo box passes the options it has filtered by what's typed.
        {...(items && { items })}
        className="outline-none focus-visible:shadow-none"
        renderEmptyState={() => emptyState}
      >
        {(item: ListItem) => (
          <ListBoxItem
            id={item.id}
            // Children are a function, so the text to filter and type-ahead by is given here.
            textValue={item.label}
            // The highlight shows which option has focus, in place of the focus ring.
            className={cx(
              'flex cursor-pointer items-center gap-2 rounded-xs p-2 text-base text-ink outline-none focus-visible:shadow-none data-focused:bg-accent-soft data-focused:text-accent',
              item.muted && 'text-muted',
            )}
          >
            {({ isSelected }) => (
              <>
                <span className="flex-1">{item.label}</span>
                {isSelected && (
                  <CheckIcon size={12} className="flex-none text-accent" />
                )}
              </>
            )}
          </ListBoxItem>
        )}
      </ListBox>
    </Popover>
  )
}
