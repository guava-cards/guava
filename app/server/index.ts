/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import express from 'express'
import { createPageRender } from 'vite-plugin-ssr'

const isProduction = process.env.NODE_ENV === 'production'
const root = path.join(__dirname, '..')

async function main() {
  const app = express()

  let viteDevServer
  if (isProduction) {
    app.use(express.static(path.join(root, 'dist', 'client'), { index: false }))
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true },
    })
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRender({ viteDevServer, isProduction, root })
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContext = {
      url,
      req,
      headers: req.headers,
    }

    const result = await renderPage(pageContext)
    if (result.nothingRendered) {
      next()
      return
    }

    res.status(result.statusCode).send(result.renderResult)
  })

  const port = process.env.PORT || 8000
  app.listen(port)

  console.log(`Server running at http://localhost:${port}`)
}

main()
