class ResetPassword < Interaction
  include ActiveModel::Validations

  validate :check_token
  validates :password, confirmation: true

  def call
    if valid?
      identity.update!(password: password, reset_token: nil)
      context.user = identity.user
    else
      context.fail!(errors: errors)
    end
  end

  delegate :password, :password_confirmation, :token, to: :context

  private

  def identity
    @identity ||= Identity::Password.find_by(reset_token: token)
  end

  def check_token
    errors.add(:token, 'is invalid') unless valid_token?
  end

  def valid_token?
    identity && !identity.reset_token_expired?
  end
end
