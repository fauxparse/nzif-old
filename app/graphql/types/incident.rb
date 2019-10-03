module Types
  class Incident < Types::BaseObject
    field :id, ID, null: false
    field :body, String, null: false
    field :user, User, null: true
    field :state, String, null: false
    field :created_at, Types::Time, null: false
  end
end
