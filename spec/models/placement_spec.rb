require 'rails_helper'

RSpec.describe Placement, type: :model do
  subject(:placement) do
    build(:placement, session: session, registration: registration)
  end

  let(:session) { create(:session) }
  let(:registration) { create(:registration, festival: festival) }
  let(:festival) { session.activity.festival }

  it { is_expected.to be_valid }

  it 'updates the registration’s placements_count' do
    expect { placement.save }.to change { registration.reload.placements_count }.by 1
  end

  it 'updates the session’s placements_count' do
    expect { placement.save }.to change { session.reload.placements_count }.by 1
  end

  context 'when trying to sign up for the same session twice' do
    before do
      registration.placements.create!(session: session)
    end

    it { is_expected.not_to be_valid }
  end

  context 'when trying to add the same participant multiple times' do
    before do
      session.placements.create!(registration: registration)
    end

    it { is_expected.not_to be_valid }
  end

  context 'when there is a timetable clash' do
    before do
      registration.placements.create!(session: other_session)
    end

    let(:other_session) { create(:session, activity: other_workshop) }
    let(:other_workshop) { create(:workshop, festival: festival) }

    it { is_expected.not_to be_valid }
  end
end
