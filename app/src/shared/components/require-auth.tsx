import React from 'react'
import { MeFragment } from '@guava/library'
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithFallback,
  FallbackProps,
} from 'react-error-boundary'
import { useLocation } from 'react-router-dom'
import { useAuthenticatedViewer } from '~/auth/context'

export interface RequireCurrentUserChildRenderProps {
  viewer: MeFragment
}

export interface RequireCurrentUserProps {
  CustomErrorFallback?: React.ComponentType<FallbackProps>
  fallbackRender?: ErrorBoundaryPropsWithFallback['fallbackRender']
  unauthenticatedRedirectTo?: string
  children?:
    | React.ReactNode
    | ((props: RequireCurrentUserChildRenderProps) => React.ReactChild)
}

export const RequireCurrentUser = ({
  CustomErrorFallback,
  unauthenticatedRedirectTo,
  children,
  fallbackRender,
}: RequireCurrentUserProps): JSX.Element => {
  const location = useLocation()
  const Content = (): JSX.Element => {
    const viewer = useAuthenticatedViewer({ unauthenticatedRedirectTo })
    return typeof children === 'function' ? children({ viewer }) : children
  }

  if (CustomErrorFallback) {
    return (
      <ErrorBoundary
        key={location.pathname}
        FallbackComponent={CustomErrorFallback}
        fallbackRender={fallbackRender}
      >
        <Content />
      </ErrorBoundary>
    )
  }

  return <Content />
}
