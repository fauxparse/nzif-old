module Types
  class QueryType
    field :activities, [ActivityType], null: false do
      argument :year, Integer, required: true
      argument :type, ActivityTypeType, required: false
    end

    def activities(year:, type: nil)
      (type ? Activity.of_type(type) : Activity).
        joins(:festival).
        merge(Festival.by_year(year))
    end
  end
end
