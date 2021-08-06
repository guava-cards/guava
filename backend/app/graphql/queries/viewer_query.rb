module Queries
  class ViewerQuery < BaseQuery
    description 'Returns the current authenticated user'
    authenticate true

    type Types::UserType, null: false

    def resolve
      current_user
    end
  end
end
