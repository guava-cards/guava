export const paths = {
  home: '/',
  auth: {
    login: () => '/auth/login',
    passwords: {
      reset: (token = ':token') => `/auth/passwords/reset/${token}`,
      request: () => `/auth/passwords/request`,
    },
  },
}
