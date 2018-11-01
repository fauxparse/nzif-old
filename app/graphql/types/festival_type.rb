module Types
  class FestivalType < Types::BaseObject
    field :year, Integer, null: false, description: 'Festival year'
    field :start_date, Types::Date, null: false, description: 'Festival start date'
    field :end_date, Types::Date, null: false, description: 'Festival end date'
    field :activities, [ActivityType], null: false, description: 'Festival activities' do
      argument :type, ActivityTypeType, 'Restrict activities by type', required: false
    end

    def activities(type: nil)
      scope = object.activities
      scope = scope.of_type(type) if type.present?
      scope
    end
  end
end
