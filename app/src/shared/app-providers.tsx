import { CacheProvider, EmotionCache } from '@emotion/react'
import React from 'react'
import {
  BrowserRouter,
  BrowserRouterProps,
  StaticRouter,
  StaticRouterProps,
} from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'
import 'firebase/auth'
import { isServerSide } from '~/../../library/src'

interface AppProvidersProps {
  cache: EmotionCache
  url?: string
}

const firebaseConfig = {
  apiKey: 'AIzaSyC6_1QDwi-ISMZsWG2zsEGd2nCyy1t2BUI',
  authDomain: 'guava-cards.firebaseapp.com',
  projectId: 'guava-cards',
  storageBucket: 'guava-cards.appspot.com',
  messagingSenderId: '470799796122',
  appId: '1:470799796122:web:0250e0eab8ab6080c3dc23',
  measurementId: 'G-L1FQL3700T',
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
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          {children}
        </FirebaseAppProvider>
      </RouterComponent>
    </CacheProvider>
  )
}
