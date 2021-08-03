import React from 'react'
import { useAuthenticatedResource } from '~/auth/context'

export const HomePage = () => {
  useAuthenticatedResource()

  return <h1>Hello world</h1>
}
