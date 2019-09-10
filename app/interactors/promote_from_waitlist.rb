class PromoteFromWaitlist < Interaction
  include Transactional

  def call
    confirm_placement
  end

  delegate :waitlist, to: :context
  delegate :registration, :session, to: :waitlist

  private

  def confirm_placement
    ConfirmPlacement.call(registration: registration, session: session)
  end
end
