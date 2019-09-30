class UpdatePayment < Interaction
  def call
    access_denied! unless can? :update, payment

    payment.update!(attributes)
    send_confirmation_email if approved?
  end

  delegate :payment, :attributes, to: :context

  private

  def approved?
    payment.approved? && payment.saved_change_to_attribute?(:state)
  end

  def send_confirmation_email
    UserMailer.payment_confirmation(payment).deliver_later
  end
end
