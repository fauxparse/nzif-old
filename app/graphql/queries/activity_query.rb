module Types
  class QueryType
    field :activity, ActivityType, null: false do
      argument :year, Integer, required: true
      argument :type, ActivityTypeType, required: true
      argument :slug, String, required: true
    end

    def activity(year:, type:, slug:)
      Activity.
        joins(:festival).
        merge(Activity.of_type(type)).
        merge(Festival.by_year(year)).
        find_by(slug: slug)
    end
  end
end
