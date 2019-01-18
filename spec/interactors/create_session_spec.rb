require 'rails_helper'

RSpec.describe CreateSession, type: :interactor do
  subject(:result) do
    CreateSession.call(
      current_user: user,
      activity: activity,
      starts_at: starts_at,
      ends_at: ends_at
    )
  end

  let(:activity) { FactoryBot.create(:workshop) }
  let(:user) { create(:admin) }

  describe '.call' do
    let(:starts_at) { activity.festival.start_date.midnight.change(hour: 10) }
    let(:ends_at) { starts_at + 3.hours }

    context 'with valid attributes' do
      it { is_expected.to be_a_success }
    end

    context 'with a bad end time' do
      let(:ends_at) { starts_at - 3.hours }

      it 'raises an error' do
        expect { result }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
