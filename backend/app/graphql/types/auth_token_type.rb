module Types
  class AuthTokenType < Types::AccessTokenType
    description 'An access and refresh token pair for an authenticated session'

    field :refresh, String, 'The long-lived refresh token for this session', null: false
    field :refresh_expires_at, GraphQL::Types::ISO8601DateTime,
          'The expiry of the refresh token', null: false
  end
end
