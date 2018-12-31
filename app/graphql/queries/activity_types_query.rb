module Types
  class QueryType
    field :activity_types, [ActivityTypeType], null: false do
      description 'Get the list of available activity types'
    end

    def activity_types
      %w(Workshop Show)
    end
  end
end
