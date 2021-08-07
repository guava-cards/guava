import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'

export const DashboardLoading = () => (
  <Box w="full" h="full" d="flex" justifyContent="center" alignItems="center">
    <Spinner />
  </Box>
)
