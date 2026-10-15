import placeholderArt from '@/assets/images/mountains.jpg'

import FrameArt from '../../../FrameArt'
import type { SavedFrame } from '../../../types'

/** A small picture of a saved frame, around its artwork, or the sample photo when none was saved. */
export default function FrameThumbnail({ frame }: { frame: SavedFrame }) {
  return (
    <span className="@container-size grid size-14 flex-none place-items-center">
      <FrameArt frame={frame} className="shadow-lifted">
        <img
          src={frame.artwork ?? placeholderArt}
          alt=""
          className="size-full object-cover"
        />
      </FrameArt>
    </span>
  )
}
