import { ComponentStyleConfig } from '@chakra-ui/react'

export const FormError: ComponentStyleConfig = {
  parts: ['text', 'icon'],
  baseStyle: () => ({
    text: {
      mt: 1,
      fontSize: 'xs',
    },
  }),
}
