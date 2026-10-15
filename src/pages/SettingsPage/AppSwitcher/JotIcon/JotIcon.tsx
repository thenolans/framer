import Icon from '@/components/icons/Icon'
import type { IconProps } from '@/components/icons/types'

type JotIconProps = IconProps & {
  /** A text color class for the note's lines; the page takes the text color. */
  detailClassName?: string
}

/** Jot's logo: a tilted note with a folded corner. */
export default function JotIcon({
  size = 20,
  className,
  detailClassName,
}: JotIconProps) {
  return (
    <Icon
      size={size}
      viewBox="0 0 52 52"
      strokeWidth="4.2"
      className={className}
    >
      <g transform="rotate(-8 26 26)">
        <path d="M10 10 h32 v24 l-8 8 h-24 Z" />
        <path d="M42 34 h-8 v8 Z" fill="currentColor" />
        <path className={detailClassName} d="M17 20 h18 M17 28 h12" />
      </g>
    </Icon>
  )
}
