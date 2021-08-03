import React, { Suspense } from 'react'
import { lazy } from '@loadable/component'
import { Route } from 'react-router-dom'
import { routes as authRoutes } from '../auth/routes'

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
