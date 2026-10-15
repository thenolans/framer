import placeholderArt from '@/assets/images/mountains.jpg'

import FrameArt from '../../../FrameArt'
import type { FrameSpec } from '../../../types'

/** A small picture of a saved frame, around the sample photo since artwork isn't saved. */
export default function FrameThumbnail({ frame }: { frame: FrameSpec }) {
  return (
    <span className="@container-size grid size-14 flex-none place-items-center">
      <FrameArt frame={frame} className="shadow-lifted">
        <img src={placeholderArt} alt="" className="size-full object-cover" />
      </FrameArt>
    </span>
  )
}
