module Queries
  module Sessions
    extend ActiveSupport::Concern

    included do
      field :sessions, [Types::Session], null: false do
        description 'Get all activity sessions for the current festival'
        argument :year, GraphQL::Types::ID, required: true
        argument :type, Types::ActivityType, required: false
        argument :presenter, GraphQL::Types::ID, required: false
      end

      def sessions(year:, type: nil, presenter: nil)
        scope = ::Festival.by_year(year).first!.sessions
        scope = scope.send(type.underscore) if type.present?
        scope = scope.presented_by(presenter) if presenter.present?
        scope
      end
    end
  end
end
