class CreateActivity
  include Interactor

  def call
    activity.save!
    context.activity = activity
  end

  def activity
    @activity ||= festival.activities.build(attributes)
  end

  delegate :festival, :attributes, to: :context
end
