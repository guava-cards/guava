import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export interface LoginProviderButtonProps extends BoxProps {
  provider: string
}

export const LoginProviderButton: React.FC<LoginProviderButtonProps> = ({
  provider,
  ...props
}) => <Box {...props}>{provider}</Box>
