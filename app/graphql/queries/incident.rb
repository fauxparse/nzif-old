module Queries
  module Incident
    extend ActiveSupport::Concern

    included do
      field :incident, Types::Incident, null: false do
        argument :id, GraphQL::Types::ID, required: true
      end

      def incident(id:)
        ::Incident.includes(:user).find(id).tap do |incident|
          raise Interaction::AccessDenied unless can?(:read, incident)
        end
      end
    end
  end
end
