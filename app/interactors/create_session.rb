class CreateSession < Interaction
  def call
    access_denied! unless can? :create, session

    session.save!
  end

  def session
    context.session ||= activity.sessions.build(starts_at: starts_at, ends_at: ends_at)
  end

  delegate :activity, :starts_at, :ends_at, to: :context
end
