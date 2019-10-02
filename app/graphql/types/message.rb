module Types
  class Message < Types::BaseObject
    field :id, ID, null: false
    field :created_at, Types::Time, null: false
    field :subject, String, null: false
    field :body, String, null: false
  end
end
