module Mutations
  class UpdatePayment < BaseMutation
    description 'Update a payment'
    payload_type Types::Payment
    null false

    argument :id, ID, required: true
    argument :attributes, Types::PaymentAttributes, required: true

    def resolve(id:, attributes:)
      attributes = attributes.to_h.symbolize_keys
      attributes[:amount] = attributes[:amount] / 100 if attributes.include?(:amount)

      ::UpdatePayment.call(
        current_user: current_user,
        payment: ::Payment.find(id),
        attributes: attributes,
      ).payment
    end
  end
end
