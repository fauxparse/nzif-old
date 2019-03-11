module Queries
  module Pitch
    extend ActiveSupport::Concern

    included do
      field :pitch, Types::Pitch, null: false do
        description 'Get a blank pitch'
        argument :year, GraphQL::Types::ID, required: true
        argument :id, GraphQL::Types::ID, required: false
      end

      def pitch(year:, id: nil)
        pitches = festival(year: year).pitches
        id.present? ? pitches.find_by_hashid(id) : pitches.build(user: environment.current_user)
      end
    end
  end
end
