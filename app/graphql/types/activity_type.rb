module Types
  class ActivityType < Types::BaseObject
    include Rails.application.routes.url_helpers

    field :name, String, null: false
    field :type, ActivityTypeType, null: false
    field :slug, String, null: false
    field :description, String, null: true
    field :festival, FestivalType, null: false
    field :url, String, null: false
    field :associated, [ActivityType], null: false

    def url
      polymorphic_url(object, only_path: true)
    end
  end
end
