module Types
  class QueryType
    field :festival, Types::Festival, null: false do
      description 'Get the current festival'
      argument :year, ID, required: false
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
