import { type CSSProperties, type DragEvent, useEffect, useState } from 'react'

import placeholderArt from '@/assets/images/mountains.jpg'
import FrameArt from '@/features/frames/FrameArt'
import { formatInches, overallSize } from '@/features/frames/frameMath'
import type { FrameSpec } from '@/features/frames/types'

import Measurement from './Measurement'

type FramePreviewProps = {
  frame: FrameSpec
}

/**
 * The frame drawn to scale with its overall width and height marked, around a sample photo until
 * the user picks or drops in their own artwork. The artwork stays on the device.
 */
export default function FramePreview({ frame }: FramePreviewProps) {
  const [artUrl, setArtUrl] = useState<string | null>(null)
  const size = overallSize(frame)
  // On wide screens the preview is as tall as the screen allows, within limits, and exactly as wide
  // as the frame at that height plus the room for its measurements (`lg:pl-16`), so the page can
  // center it beside the form.
  const sizing = {
    '--preview-height': 'clamp(320px, 60vh, 640px)',
    '--preview-width': `calc(var(--preview-height) * ${frame.width || 1} / ${frame.height || 1} + 64px)`,
  } as CSSProperties

  // Each picked file gets an object URL, released when another replaces it or the page closes.
  useEffect(() => {
    if (!artUrl) return
    return () => URL.revokeObjectURL(artUrl)
  }, [artUrl])

  function showArt(file: File | undefined) {
    if (file?.type.startsWith('image/')) setArtUrl(URL.createObjectURL(file))
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault()
    showArt(event.dataTransfer.files[0])
  }

  return (
    // Room around the frame for its measurements: above it and to its left.
    <div
      style={sizing}
      className="pt-10 pr-4 pb-6 pl-10 lg:w-(--preview-width) lg:min-w-0 lg:py-16 lg:pr-0 lg:pl-16"
    >
      {/* The space the frame fits itself to. */}
      <div className="@container-size flex h-70 items-center justify-center lg:h-(--preview-height)">
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
