module Types
  class QueryType
    field :venues, [Types::Venue], null: false do
      description 'Get all venues'
    end

    def venues
      ::Venue.all
    end
  end
end
