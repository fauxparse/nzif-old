class GeneratePasswordReset < Interaction
  def call
    create_reset_token
    send_reset_email
  end

  delegate :user, to: :context

  private

  def create_reset_token
    identity.update!(reset_token: reset_token)
  end

  def send_reset_email
    UserMailer.password_reset(identity).deliver_later
  end

  def identity
    @identity ||= Identity::Password.find_or_create_by(user: user) do |identity|
      identity.password = random_token
    end
  end

  def reset_token
    @reset_token ||= random_token
  end

  def random_token
    SecureRandom.hex(32)
  end
end
