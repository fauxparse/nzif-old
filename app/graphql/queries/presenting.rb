module Queries
  module Presenting
    extend ActiveSupport::Concern

    included do
      field :presenting, [Types::Session], null: false do
        description 'List sessions presented by the current user'
        argument :year, GraphQL::Types::ID, required: true
      end

      def presenting(year:)
        return [] if current_user.blank?

        festival(year: year)
          .sessions
          .joins(activity: :presenters)
          .where(presenters: { user_id: current_user.id })
      end
    end
  end
end
