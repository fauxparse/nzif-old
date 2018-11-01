module Types
  class QueryType
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

    field :workshop, ActivityType, null: false do
      argument :year, Integer, required: true
      argument :slug, String, required: true
    end

    def workshop(year:, slug:)
      Workshop.
        joins(:festival).
        merge(Festival.by_year(year)).
        find_by(slug: slug)
    end
  end
end
