module Types
  class Pitch < Types::BaseObject
    field :id, ID, null: true
    field :festival, [Types::Festival], null: false
    field :presenters, [Types::Pitch::Presenter], null: false
    field :company, String, null: true
    field :bio, String, null: true
    field :availability, String, null: true
    field :presented_before, String, null: true
    field :code_of_conduct, Boolean, null: true

    def id
      object.to_param
    end

    delegate :company, :bio, :availability, :presented_before, :code_of_conduct, :presenters,
      to: :info
    delegate :info, to: :object
  end
end
