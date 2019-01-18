class AuthenticateUser < Interaction
  def call
    if authenticated?
      context.user = user
    else
      context.fail!
    end
  end

  private

  def user
    @user ||= User.find_by_email(context.email)
  end

  def identity
    @identity ||= user&.identities&.detect { |identity| identity.is_a?(Identity::Password) }
  end

  def authenticated?
    identity&.authenticate(context.password)
  end
end
