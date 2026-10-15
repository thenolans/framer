import MoonIcon from '@/components/icons/MoonIcon'
import SunIcon from '@/components/icons/SunIcon'
import IconButton from '@/components/ui/IconButton'

import { useTheme } from '../useTheme'
import { useSystemPrefersDark } from './useSystemPrefersDark'

type ThemeToggleProps = {
  className?: string
}

/**
 * A button that switches between light and dark, for screens without settings. Starting from
 * `auto`, it switches away from whichever the OS shows; the choice is remembered on this device.
 */
export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useTheme()
  const systemPrefersDark = useSystemPrefersDark()
  const isDark = theme === 'dark' || (theme === 'auto' && systemPrefersDark)

  return (
    <IconButton
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={className}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}
