module Types
  class PaymentAttributes < BaseInputObject
    description 'Attributes for creating or updating a payment'
    argument :registration_id, GraphQL::Types::ID, required: false
    argument :type, Types::PaymentType, required: false
    argument :payment_method, Types::PaymentType, required: false
    argument :amount, Integer, required: false
    argument :description, String, required: false
    argument :state, String, required: false
  end
end
