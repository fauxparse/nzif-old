class UpdateActivity
  include Interactor

  def call
    activity.update!(attributes)
  end

  delegate :activity, :attributes, to: :context
end
