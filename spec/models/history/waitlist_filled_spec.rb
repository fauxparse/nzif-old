require 'rails_helper'

RSpec.describe History::WaitlistFilled, type: :model do
  subject(:item) { History::WaitlistFilled.create(user: user, session: session) }

  let(:user) { create(:user) }
  let(:session) { create(:session) }

  it { is_expected.to be_valid }

  it 'has the correct description' do
    expect(item.description)
      .to eq "#{user.name} was added to #{session.activity.name} from the waitlist"
  end

  context 'when reloaded' do
    before do
      item.reload
    end

    its(:user) { is_expected.to eq user }
    its(:session) { is_expected.to eq session }
  end
end
