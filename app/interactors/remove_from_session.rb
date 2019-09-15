class RemoveFromSession < Interaction
  def call
    if placement
      @session_was_full = session.full?

      # Don't send full/not-full status to the client until we've finished
      # shuffling everyone around
      Session.silence_notifications do
        placement.destroy!
        bump_up_waitlist
      end

      notify_change
    else
      context.fail!
    end
  end

  delegate :registration, :session, to: :context

  private

  def placement
    @placement ||= registration.placements.detect { |p| p.session_id == session.id }
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

  def notify_change
    session.notify_change if session_no_longer_full?
  end
end
