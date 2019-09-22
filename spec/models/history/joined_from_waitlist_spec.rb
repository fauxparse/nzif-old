require 'rails_helper'

RSpec.describe History::JoinedFromWaitlist, type: :model do
  subject(:item) { History::JoinedFromWaitlist.create(user: user, session: session) }

  let(:user) { create(:user) }
  let(:session) { create(:session) }

  it { is_expected.to be_valid }

  it 'has the correct description' do
    expect(item.description)
      .to eq "#{user.name} joined #{session.activity.name} (Saturday 2:00 PM) from the waitlist"
  end

  context 'when reloaded' do
    before do
      item.reload
    end

    its(:user) { is_expected.to eq user }
    its(:session) { is_expected.to eq session }
  end
end
