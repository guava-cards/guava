# == Schema Information
#
# Table name: users
#
#  id                                  :bigint           not null, primary key
#  access_count_to_reset_password_page :integer          default(0)
#  activation_state                    :string
#  activation_token                    :string
#  activation_token_expires_at         :datetime
#  crypted_password                    :string
#  email                               :string           not null
#  reset_password_email_sent_at        :datetime
#  reset_password_token                :string
#  reset_password_token_expires_at     :datetime
#  salt                                :string
#  username                            :string           not null
#  created_at                          :datetime         not null
#  updated_at                          :datetime         not null
#
# Indexes
#
#  index_users_on_activation_token      (activation_token)
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token)
#
class User < ApplicationRecord
  rolify
  authenticates_with_sorcery!
  has_person_name

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true, format: { with: /^[a-zA-Z0-9_.]*$/, multiline: true }

  validates :password, length: { minimum: 8 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { !new_record? && changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { !new_record? && changes[:crypted_password] }

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
