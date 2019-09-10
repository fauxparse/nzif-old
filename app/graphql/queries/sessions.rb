module Queries
  module Sessions
    extend ActiveSupport::Concern

    included do
      field :sessions, [Types::Session], null: false do
        description 'Get all activity sessions for the current festival'
        argument :year, GraphQL::Types::ID, required: true
        argument :type, Types::ActivityType, required: false
      end

      def sessions(year:, type: nil)
        scope = ::Festival.by_year(year).first!.sessions
        scope = scope.send(type.underscore) if type.present?
        scope
      end
    end
  end
end
