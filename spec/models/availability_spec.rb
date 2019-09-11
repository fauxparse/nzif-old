require 'rails_helper'

RSpec.describe Availability, type: :model do
  subject(:availability) do
    build(:availability, session: session, registration: registration)
  end

  let(:session) { create(:session) }
  let(:registration) { create(:registration, festival: session.activity.festival) }

  it { is_expected.to be_valid }

  it 'allows multiple roles for the same session' do
    create(:availability, session: session, registration: registration, role: 'director')
    expect(availability).to be_valid
  end

  it 'validates uniqueness of role' do
    create(:availability, session: session, registration: registration)
    expect(availability).not_to be_valid
  end
end
