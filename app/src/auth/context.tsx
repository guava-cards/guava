/* eslint-disable no-underscore-dangle */
import React, { createContext, useContext } from 'react'
import { useCookies } from 'react-cookie'
import { MeFragment, useViewerQuery, AuthenticationError } from '@guava/library'

export interface AuthContextValue {
  csrfToken: string
  viewer?: MeFragment
}

export const AuthContext = createContext({} as AuthContextValue)

export const AuthProvider: React.FC = ({ children }) => {
  const [{ data }] = useViewerQuery()
  const [cookies] = useCookies(['_authenticated', 'csrf-token'])
  const csrfToken = cookies.csrf_token
  const viewer = data?.viewer

  return (
    <AuthContext.Provider
      value={{
        csrfToken,
        viewer,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
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
