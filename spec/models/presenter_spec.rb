require 'rails_helper'

RSpec.describe Presenter, type: :model do
  subject(:presenter) { create(:presenter) }

  it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:activity_id) }
end
