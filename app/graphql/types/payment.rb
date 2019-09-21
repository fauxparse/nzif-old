module Types
  class Payment < Types::BaseObject
    field :id, GraphQL::Types::ID, null: false
    field :type, Types::PaymentType, null: false
    field :amount, Integer, null: false
    field :state, String, null: false
    field :reference, String, null: true
    field :created_at, Types::Time, null: false
    field :registration, Types::Registration, null: false

    def amount
      object.amount_cents
    end
  end
end
