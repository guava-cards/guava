module Types
  class AccessTokenType < Types::BaseObject
    description 'An access token set for an authenticated session'

    field :access, String, 'The short-lived access token for this session', null: false
    field :access_expires_at, GraphQL::Types::ISO8601DateTime,
          'The expiry of the access token', null: false
    field :csrf, String, 'The anti-csrf token for this session', null: false
  end
end
