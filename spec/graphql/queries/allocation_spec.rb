require 'rails_helper'

RSpec.describe Types::QueryType, type: :query do
  describe '#allocation' do
    subject(:result) do
      execute_query(query)
    end

    let(:query) do
      <<~QUERY
        {
          allocation(year: #{year}, seed: #{seed}) {
            seed
            timeslots {
              sessions {
                sessionId
                registrationIds
              }
              unallocated
            }
          }
        }
      QUERY
    end

    let(:seed) { 12345 }
    let(:year) { festival.year }
    let(:festival) { create(:festival) }
    let(:workshop) { create(:workshop, festival: festival) }
    let(:session) { create(:session, activity: workshop) }
    let!(:registration) { create(:registration, :complete, festival: festival) }
    let!(:preference) { session.preferences.create(registration: registration) }

    it 'calls the MatchWorkshops interactor' do
      expect(MatchWorkshops)
        .to receive(:call)
        .with(a_hash_including(festival: festival, seed: 12345))
        .and_call_original
      result
    end

    describe 'seed' do
      subject { result.dig(:data, :allocation, :seed) }

      it { is_expected.to eq '12345' }
    end

    describe 'timeslots' do
      subject(:timeslots) { result.dig(:data, :allocation, :timeslots) }

      it 'has the correct sessions' do
        expect(timeslots.first[:sessions].first).to match a_hash_including(
          session_id: session.to_param,
          registration_ids: [registration.to_param]
        )
      end

      it 'allocates everyone' do
        expect(timeslots.first[:unallocated]).to be_empty
      end
    end
  end
end
