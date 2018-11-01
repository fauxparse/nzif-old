module Types
  class MutationType
    field :create_activity, ActivityType, null: false, description: 'Create an activity' do
      argument :year, Integer, required: true
      argument :type, ActivityTypeType, required: true
      argument :attributes, ActivityAttributes, required: true
    end

    def create_activity(year:, type:, attributes:)
      festival_by_year(year).
        activities.
        create!(attributes.to_h.merge(type: type))
    end
  end
end
