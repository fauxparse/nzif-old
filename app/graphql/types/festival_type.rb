module Types
  class FestivalType < Types::BaseObject
    field :year, Integer, null: false, description: 'Festival year'
    field :start_date, String, null: false, description: 'Festival start date'
    field :end_date, String, null: false, description: 'Festival end date'
  end
end
