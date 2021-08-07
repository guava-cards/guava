import createCache from '@emotion/cache'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { App } from './shared/app'
import { AppProviders } from './shared/app-providers'
import { createApolloClient } from '../../library/src'

const cache = createCache({ key: 'gc' })
const client = createApolloClient({
  getAuthToken: async () => {
    const firebase = await import('./shared/firebase').then(mod => mod.firebase)
    const idToken = await firebase.auth().currentUser?.getIdToken(true)
    return idToken
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppProviders cache={cache}>
      <App cookies={document.cookie} />
    </AppProviders>
  </ApolloProvider>,
  document.getElementById('root')
)
