module Queries
  module Venues
    extend ActiveSupport::Concern

    included do
      field :venues, [Types::Venue], null: false do
        description 'Get all venues'
      end

      def venues
        ::Venue.all
      end
    end
  end
end
