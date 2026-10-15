/** A choice in a `SelectField`: the value it stands for and the text shown for it. */
export type SelectOption<T extends string = string> = {
  value: T
  label: string
}

/** Options given as plain strings are their own labels. */
export function toOptions<T extends string>(
  options: readonly (T | SelectOption<T>)[],
): SelectOption<T>[] {
  return options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option,
  )
}

/** An option in the open list. */
export type ListItem = {
  id: string
  label: string
  /** Shown faint, like a placeholder, e.g. the option that clears the choice. */
  muted?: boolean
}

/** The select's root, which positions the chevron and list and passes a group cell's corners through. */
export const selectRootClassName = 'group/select relative rounded-inherit'

/**
 * The control's look beyond a standard input's: room for the chevron, and the focus look on any focus
 * and while the list is open. A text input always shows focus, but browsers differ on whether a button
 * does when focus returns to it from a closed list, so both modes show it the way the input does.
 */
export const selectControlClassName =
  'pr-8 focus:border-accent-mid focus:shadow-focus group-data-open/select:border-accent-mid group-data-open/select:shadow-focus'

/** Where the chevron sits, at the control's right end. The control pads its text clear of it with `pr-8`. */
export const chevronClassName =
  'absolute top-1/2 right-0 -translate-y-1/2 size-8'
