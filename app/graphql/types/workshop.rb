module Types
  class Workshop < Types::BaseObject
    implements Types::Activity

    field :levels, [WorkshopLevel], null: false
  end
end
