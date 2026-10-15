import { useMemo, useRef } from 'react'
import { Button, Select, SelectValue } from 'react-aria-components'

import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import type { FieldControlProps } from '@/components/ui/Field'
import { cx } from '@/lib/cx'

import OptionList, { revealSelected } from '../OptionList'
import {
  chevronClassName,
  type ListItem,
  selectControlClassName,
  type SelectOption,
  selectRootClassName,
} from '../options'

// The id of the option that clears the choice. Not `''`, which the list treats as no key.
const NONE = '\u0000none'

type SelectPickerProps = {
  control: FieldControlProps
  labelId: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  /** Shown while nothing is chosen, and as the first option, which clears the choice. */
  placeholder?: string
  autoFocus?: boolean
}

/** A button showing the chosen option, which opens the list to choose another. */
export default function SelectPicker({
  control: { className, ...control },
  labelId,
  value,
  onChange,
  options,
  placeholder,
  autoFocus,
}: SelectPickerProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const items = useMemo<ListItem[]>(
    () => [
      ...(placeholder === undefined
        ? []
        : [{ id: NONE, label: placeholder, muted: true }]),
      ...options.map((option) => ({ id: option.value, label: option.label })),
    ],
    [options, placeholder],
  )

  return (
    <Select
      aria-labelledby={labelId}
      // With a placeholder, no choice is its option, so the list checks and focuses it like any other.
      value={value || (placeholder === undefined ? null : NONE)}
      onChange={(key) =>
        onChange(key === null || key === NONE ? '' : String(key))
      }
      placeholder={placeholder ?? ''}
      onOpenChange={revealSelected(listRef)}
      autoFocus={autoFocus}
      className={selectRootClassName}
    >
      <Button
        {...control}
        className={cx(
          className,
          selectControlClassName,
          'flex cursor-pointer items-center text-left',
        )}
      >
        <SelectValue<ListItem>
          className={({ selectedItem }) =>
            cx(
              'flex-1 truncate',
              (!selectedItem || selectedItem.muted) && 'text-faint',
            )
          }
        />
        <span
          className={cx(
            chevronClassName,
            'flex items-center justify-center text-faint',
          )}
        >
          <ChevronRightIcon size={12} className="rotate-90" />
        </span>
      </Button>
      <OptionList items={items} listRef={listRef} />
    </Select>
  )
}
