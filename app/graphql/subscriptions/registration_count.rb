module Subscriptions
  module RegistrationCount
    extend ActiveSupport::Concern

    included do
      field :registration_count, Integer, null: true do
        description 'Updated count of completed registrations'
        argument :year, ::GraphQL::Types::ID, required: true
      end

      def registration_count(year:)
        Festival.by_year(year).first.registrations.complete.count
      end
    end
  end
end
