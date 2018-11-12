module Types
  class MutationType
    field :create_activity, ActivityType, null: false, description: 'Create an activity' do
      argument :year, Integer, required: true
      argument :type, ActivityTypeType, required: true
      argument :attributes, ActivityAttributes, required: true
    end

    def create_activity(year:, type:, attributes:)
      CreateActivity.call(
        festival: festival_by_year(year),
        attributes: attributes.to_h.merge(type: type)
      ).activity
    end
  end
end
