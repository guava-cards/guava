import createCache from '@emotion/cache'
import React from 'react'
import ReactDOM from 'react-dom'
import { getPage } from 'vite-plugin-ssr/client'
import { AppProviders } from '../app-providers'

async function hydrate() {
  const pageContext = await getPage()
  const { Page } = pageContext
  const cache = createCache({ key: 'gc' })

  ReactDOM.render(
    <AppProviders cache={cache}>
      <Page {...pageContext.pageProps} />
    </AppProviders>,
    document.getElementById('root')
  )
}

hydrate()
