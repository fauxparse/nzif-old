class ConfirmRegistration < Interaction
  def call
    complete_registration if can_complete?
  end

  delegate :registration, :attributes, to: :context

  delegate :festival, to: :registration

  private

  def can_complete?
    registration.pending? && attributes.state == 'complete'
  end

  def complete_registration
    registration.complete!
    send_confirmation_email
    send_ticket_code
    update_subscription
    History.record(
      History::CompletedRegistration,
      user: registration.user,
      festival: registration.festival,
    )
  end

  def send_confirmation_email
    if festival.earlybird?
      UserMailer.registration_confirmation(registration).deliver_later
    else
      UserMailer.itinerary(registration).deliver_later
    end
  end

  def send_ticket_code
    UserMailer.ticket_code(registration).deliver_later
  end

  def update_subscription
    NzifSchema.subscriptions.trigger(
      'registrationCount',
      { year: festival.year },
      festival.registrations.complete.count,
    )
  end
end
