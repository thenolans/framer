import Icon from '@/components/icons/Icon'
import type { IconProps } from '@/components/icons/types'

export default function SunIcon({ size = 16, className }: IconProps) {
  return (
    <Icon size={size} className={className}>
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 1.5 v2 M10 16.5 v2 M1.5 10 h2 M16.5 10 h2 M4 4 l1.4 1.4 M14.6 14.6 L16 16 M4 16 l1.4-1.4 M14.6 5.4 L16 4" />
    </Icon>
  )
}
