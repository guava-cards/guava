module Errors
  class InvalidLogin < GraphQL::ExecutionError
    def initialize
      super('Invalid email or password', extensions: {
        code: :invalid_login,
        status: 400
      })
    end
  end
end
