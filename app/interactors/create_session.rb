class CreateSession < Interaction
  def call
    access_denied! unless can? :create, session

    session.save!
  end

  def session
    context.session ||= Session.new(attributes)
  end

  delegate :activity, :attributes, to: :context
end
