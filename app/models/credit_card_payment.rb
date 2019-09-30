class CreditCardPayment < Payment
  include Stripe::Callbacks

  after_create :initialize_stripe_payment

  after_checkout_session_completed! do |session, event|
    payment = CreditCardPayment.find(session.client_reference_id)
    ApprovePayment.call(payment) if payment
  end

  private

  delegate :user, to: :registration

  def initialize_stripe_payment
    session = Stripe::Checkout::Session.create(
      client_reference_id: to_param,
      customer: customer_id,
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

  def customer_id
    user.create_stripe_customer! if user.create_stripe_customer.blank?
    user.stripe_customer.stripe_customer_id
  end

  def success_url
    url_helpers.front_end_url(
      "#{registration.festival.year}/register/confirmation",
      protocol: :https
    )
  end

  def cancel_url
    url_helpers.cancel_payment_url(self, protocol: :https)
  end

  def url_helpers
    Rails.application.routes.url_helpers
  end
end
