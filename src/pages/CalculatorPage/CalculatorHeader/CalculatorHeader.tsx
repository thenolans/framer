import Logo from '@/components/ui/Logo'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import ThemeToggle from '@/features/theme/ThemeToggle'

import AccountButton from './AccountButton'
import ConnectionStatus from './ConnectionStatus'

/**
 * The logo and whether the app is offline, with the account once signed in, or a light/dark toggle
 * until then.
 */
export default function CalculatorHeader() {
  const { user, isLoading } = useCurrentUser()

  return (
    <header className="flex items-center justify-between gap-4 px-4 pt-6 sm:px-8">
      <div className="flex items-center gap-2">
        <Logo />
        <ConnectionStatus />
      </div>
      {/* Signed in, the theme is picked in settings. */}
      {user ? <AccountButton /> : !isLoading && <ThemeToggle />}
    </header>
  )
}
