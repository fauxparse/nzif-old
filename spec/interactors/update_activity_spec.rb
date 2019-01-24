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

    context 'updating presenters' do
      let!(:activity) { create(:workshop, presenters: [teacher1, teacher2]) }
      let(:teacher1) { create(:user) }
      let(:teacher2) { create(:user) }

      context 'removing a presenter' do
        let(:attributes) { { presenters: [teacher2.id] } }

        it 'removes the presenter' do
          expect { result }.
            to change { activity.reload.presenters.count }.by(-1).
            and change(Presenter, :count).by(-1)
        end
      end

      context 'adding a presenter' do
        let(:attributes) { { presenters: [teacher1, teacher2, teacher3].map(&:id) } }
        let(:teacher3) { create(:user) }

        it 'adds the presenter' do
          expect { result }.
            to change { activity.reload.presenters.count }.by(1).
            and change(Presenter, :count).by(1)
        end
      end

      context 'replacing a presenter' do
        let(:attributes) { { presenters: [teacher3, teacher1].map(&:id) } }
        let(:teacher3) { create(:user) }

        it 'adds the presenter' do
          expect { result }.
            to change { activity.reload.presenters.map(&:user) }.
            from([teacher1, teacher2]).
            to([teacher3, teacher1])
          expect(Presenter.count).to eq 2
        end
      end
    end
  end
end
