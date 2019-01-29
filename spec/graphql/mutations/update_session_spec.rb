require 'rails_helper'

RSpec.describe Mutations::UpdateSession, type: :mutation do
  subject(:result) do
    execute_query(query, variables: variables, as: user)
  end

  let(:session) { create(:session) }
  let(:starts_at) { session.starts_at + 1.hour }
  let(:ends_at) { session.ends_at }
  let(:query) do
    <<~QUERY
      mutation test($id: ID!, $startsAt: Time!, $endsAt: Time!) {
        updateSession(id: $id, attributes: { startsAt: $startsAt, endsAt: $endsAt }) {
          startsAt
          endsAt
        }
      }
    QUERY
  end
  let(:variables) do
    {
      id: session.id,
      startsAt: starts_at.iso8601,
      endsAt: ends_at.iso8601,
    }
  end
  let(:user) { create(:admin) }

  context 'with valid attributes' do
    let(:updated_session) do
      double(:session, starts_at: starts_at, ends_at: ends_at)
    end

    it 'calls the UpdateSession service' do
      expect(UpdateSession).
        to receive(:call).
        with(
          current_user: user,
          session: session,
          attributes: { starts_at: starts_at, ends_at: ends_at }
        ).
        and_return(Interactor::Context.build(session: updated_session))
      expect(result.dig(:data, :update_session, :starts_at)).to eq starts_at.iso8601
    end
  end
end
