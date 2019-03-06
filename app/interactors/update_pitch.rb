class UpdatePitch < Interaction
  def call
    access_denied! unless can? :update, pitch

    update_pitch_owner
    pitch.info = updated_info
    pitch.save!
  end

  delegate :pitch, :attributes, to: :context

  private

  def update_pitch_owner
    pitch.user = current_user if pitch.new_record?
    update_current_user_from_presenter_info if attributes[:presenters].present?
  end

  def update_current_user_from_presenter_info
    presenter = attributes[:presenters].detect { |p| p[:id] == current_user.id }

    if presenter
      current_user.city = presenter[:city] if presenter[:city].present?
      current_user.country = presenter[:country] if presenter[:country].present?
      current_user.save! if current_user.changed?
    end
  end

  def updated_info
    pitch.info.merge(attributes.except(:id))
  end
end
