/* eslint-disable no-underscore-dangle */
import React, { createContext, useContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import { MeFragment, useViewerQuery, AuthenticationError } from '@guava/library'

export interface AuthContextValue {
  csrfToken: string
  viewer?: MeFragment
  setViewer: (viewer: MeFragment) => void
  setCsrfToken: (token: string) => void
}

export const AuthContext = createContext({} as AuthContextValue)

export const AuthProvider: React.FC = ({ children }) => {
  const [{ data }] = useViewerQuery({
    requestPolicy: 'network-only',
  })
  const [cookies, setCookie] = useCookies(['_authenticated', 'csrf_token'])
  const csrfToken = cookies.csrf_token
  const [viewer, setViewer] = useState(() => data?.viewer)

  return (
    <AuthContext.Provider
      value={{
        csrfToken,
        viewer,
        setCsrfToken: token => setCookie('csrf_token', token),
        setViewer,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export function useIsAuthenticated() {
  const { viewer } = useAuth()
  return !!viewer
}

interface UseAuthenticatedViewerConfig {
  unauthenticatedRedirectTo?: string
}

export function useAuthenticatedViewer({
  unauthenticatedRedirectTo,
}: UseAuthenticatedViewerConfig = {}) {
  const { viewer } = useAuth()
  if (!viewer) {
    throw new AuthenticationError(undefined, unauthenticatedRedirectTo)
  }

  return viewer
}

export function useAuthenticatedResource(
  config?: UseAuthenticatedViewerConfig
) {
  useAuthenticatedViewer(config)
}
