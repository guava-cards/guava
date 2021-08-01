module Mutations
  module Auth
    class ResetPassword < BaseMutation
      description "Resets a user's password given a token, password and password confirmation"

      argument :password, String, "The user's new password", required: true
      argument :password_confirmation, String, "The confirmation of the user's new password", required: true
      argument :token, String, "The reset token sent to the user's email", required: true

      field :changed, Boolean, "Whether or not the user's password was successfully changed", null: false
      field :validation_errors, Types::ValidationErrorType, 'The validation errors from this mutation', null: true

      def resolve(token:, password:, password_confirmation:)
        user = User.load_from_reset_password_token(token)
        return { changed: false } if user.blank?

        user.password_confirmation = password_confirmation
        changed = user.change_password(password)

        { changed: changed, validation_errors: user.errors }
      end
    end
  end
end
