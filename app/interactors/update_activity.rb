class UpdateActivity < Interaction
  def call
    access_denied! unless can? :update, activity

    activity.update!(attributes)
  end

  delegate :activity, :attributes, to: :context
end
