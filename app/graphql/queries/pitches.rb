module Types
  class QueryType
    field :pitches, [Types::Pitch], null: false do
      description 'Get the list of pitches for the given year'
      argument :year, ID, required: true
    end

    def pitches(year:)
      festival(year: year).
        pitches.
        newest_first.
        merge(can?(:manage, ::Pitch) ? ::Pitch.all : ::Pitch.where(user: current_user))
    end
  end
end
