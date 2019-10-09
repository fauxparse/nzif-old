require 'rails_helper'

RSpec.describe CalendarExclusion, type: :model do
  subject(:calendar_exclusion) { build(:calendar_exclusion) }

  it { is_expected.to be_valid }
end
