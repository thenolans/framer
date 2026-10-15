import type { ComponentType } from 'react'

import AvocadoIcon from './AvocadoIcon'
import JotIcon from './JotIcon'
import TomeOfScoringIcon from './TomeOfScoringIcon'

export type AppBrand = {
  /** The app's main color: its icon and name. */
  color: string
  /** The tint behind its icon. */
  soft: string
  /** The second color in its icon and the dot after its name. */
  mid: string
}

export type OtherApp = {
  name: string
  description: string
  href: string
  Icon: ComponentType<{ className?: string; detailClassName?: string }>
  /**
   * The app's own colors, kept here rather than in the tokens since nothing else in Framer
   * should use them. Each holds a CSS color, with `light-dark()` where it changes with the theme.
   */
  brand: AppBrand
}

export const otherApps: OtherApp[] = [
  {
    name: 'avocado',
    description: 'Recipes & meal planning',
    href: 'https://avocado.thenolans.io',
    Icon: AvocadoIcon,
    brand: {
      color: 'light-dark(#2c6349, #8cc0a8)',
      soft: 'light-dark(#dfeee6, #22503b)',
      mid: '#5fa381',
    },
  },
  {
    name: 'jot',
    description: 'Notes & folders',
    href: 'https://jot.thenolans.io',
    Icon: JotIcon,
    brand: {
      color: 'light-dark(#5b3fa0, #b79bea)',
      soft: 'light-dark(#e8e3f5, #2e2645)',
      mid: '#8a6fd1',
    },
  },
  {
    name: 'tome of scoring',
    description: 'Board game scorekeeping',
    href: 'https://tos.thenolans.io',
    Icon: TomeOfScoringIcon,
    brand: {
      color: 'light-dark(#8f4a14, #eaa855)',
      soft: 'light-dark(#fae3c7, #703b14)',
      mid: '#dc8830',
    },
  },
]
