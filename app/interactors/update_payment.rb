class UpdatePayment < Interaction
  def call
    access_denied! unless can? :update, payment

    payment.update!(attributes)
  end

  delegate :payment, :attributes, to: :context
end
