require 'rails_helper'

RSpec.describe CreateActivity, type: :interactor do
  subject(:result) { CreateActivity.call(festival: festival, attributes: attributes) }

  let(:festival) { FactoryBot.create(:festival) }

  describe '.call' do
    context 'with valid attributes' do
      let(:attributes) { { name: 'My workshop', type: 'Workshop' } }

      it { is_expected.to be_a_success }
    end

    context 'without a name' do
      let(:attributes) { { type: 'Workshop' } }

      it 'raises an error' do
        expect { result }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'without a type' do
      let(:attributes) { { name: 'My workshop' } }

      it 'raises an error' do
        expect { result }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
