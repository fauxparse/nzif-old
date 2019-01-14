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

  describe '#levels' do
    subject(:levels) { workshop.levels }

    let(:workshop) do
      create(:workshop, levels: %w(intermediate advanced))
    end

    it { is_expected.to be_an_instance_of Set }
    it { is_expected.to include 'intermediate' }

    context 'when reloaded' do
      before { workshop.reload }

      it { is_expected.to be_an_instance_of Set }
    end

    context 'when passed invalid levels' do
      before { workshop.levels = %w(baby) }

      it 'is invalid' do
        expect(workshop).not_to be_valid
        expect(workshop).to have_exactly(1).error_on(:levels)
      end
    end
  end
end
