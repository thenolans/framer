import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Dialog, { DialogActions, useDialog } from '@/components/ui/Dialog'
import TextField from '@/components/ui/TextField'
import { useFormAction } from '@/hooks/useFormAction'
import { useFormValidation } from '@/hooks/useFormValidation'

import type { FrameSpec } from '../types'
import { useCreateFrame } from '../useCreateFrame'

/** The name a frame saves with when none is given. */
const UNTITLED = 'Untitled artwork'

const fields = ['name', 'artist'] as const

type SaveFrameDialogProps = {
  frame: FrameSpec
  /** Called once it's saved, as the dialog closes. */
  onSaved: () => void
  onClose: () => void
}

/** Names the frame in the calculator and saves it to the user's collection. */
export default function SaveFrameDialog({
  frame,
  onSaved,
  onClose,
}: SaveFrameDialogProps) {
  const { dialogRef, close } = useDialog()
  const { mutateAsync: createFrame } = useCreateFrame()
  const validation = useFormValidation()
  const [state, formAction, isPending] = useFormAction(
    fields,
    async ({ name, artist }) => {
      await createFrame({
        ...frame,
        name: name.trim() || UNTITLED,
        artist: artist.trim(),
      })
      onSaved()
      close()
    },
  )

  return (
    <Dialog title="Save to collection" dialogRef={dialogRef} onClose={onClose}>
      <form
        action={formAction}
        {...validation.formProps}
        className="flex flex-col gap-4"
      >
        {state.message && <Alert>{state.message}</Alert>}
        <TextField
          label="Artwork name"
          name="name"
          placeholder={UNTITLED}
          maxLength={255}
          autoComplete="off"
          // Password managers take a field called "name" for the user's own and offer to fill it.
          data-1p-ignore
          data-autofocus
          defaultValue={state.values.name}
          error={validation.errors.name ?? state.fieldErrors.name}
        />
        <TextField
          label="Artist"
          name="artist"
          maxLength={255}
          autoComplete="off"
          data-1p-ignore
          defaultValue={state.values.artist}
          error={validation.errors.artist ?? state.fieldErrors.artist}
        />
        <DialogActions className="mt-2">
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving…' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
