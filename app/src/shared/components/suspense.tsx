import React, { SuspenseProps, Suspense as ReactSuspense } from 'react'
import { isServerSide } from '~/../../library/src'
// import { isServerSide } from '@guava/library'

/**
 * SSR does not support suspense
 */
export const Suspense: React.FC<SuspenseProps> = ({ children, ...props }) => {
  if (isServerSide()) return children
  return <ReactSuspense {...props}>{children}</ReactSuspense>
}
