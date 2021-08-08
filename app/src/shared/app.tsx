import { ChakraProvider } from '@chakra-ui/react'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { createApolloClient, persistor } from '@guava/library'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from '../auth/context'
import { theme } from './theme'
import { DynamicColorMode } from './theme/DynamicColorMode'
import { AppFallback } from './app-fallback'
import { GlobalStyles } from './components/global-styles'
import { AppRoutes } from './app-routes'
import { Head } from './components/head'
import { ErrorFallback } from './components/error-fallback'
import { Delayed } from './components/delayed'
import { firebaseAuth } from './firebase'

export const App: React.FC = () => {
  const { pathname } = useLocation()
  const [restoringCache, setRestoringCache] = useState(true)

  const restoreCache = async () => {
    setRestoringCache(true)

    try {
      await persistor.restore()
      console.log('[persistor] cache restored')
    } catch (error) {
      console.log('[persistor] failed to restore cache')
    } finally {
      setRestoringCache(false)
    }
  }

  const client = useMemo(() => {
    const getAuthToken = async () => {
      if (!firebaseAuth.currentUser) return null
      return firebaseAuth.currentUser.getIdToken()
    }

    return createApolloClient({ getAuthToken })
  }, [])

  useEffect(() => {
    restoreCache()
  }, [])

  return (
    <ApolloProvider client={client}>
      <Head />
      <ChakraProvider theme={theme}>
        <DynamicColorMode>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            key={pathname}
            resetKeys={[pathname]}
          >
            <Suspense fallback={<AppFallback />}>
              <AuthProvider>
                {restoringCache ? (
                  <Delayed>
                    <AppFallback />
                  </Delayed>
                ) : (
                  <AppRoutes />
                )}
              </AuthProvider>
            </Suspense>
          </ErrorBoundary>
        </DynamicColorMode>
        <GlobalStyles />
      </ChakraProvider>
    </ApolloProvider>
  )
}
