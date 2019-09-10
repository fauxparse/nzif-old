class RemoveFromWaitlist < Interaction
  include Transactional

  def call
    waitlist&.destroy! || context.fail!
  end

  delegate :registration, :session, to: :context

  private

  def waitlist
    @waitlist ||= registration.waitlists.find_by(session: session)
  end
end
