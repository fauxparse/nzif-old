module Types
  class Price < Types::BaseObject
    field :quantity, Integer, null: false
    field :amount, Integer, null: false

    def amount
      object.amount_cents
    end
  end
end
