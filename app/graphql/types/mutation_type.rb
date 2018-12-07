module Types
  class MutationType < Types::BaseObject
    field :create_activity, mutation: Mutations::CreateActivity
    field :create_session, mutation: Mutations::CreateSession
    field :update_session, mutation: Mutations::UpdateSession
    field :log_in, mutation: Mutations::LogIn
    field :log_out, mutation: Mutations::LogOut
    field :sign_up, mutation: Mutations::SignUp
  end
end
