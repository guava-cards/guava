import {
  ChakraProvider,
  ColorMode,
  cookieStorageManager,
} from '@chakra-ui/react'
import { Cookies, CookiesProvider } from 'react-cookie'
import React from 'react'
import { Provider as UrqlProvider } from 'urql'
import { urqlClient } from '@guava/library'
import { css, Global } from '@emotion/react'
import { AuthProvider } from '../auth/context'
import { theme } from './theme'
import { DynamicColorMode } from './theme/DynamicColorMode'
import { AppFallback } from './app-fallback'
import { Routes } from './app-routes'
import { Suspense } from './components/suspense'

interface AppProps {
  cookies?: string
  initialColorMode?: ColorMode
}

export const App: React.FC<AppProps> = ({ cookies }) => (
  <React.StrictMode>
    <CookiesProvider cookies={new Cookies(cookies)}>
      <ChakraProvider
        theme={theme}
        colorModeManager={cookieStorageManager(cookies)}
      >
        <DynamicColorMode>
          <UrqlProvider value={urqlClient}>
            <Suspense fallback={<AppFallback />}>
              <AuthProvider>
                <Routes />
              </AuthProvider>
            </Suspense>
          </UrqlProvider>
        </DynamicColorMode>
        <Global
          styles={css`
            html,
            body,
            #root {
              height: 100%;
            }
          `}
        />
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>
)
