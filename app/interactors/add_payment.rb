class AddPayment < Interaction
  def call
    access_denied! unless can? :create, Payment

    context.payment = Payment.create!(attributes)
  end

  delegate :attributes, to: :context
end
