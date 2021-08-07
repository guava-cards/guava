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

  lists: {
    slash: {
      listStyleType: 'none',
      d: 'flex',
      flexDir: 'row',
      alignItems: 'center',
      fontWeight: 'medium',
      li: {
        '&:after': {
          content: '"/"',
          mx: '0.5rem',
        },
        '&:last-child': {
          '&:after': {
            display: 'none',
          },
        },
      },
      a: {
        transition: 'all ease-in-out 100ms',
        '&:hover': {
          textDecoration: 'underline',
          opacity: 0.8,
        },
      },
    },
    bullet: {},
  },
}
