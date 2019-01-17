require 'rails_helper'

RSpec.describe Activity, type: :model do
  subject(:activity) { build(:workshop) }

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

  describe '#url' do
    subject(:url) { activity.url }

    let(:activity) { build(:workshop, name: name, festival: festival).tap(&:validate) }
    let(:festival) { build_stubbed(:festival) }
    let(:name) { 'Werkshop' }

    it { is_expected.to eq '/2018/workshops/werkshop' }
  end

  describe '#slug=' do
    let(:another) { create(:workshop, festival: activity.festival) }

    before do
      activity.save!
      activity.update!(slug: another.slug)
    end

    it 'does not duplicate slugs' do
      expect(activity.slug).not_to eq another.slug
    end
  end
end
