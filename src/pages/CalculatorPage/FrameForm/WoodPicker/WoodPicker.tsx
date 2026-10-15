import { useId } from 'react'

import Eyebrow from '@/components/ui/Eyebrow'
import { type Wood, woods } from '@/features/frames/types'
import { woodLabels, woodTextures } from '@/features/frames/woodTextures'

type WoodPickerProps = {
  value: Wood
  onChange: (wood: Wood) => void
}

/** The frame's wood, picked from a row of grain swatches. */
export default function WoodPicker({ value, onChange }: WoodPickerProps) {
  const labelId = useId()

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      className="flex items-center justify-between gap-4"
    >
      <Eyebrow id={labelId}>Wood</Eyebrow>
      <div className="flex gap-2">
        {woods.map((wood) => (
          <label key={wood} title={woodLabels[wood]} className="cursor-pointer">
            <input
              type="radio"
              name="wood"
              value={wood}
              checked={value === wood}
              onChange={() => onChange(wood)}
              className="peer sr-only"
            />
            <span
              className="block size-8 rounded-full bg-cover ring-1 ring-border transition-shadow peer-checked:ring-2 peer-checked:ring-accent peer-checked:ring-offset-2 peer-checked:ring-offset-surface peer-focus-visible:shadow-focus"
              style={{ backgroundImage: `url(${woodTextures[wood]})` }}
            />
            <span className="sr-only">{woodLabels[wood]}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
