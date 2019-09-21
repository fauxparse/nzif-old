module Queries
  module Payments
    extend ActiveSupport::Concern

    included do
      field :payments, [Types::Payment], null: false do
        description 'Get all payments'
        argument :year, GraphQL::Types::ID, required: true
      end

      def payments(year:)
        festival = ::Festival.by_year(year).first
        ::Payment
          .includes(registration: :user)
          .references(:registration)
          .where(registrations: { festival_id: festival.id })
      end
    end
  end
end
