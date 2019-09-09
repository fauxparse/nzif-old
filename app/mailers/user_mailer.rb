class UserMailer < ApplicationMailer
  def password_reset(identity)
    @identity = identity
    @user = @identity.user
    mail to: recipient(@user), subject: 'Reset your NZIF password'
  end

  def registration_confirmation(registration)
    @registration = registration
    @festival = @registration.festival
    @user = @registration.user
    mail to: recipient(@user), subject: "Your #{@festival} registration"
  end

  def ticket_code(registration)
    @registration = registration
    @festival = @registration.festival
    @user = @registration.user
    mail to: recipient(@user), subject: "Your #{@festival} discount code"
  end
end
