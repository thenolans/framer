import type { ChangeEvent, ReactNode } from 'react'

import Card from '@/components/ui/Card'
import Eyebrow from '@/components/ui/Eyebrow'
import SegmentedControl from '@/components/ui/SegmentedControl'
import TextField from '@/components/ui/TextField'
import { formatInches, overallSize } from '@/features/frames/frameMath'

import {
  type FrameDraft,
  isLengthInput,
  type LengthField,
  toFrame,
} from '../frameDraft'
import WoodPicker from './WoodPicker'

type FrameFormProps = {
  draft: FrameDraft
  onChange: (draft: FrameDraft) => void
  /** Shown under the overall size, like the buttons to save the frame. */
  children?: ReactNode
}

const hangOptions = [
  { value: 'framed', label: 'Framed' },
  { value: 'unframed', label: 'No frame' },
] as const

/**
 * The artwork's size, whether it's framed, the frame around it and its wood, with the overall size
 * they come to. Unframed, the frame's fields are hidden but keep their values for framing it again.
 */
export default function FrameForm({
  draft,
  onChange,
  children,
}: FrameFormProps) {
  const size = overallSize(toFrame(draft))

  // Each length field keeps only what could be a length, so the preview never reads a typo.
  const lengthProps = (name: LengthField) => ({
    name,
    value: draft[name],
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      if (isLengthInput(event.target.value)) {
        onChange({ ...draft, [name]: event.target.value })
      }
    },
    inputMode: 'decimal' as const,
    autoComplete: 'off',
    suffix: '"',
  })

  return (
    <Card className="flex flex-col gap-6 p-6">
      <fieldset className="min-w-0">
        <legend className="mb-2">
          <Eyebrow>Artwork</Eyebrow>
          <span className="sr-only"> size in inches</span>
        </legend>
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-2">
          <TextField label="Width" {...lengthProps('width')} />
          <span
            aria-hidden="true"
            className="flex h-10 items-center text-faint"
          >
            ×
          </span>
          <TextField label="Height" {...lengthProps('height')} />
        </div>
      </fieldset>

      <div className="flex flex-col gap-4">
        {/* Stands in for the section's label, so it spans the form. */}
        <SegmentedControl
          label="Frame"
          options={hangOptions}
          value={draft.framed ? 'framed' : 'unframed'}
          onChange={(hang) => onChange({ ...draft, framed: hang === 'framed' })}
          size="md"
          className="w-full"
        />
        {draft.framed && (
          <fieldset className="min-w-0">
            <legend className="sr-only">Frame sizes in inches</legend>
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Frame width" {...lengthProps('frameWidth')} />
              <TextField label="Mat width" {...lengthProps('matWidth')} />
              <TextField label="Overlap" {...lengthProps('overlap')} />
            </div>
          </fieldset>
        )}
      </div>

      {draft.framed && (
        <WoodPicker
          value={draft.wood}
          onChange={(wood) => onChange({ ...draft, wood })}
        />
      )}

      <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
        <Eyebrow>Overall size</Eyebrow>
        <span className="font-display text-xl font-extrabold whitespace-nowrap text-ink-strong">
          {formatInches(size.width)} × {formatInches(size.height)}
        </span>
      </div>

      {children}
    </Card>
  )
}
