class PromoteFromWaitlist < Interaction
  include Transactional

  def call
    leave_trail
    remove_from_existing
    confirm_placement
  end

  delegate :waitlist, to: :context
  delegate :registration, :session, to: :waitlist

  private

  def clash
    @clash ||= registration.placements.detect { |p| p.session.starts_at == session.starts_at }
  end

  def remove_from_existing
    if clash
      RemoveFromSession.call(registration: registration, session: clash.session)
    end
  end

  def confirm_placement
    History.suppress do
      ConfirmPlacement.call(
        registration: registration,
        session: session,
      )
    end
  end

  def leave_trail
    History.record History::JoinedFromWaitlist, user: registration.user, session: session
  end
end
