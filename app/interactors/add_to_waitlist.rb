class AddToWaitlist < Interaction
  include Interactor

  def call
    context.waitlist = registration.waitlists.create!(session: session)
    leave_trail
  rescue ActiveRecord::RecordInvalid
    context.fail!
  end

  delegate :session, :registration, to: :context

  private

  def leave_trail
    History.record(
      History::JoinedWaitlist,
      user: registration.user,
      session: session,
    )
  end
end
