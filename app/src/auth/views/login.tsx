import { Box, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Head } from '~/shared/components/head'
import { paths } from '~/shared/paths'
import { LoginForm } from '../components/login-form'
import { LoginProviders } from '../components/login-providers'

export const Login = () => {
  const history = useHistory()
  const [step, setStep] = useState(LoginForm.Step.CHECK_LOGIN)

  return (
    <Box
      maxW="sm"
      mx="auto"
      d="flex"
      flexDir="column"
      w="full"
      h="full"
      justifyContent="center"
    >
      <Head title="🔐 Login" />
      <Heading textAlign="center" pb={4} mb={2}>
        {step === LoginForm.Step.SIGN_UP ? 'Sign Up' : 'Sign In'}
      </Heading>
      <LoginProviders
        borderBottomWidth={1}
        pb={4}
        mb={4}
        w="full"
        alignItems="flex-start"
      />
      <LoginForm
        step={step}
        setStep={setStep}
        onSuccess={() => history.push(paths.home)}
      />
    </Box>
  )
}
