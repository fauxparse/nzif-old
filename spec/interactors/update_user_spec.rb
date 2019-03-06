require 'rails_helper'

RSpec.describe UpdateUser, type: :interactor do
  subject(:result) do
    UpdateUser.call(current_user: current_user, user: user, attributes: attributes)
  end

  let(:user) { create(:user) }
  let(:current_user) { create(:admin) }

  describe '.call' do
    context 'with valid attributes' do
      let(:attributes) { { name: 'Updated' } }

      it { is_expected.to be_a_success }

      it 'changes the user’s name' do
        expect { result }.to change { user.reload.name }.to 'Updated'
      end

      context 'with insufficient permissions' do
        let(:current_user) { create(:user) }

        it 'denies access' do
          expect { result }.to raise_error Interaction::AccessDenied
        end
      end
    end

    context 'with invalid attributes' do
      let(:attributes) { { name: nil } }

      it 'raises an exception' do
        expect { result }.to raise_error ActiveRecord::RecordInvalid
      end
    end
  end
end
