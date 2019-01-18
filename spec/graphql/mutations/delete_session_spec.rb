require 'rails_helper'

RSpec.describe Mutations::DeleteSession, type: :mutation do
  subject(:result) do
    execute_query(query, variables: variables, as: user)
  end

  let(:query) do
    <<~QUERY
      mutation test($id: ID!) {
        deleteSession(id: $id)
      }
    QUERY
  end
  let(:variables) do
    {
      id: session.id,
    }
  end
  let(:session) { double(:session, id: 123) }
  let(:user) { create(:admin) }

  context 'when the session exists' do
    before do
      allow(Session).to receive(:find).with('123').and_return(session)
    end

    it 'calls the DeleteSession service and returns true' do
      expect(DeleteSession).
        to receive(:call).
        with(current_user: user, session: session).
        and_return(Interactor::Context.build)
      expect(result.dig(:data, :delete_session)).to be true
    end
  end

  context 'when the session does not exist' do
    before do
      allow(Session).to receive(:find).with('123').and_raise ActiveRecord::RecordNotFound
    end

    it 'returns false' do
      expect(DeleteSession).not_to receive(:call)
      expect(result.dig(:data, :delete_session)).to be false
    end
  end
end
