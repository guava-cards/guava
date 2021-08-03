module Queries
  class ViewerQuery < BaseQuery
    description 'Returns the current authenticated user'
    authenticate for: :access_request

    type Types::UserType, null: false

    def resolve
      viewer
    end
  end
end
