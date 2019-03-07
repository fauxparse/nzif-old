module Types
  class Pitch < Types::BaseObject
    field :id, ID, null: true
    field :festival, Types::Festival, null: false
    field :presenters, [Types::Pitch::Presenter], null: false
    field :company, String, null: true
    field :bio, String, null: true
    field :availability, String, null: true
    field :presented_before, String, null: true
    field :code_of_conduct, Boolean, null: true

    def id
      object.to_param if object.persisted?
    end

    def presenters
      object.info.presenters.dup.tap do |presenters|
        presenters << default_presenter if presenters.empty?
      end
    end

    delegate :company, :bio, :availability, :presented_before, :code_of_conduct, to: :info
    delegate :info, to: :object

    private

    def default_presenter
      attributes = (object.user&.attributes || {}).with_indifferent_access
      ::Pitch::Presenter.new(attributes.slice(*::Pitch::Presenter.properties))
    end
  end
end
