module Queries
  module Pitches
    extend ActiveSupport::Concern

    included do
      field :pitches, [Types::Pitch], null: false do
        description 'Get the list of pitches for the given year'
        argument :year, GraphQL::Types::ID, required: true
        argument :user_id, GraphQL::Types::ID, required: false
        argument :states, [String], required: false
      end

      def pitches(year:, user_id: nil, states: [])
        festival(year: year)
          .pitches
          .in_state(states)
          .newest_first
          .for_user(user_id)
          .merge(can?(:process, ::Pitch.new) ? ::Pitch.all : ::Pitch.where(user: current_user))
      end
    end
  end
end
