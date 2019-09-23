class RemoveFromWaitlist < Interaction
  include Transactional

  def call
    waitlist&.destroy! || context.fail!
    leave_trail
  end

  delegate :registration, :session, to: :context

  private

  def waitlist
    @waitlist ||= registration.waitlists.find_by(session: session)
  end

  def leave_trail
    History.record(
      History::LeftWaitlist,
      user: registration.user,
      session: session,
    )
  end
end
