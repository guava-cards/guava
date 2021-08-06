import { CacheProvider, EmotionCache } from '@emotion/react'
import React from 'react'
import {
  BrowserRouter,
  BrowserRouterProps,
  StaticRouter,
  StaticRouterProps,
} from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'
import { firebase } from './firebase'
import { isServerSide } from '~/../../library/src'

interface AppProvidersProps {
  cache: EmotionCache
  url?: string
}

export const AppProviders: React.FC<AppProvidersProps> = ({
  cache,
  url,
  children,
}) => {
  const RouterComponent: React.ComponentType<
    StaticRouterProps | BrowserRouterProps
  > = isServerSide() ? StaticRouter : BrowserRouter

  return (
    <CacheProvider value={cache}>
      <RouterComponent location={url}>
        <FirebaseAppProvider firebaseApp={firebase.app()}>
          {children}
        </FirebaseAppProvider>
      </RouterComponent>
    </CacheProvider>
  )
}
