import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { routes } from './app-routes'
import { wrapInLayout } from './layouts'
import { HomePage } from './views'
import { NotFound } from './views/not-found'

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => wrapInLayout(HomePage, 'with-dashboard-sidebar')}
      />
      {routes}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)
