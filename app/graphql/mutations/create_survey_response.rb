module Mutations
  class CreateSurveyResponse < BaseMutation
    payload_type Types::SurveyResponse
    null false

    argument :session_id, ID, required: true
    argument :expectations, Integer, required: false
    argument :difficulty, Integer, required: false
    argument :good, String, required: false
    argument :bad, String, required: false
    argument :testimonial, String, required: false

    def resolve(session_id:, **attributes)
      ::CreateSurveyResponse.call(
        current_user: current_user,
        session: ::Session.find(session_id),
        attributes: attributes,
      ).response
    end
  end
end
