module Types
  class QueryType
    field :activity, ActivityType, null: false do
      description 'Get an activity by URL parameters'
      argument :year, Integer, required: true
      argument :type, ActivityTypeType, required: true
      argument :slug, String, required: true
    end

    def activity(year:, type:, slug:)
      Festival.
        by_year(year).
        first!.
        activities.
        of_type(type).
        find_by!(slug: slug)
    end
  end
end
