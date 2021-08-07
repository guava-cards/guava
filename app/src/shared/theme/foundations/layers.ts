export const layerStyles = {
  touchable: {
    transition: 'all ease-in-out 100ms',
    borderRadius: 0,
    fontSize: '0.95rem',
    py: 2.5,
    _dark: {
      _hover: {
        bg: 'charcoal.300',
      },
      _active: {
        bg: 'charcoal.300',
      },
      '&.active': {
        bg: 'charcoal.300',
      },
    },
    _light: {
      _hover: {
        bg: 'snow.800',
      },
      _active: {
        bg: 'snow.800',
      },
      '&.active': {
        bg: 'snow.800',
      },
    },
  },
}
