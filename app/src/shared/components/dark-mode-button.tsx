import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import FiSun from '@meronex/icons/fi/FiSun'
import HiOutlineMoon from '@meronex/icons/hi/HiOutlineMoon'

export const DarkModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      onKeyDown={toggleColorMode}
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <HiOutlineMoon /> : <FiSun />}
      variant="plain"
      border="none"
      w="auto"
      p="auto"
      outline="none"
    />
  )
}
