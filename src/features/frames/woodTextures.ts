import oak from '@/assets/images/oak.png'
import pine from '@/assets/images/pine.png'
import walnut from '@/assets/images/walnut.png'

import type { Wood } from './types'

/** Each wood's grain, drawn as the frame's background. */
export const woodTextures: Record<Wood, string> = { pine, oak, walnut }

export const woodLabels: Record<Wood, string> = {
  pine: 'Pine',
  oak: 'Oak',
  walnut: 'Walnut',
}
