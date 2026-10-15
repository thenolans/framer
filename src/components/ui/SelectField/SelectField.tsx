import { useMemo } from 'react'

import Field, { type FieldProps } from '@/components/ui/Field'

import { type SelectOption, toOptions } from './options'
import SelectComboBox from './SelectComboBox'
import SelectPicker from './SelectPicker'

type SharedProps<T extends string> = FieldProps & {
  /** The choices, as options or as strings that are their own labels. */
  options: readonly (T | SelectOption<T>)[]
  placeholder?: string
  autoFocus?: boolean
}

type PickProps<T extends string> = SharedProps<T> & {
  allowsCustomValue?: false
  /** The chosen option's value, or `''` for none. */
  value: T | ''
  onChange: (value: T | '') => void
  /** Shown while nothing is chosen, and as the first option, which clears the choice. */
  placeholder?: string
}

type CustomValueProps = SharedProps<string> & {
  /** Typing narrows the list, and any text can be kept, not only the options. */
  allowsCustomValue: true
  /** What's typed. */
  value: string
  onChange: (value: string) => void
  /** What to say when what's typed matches no option, e.g. that it'll be added. Without it, the list closes instead. */
  newValueHint?: (value: string) => string
  /** The input's `name`, which keys its validation errors. */
  name?: string
  required?: boolean
  maxLength?: number
}

type SelectFieldProps<T extends string> = PickProps<T> | CustomValueProps

/**
 * A labelled control that opens a list of options to choose from, standalone or in an `InputGroup`.
 * By default it's a button showing the chosen option, like a native select. With `allowsCustomValue`
 * it's a text input whose list narrows as you type, for values the options only suggest.
 */
export default function SelectField<T extends string>(
  props: SelectFieldProps<T>,
) {
  const {
    label,
    hint,
    error,
    invalid,
    hideLabel,
    controlClassName,
    className,
  } = props
  const options = useMemo(
    () => toOptions<string>(props.options),
    [props.options],
  )

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      invalid={invalid}
      hideLabel={hideLabel}
      controlClassName={controlClassName}
      className={className}
    >
      {(control, labelId) =>
        props.allowsCustomValue ? (
          <SelectComboBox
            control={control}
            label={label}
            labelId={labelId}
            value={props.value}
            onChange={props.onChange}
            options={options}
            newValueHint={props.newValueHint}
            name={props.name}
            required={props.required}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            autoFocus={props.autoFocus}
          />
        ) : (
          <SelectPicker
            control={control}
            labelId={labelId}
            value={props.value}
            // The picker only reports its options' values, or `''`.
            onChange={props.onChange as (value: string) => void}
            options={options}
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
          />
        )
      }
    </Field>
  )
}
