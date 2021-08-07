export function useIsServerSide(): boolean {
  return import.meta.env.SSR || typeof window === 'undefined'
}
