module Types
  class ActivityType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :type, ActivityTypeType, null: false
    field :slug, String, null: false
    field :description, String, null: true
    field :festival, FestivalType, null: false
    field :url, String, null: false
    field :associated, [ActivityType], null: false

    def url
      "/#{object.festival.year}/#{object.class.to_param}/#{object.slug}"
    end
  end
end
