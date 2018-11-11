require 'rails_helper'

RSpec.describe Activity, type: :model do
  subject(:activity) { create(:workshop) }

  it { is_expected.to be_valid }

  describe '#slug' do
    subject(:slug) { activity.slug }

    let(:activity) { create(:workshop, name: name, festival: festival) }
    let(:festival) { create(:festival) }
    let(:name) { 'Werkshop' }

    it { is_expected.to eq 'werkshop' }

    context 'when an activity with that name already exists' do
      before { create(:workshop, name: name, festival: festival) }

      it { is_expected.to end_with(/\d+/) }
    end

    context 'when there is an activity of the same name but a different type' do
      before { create(:show, name: name, festival: festival) }

      it { is_expected.not_to end_with(/\d+/) }
    end
  end
end