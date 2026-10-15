import { type FormEvent, useState, useTransition } from 'react'

import type { FormValidation } from './useFormValidation'

type DraftSubmitOptions<T> = {
  validation: FormValidation
  /**
   * Checks what the inputs' attributes can't express, once they pass, showing its own errors. Returning
   * false stops the submit.
   */
  check?: () => boolean
  /** Saves the draft, rejecting if it fails. */
  save: () => Promise<T>
  /** Called with what `save` resolved to, e.g. to close the dialog. */
  onSaved: (saved: T) => void
}

/**
 * Submits a form that keeps a controlled draft: checks its fields with `validation`, then `check`, then
 * runs `save` in a transition. A failed save is kept in `saveError` for the form to show, until the next
 * submit. Spread `formProps` onto the `<form>` in place of `validation.formProps`.
 */
export function useDraftSubmit<T>({
  validation,
  check,
  save,
  onSaved,
}: DraftSubmitOptions<T>) {
  const [saveError, setSaveError] = useState<unknown>(null)
  const [isSaving, startSaving] = useTransition()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    validation.formProps.onSubmit(event)
    if (event.defaultPrevented) return
    event.preventDefault()
    if (check && !check()) return

    setSaveError(null)
    startSaving(async () => {
      let saved: T
      try {
        saved = await save()
      } catch (error) {
        setSaveError(error)
        return
      }
      onSaved(saved)
    })
  }

  return {
    formProps: { ...validation.formProps, onSubmit, 'aria-busy': isSaving },
    isSaving,
    saveError,
  }
}
