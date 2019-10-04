module Queries
  module Incidents
    extend ActiveSupport::Concern

    included do
      field :incidents, [Types::Incident], null: false do
        argument :year, GraphQL::Types::ID, required: true
      end

      def incidents(year:)
        ::Festival.by_year(year).first!.incidents.includes(:user).all
      end
    end
  end
end
