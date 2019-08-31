module Queries
  module RegistrationCount
    extend ActiveSupport::Concern

    included do
      field :registration_count, Integer, null: false do
        description 'Get the count of completed registrations for the given year'
        argument :year, GraphQL::Types::ID, required: true
      end

      def registration_count(year:)
        festival(year: year)
          .registrations
          .complete
          .count
      end
    end
  end
end
