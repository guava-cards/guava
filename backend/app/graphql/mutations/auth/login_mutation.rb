module Mutations
  module Auth
    class LoginMutation < BaseMutation
      description 'Creates a new authentication session for a user'
      authenticate false

      class LoginFailure < Types::BaseEnum
        graphql_name 'UserLoginFailure'
        description 'Reasons why a user was unable to login to their account'

        value 'INVALID_LOGIN', 'The login provided was invalid (email or username)', value: :invalid_login
        value 'INVALID_PASSWORD', 'The password provided was incorrect', value: :invalid_password
        value 'INACTIVE_ACCOUNT', "The user's account is currently inactive", value: :inactive
      end

      field :auth_token, Types::AuthTokenType, "The authenticated user's auth token", null: true
      field :failure_reason, LoginFailure, 'The reason why the login attempt failed', null: true
      field :user, Types::UserType, 'The authenticated user', null: true

      argument :login, String, "The user's email or username", required: true
      argument :password, String, "The user's password", required: true

      def resolve(login:, password:)
        User.authenticate(login, password) do |user, failure|
          user = nil if failure.present?
          @result = {
            user: user,
            auth_token: JwtAuth.create_auth_token_for_user(user),
            failure_reason: failure
          }
        end

        context.assign_auth_token_cookies(@result[:auth_token])
        @result
      end
    end
  end
end
