class UpdatePitch < Interaction
  def call
    access_denied! unless can? :update, pitch

    pitch.user = update_user_details(owner)
    pitch.attributes = attributes_for_update
    pitch.save!
    send_pitch_notification if pitch_just_submitted?
  end

  delegate :pitch, :attributes, :current_user, to: :context

  private

  def owner
    pitch.user ||
      current_user ||
      find_or_create_user(attributes[:presenters].first || {})
  end

  def find_or_create_user(attributes)
    AuthenticateUser.call(email: attributes[:email], password: attributes[:password]).user ||
      create_user_with_password(attributes)
  end

  def create_user_with_password(attributes)
    CreateUser.call(attributes.merge(password_confirmation: attributes[:password])).user
  rescue ActiveRecord::RecordInvalid => invalid
    invalid.record
  end

  def update_user_details(user)
    return user if attributes[:presenters].blank?

    presenter = attributes[:presenters].detect { |p| p[:id] == user.id }
    if presenter
      user.city = presenter[:city] if presenter[:city].present?
      user.country = presenter[:country] if presenter[:country].present?
      user.save if user.changed?
    end
    user
  end

  def attributes_for_update
    {}.tap do |result|
      %i(name state).each { |key| result[key] = attributes[key] if attributes.key?(key) }
      result[:info] = updated_info
    end
  end

  def updated_info
    pitch.info.merge(strip_passwords(attributes.except(:id, :state, :name)))
  end

  def strip_passwords(attributes)
    return attributes if attributes[:presenters].blank?

    attributes.merge(presenters: attributes[:presenters].map { |p| p.except(:password) })
  end

  def pitch_just_submitted?
    pitch.saved_change_to_state? && pitch.submitted?
  end

  def send_pitch_notification
    # TODO: send email notification to Jen
  end
end
