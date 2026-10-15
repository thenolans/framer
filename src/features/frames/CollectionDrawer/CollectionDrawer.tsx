import CloseIcon from '@/components/icons/CloseIcon'
import { useDialog } from '@/components/ui/Dialog'
import EmptyState from '@/components/ui/EmptyState'
import ErrorRetry from '@/components/ui/ErrorRetry'
import Heading from '@/components/ui/Heading'
import IconButton from '@/components/ui/IconButton'
import ModalShell from '@/components/ui/ModalShell'
import SheetHandle from '@/components/ui/SheetHandle'

import type { SavedFrame } from '../types'
import { useFrames } from '../useFrames'
import SavedFrameRow from './SavedFrameRow'
import SavedFrameSkeleton from './SavedFrameSkeleton'

type CollectionDrawerProps = {
  /** Called when a frame is picked, as the drawer closes. */
  onLoad: (frame: SavedFrame) => void
  /** Called once it has closed, so it can be removed. */
  onClose: () => void
}

/**
 * The user's saved frames, in a panel over the right edge (a sheet from the bottom on phones). Picking
 * one loads it into the calculator and closes the drawer.
 */
export default function CollectionDrawer({
  onLoad,
  onClose,
}: CollectionDrawerProps) {
  const { dialogRef, close } = useDialog()
  const { frames, isLoading, error, reload } = useFrames()

  const load = (frame: SavedFrame) => {
    onLoad(frame)
    close()
  }

  return (
    <ModalShell
      dialogRef={dialogRef}
      aria-label="Your collection"
      onClose={onClose}
      className="flex items-end justify-center overflow-clip pt-12 md:items-stretch md:justify-end md:p-0"
      panelClassName="flex max-h-full w-full flex-col overflow-hidden max-md:rounded-b-none max-md:motion-safe:animate-sheet-in max-md:motion-safe:in-data-closing:animate-sheet-out md:h-full md:max-w-sm md:rounded-none md:border-l md:border-border md:motion-safe:animate-drawer-in md:motion-safe:in-data-closing:animate-drawer-out"
    >
      <div className="flex-none border-b border-border-soft px-6 pb-4 md:pt-4">
        <SheetHandle onClick={close} className="-mx-6 mb-2" />
        <div className="flex items-center justify-between gap-2">
          <Heading as="h2" variant="subsection">
            Your collection
          </Heading>
          <IconButton
            size="lg"
            onClick={close}
            aria-label="Close"
            className="-mr-2"
          >
            <CloseIcon size={20} />
          </IconButton>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-4 pb-safe-area-6">
        {isLoading ? (
          <div aria-hidden className="flex animate-pulse flex-col gap-2">
            <SavedFrameSkeleton />
            <SavedFrameSkeleton />
            <SavedFrameSkeleton />
          </div>
        ) : error ? (
          <ErrorRetry onRetry={reload}>{error}</ErrorRetry>
        ) : frames.length === 0 ? (
          <EmptyState size="panel" title="Nothing saved yet">
            Save the frame in the calculator to see it here.
          </EmptyState>
        ) : (
          <ul className="flex flex-col gap-2">
            {frames.map((frame) => (
              <SavedFrameRow key={frame.id} frame={frame} onLoad={load} />
            ))}
          </ul>
        )}
      </div>
    </ModalShell>
  )
}
