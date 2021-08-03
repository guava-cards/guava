import 'cross-fetch/polyfill'
import React from 'react'
import crypto from 'crypto'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderToStringAsync } from 'react-async-ssr'
import { html } from 'vite-plugin-ssr'
import { urqlSsr } from '@guava/library'
import ssrPrepass from 'react-ssr-prepass'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { Helmet } from 'react-helmet'
import Cookies from 'universal-cookie'
import { ColorModeScript } from '@chakra-ui/react'

export { render }
export { passToClient }

const passToClient = ['pageProps']

async function render(pageContext) {
  const { Page, pageProps, url, headers } = pageContext

  const key = 'gc'
  const cache = createCache({ key })

  const element = (
    <CacheProvider value={cache}>
      <StaticRouter location={url}>
        <Page {...pageProps} />
      </StaticRouter>
    </CacheProvider>
  )

  await ssrPrepass(element)

  const data = JSON.stringify(urqlSsr.extractData())
  await renderToStringAsync(element)

  const helmet = Helmet.renderStatic()
  const cookies = new Cookies(headers.cookie)

  const createNonce = () => crypto.randomBytes(16).toString('base64')

  const colorMode = cookies.get('chakra-ui-color-mode') ?? 'light'
  const colorModeScriptHtml = renderToString(
    <ColorModeScript
      initialColorMode={cookies.get('chakra-ui-color-mode')}
      nonce={createNonce()}
    />
  )

  return html`
    <!DOCTYPE html>
    <html
      ${helmet.htmlAttributes.toString()}
      style="--chakra-ui-color-mode: ${colorMode}"
      lang="en"
    >
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${html.dangerouslySkipEscape(`
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        `)}
      </head>
      <body class="chakra-ui-${colorMode}" ${helmet.bodyAttributes.toString()}>
        ${html.dangerouslySkipEscape(colorModeScriptHtml)}
        <div id="root"></div>
        <script nonce="${createNonce()}">
          window.__URQL_DATA__ = ${html.dangerouslySkipEscape(data)}
          window.__APP_DATA__ = {
            csrf: ${cookies.get('csrf_token')
              ? `"${cookies.get('csrf_token')}"`
              : 'undefined'},
            colorMode: '${cookies.get('chakra-ui-color-mode')}',
          }
        </script>
      </body>
    </html>
  `
}
