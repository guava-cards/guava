module Mutations
  module Auth
    class ActivateAccountMutation < BaseMutation
      description 'Activate an account given a token'
      argument :token, String, "The activation token for the user's account", required: true
      field :activated, Boolean, 'Whether the activiation request was successful or not', null: false

      def resolve(token:)
        user = User.load_from_activation_token(token)
        user.activate! if user.present?
        { activated: user.present? }
      end
    end
  end
end
