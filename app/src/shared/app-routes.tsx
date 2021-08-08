import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component'
import { wrapInLayout } from './layouts'
import { HomePage } from './views'
import { NotFound } from './views/not-found'
import { routes as authRoutes } from '../auth/routes'
import { routes as decksRoutes } from '../decks/routes'
import { ProtectedRoute } from './components/protected-route'
import { Suspense } from './components/suspense'

export const routes = [...authRoutes, ...decksRoutes].map(route => {
  const FallbackComponent = route.Component ? route.Component : null
  const Component = route.importComponent
    ? loadable(route.importComponent)
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
      {page}
    </Route>
  )
})

export const Routes: React.FC = () => (
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
