class PromoteFromWaitlist < Interaction
  include Transactional

  def call
    confirm_placement
    leave_trail
  end

  delegate :waitlist, to: :context
  delegate :registration, :session, to: :waitlist

  private

  def confirm_placement
    ConfirmPlacement.call(
      registration: registration,
      session: session,
    )
  end

  def leave_trail
    History::WaitlistFilled.create(user: registration.user, session: session)
  end
end
