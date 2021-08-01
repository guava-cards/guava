class User < ApplicationRecord
  authenticates_with_sorcery!

  def self.authenticate(login, password)
    user = find_for_authentication(login)
    return user if user&.valid_password?(password)
  end

  def self.find_for_authentication(login)
    User.where(email: login.downcase)
      .or(User.where(username: login.downcase))
      .first
  end

  def login
    @login ||= username || email
  end

  def jwt_payload
    { user_id: id }
  end
end
