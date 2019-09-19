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
    @sessions = @registration.sessions.includes(:venue, activity: { presenters: :user })

    itinerary_attachment = ItineraryAttachment.new(@registration)
    attachments[itinerary_attachment.name] = itinerary_attachment.as_attachment

    mail to: recipient(@user), subject: "Your #{@festival} itinerary"
  end
end
