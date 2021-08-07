/* eslint-disable no-param-reassign */
import { ColorMode, StorageManager } from '@chakra-ui/react'

const defaultStorage: Record<'colorMode', ColorMode> = {
  colorMode: 'light',
}

/**
 * A memory based storage manager for chakra ui
 * The storage object will be mutated.
 */
export const memoryColorModeManager = (
  storage: Record<'colorMode', ColorMode> = defaultStorage
): StorageManager => ({
  get() {
    return storage.colorMode
  },
  set(value) {
    storage.colorMode = value
  },
  type: 'localStorage',
})

export { defaultStorage as defaultColorModeStorage }
