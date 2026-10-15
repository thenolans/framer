import Skeleton from '@/components/ui/Skeleton'

/** Stands in for a `SavedFrameRow` while the collection loads. */
export default function SavedFrameSkeleton() {
  return (
    <div className="flex min-h-20 items-center gap-4 rounded-sm bg-paper p-2">
      <Skeleton shape="block" className="ml-1 size-14 rounded-xs" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}
