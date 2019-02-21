module Types
  class Day < Types::BaseObject
    field :date, Types::Date, null: false
    field :activities, [Types::Activity], null: false do
      argument :type, ActivityType, 'Restrict activities by type', required: false
    end

    def activities(type: nil)
      object.activities.of_type(type).order('sessions.starts_at ASC, name ASC')
    end
  end
end
