class AddToWaitlist < Interaction
  include Interactor

  def call
    context.waitlist = registration.waitlists.create!(session: session)
  rescue ActiveRecord::RecordInvalid
    context.fail!
  end

  delegate :session, :registration, to: :context
end
