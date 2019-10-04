class CreateIncident < Interaction
  def call
    context.incident = festival.incidents.create!(
      user: anonymous ? nil : current_user,
      body: body,
    )
  end

  delegate :current_user, :festival, :body, :anonymous, to: :context
end
