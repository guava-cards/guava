class AuthMailer < ApplicationMailer
  def reset_password(user)
    @user = User.find user.id
    @url  = "#{ENV['FRONTEND_URL']}/passwords/edit?token=#{user.reset_password_token}"

    mail to: @user.email, subject: 'You requested a password reset'
  end
end
