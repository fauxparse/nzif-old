module Types
  class QueryType
    field :sessions, [SessionType], null: false do
      description 'Get all activity sessions for the current festival'
      argument :year, Integer, required: true
    end

    def sessions(year:)
      Festival.by_year(year).first!.sessions
    end
  end
end
