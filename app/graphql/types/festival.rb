module Types
  class Festival < Types::BaseObject
    field :year, ID, null: false
    field :start_date, Types::Date, null: false
    field :end_date, Types::Date, null: false
    field :activities, [Types::Activity], null: false do
      argument :type, ActivityType, 'Restrict activities by type', required: false
      argument :slug, String, 'Restrict activities by slug', required: false
    end
    field :days, [Types::Day], null: false

    def activities(type: nil, slug: nil)
      scope = object.activities.with_attached_image.order(:id)
      scope = scope.of_type(type) if type.present?
      scope = scope.where(slug: slug) if slug.present?
      scope
    end
  end
end
