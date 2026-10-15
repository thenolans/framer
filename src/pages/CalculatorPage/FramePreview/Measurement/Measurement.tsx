import { cx } from '@/lib/cx'

type MeasurementProps = {
  /** `width` runs along the frame's top edge, `height` down its left. */
  side: 'width' | 'height'
  label: string
}

/** A dimension line beside the frame, capped at both ends, with its length in the middle. */
export default function Measurement({ side, label }: MeasurementProps) {
  const isWidth = side === 'width'
  const line = cx('flex-1 bg-faint', isWidth ? 'h-px' : 'w-px')

  return (
    <div
      className={cx(
        'absolute flex items-center border-faint',
        isWidth
          ? 'inset-x-0 -top-8 h-5 border-x'
          : 'inset-y-0 -left-8 w-5 flex-col border-y',
      )}
    >
      <span className={line} />
      <span
        className={cx(
          'text-xs whitespace-nowrap text-muted tabular-nums',
          isWidth ? 'px-2' : 'py-1',
        )}
      >
        {label}
      </span>
      <span className={line} />
    </div>
  )
}
