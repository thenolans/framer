import { useState } from 'react'

import TrashIcon from '@/components/icons/TrashIcon'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import { errorMessage } from '@/lib/api'

import { formatInches } from '../../frameMath'
import type { SavedFrame } from '../../types'
import { useDeleteFrame } from '../../useDeleteFrame'
import { woodLabels } from '../../woodTextures'
import FrameThumbnail from './FrameThumbnail'

type SavedFrameRowProps = {
  frame: SavedFrame
  /** Called when the frame is picked, to load it into the calculator. */
  onLoad: (frame: SavedFrame) => void
}

/** A saved frame: picking it loads it, and its delete button asks first. */
export default function SavedFrameRow({ frame, onLoad }: SavedFrameRowProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const deleteFrame = useDeleteFrame()

  return (
    <li className="flex min-h-20 items-center gap-2 rounded-sm bg-paper p-2">
      {isConfirming ? (
        // Fits within the row's usual height, so asking doesn't move the rows below.
        <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
          {/* Worded and styled like the app's delete dialogs, in the row's space. */}
          <div className="max-w-full min-w-0">
            <p className="truncate font-display text-sm font-bold text-ink-strong">
              Delete “{frame.name}”?
            </p>
            {deleteFrame.error && (
              <Alert size="sm">{errorMessage(deleteFrame.error)}</Alert>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                deleteFrame.reset()
                setIsConfirming(false)
              }}
            >
              Keep
            </Button>
            <Button
              variant="danger"
              size="sm"
              autoFocus
              disabled={deleteFrame.isPending}
              onClick={() => deleteFrame.mutate(frame.id)}
            >
              {deleteFrame.isPending ? 'Deleting…' : 'Delete'}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => onLoad(frame)}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-4 rounded-sm p-1 text-left"
          >
            <FrameThumbnail frame={frame} />
            <span className="min-w-0">
              <span className="block truncate font-display text-sm font-bold text-ink-strong">
                {frame.name}
              </span>
              {frame.artist && (
                <span className="block truncate text-xs text-muted">
                  {frame.artist}
                </span>
              )}
              <span className="block text-xs text-muted">
                {formatInches(frame.width)} × {formatInches(frame.height)} ·{' '}
                {frame.framed ? woodLabels[frame.wood] : 'No frame'}
              </span>
            </span>
          </button>
          <IconButton
            variant="danger"
            onClick={() => setIsConfirming(true)}
            aria-label={`Delete ${frame.name}`}
          >
            <TrashIcon />
          </IconButton>
        </>
      )}
    </li>
  )
}
