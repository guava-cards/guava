import React from 'react'
import { Box, Spinner, Text } from '@chakra-ui/react'
import { Delayed } from './components/delayed'

export const AppFallback = () => (
  <Delayed>
    <Box w="full" h="full" d="flex" justifyContent="center" alignItems="center">
      <Spinner />
      <Text>Loading...</Text>
    </Box>
  </Delayed>
)
