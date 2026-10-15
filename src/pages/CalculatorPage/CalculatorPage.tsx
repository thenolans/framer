import { useState } from 'react'

import Logo from '@/components/ui/Logo'
import { defaultFrame } from '@/features/frames/defaultFrame'

import { toDraft, toFrame } from './frameDraft'
import FrameForm from './FrameForm'
import FramePreview from './FramePreview'

export default function CalculatorPage() {
  const [draft, setDraft] = useState(() => toDraft(defaultFrame))

  return (
    <div className="min-h-screen">
      <header className="px-4 pt-6 sm:px-8">
        <Logo />
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-6 pb-16 sm:px-8 lg:grid-cols-[minmax(320px,1fr)_minmax(320px,2fr)]">
        <h1 className="sr-only">Frame calculator</h1>
        <FrameForm draft={draft} onChange={setDraft} />
        <FramePreview frame={toFrame(draft)} />
      </main>
    </div>
  )
}
