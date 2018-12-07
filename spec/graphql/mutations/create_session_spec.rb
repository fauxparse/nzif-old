require 'rails_helper'

RSpec.describe Types::QueryType, type: :mutation do
  describe '#create_session' do
    subject(:result) do
      execute_query(query, variables: variables)
    end

    let(:activity) { create(:workshop) }
    let(:festival) { activity.festival }
    let(:query) do
      <<~QUERY
        mutation test($activityId: ID!, $startsAt: Time!, $endsAt: Time!) {
          createSession(activityId: $activityId, startsAt: $startsAt, endsAt: $endsAt) {
            startsAt
            endsAt
          }
        }
      QUERY
    end
    let(:start_time) { festival.start_date.midnight.change(hour: 10) }
    let(:end_time) { start_time + 3.hours }
    let(:variables) do
      {
        activityId: activity.id,
        startsAt: start_time.iso8601,
        endsAt: end_time.iso8601,
      }
    end
    let(:session) { double(:session, activity: activity, starts_at: start_time, ends_at: end_time) }

    it 'calls the CreateSession service' do
      expect(CreateSession).
        to receive(:call).
        with(a_hash_including(activity: activity, starts_at: start_time, ends_at: end_time)).
        and_return(Interactor::Context.build(session: session))
      expect(result.dig(:data, :create_session)).to be_present
    end
  end
end
