import React, { useMemo } from 'react'
import {
  MeFragment,
  useIdentityCheckMutation,
  useLoginUserMutation,
  LoginUserSchema,
  CheckUserSchema,
  IdentityType,
  SignUpUserSchema,
  LoginUser_AuthTokenFragment,
} from '@guava/library'
import { Box, BoxProps, Collapse, VStack } from '@chakra-ui/react'
import {
  CheckboxSingleControl,
  InputControl,
  SubmitButton,
} from 'formik-chakra-ui'
import { Form, FormSubmit } from '~/shared/components/form'

interface LoginFormProps extends BoxProps {
  onSuccess?: (user: MeFragment, authToken: LoginUser_AuthTokenFragment) => void
  onFailure?: (failureReason?: string) => void
  step: LoginFormSteps
  setStep: (step: LoginFormSteps) => void
}

export enum LoginFormSteps {
  CHECK_LOGIN,
  SIGN_IN,
  SIGN_UP,
}

export const LoginForm = ({
  onSuccess,
  onFailure,
  step,
  setStep,
  ...props
}: LoginFormProps) => {
  const [checkIfUserExists] = useIdentityCheckMutation()
  const [loginUser] = useLoginUserMutation()

  const schema = useMemo(() => {
    switch (step) {
      case LoginFormSteps.CHECK_LOGIN:
        return CheckUserSchema
      case LoginFormSteps.SIGN_IN:
        return LoginUserSchema
      case LoginFormSteps.SIGN_UP:
        return SignUpUserSchema
      default:
        return LoginUserSchema
    }
  }, [step])

  const handleSubmit: FormSubmit<typeof schema> = async ({
    login,
    password,
  }) => {
    try {
      if (step === LoginFormSteps.CHECK_LOGIN) {
        const { data } = await checkIfUserExists({
          variables: { identity: login, identityType: IdentityType.Email },
        })
        const userExists = data?.identityCheck?.exists === true
        const newStep = userExists
          ? LoginFormSteps.SIGN_IN
          : LoginFormSteps.SIGN_UP

        return setStep(newStep)
      }

      if (step === LoginFormSteps.SIGN_IN) {
        const { data, errors } = await loginUser({
          variables: { login, password: password as string },
        })
        const user = data?.loginUser?.user
        const authToken = data?.loginUser?.authToken
        if (user && authToken) return onSuccess?.(user, authToken)

        return {
          _formError: data?.loginUser?.failureReason ?? errors?.[0]?.message,
          _failure: true,
        }
      }

      if (step === LoginFormSteps.SIGN_UP) {
        return { _formError: 'Sign up is not supported at the moment!' }
      }

      return {}
    } catch (error) {
      return { _formError: error }
    }
  }

  return (
    <Form {...props} schema={schema} onSubmit={handleSubmit}>
      <InputControl
        name="login"
        label="Email Address"
        inputProps={{
          placeholder: 'Enter email address...',
          autoComplete: 'email',
        }}
        onChange={() => setStep(LoginFormSteps.CHECK_LOGIN)}
      />

      <Collapse unmountOnExit in={step !== LoginFormSteps.CHECK_LOGIN}>
        <VStack mt={2}>
          <InputControl
            name="password"
            label="Password"
            inputProps={{
              placeholder: 'Enter your password',
              autoComplete:
                step === LoginFormSteps.SIGN_IN
                  ? 'current-password'
                  : 'new-password',
              type: 'password',
            }}
          />

          {step === LoginFormSteps.SIGN_UP && (
            <>
              <InputControl
                name="fullName"
                label="Full Name"
                inputProps={{
                  placeholder: 'e.g. John Doe',
                  autoComplete: 'name',
                }}
              />
              <CheckboxSingleControl
                checkBoxProps={{ my: 1 }}
                name="agreedToTosAndPrivacy"
              >
                <Box as="span" fontSize="sm" color="mode.secondary.800">
                  I agree to the terms of service and privacy policy
                </Box>
              </CheckboxSingleControl>
            </>
          )}
        </VStack>
      </Collapse>

      <SubmitButton
        bg="brand.50"
        _hover={{ bg: 'brand.200' }}
        _active={{ bg: 'brand.200' }}
        borderColor="brand.300"
        color="brand.800"
        colorScheme="brand"
        mt={3}
        w="full"
      >
        {step === LoginFormSteps.SIGN_UP
          ? 'Sign up with Email'
          : 'Continue with Email'}
      </SubmitButton>
    </Form>
  )
}

LoginForm.Step = LoginFormSteps
