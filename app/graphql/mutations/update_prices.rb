module Mutations
  class UpdatePrices < BaseMutation
    description 'Update workshop prices'
    payload_type [Types::Price]
    null false

    argument :year, GraphQL::Types::ID, required: true
    argument :prices, [Integer], required: true

    def resolve(year:, prices:)
      festival = Festival.by_year(year).first

      ::UpdatePrices.call(
        festival: festival,
        current_user: current_user,
        prices: prices,
      )

      festival.prices.by_quantity.all
    end
  end
end
