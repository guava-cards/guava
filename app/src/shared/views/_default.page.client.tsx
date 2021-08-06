import { ApolloProvider } from '@apollo/client'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { getPage } from 'vite-plugin-ssr/client'
import { createApolloClient } from '@guava/library'

async function hydrate() {
  const pageContext = await getPage()
  const { Page } = pageContext
  const cache = createCache({ key: 'gc' })
  const client = createApolloClient()

  ReactDOM.render(
    <ApolloProvider client={client}>
      <CacheProvider value={cache}>
        <BrowserRouter>
          <Page {...pageContext.pageProps} />
        </BrowserRouter>
      </CacheProvider>
    </ApolloProvider>,
    document.getElementById('root')
  )
}

hydrate()
