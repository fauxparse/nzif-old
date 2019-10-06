class CreateSurveyResponse < Interaction
  def call
    access_denied! unless registered?

    context.response = session.survey_responses.create!(attributes)
  end

  def attributes
    context.attributes.merge(registration: registration)
  end

  def registration
    @registration ||= session.festival.registrations.find_by(user_id: current_user.id)
  end

  delegate :session, :current_user, to: :context

  private

  def registered?
    return false if registration.blank?
    registration.placements.where(session: session).exists?
  end
end
