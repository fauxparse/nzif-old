module Queries
  module SurveyResponse
    extend ActiveSupport::Concern

    included do
      field :survey_response, Types::Incident, null: true do
        argument :session_id, GraphQL::Types::ID, required: true
      end

      def survey_response(session_id:)
        return nil if current_user.blank?

        ::SurveyResponse
          .joins(:session, :registration)
          .where(sessions: { id: ::Session.decode_id(session_id) })
          .find_by(registrations: { user_id: current_user.id })
      end
    end
  end
end
