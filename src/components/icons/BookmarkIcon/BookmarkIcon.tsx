import Icon from '@/components/icons/Icon'
import type { IconProps } from '@/components/icons/types'

export default function BookmarkIcon({ size = 16, className }: IconProps) {
  return (
    <Icon size={size} className={className}>
      <path d="M5 2.5 H15 V17.5 L10 14 L5 17.5 Z" />
    </Icon>
  )
}
