module Queries
  module Users
    extend ActiveSupport::Concern

    included do
      field :users, [Types::User], null: false do
        description 'Get all users'
      end

      def users
        ::User.all
      end
    end
  end
end
