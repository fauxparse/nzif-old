require 'rails_helper'

RSpec.describe SurveyResponse, type: :model do
  subject(:survey_response) { build(:survey_response) }

  it { is_expected.to be_valid }
end
