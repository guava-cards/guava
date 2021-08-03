import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { getPage } from 'vite-plugin-ssr/client'

async function hydrate() {
  const pageContext = await getPage()
  const { Page } = pageContext
  const cache = createCache({ key: 'gc' })

  ReactDOM.render(
    <CacheProvider value={cache}>
      <BrowserRouter>
        <Page {...pageContext.pageProps} />
      </BrowserRouter>
    </CacheProvider>,
    document.getElementById('root')
  )
}

hydrate()
