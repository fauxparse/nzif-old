class CreateActivity
  include Interactor

  def call
    activity.save!
  end

  def activity
    @activity ||= festival.activities.build(attributes)
  end

  delegate :festival, :attributes, to: :context
end
