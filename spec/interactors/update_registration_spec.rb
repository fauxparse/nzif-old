require 'rails_helper'

RSpec.describe UpdateRegistration, type: :interactor do
  subject(:result) do
    UpdateRegistration.call(festival: festival, current_user: user, attributes: attributes)
  end

  let(:festival) { create(:festival) }

  let(:workshops) do
    create_list(:workshop, 12, festival: festival)
  end

  let(:sessions) do
    workshops.map.with_index do |workshop, i|
      starts_at = (festival.start_date + i / 3).midnight.change(hour: 10)
      ends_at = starts_at + 3.hours
      create(:session, activity: workshop, starts_at: starts_at, ends_at: ends_at)
    end
  end

  describe '.call' do
    context 'when not logged in' do
      let(:user) { nil }

      context 'with valid attributes' do
        let(:attributes) do
          {
            name: 'Test User',
            email: 'test@example.com',
            password: 'p4$$w0rd',
            password_confirmation: 'p4$$w0rd',
            phone: '021 234 5678',
          }
        end

        it { is_expected.to be_success }

        it 'creates a new user' do
          expect { result }.to change(User, :count).by(1)
        end

        context 'when a user with the correct email and password exists' do
          before do
            User.create!(name: attributes[:name], email: attributes[:email]) do |user|
              user.identities.build(
                type: 'Identity::Password',
                password: attributes[:password],
                password_confirmation: attributes[:password_confirmation],
              )
            end
          end

          it { is_expected.to be_success }

          it 'does not create a new user' do
            expect { result }.not_to change(User, :count)
          end
        end

        context 'when a user with the correct email but a different password exists' do
          before do
            User.create!(name: attributes[:name], email: attributes[:email]) do |user|
              user.identities.build(
                type: 'Identity::Password',
                password: 'd1ff3r3nt',
                password_confirmation: 'd1ff3r3nt',
              )
            end
          end

          it { is_expected.to be_failure }

          it 'does not create a new user' do
            expect { result }.not_to change(User, :count)
          end

          it 'has an error on the password attribute' do
            expect(result.errors).to include(:password)
          end
        end
      end

      context 'with invalid attributes' do
        let(:attributes) do
          {
            name: '',
            email: 'bad',
            password: 'worse',
            password_confirmation: 'worst',
            phone: 'TEXT ME',
          }
        end

        it { is_expected.to be_failure }

        describe '#errors' do
          subject(:errors) { result.errors }

          it { is_expected.to include(:name) }

          it { is_expected.to include(:email) }

          it { is_expected.to include(:password_confirmation) }

          it { is_expected.to include(:phone) }
        end
      end
    end

    context 'when logged in' do
      let(:user) { create(:user) }

      let(:attributes) do
        {
          code_of_conduct_accepted_at: Time.now.iso8601,
        }
      end

      it 'creates a new registration' do
        expect { result }.to change(Registration, :count).by(1)
      end

      context 'as a registered participant' do
        before do
          user.registrations.create!(festival: festival)
        end

        it { is_expected.to be_success }

        it 'does not create a new registration' do
          expect { result }.not_to change(Registration, :count)
        end
      end
    end

    context 'when a registered user' do
      let(:user) { create(:user) }

      let!(:registration) do
        user.registrations.create!(festival: festival, code_of_conduct_accepted: true)
      end

      let(:attributes) do
        {
          preferences: [
            { session_id: sessions[1].id, position: 1 },
            { session_id: sessions[0].id, position: 2 },
            { session_id: sessions[3].id, position: 1 },
          ]
        }
      end

      context 'records their initial preferences' do
        it { is_expected.to be_success }

        it 'creates preference records' do
          expect { result }.to change(Preference, :count).by(3)
        end
      end

      context 'updates their preferences' do
        before do
          registration.preferences.create!(session: sessions[2])
          registration.preferences.create!(session: sessions[1])
        end

        it { is_expected.to be_success }

        it 'updates preference records' do
          expect { result }.to change(Preference, :count).by(1)
        end

        context 'with bad data' do
          let(:attributes) do
            {
              preferences: [
                { session_id: sessions[0].id, position: 1 },
                { session_id: sessions[0].id, position: 2 },
              ]
            }
          end

          it { is_expected.to be_failure }

          it 'doesn’t change the database' do
            expect { result }.not_to change(Preference, :count)
          end

          it 'adds an error' do
            expect(result.errors).to include(:preferences)
          end
        end
      end
    end
  end
end
