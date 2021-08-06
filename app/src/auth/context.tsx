/* eslint-disable no-underscore-dangle */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { useCookies } from 'react-cookie'
import { MeFragment, useViewerQuery, AuthenticationError } from '@guava/library'
import { useAuth as useFirebaseAuth } from 'reactfire'
import type firebase from 'firebase'

export interface AuthContextValue {
  idToken?: string
  viewer?: MeFragment
  setViewer: (viewer: MeFragment) => void
}

export const AuthContext = createContext({} as AuthContextValue)

export const AuthProvider: React.FC = ({ children }) => {
  const firebaseAuth = useFirebaseAuth()
  const [{ data }, refetch] = useViewerQuery({
    requestPolicy: 'network-only',
  })
  const [{ idToken }, setCookie, removeCookie] = useCookies(['idToken'])
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

  return (
    <AuthContext.Provider
      value={{
        idToken,
        viewer,
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
