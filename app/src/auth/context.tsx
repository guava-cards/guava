/* eslint-disable no-underscore-dangle */
import React, { createContext, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import { useViewerQuery } from '@guava/library'

export interface AuthContextValue {
  csrfToken: string
  authenticated: boolean
}

export const AuthContext = createContext({} as AuthContextValue)

export const AuthProvider: React.FC = ({ children }) => {
  const [data] = useViewerQuery({
    context: useMemo(() => ({ suspense: true }), []),
  })
  const [cookies] = useCookies(['_authenticated', 'csrf-token'])
  const csrfToken = cookies.csrf_token
  const isAuthenticated = cookies._authenticated?.toString() === 'true'

  return (
    <AuthContext.Provider
      value={{
        csrfToken,
        authenticated: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
