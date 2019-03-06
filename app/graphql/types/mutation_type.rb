module Types
  class MutationType < Types::BaseObject
    field :create_activity, mutation: Mutations::CreateActivity
    field :update_activity, mutation: Mutations::UpdateActivity
    field :create_session, mutation: Mutations::CreateSession
    field :update_session, mutation: Mutations::UpdateSession
    field :delete_session, mutation: Mutations::DeleteSession
    field :update_pitch, mutation: Mutations::UpdatePitch
    field :update_user, mutation: Mutations::UpdateUser
    field :log_in, mutation: Mutations::LogIn
    field :log_out, mutation: Mutations::LogOut
    field :sign_up, mutation: Mutations::SignUp
  end
end
