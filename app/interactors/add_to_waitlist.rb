class AddToWaitlist < Interaction
  include Interactor

  def call
    context.waitlist = Waitlist.create!(session: session, registration: registration)
  rescue ActiveRecord::RecordInvalid
    context.fail!
  end

  delegate :session, :registration, to: :context
end
