import { useContext } from 'react'
import {
  ComboBoxStateContext,
  Input,
  type InputProps,
} from 'react-aria-components'

/**
 * The combo box's text input, which opens or closes the full list when clicked, as a select does,
 * highlighting the chosen option (or the first). Must be inside a `ComboBox`.
 */
export default function ComboBoxInput(props: InputProps) {
  const state = useContext(ComboBoxStateContext)

  return (
    <Input
      autoComplete="off"
      {...props}
      onClick={() => state?.toggle('first', 'manual')}
    />
  )
}
