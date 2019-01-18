require 'rails_helper'

RSpec.describe UpdateActivity, type: :interactor do
  subject(:result) do
    UpdateActivity.call(current_user: user, activity: activity, attributes: attributes)
  end

  let(:user) { create(:admin) }
  let(:activity) { create(:workshop) }

  describe '.call' do
    context 'with valid attributes' do
      let(:attributes) { { name: 'Updated' } }

      it { is_expected.to be_a_success }

      it 'changes the activity name' do
        expect { result }.to change { activity.reload.name }.to 'Updated'
      end

      context 'with insufficient permissions' do
        let(:user) { create(:user) }

        it 'denies access' do
          expect { result }.to raise_error Interaction::AccessDenied
        end
      end
    end

    context 'with invalid attributes' do
      let(:attributes) { { name: nil } }

      it 'changes the activity name' do
        expect { result }.to raise_error ActiveRecord::RecordInvalid
      end
    end
  end
end
