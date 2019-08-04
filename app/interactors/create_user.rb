class CreateUser < Interaction
  def call
    user.save!
    context.user = user
  end

  private

  def user
    @user ||= (existing_user || new_user).tap { |user| build_password(user) }
  end

  def existing_user
    User.never_logged_in.find_by_email(context.email)&.tap do |user|
      user.update!(name: context.name)
    end
  end

  def new_user
    User.new(name: context.name, email: context.email)
  end

  def build_password(user)
    @password ||= user.identities.build(
      type: 'Identity::Password',
      password: context.password,
      password_confirmation: context.password_confirmation,
    )
  end
end
