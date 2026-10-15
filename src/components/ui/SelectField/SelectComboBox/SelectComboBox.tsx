import { useMemo, useRef } from 'react'
import { Button, ComboBox } from 'react-aria-components'

import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import type { FieldControlProps } from '@/components/ui/Field'
import { iconButtonClassName } from '@/components/ui/IconButton'
import { cx } from '@/lib/cx'

import OptionList, { revealSelected } from '../OptionList'
import {
  chevronClassName,
  type ListItem,
  selectControlClassName,
  type SelectOption,
  selectRootClassName,
} from '../options'
import ComboBoxInput from './ComboBoxInput'

type SelectComboBoxProps = {
  control: FieldControlProps
  label: string
  labelId: string
  /** What's typed, which can be any text, not only an option's. */
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  /** What to say when what's typed matches no option. Without it, the list closes instead. */
  newValueHint?: (value: string) => string
  name?: string
  required?: boolean
  placeholder?: string
  maxLength?: number
  autoFocus?: boolean
}

/**
 * A text input that narrows the list as you type and keeps any text, opened like a select: by
 * clicking it or its chevron, or with the down arrow.
 */
export default function SelectComboBox({
  control: { className, ...control },
  label,
  labelId,
  value,
  onChange,
  options,
  newValueHint,
  name,
  required,
  placeholder,
  maxLength,
  autoFocus,
}: SelectComboBoxProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const items = useMemo<ListItem[]>(
    () => options.map((option) => ({ id: option.value, label: option.label })),
    [options],
  )
  const typed = value.trim()
  const selectedKey =
    options.find((option) => option.value === typed)?.value ?? null
  const newValueMessage = newValueHint && typed ? newValueHint(typed) : null

  return (
    <ComboBox
      aria-labelledby={labelId}
      defaultItems={items}
      inputValue={value}
      onInputChange={onChange}
      selectedKey={selectedKey}
      onSelectionChange={(key) => {
        if (key !== null) onChange(String(key))
      }}
      allowsCustomValue
      allowsEmptyCollection={Boolean(newValueHint)}
      onOpenChange={revealSelected(listRef)}
      // The form validates with the input's own constraints, so the combo box only sets ARIA.
      validationBehavior="aria"
      autoFocus={autoFocus}
      className={selectRootClassName}
    >
      <ComboBoxInput
        {...control}
        name={name}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cx(className, selectControlClassName)}
      />
      <Button
        aria-label={`Show ${label} options`}
        // Inside the input, so it's only the chevron that darkens on hover.
        className={iconButtonClassName(
          {},
          cx(chevronClassName, 'outline-none hover:bg-transparent'),
        )}
      >
        <ChevronRightIcon size={12} className="rotate-90" />
      </Button>
      <OptionList
        listRef={listRef}
        emptyState={
          newValueMessage && (
            <p className="p-2 text-base text-muted">{newValueMessage}</p>
          )
        }
      />
    </ComboBox>
  )
}
