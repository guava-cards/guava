import { ssrDocument } from '../utils/mock-document'
import { ssrWindow } from '../utils/mock-window'

export const environment: {
  window: Window
  document: Document
} =
  typeof window === 'undefined'
    ? {
        document: ssrDocument,
        window: ssrWindow,
      }
    : {
        window,
        document,
      }
