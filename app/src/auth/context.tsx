/* eslint-disable no-underscore-dangle */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { useCookies } from 'react-cookie'
import { useAuth as useFirebaseAuth } from 'reactfire'
import type firebase from 'firebase'
import { MeFragment, useViewerQuery, AuthenticationError } from '@guava/library'
import { AppFallback } from '~/shared/app-fallback'

export interface AuthContextValue {
  idToken?: string
  viewer?: MeFragment
  initializing?: boolean
  setViewer: (viewer: MeFragment) => void
}

export const AuthContext = createContext({} as AuthContextValue)

export const AuthProvider: React.FC = ({ children }) => {
  const firebaseAuth = useFirebaseAuth()
  const [{ idToken }, setCookie, removeCookie] = useCookies(['idToken'])
  const { data, loading, refetch } = useViewerQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  })
  const [viewer, setViewer] = useState(() => data?.viewer)

  const setIdToken = useCallback(
    async (user: firebase.User | null) => {
      const newToken = await user?.getIdToken(true)
      if (newToken) {
        setCookie('idToken', newToken, { path: '/', sameSite: 'strict' })
      } else {
        removeCookie('idToken')
      }

      refetch()
    },
    [setCookie, refetch, removeCookie]
  )

  useEffect(
    () => firebaseAuth.onIdTokenChanged(setIdToken),
    [firebaseAuth, setIdToken]
  )

  useEffect(() => {
    setViewer(data?.viewer)
  }, [data])

  const initializing = loading && !viewer

  return (
    <AuthContext.Provider
      value={{
        idToken,
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
