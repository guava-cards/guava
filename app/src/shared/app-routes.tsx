import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { lazy } from '@loadable/component'
import { wrapInLayout } from './layouts'
import { HomePage } from './views'
import { NotFound } from './views/not-found'
import { routes as authRoutes } from '../auth/routes'
import { Suspense } from './components/suspense'
import { ProtectedRoute } from './components/protected-route'

export const routes = [...authRoutes].map(route => {
  const FallbackComponent = route.Component ? route.Component : null
  const Component = route.importComponent
    ? lazy(route.importComponent)
    : FallbackComponent
  if (!Component) return null

  return (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      sensitive={route.sensitive}
    >
      <Suspense fallback={<div>Loading.....</div>}>
        <Component />
      </Suspense>
    </Route>
  )
})

export const Routes: React.FC = ({ children }) => (
  <Switch>
    {children}
    <ProtectedRoute
      exact
      path="/"
      render={() => wrapInLayout(HomePage, 'with-dashboard-sidebar')}
    />
    {routes}
    <Route component={NotFound} />
  </Switch>
)
