module Queries
  module Session
    extend ActiveSupport::Concern

    included do
      field :session, Types::Session, null: false do
        description 'Get details for a session'
        argument :id, GraphQL::Types::ID, required: true
      end

      def session(id:)
        ::Session.find(id)
      end
    end
  end
end
