import { useState } from 'react'
import { Link } from 'react-router'

import { paths } from '@/app/paths'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import CollectionDrawer from '@/features/frames/CollectionDrawer'
import SaveFrameDialog from '@/features/frames/SaveFrameDialog'
import { useSavedFrame } from '@/features/frames/useSavedFrame'
import { cx } from '@/lib/cx'

import CalculatorHeader from './CalculatorHeader'
import CollectionButton from './CollectionButton'
import FrameActionBar from './FrameActionBar'
import { toDraft, toFrame } from './frameDraft'
import FrameForm from './FrameForm'
import FramePreview from './FramePreview'
import { useArtwork } from './useArtwork'
import { useLoadedFrameId } from './useLoadedFrameId'
import { useSavedDraft } from './useSavedDraft'

export default function CalculatorPage() {
  const [draft, setDraft] = useSavedDraft()
  const artwork = useArtwork()
  const { user, isLoading } = useCurrentUser()
  const [loadedFrameId, setLoadedFrameId] = useLoadedFrameId()
  // Signed out, or once it's deleted, there's no frame to update.
  const loadedFrame = useSavedFrame(user ? loadedFrameId : null)
  const [isSaving, setIsSaving] = useState(false)
  const [isCollectionOpen, setIsCollectionOpen] = useState(false)
  // Counts saves, so each one shows a fresh toast; 0 while none is showing.
  const [savedToast, setSavedToast] = useState(0)
  const frame = toFrame(draft)

  return (
    // Signed in, on phones the page clears the action bar along the bottom edge.
    <div
      className={cx(
        'flex min-h-dvh flex-col',
        user && 'pb-(--tab-bar-height) md:pb-0',
      )}
    >
      <CalculatorHeader />

      {/* On wide screens the form and the preview's fixed box sit side by side, centered as a pair in the
          space below the header; the bottom padding matches the header's height, so they're centered on
          screen. */}
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-4 pt-6 pb-16 sm:px-8 lg:flex lg:justify-center">
        <h1 className="sr-only">Frame calculator</h1>
        <div className="flex flex-col gap-4 lg:w-sm lg:flex-none">
          <FrameForm draft={draft} onChange={setDraft}>
            {/* On phones the action bar takes their place. */}
            {user && (
              <div className="flex gap-2 max-md:hidden">
                <Button className="flex-1" onClick={() => setIsSaving(true)}>
                  Save to collection
                </Button>
                <CollectionButton onClick={() => setIsCollectionOpen(true)} />
              </div>
            )}
          </FrameForm>
          {!isLoading && !user && (
            <p className="text-center text-sm text-muted">
              <Link
                to={paths.login}
                className="font-bold text-accent underline underline-offset-2 hover:text-accent-mid"
              >
                Sign in
              </Link>{' '}
              to save this frame to your collection
            </p>
          )}
        </div>
        <FramePreview
          frame={frame}
          artUrl={artwork.url ?? loadedFrame?.artwork ?? null}
          onChooseArt={artwork.choose}
        />
      </main>

      {user && (
        <FrameActionBar
          onOpenCollection={() => setIsCollectionOpen(true)}
          onSave={() => setIsSaving(true)}
        />
      )}
      {isSaving && (
        <SaveFrameDialog
          frame={frame}
          artwork={artwork}
          loadedFrame={loadedFrame}
          onSaved={(saved) => {
            setLoadedFrameId(saved.id)
            artwork.markSaved()
            setSavedToast((count) => count + 1)
          }}
          onClose={() => setIsSaving(false)}
        />
      )}
      {isCollectionOpen && (
        <CollectionDrawer
          onLoad={(saved) => {
            setDraft(toDraft(saved))
            artwork.showSaved()
            setLoadedFrameId(saved.id)
          }}
          onClose={() => setIsCollectionOpen(false)}
        />
      )}
      {savedToast > 0 && (
        <Toast
          key={savedToast}
          title="Success"
          message="Saved to collection"
          onDismiss={() => setSavedToast(0)}
        />
      )}
    </div>
  )
}
