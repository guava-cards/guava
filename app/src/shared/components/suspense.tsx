import React, { SuspenseProps, Suspense as ReactSuspense } from 'react'
// import { isServerSide } from '@guava/library'

/**
 * SSR does not support suspense
 */
export const Suspense: React.FC<SuspenseProps> = ({ children, ...props }) => (
  <ReactSuspense {...props}>{children}</ReactSuspense>
)
