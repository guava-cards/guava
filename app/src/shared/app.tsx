import { ChakraProvider, ColorMode } from '@chakra-ui/react'
import { Cookies, CookiesProvider } from 'react-cookie'
import React from 'react'
import { Provider as UrqlProvider } from 'urql'
import { urqlClient } from '@guava/library'
import { AuthProvider } from '../auth/context'
import { theme } from './theme'
import { DynamicColorMode } from './theme/DynamicColorMode'
import { AppFallback } from './app-fallback'
import { GlobalStyles } from './components/global-styles'
import { Routes } from './app-routes'
import { Suspense } from './components/suspense'
import { Head } from './components/head'

interface AppProps {
  cookies?: string
  initialColorMode?: ColorMode
}

export const App: React.FC<AppProps> = ({ cookies }) => (
  <React.StrictMode>
    <CookiesProvider cookies={new Cookies(cookies)}>
      <ChakraProvider theme={theme}>
        <DynamicColorMode>
          <UrqlProvider value={urqlClient}>
            <Suspense fallback={<AppFallback />}>
              <AuthProvider>
                <Head />
                <Routes />
              </AuthProvider>
            </Suspense>
          </UrqlProvider>
        </DynamicColorMode>
        <GlobalStyles />
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>
)
