class CreditCardPayment < Payment
  include Stripe::Callbacks

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
      success_url: success_url,
      cancel_url: cancel_url,
    )

    update!(reference: session.id)
  end

  def success_url
    url_helpers.front_end_url("#{registration.festival.year}/register/payment", protocol: :https)
  end

  def cancel_url
    url_helpers.cancel_payment_url(self, protocol: :https)
  end

  def url_helpers
    Rails.application.routes.url_helpers
  end
end
