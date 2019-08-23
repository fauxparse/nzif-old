module Types
  class Registration < Types::BaseObject
    field :user, Types::User, null: true
    field :name, String, null: true
    field :email, String, null: true
    field :phone, String, null: true
    field :festival, Types::Festival, null: false
    field :code_of_conduct_accepted_at, Types::Time, null: true
    field :preferences, [Preference], null: false
    field :prices, [Integer], null: false

    def name
      object.user&.name
    end

    def email
      object.user&.email
    end

    def phone
      object.user&.phone
    end
  end
end
