import 'cross-fetch/polyfill'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToStringAsync } from 'react-async-ssr'
import { html } from 'vite-plugin-ssr'
import { urqlSsr } from '@guava/library'
import ssrPrepass from 'react-ssr-prepass'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

export { render }
export { passToClient }

const passToClient = ['pageProps']

async function render(pageContext) {
  const { Page, pageProps, url } = pageContext

  const key = 'gc'
  const cache = createCache({ key })
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache)

  const element = (
    <CacheProvider value={cache}>
      <StaticRouter location={url}>
        <Page {...pageProps} />
      </StaticRouter>
    </CacheProvider>
  )

  await ssrPrepass(element)

  const data = JSON.stringify(urqlSsr.extractData())
  const { html: pageHtml, styles } = extractCriticalToChunks(
    await renderToStringAsync(element, { fallbackFast: true })
  )

  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
        ${html.dangerouslySkipEscape(
          constructStyleTagsFromChunks({
            html: pageHtml,
            styles,
          })
        )}
      </head>
      <body>
        <div id="root">${html.dangerouslySkipEscape(pageHtml)}</div>
        <script>
          window.__URQL_DATA__ = ${html.dangerouslySkipEscape(data)}
        </script>
      </body>
    </html>
  `
}
