import type { ComponentType } from 'react'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  ScrollRestoration,
} from 'react-router'

import { paths } from '@/app/paths'
import RedirectIfSignedIn from '@/features/auth/RedirectIfSignedIn'
import RequireAuth from '@/features/auth/RequireAuth'

// A route's lazy-loaded component: the default export of the module `load` imports.
function page(load: () => Promise<{ default: ComponentType }>) {
  return { Component: async () => (await load()).default }
}

// Pages and layouts load lazily, so each route downloads only its own code. Until the first page's
// code arrives the screen stays blank.
export const router = createBrowserRouter([
  {
    // A new page opens at the top; going back returns to where that page was scrolled.
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    ),
    HydrateFallback: () => null,
    children: [
      {
        // Open to everyone; signing in adds saving to a collection.
        path: paths.calculator,
        lazy: page(() => import('@/pages/CalculatorPage')),
      },
      {
        element: <RedirectIfSignedIn to={paths.calculator} />,
        children: [
          {
            lazy: page(() => import('@/pages/AuthLayout')),
            children: [
              {
                path: paths.login,
                lazy: page(() => import('@/pages/LoginPage')),
              },
              {
                path: paths.register,
                lazy: page(() => import('@/pages/RegisterPage')),
              },
            ],
          },
        ],
      },
      {
        element: (
          <RequireAuth
            redirectTo={paths.login}
            afterSignOut={paths.calculator}
          />
        ),
        children: [
          {
            path: paths.settings,
            lazy: page(() => import('@/pages/SettingsPage')),
          },
        ],
      },
      { path: '*', element: <Navigate to={paths.calculator} replace /> },
    ],
  },
])
