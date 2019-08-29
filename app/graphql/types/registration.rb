module Types
  class Registration < Types::BaseObject
    field :id, GraphQL::Types::ID, null: true
    field :user, Types::User, null: true
    field :state, String, null: false
    field :name, String, null: true
    field :email, String, null: true
    field :phone, String, null: true
    field :festival, Types::Festival, null: false
    field :code_of_conduct_accepted_at, Types::Time, null: true
    field :preferences, [Preference], null: false
    field :availability, [Availability], null: false
    field :prices, [Integer], null: false

    def id
      object.to_param
    end

    def name
      object.user&.name
    end

    def email
      object.user&.email
    end

    def phone
      object.user&.phone
    end

    def preferences
      object.preferences.sort_by { |preference| [preference.starts_at, preference.position] }
    end
  end
end
