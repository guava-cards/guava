import {
  ChakraProvider,
  ColorMode,
  cookieStorageManager,
} from '@chakra-ui/react'
import { Cookies, CookiesProvider } from 'react-cookie'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { isServerSide, persistor } from '@guava/library'
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
  const [restoringCache, setRestoringCache] = useState(!isServerSide())
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

  useEffect(() => {
    if (!isServerSide()) restoreCache()
  }, [])

  return (
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        key={pathname}
        resetKeys={[pathname]}
      >
        <Head />
        <CookiesProvider cookies={new Cookies(cookies)}>
          <ChakraProvider
            theme={theme}
            colorModeManager={cookieStorageManager(cookies)}
          >
            <DynamicColorMode>
              {restoringCache ? (
                <AppFallback />
              ) : (
                <Suspense fallback={<AppFallback />}>
                  <AuthProvider>
                    <Routes>{children}</Routes>
                  </AuthProvider>
                </Suspense>
              )}
            </DynamicColorMode>
            <GlobalStyles />
          </ChakraProvider>
        </CookiesProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}
