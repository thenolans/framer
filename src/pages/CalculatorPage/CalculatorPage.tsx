import { Link } from 'react-router'

import { paths } from '@/app/paths'
import Logo from '@/components/ui/Logo'
import { useCurrentUser } from '@/features/auth/useCurrentUser'

import { toFrame } from './frameDraft'
import FrameForm from './FrameForm'
import FramePreview from './FramePreview'
import { useSavedDraft } from './useSavedDraft'

export default function CalculatorPage() {
  const [draft, setDraft] = useSavedDraft()
  const { user, isLoading } = useCurrentUser()

  return (
    <div className="min-h-screen">
      <header className="px-4 pt-6 sm:px-8">
        <Logo />
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-6 pb-16 sm:px-8 lg:grid-cols-[minmax(320px,1fr)_minmax(320px,2fr)]">
        <h1 className="sr-only">Frame calculator</h1>
        <div className="flex flex-col gap-4">
          <FrameForm draft={draft} onChange={setDraft} />
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
        <FramePreview frame={toFrame(draft)} />
      </main>
    </div>
  )
}
