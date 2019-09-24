module Queries
  module Registrations
    extend ActiveSupport::Concern

    included do
      field :registrations, [Types::Registration], null: false do
        description 'Get all registrations'

        argument :year, GraphQL::Types::ID, required: true
        argument :state, String, required: false
      end

      def registrations(year:, state: nil)
        scope = festival(year: year)
          .registrations
          .with_preferences
          .with_user
        scope = scope.send(state) if state.present?
        scope.select { |registration| can?(:read, registration) }
      end
    end
  end
end
