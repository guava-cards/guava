import { extendTheme } from '@chakra-ui/react'
import { Input } from './components/input'
import { Button } from './components/button'
import { Alert } from './components/alert'
import { FormError } from './components/formError'
import { FormLabel } from './components/formLabel'
import { colors } from './foundations/colors'
import { layerStyles } from './foundations/layers'
import { styles } from './foundations/styles'
import { textStyles } from './foundations/text'

const theme = extendTheme({
  colors,
  styles,
  layerStyles,
  textStyles,
  fonts: {
    serif: '-apple-system-ui-serif, ui-serif, Georgia, Times, serif',
  },
  components: {
    Input,
    Button,
    FormLabel,
    FormError,
    Alert,
  },
  config: {
    initialColorMode: 'dark',
    cssVarPrefix: 'gc',
  },
})

export { theme }
export type Theme = typeof theme
