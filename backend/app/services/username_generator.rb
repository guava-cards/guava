class UsernameGenerator
  attr_reader :token

  def initialize(token)
    @token = token
  end

  def self.call(*args)
    new(*args).call
  end

  def call; end
end
