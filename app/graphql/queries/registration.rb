module Queries
  module Registration
    extend ActiveSupport::Concern

    included do
      field :registration, Types::Registration, null: false, description: 'Registration details' do
        argument :year, GraphQL::Types::ID, required: true
        argument :id, GraphQL::Types::ID, required: false
      end

      def registration(year:, id: nil)
        festival = ::Festival.by_year(year).first
        scope = festival.registrations.with_user.includes(:preferences)

        if id.present?
          scope.find_by_hashid(id)
        else
          user = environment.current_user
          scope.find_or_initialize_by(user: user)
        end
      end
    end
  end
end
