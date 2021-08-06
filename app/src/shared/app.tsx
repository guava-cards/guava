import { ChakraProvider, ColorMode } from '@chakra-ui/react'
import { Cookies, CookiesProvider } from 'react-cookie'
import React, { useMemo } from 'react'
import { Provider as UrqlProvider } from 'urql'
import { createUrqlClient } from '@guava/library'
import { useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useAuth } from 'reactfire'
import { AuthProvider } from '../auth/context'
import { theme } from './theme'
import { DynamicColorMode } from './theme/DynamicColorMode'
import { AppFallback } from './app-fallback'
import { GlobalStyles } from './components/global-styles'
import { Routes } from './app-routes'
import { Suspense } from './components/suspense'
import { Head } from './components/head'
import { ErrorFallback } from './components/error-fallback'

interface AppProps {
  cookies?: string
  initialColorMode?: ColorMode
}

export const App: React.FC<AppProps> = ({ cookies, children }) => {
  const { pathname } = useLocation()
  const auth = useAuth()

  const getNewAuthToken = async () => auth.currentUser?.getIdToken(true)
  const client = useMemo(
    () =>
      createUrqlClient({
        getNewAuthToken,
        cookies,
      }),
    [getNewAuthToken, cookies]
  )

  return (
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        key={pathname}
        resetKeys={[pathname]}
      >
        <CookiesProvider cookies={new Cookies(cookies)}>
          <ChakraProvider theme={theme}>
            <DynamicColorMode>
              <UrqlProvider value={client}>
                <Suspense fallback={<AppFallback />}>
                  <AuthProvider>
                    <Head />
                    <Routes>{children}</Routes>
                  </AuthProvider>
                </Suspense>
              </UrqlProvider>
            </DynamicColorMode>
            <GlobalStyles />
          </ChakraProvider>
        </CookiesProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}
