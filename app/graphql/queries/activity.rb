module Types
  class QueryType
    field :activity, Activity, null: false do
      description 'Get an activity by URL parameters'
      argument :year, ID, required: true
      argument :type, ActivityType, required: true
      argument :slug, String, required: true
    end

    def activity(year:, type:, slug:)
      ::Festival.
        by_year(year).
        first!.
        activities.
        of_type(type).
        with_attached_image.
        find_by!(slug: slug)
    end
  end
end
