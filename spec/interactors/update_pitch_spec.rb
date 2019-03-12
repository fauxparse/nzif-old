require 'rails_helper'

RSpec.describe UpdatePitch, type: :interactor do
  subject(:result) do
    UpdatePitch.call(current_user: current_user, pitch: pitch, attributes: attributes)
  end

  let(:festival) { create(:festival) }
  let(:current_user) { user }
  let(:user) { create(:user) }
  let(:password) { attributes_for(:password)[:password] }
  let(:attributes) do
    {
      presenters: [
        {
          id: user.id,
          name: user.name,
          email: user.email,
          city: 'Melbourne',
          country: 'Australia',
        },
        {
          name: 'Laura M Ipsum',
          email: 'laura@example.com',
        },
      ],
      company: 'Test company',
      bio: 'Test bio',
      presented_before: 'Test presented before',
      availability: 'Test availability',
      code_of_conduct: true,
    }
  end

  context 'for a new pitch' do
    let(:pitch) { festival.pitches.new }

    context 'with valid attributes' do
      it { is_expected.to be_success }

      it 'saves the pitch' do
        expect { result }.
          to change(Pitch, :count).by(1).
          and change(pitch, :persisted?).from(false).to(true)
      end

      it 'updates the current user’s information' do
        expect { result }.
          to change { current_user.reload.city }.to('Melbourne').
          and change { current_user.reload.country }.to('Australia')
      end
    end

    context 'with invalid attributes' do
      before do
        attributes[:code_of_conduct] = false
      end

      it 'does not save the pitch' do
        expect { result }.to raise_error(ActiveRecord::RecordInvalid)
        expect(pitch).to have_exactly(1).error_on(:code_of_conduct)
      end
    end

    context 'for a new user' do
      let(:user) { build(:user) }
      let(:current_user) { nil }

      before do
        attributes[:presenters].first[:password] = password
      end

      it 'saves the pitch' do
        expect { result }.
          to change(Pitch, :count).by(1).
          and change(User, :count).by(1).
          and change(pitch, :persisted?).from(false).to(true)
      end
    end

    context 'for an existing user who has not logged in' do
      let(:user) { create(:user, :with_password) }
      let(:current_user) { nil }

      before do
        attributes[:presenters].first[:password] = password
      end

      it 'saves the pitch' do
        expect { result }.
          to change(Pitch, :count).by(1).
          and change(User, :count).by(0).
          and change(pitch, :persisted?).from(false).to(true)
      end

      context 'with the wrong password' do
        before do
          attributes[:presenters].first[:password] = 'bad password'
        end

        it 'does not save the pitch' do
          expect { result }.to raise_error(ActiveRecord::RecordInvalid)
          expect(pitch).to have_exactly(1).error_on(:user)
        end
      end
    end
  end

  context 'for an existing pitch' do
    let(:pitch) { create(:pitch, festival: festival, user: current_user) }

    context 'with valid attributes' do
      it { is_expected.to be_success }
    end
  end
end
