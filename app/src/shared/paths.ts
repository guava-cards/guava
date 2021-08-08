interface Identifable {
  id: string | number
}

export const paths = {
  home: '/',

  auth: {
    login: () => '/auth/login',
    passwords: {
      reset: (token = ':token') => `/auth/passwords/reset/${token}`,
      request: () => `/auth/passwords/request`,
    },
  },

  decks: {
    list: '/decks',
    detail(deck: Identifable = { id: ':id' }) {
      return `/decks/${deck.id}`
    },
  },
}
