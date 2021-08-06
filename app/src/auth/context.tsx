/* eslint-disable no-underscore-dangle */
import React, { createContext, useContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
  MeFragment,
  useViewerQuery,
  AuthenticationError,
  env,
} from '@guava/library'
import { AppFallback } from '~/shared/app-fallback'

export interface AuthContextValue {
  csrfToken: string
  viewer?: MeFragment
  initializing?: boolean
  setViewer: (viewer: MeFragment) => void
  setCsrfToken: (token: string) => void
}

export const AuthContext = createContext({} as AuthContextValue)

export const AuthProvider: React.FC = ({ children }) => {
  const { data, loading } = useViewerQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })
  const [cookies, setCookie] = useCookies(['_authenticated', 'csrf'])
  const csrfToken = decodeURIComponent(cookies.csrf)
  const [viewer, setViewer] = useState(() => data?.viewer)

  return (
    <AuthContext.Provider
      value={{
        csrfToken,
        viewer,
        setCsrfToken: token => {
          setCookie('csrf', encodeURIComponent(token), {
            path: '/',
            sameSite: 'strict',
            secure: !env.DEV,
          })
        },
        setViewer,
        initializing: loading,
      }}
    >
      {loading ? <AppFallback /> : children}
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
