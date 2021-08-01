module Mutations
  module Auth
    class RequestPasswordReset < BaseMutation
      description 'Requests a password reset email for a user'

      argument :email, String, "The user's email", required: true
      field :sent, Boolean, 'Whether the email was delivered or not', null: false

      def resolve(email:)
        user = User.find_by(email: email)
        sent = user&.deliver_reset_password_instructions!

        { sent: sent }
      end
    end
  end
end
