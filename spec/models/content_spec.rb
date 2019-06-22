require 'rails_helper'

RSpec.describe Content, type: :model do
  subject(:content) { create(:content, title: 'Lorem ipsum') }

  describe '#to_param' do
    subject { content.to_param }

    it { is_expected.to eq 'lorem-ipsum' }
  end

  context 'when updated' do
    it 'creates a version' do
      expect(content).to be_persisted
      expect { content.update(raw: 'Updated') }
        .to change { content.versions.length }
        .by 1
    end

    context 'without changes' do
      it 'does not create a new version' do
        expect(content).to be_persisted
        expect { content.save! }.not_to change(PaperTrail::Version, :count)
      end
    end
  end
end
