import React, { useMemo } from 'react'
import {
  MeFragment,
  useIdentityCheckMutation,
  LoginUserSchema,
  CheckUserSchema,
  IdentityType,
  SignUpUserSchema,
  useUpsertUserMutation,
} from '@guava/library'
import { Box, BoxProps, Collapse, VStack } from '@chakra-ui/react'
import {
  CheckboxSingleControl,
  InputControl,
  SubmitButton,
} from 'formik-chakra-ui'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth as auth } from '~/shared/firebase'
import { Form, FormSubmit } from '~/shared/components/form'

interface LoginFormProps extends BoxProps {
  onSuccess?: (user: MeFragment) => void
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
  step,
  setStep,
  ...props
}: LoginFormProps) => {
  const [upsertUser] = useUpsertUserMutation()
  const [checkIfUserExists] = useIdentityCheckMutation()

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
    email,
    password,
  }) => {
    try {
      if (step === LoginFormSteps.CHECK_LOGIN) {
        const { data } = await checkIfUserExists({
          variables: {
            identity: email,
            identityType: IdentityType.Email,
          },
        })
        const userExists = data?.identityCheck?.exists === true
        const newStep = userExists
          ? LoginFormSteps.SIGN_IN
          : LoginFormSteps.SIGN_UP

        return setStep(newStep)
      }

      if (step === LoginFormSteps.SIGN_IN) {
        await signInWithEmailAndPassword(auth, email, password as string)
        const { data, errors } = await upsertUser()

        const viewer = data?.upsertUser?.user
        if (viewer) return onSuccess?.(viewer)

        return {
          _formError: data?.upsertUser?.failureReason ?? errors?.[0],
          _failure: true,
          _validationErrors: data?.upsertUser?.validationErrors?.messages,
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
        name="email"
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
