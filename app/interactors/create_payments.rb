class CreatePayments < Interaction
  def call
    create_payment if payment_method.present?
  end

  delegate :registration, :attributes, to: :context
  delegate :payment_method, to: :attributes
  delegate :cart, to: :registration

  private

  def create_payment
    if existing_payment&.amount == cart.total_to_pay
      context.payment = existing_payment
    else
      cancel_pending_payments
      context.payment = registration.payments.create!(
        type: attributes[:payment_method],
        amount: cart.total_to_pay,
      )
    end
  end

  def existing_payment
    @existing_payment ||=
      registration.payments.detect do |payment|
        payment.pending? && payment.type == payment_method
      end
  end

  def cancel_pending_payments
    registration.payments.select(&:pending?).each(&:cancelled!)
  end
end
