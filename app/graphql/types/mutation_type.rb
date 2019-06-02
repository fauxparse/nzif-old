module Types
  class MutationType < Types::BaseObject
    field :create_activity, mutation: Mutations::CreateActivity
    field :update_activity, mutation: Mutations::UpdateActivity
    field :update_content, mutation: Mutations::UpdateContent
    field :create_session, mutation: Mutations::CreateSession
    field :update_session, mutation: Mutations::UpdateSession
    field :delete_session, mutation: Mutations::DeleteSession
    field :update_pitch, mutation: Mutations::UpdatePitch
    field :delete_pitch, mutation: Mutations::DeletePitch
    field :update_user, mutation: Mutations::UpdateUser
    field :log_in, mutation: Mutations::LogIn
    field :log_out, mutation: Mutations::LogOut
    field :sign_up, mutation: Mutations::SignUp
    field :request_password_reset, mutation: Mutations::RequestPasswordReset
    field :reset_password, mutation: Mutations::ResetPassword
  end
end
