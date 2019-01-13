module Types
  class Activity < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :type, ActivityType, null: false
    field :slug, String, null: false
    field :description, String, null: true
    field :festival, Types::Festival, null: false
    field :url, String, null: false
    field :associated, [Activity], null: false
    field :sessions, [Session], null: false
  end
end
