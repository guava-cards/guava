import React from 'react'
import { Helmet } from 'react-helmet'

export interface HeadProps {
  title?: string
  description?: string
}

export const Head: React.FC<HeadProps> = ({ title, description }) => (
  <Helmet defaultTitle="Guava" titleTemplate="%s | Guava">
    <meta charSet="utf-8" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </Helmet>
)
