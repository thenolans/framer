import Icon from '@/components/icons/Icon'
import type { IconProps } from '@/components/icons/types'

/** A stack, for the saved frames. */
export default function CollectionIcon({ size = 16, className }: IconProps) {
  return (
    <Icon size={size} className={className}>
      <rect x="2.5" y="6.5" width="15" height="11" rx="2" />
      <path d="M5 3.5 H15" />
    </Icon>
  )
}
