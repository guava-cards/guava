module Mutations
  module Auth
    class RequestActivationLinkMutation < BaseMutation
      description 'Request an account activation email for a user, given thier email'
      argument :email, String, "The user's email address", required: true
      field :requested, Boolean, 'Whether the activation email was sucessfully sent or not', null: false

      def resolve(email:)
        sent = User
          .where('lower(email) = ?', email)
          .first&.send_activation_email!

        { requested: sent.present? }
      end
    end
  end
end
