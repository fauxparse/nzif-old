require 'rails_helper'

RSpec.describe Waitlist, type: :model do
  subject(:waitlist) { build(:waitlist, session: session, registration: registration) }

  let(:session) { create(:session) }
  let(:registration) { create(:registration, festival: session.activity.festival) }

  it { is_expected.to be_valid }
end
