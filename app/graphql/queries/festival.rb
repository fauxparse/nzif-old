module Queries
  module Festival
    extend ActiveSupport::Concern

    included do
      field :festival, Types::Festival, null: false do
        description 'Get the current festival'
        argument :year, GraphQL::Types::ID, required: false
      end

      def festival(year: nil)
        if year
          ::Festival.by_year(year).first!
        else
          ::Festival.last!
        end
      end
    end
  end
end
