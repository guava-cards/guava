import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Redirect, useLocation } from 'react-router-dom'
import { AuthenticationError, NotFoundError } from '@guava/library'
import { NotFound } from '../views/not-found'
import { paths } from '../paths'

const isDev = process.env.NODE_ENV === 'development'

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { pathname: currentLocation } = useLocation()

  if (error instanceof AuthenticationError) {
    const redirectTo = error.redirectTo ?? paths.auth.login()

    return (
      <Redirect
        to={{
          pathname: redirectTo,
          state: {
            from: currentLocation,
          },
        }}
      />
    )
  }

  if (error instanceof NotFoundError) {
    return <NotFound />
  }

  if (isDev) {
    // eslint-disable-next-line no-console
    console.warn(error)

    return (
      <>
        <h1>Error</h1>
        <h2>{error.name}</h2>
        <p>{error.message}</p>
        <p>{error.stack}</p>
        <button onClick={() => resetErrorBoundary()} type="button">
          Reset Boundary
        </button>
      </>
    )
  }

  return (
    <div>
      <h1>An error has ocurred</h1>
      <button onClick={() => resetErrorBoundary()} type="button">
        Reset Boundary
      </button>
    </div>
  )
}
