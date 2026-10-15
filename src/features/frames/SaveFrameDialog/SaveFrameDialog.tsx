import { useState } from 'react'

import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Dialog, { DialogActions, useDialog } from '@/components/ui/Dialog'
import SelectField from '@/components/ui/SelectField'
import TextField from '@/components/ui/TextField'
import { useDraftSubmit } from '@/hooks/useDraftSubmit'
import { useFormValidation } from '@/hooks/useFormValidation'
import { ApiError, errorMessage } from '@/lib/api'

import type { FrameSpec } from '../types'
import { useArtistNames } from '../useArtistNames'
import { useCreateFrame } from '../useCreateFrame'
import {
  type FrameDetailsDraft,
  toDraft,
  toInput,
  UNTITLED,
} from './frameDetailsDraft'

/** Input names of the fields that show their own save errors. */
const fieldNames = ['name', 'artist']

type SaveFrameDialogProps = {
  frame: FrameSpec
  /** Called once it's saved, as the dialog closes. */
  onSaved: () => void
  onClose: () => void
}

/**
 * Names the frame in the calculator and saves it to the user's collection. Artists already in the
 * collection are suggested, so pieces by the same artist share one spelling.
 */
export default function SaveFrameDialog({
  frame,
  onSaved,
  onClose,
}: SaveFrameDialogProps) {
  const { dialogRef, close } = useDialog()
  const [draft, setDraft] = useState(toDraft)
  const artists = useArtistNames()
  const validation = useFormValidation()
  const { mutateAsync: createFrame } = useCreateFrame()
  const { formProps, isSaving, saveError } = useDraftSubmit({
    validation,
    save: () => createFrame(toInput(draft, frame, artists)),
    onSaved: () => {
      onSaved()
      close()
    },
  })

  const set = <K extends keyof FrameDetailsDraft>(
    key: K,
    value: FrameDetailsDraft[K],
  ) => setDraft((current) => ({ ...current, [key]: value }))

  const apiErrors = saveError instanceof ApiError ? saveError.fieldErrors : {}
  const errors = { ...apiErrors, ...validation.errors }
  const formMessage =
    saveError && !fieldNames.some((field) => apiErrors[field])
      ? errorMessage(saveError)
      : null

  return (
    <Dialog title="Save to collection" dialogRef={dialogRef} onClose={onClose}>
      <form {...formProps} className="flex flex-col gap-4">
        {formMessage && <Alert>{formMessage}</Alert>}
        <TextField
          label="Artwork name"
          name="name"
          value={draft.name}
          onChange={(event) => set('name', event.target.value)}
          placeholder={UNTITLED}
          maxLength={255}
          autoComplete="off"
          // Password managers take a field called "name" for the user's own and offer to fill it.
          data-1p-ignore
          data-autofocus
          error={errors.name}
        />
        <SelectField
          allowsCustomValue
          label="Artist"
          name="artist"
          value={draft.artist}
          onChange={(artist) => set('artist', artist)}
          options={artists}
          newValueHint={(artist) => `“${artist}” is a new artist.`}
          noOptionsHint="No artists yet"
          maxLength={255}
          error={errors.artist}
        />
        <DialogActions className="mt-2">
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
