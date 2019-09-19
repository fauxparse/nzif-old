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
    UserMailer.itinerary(Registration.complete.first)
  end
end
