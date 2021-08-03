import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { lazy } from '@loadable/component'
import { ErrorBoundary } from 'react-error-boundary'
import { wrapInLayout } from './layouts'
import { HomePage } from './views'
import { NotFound } from './views/not-found'
import { routes as authRoutes } from '../auth/routes'
import { Suspense } from './components/suspense'
import { ErrorFallback } from './components/error-fallback'

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

export const Routes = () => {
  const { pathname } = useLocation()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} key={pathname}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => wrapInLayout(HomePage, 'with-dashboard-sidebar')}
        />
        {routes}
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  )
}
