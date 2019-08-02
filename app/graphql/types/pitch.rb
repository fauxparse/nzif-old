module Types
  class Pitch < Types::BaseObject
    field :id, ID, null: true
    field :festival, Types::Festival, null: false
    field :state, String, null: false
    field :name, String, null: true
    field :presenters, [Types::Pitch::PitchPresenter], null: false
    field :company, String, null: true
    field :bio, String, null: true
    field :availability, String, null: true
    field :presented_before, String, null: true
    field :code_of_conduct, Boolean, null: true
    field :activity_type, String, null: false
    field :workshop_description, String, null: true
    field :workshop_requirements, String, null: true
    field :activity_levels, [Types::WorkshopLevel], null: false
    field :participant_count, Integer, null: true
    field :taught_before, String, null: true
    field :teens, Boolean, null: true
    field :other_info, String, null: true
    field :show_description, String, null: true
    field :cast_size, Integer, null: true
    field :performed_before, String, null: true
    field :casting, String, null: true
    field :cast_details, String, null: true
    field :cast_requirements, String, null: true
    field :experience, String, null: true
    field :accessibility, String, null: true
    field :slots, [Types::Time], null: false
    field :pile, String, null: true
    field :gender, String, null: true
    field :origin, String, null: true

    def id
      object.to_param if object.persisted?
    end

    def presenters
      object.info.presenters.dup.tap do |presenters|
        presenters << default_presenter if presenters.empty?
      end
    end

    def state
      if can?(:update, Pitch)
        object.state
      else
        object.draft? ? 'draft' : 'submitted'
      end
    end

    delegate(
      :company,
      :bio,
      :availability,
      :presented_before,
      :code_of_conduct,
      :activity_type,
      :workshop_description,
      :workshop_requirements,
      :activity_levels,
      :participant_count,
      :taught_before,
      :teens,
      :other_info,
      :show_description,
      :cast_size,
      :performed_before,
      :casting,
      :cast_details,
      :cast_requirements,
      :experience,
      :accessibility,
      :slots,
      :pile,
      :gender,
      :origin,
      to: :info
    )
    delegate :info, to: :object

    private

    def default_presenter
      attributes = (object.user&.attributes || {}).with_indifferent_access
      attributes[:user_id] = attributes.delete(:id)
      ::Pitch::Presenter.new(attributes.slice(*::Pitch::Presenter.properties))
    end
  end
end
