import { useState } from 'react'
import { Link } from 'react-router'

import { paths } from '@/app/paths'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import SaveFrameDialog from '@/features/frames/SaveFrameDialog'

import CalculatorHeader from './CalculatorHeader'
import { toFrame } from './frameDraft'
import FrameForm from './FrameForm'
import FramePreview from './FramePreview'
import { useSavedDraft } from './useSavedDraft'

export default function CalculatorPage() {
  const [draft, setDraft] = useSavedDraft()
  const { user, isLoading } = useCurrentUser()
  const [isSaving, setIsSaving] = useState(false)
  // Counts saves, so each one shows a fresh toast; 0 while none is showing.
  const [savedToast, setSavedToast] = useState(0)
  const frame = toFrame(draft)

  return (
    <div className="min-h-screen">
      <CalculatorHeader />

      <main className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-6 pb-16 sm:px-8 lg:grid-cols-[minmax(320px,1fr)_minmax(320px,2fr)]">
        <h1 className="sr-only">Frame calculator</h1>
        <div className="flex flex-col gap-4">
          <FrameForm draft={draft} onChange={setDraft}>
            {user && (
              <Button block onClick={() => setIsSaving(true)}>
                Save to collection
              </Button>
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
        <FramePreview frame={frame} />
      </main>

      {isSaving && (
        <SaveFrameDialog
          frame={frame}
          onSaved={() => setSavedToast((count) => count + 1)}
          onClose={() => setIsSaving(false)}
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
