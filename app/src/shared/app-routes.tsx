import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { wrapInLayout } from './layouts'
import { HomePage } from './views'
import { NotFound } from './views/not-found'
import { routes as authRoutes } from '../auth/routes'
import { routes as decksRoutes } from '../decks/routes'
import { ProtectedRoute } from './components/protected-route'
import { AppFallback } from './app-fallback'

export const routes = [...authRoutes, ...decksRoutes].map(route => {
  const FallbackComponent = route.Component ? route.Component : null
  const Component = route.importComponent
    ? lazy(async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const component = await route.importComponent!()
        return { default: component }
      })
    : FallbackComponent
  if (!Component) return null

  const page = wrapInLayout(
    Component,
    route.layout ?? 'without-navigation',
    route.layoutProps
  )

  return (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      sensitive={route.sensitive}
    >
      <Suspense fallback={<AppFallback />}>{page}</Suspense>
    </Route>
  )
})

export const AppRoutes: React.FC = () => (
  <Switch>
    <ProtectedRoute
      exact
      path="/"
      render={() => wrapInLayout(HomePage, 'with-dashboard-sidebar')}
    />
    {routes}
    <Route component={NotFound} />
  </Switch>
)
