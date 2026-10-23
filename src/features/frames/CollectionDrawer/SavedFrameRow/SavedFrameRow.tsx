import TrashIcon from '@/components/icons/TrashIcon'
import Alert from '@/components/ui/Alert'
import SwipeToReveal from '@/components/ui/SwipeToReveal'
import { errorMessage } from '@/lib/api'
import { cx } from '@/lib/cx'

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

/**
 * A saved frame: picking it loads it. Swiped aside, it reveals Delete, which deletes it.
 */
export default function SavedFrameRow({ frame, onLoad }: SavedFrameRowProps) {
  const deleteFrame = useDeleteFrame()

  return (
    <li>
      <SwipeToReveal
        className="rounded-sm"
        action={
          <button
            type="button"
            aria-label={`Delete ${frame.name}`}
            disabled={deleteFrame.isPending}
            onClick={() => deleteFrame.mutate(frame.id)}
            className="flex w-24 cursor-pointer flex-col items-center justify-center gap-1 bg-danger font-display text-sm font-bold text-paper disabled:cursor-default"
          >
            <TrashIcon />
            Delete
          </button>
        }
      >
        <div
          className={cx(
            'flex min-h-20 items-center gap-2 bg-paper p-2 transition-opacity',
            deleteFrame.isPending && 'opacity-50',
          )}
        >
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
        </div>
      </SwipeToReveal>
      {deleteFrame.error && (
        <Alert size="sm" className="mt-1 px-2">
          {errorMessage(deleteFrame.error)}
        </Alert>
      )}
    </li>
  )
}
