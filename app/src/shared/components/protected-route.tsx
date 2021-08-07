import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAuth } from '~/auth/context'

export interface ProtectedRouteProps extends RouteProps {
  redirect?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirect = '/auth/login',
  component: Component,
  children,
  render,
  ...props
}) => {
  const { viewer } = useAuth()
  const isAuthenticated = !!viewer

  const renderRoute = (childProps: unknown) => {
    if (Component) return <Component {...(props as never)} />
    if (render) return render(childProps as never)
    return children
  }

  return (
    <Route {...props}>
      {componentProps =>
        isAuthenticated ? (
          renderRoute(componentProps)
        ) : (
          <Redirect to={redirect} />
        )
      }
    </Route>
  )
}
