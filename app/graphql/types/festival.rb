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
    field :sessions, [Types::Session], null: false do
      argument :type, ActivityType, 'Restrict activities by type', required: false
    end
    field :slots, [Types::Slot], null: false
    field :state, String, null: false
    field :deadline, Types::Time, null: true
    field :programme_launched, GraphQL::Types::Boolean, null: false
    field :root, String, null: false
    field :admin_root, String, null: false
    field :panic, GraphQL::Types::Boolean, null: false

    def activities(type: nil, slug: nil)
      scope = object.activities.with_attached_image.order(:id)
      scope = scope.of_type(type) if type.present?
      scope = scope.where(slug: slug) if slug.present?
      scope
    end

    def sessions(type: nil)
      ::Session
        .includes(:activity)
        .references(:activity)
        .merge(::Activity.of_type(type))
        .where({ activities: { festival_id: object.id } })
    end

    def programme_launched
      object.programme_launched?
    end

    def root
      "/#{object.year}"
    end

    def admin_root
      "/admin#{root}"
    end
  end
end
