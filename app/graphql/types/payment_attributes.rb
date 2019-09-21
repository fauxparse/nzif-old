module Types
  class PaymentAttributes < BaseInputObject
    description 'Attributes for creating or updating a payment'
    argument :payment_method, Types::PaymentType, required: false
    argument :amount, Integer, required: false
    argument :state, String, required: false
  end
end
