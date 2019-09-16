module Types
  class PaymentAttributes < BaseInputObject
    description 'Attributes for creating or updating a payment'
    argument :payment_method, Types::PaymentMethod, required: true
    argument :amount, Integer, required: true
  end
end
