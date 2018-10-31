module Types
  class QueryType < Types::BaseObject
    field :festival, FestivalType, null: false do
      description 'Get the current festival'
      argument :year, Integer, required: false
    end

    def festival(year: nil)
      if year
        Festival.by_year(year).first!
      else
        Festival.last!
      end
    end
  end
end
