import 'cross-fetch/polyfill'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { renderToStringAsync } from 'react-async-ssr'
import { html } from 'vite-plugin-ssr'
import {
  AuthenticationError,
  createApolloClient,
  DomainError,
  NotFoundError,
} from '@guava/library'
import ssrPrepass from 'react-ssr-prepass'
import createCache from '@emotion/cache'
import superjson from 'superjson'
import { Helmet } from 'react-helmet'
import Cookies from 'universal-cookie'
import { ColorModeScript } from '@chakra-ui/react'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ApolloProvider } from '@apollo/client'
import createEmotionServer from '@emotion/server/create-instance'
import { PageContext } from '../typings/ssr'
import { errorRedirects } from '../utils/error-redirects'
import { AppProviders } from '../app-providers'
import { theme } from '../theme'

export { render }
export { passToClient }

const passToClient = ['pageProps']

superjson.registerClass(AuthenticationError)
superjson.registerClass(NotFoundError)
superjson.registerClass(DomainError)
superjson.registerClass(Error)

async function render(pageContext: PageContext) {
  const { Page, pageProps = {}, url, headers, _err: error } = pageContext

  const key = 'gc'
  const cache = createCache({ key })
  const emotion = createEmotionServer(cache)

  const redirect = error && errorRedirects(error)
  if (redirect) {
    return { redirectTo: redirect }
  }

  pageProps.error = error ? superjson.stringify(error) : null
  pageProps.cookies = headers.cookie

  const cookies = new Cookies(headers.cookie)
  const client = createApolloClient({
    getAuthToken: () => Promise.resolve(cookies.get('idToken')),
  })

  const element = (
    <AppProviders url={url} cache={cache}>
      <ApolloProvider client={client}>
        <Page {...pageProps} />
      </ApolloProvider>
    </AppProviders>
  )

  await ssrPrepass(element)
  const contentHtml = await renderToStringAsync(element)
  await getDataFromTree(element)

  const helmet = Helmet.renderStatic()
  const initialState = JSON.stringify(client.extract())

  const colorMode = cookies.get('chakra-ui-color-mode') ?? 'light'
  const colorModeScriptHtml = renderToStaticMarkup(
    <ColorModeScript initialColorMode={cookies.get('chakra-ui-color-mode')} />
  )
  const chunks = emotion.extractCriticalToChunks(contentHtml)

  return html`
    <!DOCTYPE html>
    <html
      ${helmet.htmlAttributes.toString()}
      data-color-mode="${colorMode}"
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
        `)} ${html.dangerouslySkipEscape(
          emotion.constructStyleTagsFromChunks(chunks)
        )}
        <style>
          html[data-color-mode='dark'] {
            background-color: ${theme.colors.modes.dark.background[500]};
          }
        </style>
      </head>
      <body class="chakra-ui-${colorMode}" ${helmet.bodyAttributes.toString()}>
        ${html.dangerouslySkipEscape(colorModeScriptHtml)}
        <div id="root"></div>
        <script>
          window.__APOLLO_STATE__ = ${html.dangerouslySkipEscape(initialState)}
        </script>
      </body>
    </html>
  `
}
