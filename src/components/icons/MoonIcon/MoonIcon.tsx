import Icon from '@/components/icons/Icon'
import type { IconProps } from '@/components/icons/types'

export default function MoonIcon({ size = 16, className }: IconProps) {
  return (
    <Icon size={size} className={className}>
      <path d="M10 2.5 a5 5 0 0 0 7.5 7.5 a7.5 7.5 0 1 1 -7.5-7.5 z" />
    </Icon>
  )
}
