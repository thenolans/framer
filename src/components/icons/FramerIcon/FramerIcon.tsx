import Icon from '@/components/icons/Icon'
import type { IconProps } from '@/components/icons/types'
import { cx } from '@/lib/cx'

type FramerIconProps = IconProps & {
  /** Stroke for the inner mat; the frame takes the text color. */
  matClassName?: string
}

/** The frame from the logo: a tilted frame around a mat, drawn on its own larger grid with the logo's stroke. */
export default function FramerIcon({
  size = 32,
  className,
  matClassName,
}: FramerIconProps) {
  return (
    <Icon
      size={size}
      viewBox="0 0 52 52"
      strokeWidth="3.4"
      className={className}
    >
      <g transform="rotate(-8 26 26)">
        <rect x="8" y="12" width="36" height="28" />
        <rect
          className={cx('stroke-accent-mid', matClassName)}
          strokeWidth="2.2"
          x="15"
          y="19"
          width="22"
          height="14"
        />
      </g>
    </Icon>
  )
}
