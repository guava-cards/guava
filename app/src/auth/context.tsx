/* eslint-disable no-underscore-dangle */
import React, { createContext, useContext, useState, useEffect } from 'react'
import { MeFragment, useViewerQuery, AuthenticationError } from '@guava/library'
import { AppFallback } from '~/shared/app-fallback'

export interface AuthContextValue {
  viewer?: MeFragment
  initializing?: boolean
  setViewer: (viewer: MeFragment) => void
}

export const AuthContext = createContext({} as AuthContextValue)

export const AuthProvider: React.FC = ({ children }) => {
  const { data, loading } = useViewerQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })
  const [viewer, setViewer] = useState(() => data?.viewer)

  useEffect(() => {
    setViewer(data?.viewer)
  }, [data])

  const initializing = loading && !viewer

  return (
    <AuthContext.Provider
      value={{
        viewer,
        setViewer,
        initializing,
      }}
    >
      {initializing ? <AppFallback /> : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export function useIsAuthenticated() {
  const { viewer, initializing } = useAuth()
  return !!viewer && !initializing
}

interface UseAuthenticatedViewerConfig {
  unauthenticatedRedirectTo?: string
}

export function useAuthenticatedViewer({
  unauthenticatedRedirectTo,
}: UseAuthenticatedViewerConfig = {}) {
  const { viewer } = useAuth()
  const isAuthenticated = useIsAuthenticated()
  if (!isAuthenticated || !viewer) {
    throw new AuthenticationError(undefined, unauthenticatedRedirectTo)
  }

  return viewer
}

export function useAuthenticatedResource(
  config?: UseAuthenticatedViewerConfig
) {
  useAuthenticatedViewer(config)
}
