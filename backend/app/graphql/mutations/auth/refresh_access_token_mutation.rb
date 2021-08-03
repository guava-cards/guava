module Mutations
  module Auth
    class RefreshAccessTokenMutation < BaseMutation
      authenticate for: :refresh_request
      description 'Refreshes an expired access token'

      field :auth_token, Types::AuthTokenType, "The user's new authentication token", null: false
      field :success, Boolean, 'This value will always be true, since all failures will be top-lovel-errors',
            null: false

      def resolve
        session = JWTSessions::Session.new(payload: claimless_payload, refresh_by_access_allowed: true)
        tokens  = session.refresh_by_access_payload do
          raise JWTSessions::Errors::Unauthorized,
                'Refresh action is performed before the expiration of the access token.'
        end

        { success: true, auth_token: tokens }
      end
    end
  end
end
