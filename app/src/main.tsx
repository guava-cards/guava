import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './shared/app'

ReactDOM.render(
  <App cookies={document.cookie} />,
  document.getElementById('root')
)
