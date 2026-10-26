import { useState } from 'react'

import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Dialog, { DialogActions, useDialog } from '@/components/ui/Dialog'
import SegmentedControl from '@/components/ui/SegmentedControl'
import SelectField from '@/components/ui/SelectField'
import TextField from '@/components/ui/TextField'
import { useDraftSubmit } from '@/hooks/useDraftSubmit'
import { useFormValidation } from '@/hooks/useFormValidation'
import { ApiError, errorMessage } from '@/lib/api'

import type { ArtworkPicture, FrameSpec, SavedFrame } from '../types'
import { useArtistNames } from '../useArtistNames'
import { useCreateFrame } from '../useCreateFrame'
import { useUpdateFrame } from '../useUpdateFrame'
import {
  type FrameDetailsDraft,
  type SaveMode,
  toDraft,
  toInput,
  UNTITLED,
} from './frameDetailsDraft'
import { resizeArtwork } from './resizeArtwork'

/** Input names of the fields that show their own save errors. */
const fieldNames = ['name', 'artist']

const saveModes = [
  { value: 'create', label: 'Save as new' },
  { value: 'update', label: 'Save changes' },
] as const

type SaveFrameDialogProps = {
  frame: FrameSpec
  artwork: ArtworkPicture
  /** The frame loaded from the collection, if any, which saving can update. */
  loadedFrame: SavedFrame | null
  /** Called with the saved frame once it's saved, as the dialog closes. */
  onSaved: (saved: SavedFrame) => void
  onClose: () => void
}

/**
 * Names the frame in the calculator and saves it to the user's collection: as a new frame, or, when
 * it was loaded from the collection, as changes to that one. Artists already in the collection are
 * suggested, so pieces by the same artist share one spelling.
 */
export default function SaveFrameDialog({
  frame,
  artwork,
  loadedFrame,
  onSaved,
  onClose,
}: SaveFrameDialogProps) {
  const { dialogRef, close } = useDialog()
  const [draft, setDraft] = useState(() => toDraft(loadedFrame))
  const artists = useArtistNames()
  const validation = useFormValidation()
  const { mutateAsync: createFrame } = useCreateFrame()
  const { mutateAsync: updateFrame } = useUpdateFrame()
  const isUpdating = draft.mode === 'update' && loadedFrame !== null

  async function save() {
    const input = toInput(draft, frame, artists)
    const { file } = artwork
    // Shrunk so it uploads quickly; sent as it is if the browser can't read it, for the API to check.
    const upload = (picture: File) =>
      resizeArtwork(picture).catch(() => picture)

    if (draft.mode === 'update' && loadedFrame) {
      return updateFrame({
        id: loadedFrame.id,
        ...input,
        // Leaves the saved picture be unless another was chosen.
        artwork: file && !artwork.isSaved ? await upload(file) : undefined,
      })
    }
    // Without a picture of its own, a new frame gets a copy of the loaded frame's.
    return createFrame({
      ...input,
      ...(file
        ? { artwork: await upload(file) }
        : loadedFrame?.artwork && { artworkFrom: loadedFrame.id }),
    })
  }

  const { formProps, isSaving, saveError } = useDraftSubmit({
    validation,
    save,
    onSaved: (saved) => {
      onSaved(saved)
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
        {loadedFrame && (
          <SegmentedControl<SaveMode>
            label="Save"
            options={saveModes}
            value={draft.mode}
            onChange={(mode) => set('mode', mode)}
            size="md"
            className="w-full"
          />
        )}
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
            {isSaving ? 'Saving…' : isUpdating ? 'Save changes' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
