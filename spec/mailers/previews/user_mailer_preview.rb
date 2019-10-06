class UserMailerPreview < ActionMailer::Preview
  def password_reset
    user = OpenStruct.new(name: 'Test User', email: 'test@example.com')
    identity = OpenStruct.new(user: user, reset_token: '1234567890')
    UserMailer.password_reset(identity)
  end

  def registration_confirmation
    user = OpenStruct.new(name: 'Test User', email: 'test@example.com')
    festival = OpenStruct.new(year: Time.now.year)
    registration = OpenStruct.new(user: user, festival: festival)
    UserMailer.registration_confirmation(registration)
  end

  def ticket_code
    user = OpenStruct.new(name: 'Test User', email: 'test@example.com')
    festival = OpenStruct.new(year: Time.now.year)
    registration = OpenStruct.new(user: user, festival: festival)
    UserMailer.ticket_code(registration)
  end

  def itinerary
    UserMailer.itinerary(Registration.complete.includes(:preferences).second)
  end

  def waitlist_success
    UserMailer.waitlist_success(
      Registration.complete.first,
      Session.workshop.first,
    )
  end

  def payment_confirmation
    UserMailer.payment_confirmation(Payment.approved.first)
  end

  def broadcast_message
    user = OpenStruct.new(name: 'Test User', email: 'test@example.com')
    session = Session.workshop.first
    sender = session.activity.presenters.first.user
    message = Message.new(
      sender: sender,
      messageable: session,
      subject: 'Hello',
      body: session.activity.description
    )
    UserMailer.broadcast_message(message, user)
  end

  def feedback_request
    user = OpenStruct.new(name: 'Test User', email: 'test@example.com')
    session = Session.workshop.first
    UserMailer.feedback_request(session, user)
  end
end
