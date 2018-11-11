module Types
  class FestivalType < Types::BaseObject
    field :year, Integer, null: false
    field :start_date, Types::Date, null: false
    field :end_date, Types::Date, null: false
    field :activities, [ActivityType], null: false do
      argument :type, ActivityTypeType, 'Restrict activities by type', required: false
      argument :slug, String, 'Restrict activities by slug', required: false
    end

    def activities(type: nil, slug: nil)
      scope = object.activities
      scope = scope.of_type(type) if type.present?
      scope = scope.where(slug: slug) if slug.present?
      scope
    end
  end
end
