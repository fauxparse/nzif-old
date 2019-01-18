require 'rails_helper'

RSpec.describe UpdateSession, type: :interactor do
  subject(:result) do
    UpdateSession.call(current_user: user, session: session, starts_at: starts_at, ends_at: ends_at)
  end

  let(:session) { FactoryBot.create(:session) }
  let(:starts_at) { session.starts_at + 1.hour }
  let(:ends_at) { session.ends_at }
  let(:user) { create(:admin) }

  describe '.call' do
    context 'with valid attributes' do
      it 'updates the start time' do
        expect { result }.to change { session.reload.starts_at }.by 1.hour
      end

      it 'does not update the end time' do
        expect { result }.not_to change { session.reload.ends_at }
      end
    end

    context 'with a bad end time' do
      let(:ends_at) { starts_at - 3.hours }

      it 'raises an error' do
        expect { result }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
