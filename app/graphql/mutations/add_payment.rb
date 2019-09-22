module Mutations
  class AddPayment < BaseMutation
    description 'Add a payment'
    payload_type Types::Payment
    null false

    argument :attributes, Types::PaymentAttributes, required: true

    def resolve(attributes:)
      attributes = attributes.to_h.symbolize_keys
      attributes[:registration_id] = Registration.decode_id(attributes[:registration_id])
      attributes[:amount] = attributes[:amount] / 100 if attributes.include?(:amount)

      ::AddPayment.call(
        current_user: current_user,
        attributes: attributes,
      ).payment
    end
  end
end
