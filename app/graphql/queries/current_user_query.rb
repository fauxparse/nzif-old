module Types
  class QueryType
    field :current_user, UserType, null: true, description: 'Get the current logged-in user'

    def current_user
      context[:environment]&.current_user
    end
  end
end
