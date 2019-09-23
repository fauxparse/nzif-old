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

  def itinerary(registration)
    @registration = registration
    @festival = @registration.festival
    @user = @registration.user
    @itinerary = Itinerary.new(@registration)
    @cart = Cart.new(registration)

    mail to: recipient(@user), subject: "Your #{@festival} itinerary"
  end

  def waitlist_success(registration, session)
    @registration = registration
    @festival = @registration.festival
    @user = @registration.user
    @session = session

    mail(
      to: recipient(@user),
      bcc: 'matt@improvfest.nz',
      subject: "You’re in! #{@session.activity.name}"
    )
  end
end
