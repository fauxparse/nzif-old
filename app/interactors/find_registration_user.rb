class FindRegistrationUser < Interaction
  def call
    update_user!
    context.registration ||= Registration.create_or_find_by(festival: festival, user: user)

  rescue ActiveRecord::RecordInvalid => e
    errors.merge!(e.record.errors)
    context.fail!
  end

  def user
    context.user ||= context.current_user || existing_user || new_user
  end

  delegate :festival, :attributes, :errors, to: :context

  delegate :name, :email, :password, :password_confirmation, :phone, to: :attributes

  private

  def logged_in?
    @logged_in = user&.persisted? if @logged_in.nil?
    @logged_in
  end

  def update_user!
    user.attributes = attributes.slice(:name, :email, :phone)
    if user.new_record? || user.changed?
      user.save!
    end
  end

  def existing_user
    user = User.includes(:identities).find_by_email(email)
    return nil if user.blank?

    identity = user.identities.detect { |id| id.is_a?(Identity::Password) } ||
      user.identities.build(password: password, password_confirmation: password_confirmation)

    if identity.authenticate(password)
      return user
    else
      errors.add(:password, 'is incorrect')
      return
    end
  end

  def new_user
    User.new(name: name, email: email, phone: phone).tap do |user|
      user.identities.build(
        type: 'Identity::Password',
        password: password,
        password_confirmation: password_confirmation,
      )
    end
  end
end
