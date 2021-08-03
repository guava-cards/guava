import { Global, css } from '@emotion/react'

export const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      #root,
      body {
        height: 100%;
        width: 100%;
      }
    `}
  />
)
