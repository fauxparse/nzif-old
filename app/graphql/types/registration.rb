module Types
  class Registration < Types::BaseObject
    field :id, GraphQL::Types::ID, null: true
    field :user, Types::User, null: true
    field :state, String, null: false
    field :name, String, null: true
    field :email, String, null: true
    field :phone, String, null: true
    field :city, String, null: true
    field :festival, Types::Festival, null: false
    field :code_of_conduct_accepted_at, Types::Time, null: true
    field :preferences, [Preference], null: false
    field :workshops, [GraphQL::Types::ID], null: false
    field :waitlists, [GraphQL::Types::ID], null: false
    field :excluded, [GraphQL::Types::ID], null: false
    field :availability, [Availability], null: false
    field :prices, [Integer], null: false
    field :payments, [Types::Payment], null: false
    field :total_to_pay, Integer, null: false
    field :completed_at, Types::Time, null: true

    def id
      object.persisted? ? object.to_param : nil
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

    def city
      object.user&.city
    end

    def preferences
      object.preferences.sort_by { |preference| [preference.starts_at, preference.position] }
    end

    def prices
      object.prices.values.sort
    end

    def workshops
      encode_session_ids(object.placements)
    end

    def waitlists
      encode_session_ids(object.waitlists)
    end

    def excluded
      encode_session_ids(object.calendar_exclusions)
    end

    def payments
      object.payments.all.reject(&:cancelled?)
    end

    def total_to_pay
      object.cart.total_to_pay - object.cart.pending
    end

    def encode_session_ids(scope)
      scope.all.map { |record| ::Session.encode_id(record.session_id) }
    end
  end
end
