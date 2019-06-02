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
    field :slots, [Types::Slot], null: false
    field :pitches_open, GraphQL::Types::Boolean, null: false
    field :pitches_close_at, Types::Time, null: true
    field :programme_launched, GraphQL::Types::Boolean, null: false

    def activities(type: nil, slug: nil)
      scope = object.activities.with_attached_image.order(:id)
      scope = scope.of_type(type) if type.present?
      scope = scope.where(slug: slug) if slug.present?
      scope
    end

    def pitches_open
      object.pitches_open?
    end

    def pitches_close_at
      object.pitches_open_at && object.pitches_close_at
    end

    def programme_launched
      object.programme_launched?
    end
  end
end
