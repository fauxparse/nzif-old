module Queries
  module Registration
    extend ActiveSupport::Concern

    included do
      field :registration, Types::Registration, null: false, description: 'Registration details' do
        argument :year, GraphQL::Types::ID, required: true
      end

      def registration(year:)
        festival = ::Festival.by_year(year).first
        user = environment.current_user
        festival.registrations.find_or_initialize_by(user: user)
      end
    end
  end
end
