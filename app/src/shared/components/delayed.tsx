import React, { useEffect, useState } from 'react'

export interface DelayedProps {
  delayMs?: number
  Component?: React.ComponentType
}

/**
 * Delays rendering its children for a certain interval
 */
export const Delayed: React.FC<DelayedProps> = ({
  children,
  Component,
  delayMs = 0,
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delayMs)
    return () => clearTimeout(timeout)
  }, [delayMs])

  const content = Component ? <Component /> : children

  return <>{show && content}</>
}
