class UserMailerPreview < ActionMailer::Preview
  def password_reset
    user = OpenStruct.new(name: 'Test User', email: 'test@example.com')
    identity = OpenStruct.new(user: user, reset_token: '1234567890')
    UserMailer.password_reset(identity)
  end
end
