require 'rails_helper'

RSpec.describe MatchWorkshops, type: :interactor do
  subject(:result) do
    MatchWorkshops.call(festival: festival, seed: seed)
  end

  let(:festival) { create(:festival) }

  let(:workshops) { create_list(:workshop, 3, festival: festival) }

  let!(:sessions) do
    workshops.map { |workshop| create(:session, activity: workshop, capacity: 5) }
  end

  let!(:registrations) do
    srand(seed)
    create_list(:registration, 16, festival: festival).each do |registration|
      sessions.shuffle[0, rand(sessions.size) + 1].each do |session|
        registration.preferences.create!(session: session)
      end
    end
  end

  let(:seed) { 12345 }

  describe '.call' do
    it { is_expected.to be_success }
  end

  describe '#matches' do
    subject(:matches) { result.matches }

    it { is_expected.to include(sessions.first.starts_at) }

    describe '[\'unallocated\']' do
      subject(:unallocated) { matches[sessions.first.starts_at]['unallocated'] }

      it { is_expected.to have(1).item }
    end
  end
end
