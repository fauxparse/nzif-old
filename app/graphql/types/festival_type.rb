module Types
  class FestivalType < Types::BaseObject
    field :start_date, String, null: false
    field :end_date, String, null: false
  end
end
