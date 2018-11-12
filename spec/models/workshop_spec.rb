require 'rails_helper'

RSpec.describe Workshop, type: :model do
  describe '.to_param' do
    subject { Workshop.to_param }

    it { is_expected.to eq 'workshops' }
  end

  describe '#associated' do
    subject(:associated_shows) { workshop.associated }

    let!(:workshop) { create(:workshop) }
    let!(:show) { create(:show, name: workshop.name, festival: workshop.festival) }

    it { is_expected.to match a_collection_containing_exactly(show) }
  end
end
