require 'rails_helper'

RSpec.describe CreateIncident, type: :interactor do
  subject(:result) { CreateIncident.call(**parameters) }

  let(:parameters) do
    {
      festival: festival,
      current_user: user,
      body: 'Something bad happened',
      anonymous: anonymous,
    }
  end

  let(:festival) { create(:festival) }
  let(:user) { create(:user) }
  let(:anonymous) { false }
  let(:incident) { result.incident }

  describe '.call' do
    it 'creates an incident record' do
      expect { result }.to change(festival.incidents.open, :count).by(1)
    end

    it 'associates the incident with the current user' do
      expect(incident.user).to eq user
    end

    context 'when anonymous' do
      let(:anonymous) { true }

      it 'creates an incident record' do
        expect { result }.to change(festival.incidents.open, :count).by(1)
      end

      it 'does not associate the incident with the current user' do
        expect(incident).to be_anonymous
      end
    end
  end
end
