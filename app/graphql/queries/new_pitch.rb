module Types
  class QueryType
    field :new_pitch, Types::Pitch, null: false do
      description 'Get a blank pitch'
      argument :year, ID, required: true
    end

    def new_pitch(year:)
      festival(year: year).pitches.new(user: environment.current_user)
    end
  end
end
