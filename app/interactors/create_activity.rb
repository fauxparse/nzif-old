class CreateActivity < Interaction
  def call
    access_denied! unless can? :create, activity

    activity.save!
    context.activity = activity
  end

  def activity
    @activity ||= festival.activities.build(attributes)
  end

  delegate :festival, :attributes, to: :context
end
