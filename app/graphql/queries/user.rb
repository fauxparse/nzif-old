module Queries
  module User
    extend ActiveSupport::Concern

    included do
      field :user, Types::User, null: false do
        description 'Get all users'
        argument :id, ::GraphQL::Types::ID, required: false
      end

      def user(id: nil)
        if id.present?
          ::User.find(id)
        else
          environment.current_user
        end
      end
    end
  end
end
