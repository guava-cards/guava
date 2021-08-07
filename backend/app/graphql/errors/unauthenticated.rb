module Errors
  class Unauthenticated < GraphQL::ExecutionError
    def initialize(message = 'You must sign in to continue')
      super(message, extensions: {
        code: :unauthenticated,
        status: 401
      })
    end
  end
end
