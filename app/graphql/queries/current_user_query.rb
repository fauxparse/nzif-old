module Types
  class QueryType
    field :current_user, Types::User, null: true, description: 'Get the current logged-in user'

    def current_user
      context[:environment]&.current_user
    end
  end
end
