import {
  ChakraProvider,
  ColorMode,
  ColorModeScript,
  cookieStorageManager,
} from '@chakra-ui/react'
import { Cookies, CookiesProvider } from 'react-cookie'
import React, { Suspense } from 'react'
import { Provider as UrqlProvider } from 'urql'
import { urqlClient } from '@guava/library'
import { AuthProvider } from '../auth/context'
import { theme } from './theme'
import { DynamicColorMode } from './theme/DynamicColorMode'
import { AppFallback } from './app-fallback'
import { Router } from './router'
import { GlobalStyles } from './components/global-styles'

interface AppProps {
  cookies?: string
  initialColorMode?: ColorMode
}

export const App: React.FC<AppProps> = ({ cookies }) => (
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <CookiesProvider cookies={new Cookies(cookies)}>
      <ChakraProvider
        theme={theme}
        colorModeManager={cookieStorageManager(cookies)}
      >
        <DynamicColorMode>
          <UrqlProvider value={urqlClient}>
            <Suspense fallback={<AppFallback />}>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </Suspense>
          </UrqlProvider>
        </DynamicColorMode>
        <GlobalStyles />
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>
)
