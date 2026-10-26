import CollectionIcon from '@/components/icons/CollectionIcon'
import { useFrames } from '@/features/frames/useFrames'

import { itemClassName } from '../itemClassName'
import NavCount from '../NavCount'

/** Opens the collection, showing how many frames are in it once that's known. */
export default function CollectionItem({ onClick }: { onClick: () => void }) {
  const { frames, isLoading, error } = useFrames()

  return (
    <button type="button" className={itemClassName} onClick={onClick}>
      <span className="relative">
        <CollectionIcon size={20} />
        {!isLoading && !error && frames.length > 0 && (
          <NavCount
            count={frames.length}
            label={
              frames.length === 1
                ? 'frame in the collection'
                : 'frames in the collection'
            }
            className="absolute -top-1 left-4"
          />
        )}
      </span>
      Collection
    </button>
  )
}
