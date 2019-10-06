module Types
  class MutationType < Types::BaseObject
    field :add_payment, mutation: Mutations::AddPayment
    field :create_activity, mutation: Mutations::CreateActivity
    field :create_incident, mutation: Mutations::CreateIncident
    field :create_message, mutation: Mutations::CreateMessage
    field :create_session, mutation: Mutations::CreateSession
    field :create_survey_response, mutation: Mutations::CreateSurveyResponse
    field :create_venue, mutation: Mutations::CreateVenue
    field :delete_pitch, mutation: Mutations::DeletePitch
    field :delete_session, mutation: Mutations::DeleteSession
    field :delete_venue, mutation: Mutations::DeleteVenue
    field :finalize_allocation, mutation: Mutations::FinalizeAllocation
    field :log_in, mutation: Mutations::LogIn
    field :log_out, mutation: Mutations::LogOut
    field :panic_mode, mutation: Mutations::PanicMode
    field :promote_pitch, mutation: Mutations::PromotePitch
    field :request_password_reset, mutation: Mutations::RequestPasswordReset
    field :resend_itinerary, mutation: Mutations::ResendItinerary
    field :reset_password, mutation: Mutations::ResetPassword
    field :sign_up, mutation: Mutations::SignUp
    field :update_activity, mutation: Mutations::UpdateActivity
    field :update_content, mutation: Mutations::UpdateContent
    field :update_incident, mutation: Mutations::UpdateIncident
    field :update_payment, mutation: Mutations::UpdatePayment
    field :update_pitch, mutation: Mutations::UpdatePitch
    field :update_registration, mutation: Mutations::UpdateRegistration
    field :update_roll, mutation: Mutations::UpdateRoll
    field :update_session, mutation: Mutations::UpdateSession
    field :update_user, mutation: Mutations::UpdateUser
    field :update_venue, mutation: Mutations::UpdateVenue
  end
end
