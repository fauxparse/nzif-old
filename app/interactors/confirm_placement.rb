class ConfirmPlacement < Interaction
  def call
    remove_from_other_sessions
    create_placement
    remove_from_waitlists
    session.notify_change if session.full?
  end

  delegate :registration, :session, to: :context
  delegate :festival, to: :registration

  private

  def preferences
    @preferences ||=
      registration
        .preferences
        .includes(:session)
        .references(:sessions)
        .where(sessions: { starts_at: session.starts_at })
  end

  def preference
    @preference ||= preferences.detect { |preference| preference.session_id == session.id }
  end

  def other_sessions
    festival.sessions.where(starts_at: session.starts_at).where.not(id: session.id)
  end

  def lower_priority_sessions
    if preference.present?
      preferences.select { |p| p.position > preference.position }.map(&:session)
    else
      []
    end
  end

  def create_placement
    session.placements.create!(registration: registration)
    registration.placements.reload if registration.placements.loaded?
  end

  def remove_from_other_sessions
    other_sessions.each do |other_session|
      RemoveFromSession.call(registration: registration, session: other_session)
    end
  end

  def remove_from_waitlists
    [session, *lower_priority_sessions].each do |other_session|
      RemoveFromWaitlist.call(registration: registration, session: other_session)
    end
  end
end
