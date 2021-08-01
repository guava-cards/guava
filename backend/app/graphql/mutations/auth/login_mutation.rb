module Mutations
  module Auth
    class LoginMutation < BaseMutation
      description 'Creates a new authentication session for a user'

      field :auth_token, Types::AuthTokenType, "The authenticated user's auth token", null: false
      field :user, Types::UserType, 'The authenticated user', null: false

      argument :login, String, "The user's email or username", required: true
      argument :password, String, "The user's password", required: true

      def resolve(login:, password:)
        user = User.authenticate(login, password)
        raise Errors::InvalidLogin unless user

        { user: user, auth_token: JwtAuth.create_auth_token_for_user(user) }
      end
    end
  end
end
