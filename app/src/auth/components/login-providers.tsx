import React from 'react'
import { BoxProps, VStack } from '@chakra-ui/react'
import { LoginProviderButton } from './login-provider-button'

export interface LoginProvidersProps extends BoxProps {
  providers?: string[]
}

export const LoginProviders: React.FC<LoginProvidersProps> = ({
  providers = ['apple', 'google'],
  ...props
}) => (
  <VStack {...props}>
    {providers.map(provider => (
      <LoginProviderButton key={provider} provider={provider} />
    ))}
  </VStack>
)
