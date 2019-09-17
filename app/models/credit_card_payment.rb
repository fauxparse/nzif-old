class CreditCardPayment < Payment
  include Stripe::Callbacks
  include Hashid::Rails

  after_create :initialize_stripe_payment

  after_checkout_session_completed! do |session, event|
    CreditCardPayment.find(session.client_reference_id)&.approved!
  end

  private

  def initialize_stripe_payment
    session = Stripe::Checkout::Session.create(
      client_reference_id: to_param,
      customer_email: registration.user.email,
      payment_method_types: ['card'],
      line_items: [{
        name: 'NZIF registration',
        quantity: 1,
        amount: amount_cents,
        currency: 'nzd',
      }],
      success_url: registration_url('confirmation'),
      cancel_url: registration_url('payment'),
    )

    update!(reference: session.id)
  end

  def registration_url(step)
    Rails.application.routes.url_helpers.front_end_url(
      "#{registration.festival.year}/register/#{step}",
      protocol: :https
    )
  end
end
