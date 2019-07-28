module Queries
  module Pitch
    extend ActiveSupport::Concern

    included do
      field :pitch, Types::Pitch, null: true do
        description 'Get a blank pitch'
        argument :year, GraphQL::Types::ID, required: true
        argument :id, GraphQL::Types::ID, required: false
      end

      def pitch(year:, id: nil)
        pitches = festival(year: year).pitches

        if id.present?
          current_user&.pitches&.find_by_hashid(id)
        else
          pitches.build(user: environment.current_user)
        end
      end
    end
  end
end
