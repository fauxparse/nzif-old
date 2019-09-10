module Queries
  module Allocation
    extend ActiveSupport::Concern

    included do
      field :allocation, Types::Allocation, null: false, description: 'Propose allocation' do
        argument :year, GraphQL::Types::ID, required: true
        argument :seed, GraphQL::Types::BigInt, required: false
      end

      def allocation(year:, seed: nil)
        festival = ::Festival.by_year(year).first
        result = MatchWorkshops.call(festival: festival, seed: seed)
        timeslots = result.matches.map do |time, matches|
          sessions = matches.except('unallocated').map do |session_id, candidate_ids|
            {
              session_id: Session.encode_id(session_id),
              registration_ids: candidate_ids.map { |id| ::Registration.encode_id(id) },
            }
          end

          {
            starts_at: time,
            unallocated: (matches['unallocated'] || []).map { |id| ::Registration.encode_id(id) },
            sessions: sessions,
          }
        end

        { seed: result.seed, timeslots: timeslots }
      end
    end
  end
end
