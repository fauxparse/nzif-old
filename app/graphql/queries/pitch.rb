module Types
  class QueryType
    field :pitch, Types::Pitch, null: false do
      description 'Get a blank pitch'
      argument :year, ID, required: true
      argument :id, ID, required: false
    end

    def pitch(year:, id: nil)
      pitches = festival(year: year).pitches
      id.present? ? pitches.find_by_hashid(id) : pitches.build(user: environment.current_user)
    end
  end
end
