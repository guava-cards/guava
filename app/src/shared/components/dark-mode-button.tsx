import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import FiSun from '@meronex/icons/fi/FiSun'
import HiOutlineMoon from '@meronex/icons/hi/HiOutlineMoon'

export const DarkModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const label = colorMode === 'light' ? 'Toggle dark mode' : 'Toggle light mode'

  return (
    <IconButton
      onClick={toggleColorMode}
      onKeyDown={toggleColorMode}
      aria-label={label}
      icon={colorMode === 'light' ? <HiOutlineMoon /> : <FiSun />}
      variant="plain"
      border="none"
      w="auto"
      p="auto"
      outline="none"
    />
  )
}
