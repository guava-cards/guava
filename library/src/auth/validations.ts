import * as yup from 'yup'

export const CheckUserSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string(),
})

export const LoginUserSchema = CheckUserSchema.shape({
  login: yup.string().required(),
  password: yup.string().required(),
})

export const SignUpUserSchema = LoginUserSchema.shape({
  agreedToTosAndPrivacy: yup.bool().oneOf([true], 'this field must be checked'),
  fullName: yup.string().required(),
})

export type LoginUser = yup.InferType<typeof LoginUserSchema>
