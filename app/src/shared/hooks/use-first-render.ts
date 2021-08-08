import { useRef, useEffect } from 'react'

export function useFirstRender() {
  const firstRender = useRef(true)

  useEffect(() => {
    firstRender.current = false
  }, [])

  return firstRender.current
}

export function useFirstRenderEffect(effect: () => void) {
  const firstRender = useFirstRender()

  useEffect(() => {
    if (!firstRender) return
    effect()
  }, [effect, firstRender])
}
