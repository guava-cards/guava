/* eslint-disable no-underscore-dangle */
import React, { createContext } from 'react'
import { useCookies } from 'react-cookie'
import { MeFragment, useViewerQuery } from '@guava/library'

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

export function useCurrentUser() {}
