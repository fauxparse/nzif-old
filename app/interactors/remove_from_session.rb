class RemoveFromSession < Interaction
  def call
    if placement
      @session_was_full = session.full?

      leave_trail

      # Don't send full/not-full status to the client until we've finished
      # shuffling everyone around
      Session.silence_notifications do
        placement.destroy!
        bump_up_waitlist if bump_waitlist?
      end

      notify_change
    else
      context.fail!
    end
  end

  delegate :registration, :session, to: :context

  private

  def bump_waitlist?
    context[:bump_waitlist] != false
  end

  def placement
    @placement ||= registration.placements.detect do |p|
      p.session_id == session.id &&
        !p.destroyed? &&
        !p.marked_for_destruction?
    end
  end

  def bump_up_waitlist
    session.reload
    room = [0, session.capacity - session.placements.count].max
    if room > 0
      session.waitlists.all[0, room].each do |waitlist|
        PromoteFromWaitlist.call(waitlist: waitlist, notify_subscribers: false)
      end
      session.placements.reload
    end
  end

  def session_no_longer_full?
    @session_was_full && !session.full?
  end

  def leave_trail
    History.record(
      History::LeftSession,
      current_user: context.current_user,
      user: registration.user,
      session: session,
    )
  end

  def notify_change
    session.notify_change if session_no_longer_full?
  end
end
