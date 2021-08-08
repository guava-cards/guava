import { Box, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Head } from '~/shared/components/head'
import { paths } from '~/shared/paths'
import { LoginForm } from '../components/login-form'
import { LoginProviders } from '../components/login-providers'
import { useAuth, useIsAuthenticated } from '../context'

export const Login = () => {
  const { setViewer } = useAuth()
  const isAuthenticated = useIsAuthenticated()
  const [step, setStep] = useState(LoginForm.Step.CHECK_LOGIN)

  if (isAuthenticated) {
    return <Redirect to={paths.home} />
  }

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
        onSuccess={viewer => {
          setViewer(viewer)
        }}
      />
    </Box>
  )
}
