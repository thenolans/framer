import type { DragEvent } from 'react'

import placeholderArt from '@/assets/images/mountains.jpg'
import FrameArt from '@/features/frames/FrameArt'
import { formatInches, overallSize } from '@/features/frames/frameMath'
import type { FrameSpec } from '@/features/frames/types'

import Measurement from './Measurement'

type FramePreviewProps = {
  frame: FrameSpec
  /** The artwork's picture; `null` for the sample photo. */
  artUrl: string | null
  /** Called with a picture the user picks or drops in. */
  onChooseArt: (file: File) => void
}

/**
 * The frame drawn to scale with its overall width and height marked, around a sample photo until
 * the user picks or drops in their own artwork.
 */
export default function FramePreview({
  frame,
  artUrl,
  onChooseArt,
}: FramePreviewProps) {
  const size = overallSize(frame)

  function showArt(file: File | undefined) {
    if (file?.type.startsWith('image/')) onChooseArt(file)
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault()
    showArt(event.dataTransfer.files[0])
  }

  return (
    // Room around the frame for its measurements: above it and to its left. On wide screens it's a
    // fixed size, so changing the frame never moves the form beside it.
    <div className="pt-10 pr-4 pb-6 pl-10 lg:w-2xl lg:min-w-0 lg:py-16 lg:pr-0 lg:pl-16">
      {/* The space the frame fits itself to: on wide screens, as tall as the screen allows within limits. */}
      <div className="@container-size flex h-70 items-center justify-center lg:h-[60vh] lg:max-h-160 lg:min-h-80">
        <FrameArt
          frame={frame}
          className="shadow-raised"
          annotations={
            <>
              <Measurement side="width" label={formatInches(size.width)} />
              <Measurement side="height" label={formatInches(size.height)} />
            </>
          }
        >
          <label
            className="block size-full cursor-pointer has-focus-visible:shadow-focus"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(event) => showArt(event.target.files?.[0])}
              className="sr-only"
            />
            <span className="sr-only">Choose your artwork</span>
            <img
              src={artUrl ?? placeholderArt}
              alt=""
              className="size-full object-cover"
            />
          </label>
        </FrameArt>
      </div>
    </div>
  )
}
