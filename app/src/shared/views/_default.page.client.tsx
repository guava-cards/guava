import createCache from '@emotion/cache'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { getPage } from 'vite-plugin-ssr/client'
import { createApolloClient } from '@guava/library'
import { AppProviders } from '../app-providers'
import { firebase } from '../firebase'

async function hydrate() {
  const pageContext = await getPage()
  const { Page } = pageContext
  const cache = createCache({ key: 'gc' })
  const client = createApolloClient({
    getAuthToken: async () => {
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
