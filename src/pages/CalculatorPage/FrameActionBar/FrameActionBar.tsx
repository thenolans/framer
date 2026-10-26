import BookmarkIcon from '@/components/icons/BookmarkIcon'

import CollectionItem from './CollectionItem'
import { itemClassName } from './itemClassName'

type FrameActionBarProps = {
  onOpenCollection: () => void
  onSave: () => void
}

/**
 * The collection and saving on narrow screens once signed in, in a bar along the bottom edge
 * (Avocado's tab bar) so they stay in reach while the page scrolls. The form carries the same on
 * wide screens.
 */
export default function FrameActionBar({
  onOpenCollection,
  onSave,
}: FrameActionBarProps) {
  return (
    <nav
      aria-label="Frame actions"
      className="fixed inset-x-0 bottom-0 z-20 flex h-(--tab-bar-height) items-center justify-around border-t border-border bg-bar px-2 pb-safe-area backdrop-blur-sm md:hidden"
    >
      <CollectionItem onClick={onOpenCollection} />
      <button type="button" className={itemClassName} onClick={onSave}>
        <BookmarkIcon size={20} />
        Save
      </button>
    </nav>
  )
}
