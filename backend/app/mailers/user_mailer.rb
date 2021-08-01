class UserMailer < ApplicationMailer
  def reset_password(user)
    @user = user
    @url  = "#{ENV['FRONTEND_URL']}/auth/passwords/edit?token=#{user.reset_password_token}"

    mail to: @user.email, subject: 'You requested a password reset'
  end

  def activation_needed(user)
    @user = user
    @url  = "#{ENV['FRONTEND_URL']}/auth/activate?token=#{user.activation_token}"

    mail to: @user.email
  end

  def activation_success(user)
    @user = user
    @url  = "#{ENV['FRONTEND_URL']}/auth/login?email=#{user.email}"

    mail to: @user.email
  end
end
