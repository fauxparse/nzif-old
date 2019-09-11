module Types
  class MutationType < Types::BaseObject
    field :create_activity, mutation: Mutations::CreateActivity
    field :create_session, mutation: Mutations::CreateSession
    field :delete_pitch, mutation: Mutations::DeletePitch
    field :delete_session, mutation: Mutations::DeleteSession
    field :finalize_allocation, mutation: Mutations::FinalizeAllocation
    field :log_in, mutation: Mutations::LogIn
    field :log_out, mutation: Mutations::LogOut
    field :panic_mode, mutation: Mutations::PanicMode
    field :promote_pitch, mutation: Mutations::PromotePitch
    field :request_password_reset, mutation: Mutations::RequestPasswordReset
    field :reset_password, mutation: Mutations::ResetPassword
    field :sign_up, mutation: Mutations::SignUp
    field :update_activity, mutation: Mutations::UpdateActivity
    field :update_content, mutation: Mutations::UpdateContent
    field :update_pitch, mutation: Mutations::UpdatePitch
    field :update_registration, mutation: Mutations::UpdateRegistration
    field :update_session, mutation: Mutations::UpdateSession
    field :update_user, mutation: Mutations::UpdateUser
  end
end
