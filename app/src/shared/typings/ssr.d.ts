import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'
import type { IncomingMessage } from 'http'

export type PageProps = Record<string, any>
export type PageContext = PageContextBuiltIn & {
  Page: (pageProps: PageProps) => JSX.Element
  pageProps: PageProps
  documentProps?: {
    title?: string
    description?: string
  }
  headers: IncomingMessage['headers']
  _err: Error
}
