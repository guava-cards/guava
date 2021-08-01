class User < ApplicationRecord
  authenticates_with_sorcery!

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true, format: { with: /^[a-zA-Z0-9_.]*$/, multiline: true }

  validates :password, length: { minimum: 8 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

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

  def send_activation_email!
    return false unless send_activation_needed_email?

    setup_activation
    return false unless save

    send_activation_needed_email!
  end
end
