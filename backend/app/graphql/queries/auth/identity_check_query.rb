module Queries
  module Auth
    class IdentityCheckQuery < BaseQuery
      description 'Checks to see if an identity (.i.e. a user) exists with a given login'

      class IdentityType < Types::BaseEnum
        graphql_name 'IdentityType'
        description "A user's identity type"
        value 'EMAIL', "The user's email address"
        value 'USERNAME', "The user's username"
        value 'LOGIN', "The user's username or email address"
      end

      argument :identity, String, 'The value of the identity', required: true
      argument :identity_type, IdentityType, 'The type of identity to check for', required: true
      type Boolean, null: false

      def resolve(identity:, identity_type:)
        case identity_type
        when 'EMAIL'
          User.find_by(email: identity.downcase).present?
        when 'USERNAME'
          User.find_by(username: identity.downcase).present?
        when 'LOGIN'
          User.find_for_authentication(identity).present?
        end
      end
    end
  end
end
