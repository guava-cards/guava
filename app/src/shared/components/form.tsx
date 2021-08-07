import React, { useState } from 'react'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import { InferType, AnySchema } from 'yup'
import { Box, BoxProps } from '@chakra-ui/react'
import { Alert } from './alert'

export type SubmitResult<R> = R & {
  _formError?: Error | string
  _validationErrors?: Record<keyof R, string | string[]>
  _failure?: boolean
}

export type FormSubmit<S extends AnySchema> = FormProps<S>['onSubmit']
export interface FormProps<S extends AnySchema, R = Record<string, unknown>>
  extends Omit<BoxProps, 'onSubmit'> {
  schema?: S
  children?: React.ReactNode
  initialValues?: FormikProps<InferType<S>>['initialValues']
  formikProps?: Omit<FormikProps<InferType<S>>, 'initialValues'>
  onSubmit: (
    values: InferType<S>,
    bag: FormikHelpers<InferType<S>>
  ) => Promise<void | SubmitResult<R>>
}

export function Form<S extends AnySchema>({
  children,
  schema,
  initialValues = {},
  onSubmit,
  formikProps,
  ...props
}: FormProps<S>) {
  const [formError, setFormError] = useState<string>()
  const errorAlert = <Alert mb={5} type="error" description={formError} />

  return (
    <Formik
      {...formikProps}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, bag) => {
        setFormError(undefined)
        const {
          _formError: returnedFormError,
          _validationErrors: returnedValidationErrors = {},
        } = (await onSubmit(values, bag)) || {}

        setFormError(
          typeof returnedFormError === 'string'
            ? returnedFormError
            : returnedFormError?.message
        )

        Object.keys(returnedValidationErrors).forEach(field => {
          const validationError = returnedValidationErrors[field]
          bag.setFieldError(
            field,
            Array.isArray(validationError)
              ? validationError.join(',')
              : validationError
          )
        })
      }}
    >
      {({ handleSubmit }) => (
        <Box {...(props as never)} as="form" onSubmit={handleSubmit as never}>
          {formError && errorAlert}
          {children}
        </Box>
      )}
    </Formik>
  )
}
