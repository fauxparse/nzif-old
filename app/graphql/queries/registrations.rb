module Queries
  module Registrations
    extend ActiveSupport::Concern

    included do
      field :registrations, [Types::Registration], null: false do
        description 'Get all registrations'

        argument :year, GraphQL::Types::ID, required: true
      end

      def registrations(year:)
        festival(year: year)
          .registrations
          .with_preferences
          .with_user
          .select { |registration| can?(:read, registration) }
      end
    end
  end
end
