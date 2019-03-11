module Queries
  module ActivityTypes
    extend ActiveSupport::Concern

    included do
      field :activity_types, [Types::ActivityType], null: false do
        description 'Get the list of available activity types'
      end

      def activity_types
        %w(Workshop Show)
      end
    end
  end
end
