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
    update_subscription
  end

  def send_confirmation_email
    UserMailer.registration_confirmation(registration).deliver_later
  end

  def update_subscription
    NzifSchema.subscriptions.trigger(
      'registrationCount',
      { year: festival.year },
      festival.registrations.complete.count,
    )
  end
end
