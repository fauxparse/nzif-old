class ApprovePayment < Interaction
  def call
    payment.approved!
    send_confirmation_email if payment.saved_change_to_attribute?(:state)
  end

  delegate :payment, to: :context

  private

  def send_confirmation_email
    UserMailer.payment_confirmation(payment).deliver_later
  end
end
