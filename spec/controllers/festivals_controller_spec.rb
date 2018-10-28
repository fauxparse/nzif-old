require 'rails_helper'

RSpec.describe FestivalsController, type: :request do
  subject { response }

  describe 'GET /' do
    before { get root_path }
    it { is_expected.to be_successful }
  end
end
