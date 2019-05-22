require 'rails_helper'

RSpec.describe Content, type: :model do
  subject(:content) { create(:content) }

  it { is_expected.to validate_uniqueness_of(:slug) }

  describe '#to_param' do
    subject { content.to_param }

    it { is_expected.to eq content.slug }
  end

  context 'when updated' do
    it 'creates a version' do
      expect { content.update(raw: 'Updated') }.
        to change { content.versions.length }.
        by 1
    end
  end
end
