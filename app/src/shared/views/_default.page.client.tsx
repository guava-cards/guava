import createCache from '@emotion/cache'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { getPage } from 'vite-plugin-ssr/client'
import { createApolloClient } from '@guava/library'
import { AppProviders } from '../app-providers'

async function hydrate() {
  const pageContext = await getPage()
  const { Page } = pageContext
  const cache = createCache({ key: 'gc' })
  const client = createApolloClient({
    getAuthToken: async () => {
      const firebase = await import('../firebase').then(mod => mod.firebase)
      const idToken = await firebase.auth().currentUser?.getIdToken(true)
      return idToken
    },
  })

  ReactDOM.render(
    <AppProviders cache={cache}>
      <ApolloProvider client={client}>
        <Page {...pageContext.pageProps} />
      </ApolloProvider>
    </AppProviders>,
    document.getElementById('root')
  )
}

hydrate()
