class CreateUser
  include Interactor

  def call
    user.save!
    context.user = user
  end

  private

  def user
    @user ||= User.new(name: context.name, email: context.email).
      tap { |user| build_password(user) }
  end

  def build_password(user)
    @password ||= user.identities.build(
      type: 'Identity::Password',
      password: context.password,
      password_confirmation: context.password_confirmation,
    )
  end
end
