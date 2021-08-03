import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './shared/app'

ReactDOM.render(
  <BrowserRouter>
    <App cookies={document.cookie} />
  </BrowserRouter>,
  document.getElementById('root')
)
