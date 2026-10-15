import Button from '@/components/ui/Button'
import { useFrames } from '@/features/frames/useFrames'

/** Opens the collection, showing how many frames are in it once that's known. */
export default function CollectionButton({ onClick }: { onClick: () => void }) {
  const { frames, isLoading, error } = useFrames()

  return (
    <Button variant="secondary" onClick={onClick} className="flex-none">
      Collection
      {!isLoading && !error && (
        <span className="text-muted tabular-nums">· {frames.length}</span>
      )}
    </Button>
  )
}
