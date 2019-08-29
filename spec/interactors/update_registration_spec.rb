require 'rails_helper'

RSpec.describe UpdateRegistration, type: :interactor do
  subject(:result) do
    UpdateRegistration.call(**context)
  end

  let(:context) do
    {
      festival: festival,
      current_user: user,
      attributes: attributes,
    }
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

  let(:all_in_show) { create(:show, festival: festival) }

  let(:shows) do
    (0...5).map do |i|
      starts_at = (festival.start_date + i).midnight.change(hour: 21)
      ends_at = starts_at + 1.hour
      create(:session, activity: all_in_show, starts_at: starts_at, ends_at: ends_at)
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

        context 'when a user with the correct email but no password exists' do
          context 'with an oauth login' do
            before do
              user = create(:user, name: attributes[:name], email: attributes[:email])
              create(:facebook, user: user)
            end

            it { is_expected.to be_failure }

            it 'does not create a password' do
              expect { result }.not_to change(Identity::Password, :count)
            end
          end

          context 'because they’ve never logged in' do
            before do
              create(:user, name: attributes[:name], email: attributes[:email])
            end

            it { is_expected.to be_success }

            it 'creates a password' do
              expect { result }.to change(Identity::Password, :count).by(1)
            end
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
            { session_id: sessions[1].to_param, position: 1 },
            { session_id: sessions[0].to_param, position: 2 },
            { session_id: sessions[3].to_param, position: 1 },
          ],
          availability: [
            { session_id: shows[0].to_param, role: 'player' },
            { session_id: shows[0].to_param, role: 'director' },
            { session_id: shows[1].to_param, role: 'player' },
            { session_id: shows[1].to_param, role: 'director' },
          ],
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

      context 'records their initial availability' do
        it { is_expected.to be_success }

        it 'creates preference records' do
          expect { result }.to change(Availability, :count).by(4)
        end
      end

      context 'updates their availability' do
        before do
          registration.availability.create!(session: shows[2], role: 'player')
          registration.availability.create!(session: shows[1], role: 'mc')
        end

        it { is_expected.to be_success }

        it 'updates availability records' do
          expect { result }.to change(Availability, :count).by(2)
        end

        context 'with bad data' do
          let(:attributes) do
            {
              availability: [
                { session_id: sessions[0].id, role: 'player' },
                { session_id: sessions[0].id, role: 'player' },
              ]
            }
          end

          it { is_expected.to be_failure }

          it 'doesn’t change the database' do
            expect { result }.not_to change(Availability, :count)
          end

          it 'adds an error' do
            expect(result.errors).to include(:availability)
          end
        end
      end

      context 'completes registration' do
        let(:attributes) do
          {
            state: 'complete',
          }
        end

        let(:email) { double('email', deliver_later: true) }

        before do
          allow(UserMailer).to receive(:registration_confirmation).and_return(email)
        end

        it { is_expected.to be_success }

        it 'completes the registration' do
          result
          expect(registration.reload).to be_complete
        end

        it 'sends a confirmation email' do
          expect(UserMailer).to receive(:registration_confirmation)
          result
        end
      end
    end

    context 'updating another user’s registration' do
      let(:context) do
        {
          festival: festival,
          current_user: user,
          attributes: attributes,
          registration: registration,
        }
      end

      let(:registration) { create(:registration, festival: festival) }

      let(:attributes) do
        { name: 'Updated name' }
      end

      context 'as an admin' do
        let(:user) { create(:admin) }

        it { is_expected.to be_success }
      end

      context 'as an ordinary user' do
        let(:user) { create(:user) }

        it 'raises an exception' do
          expect { result }.to raise_error(Interaction::AccessDenied)
        end
      end

      context 'as an anonymous user' do
        let(:user) { nil }

        it 'raises an exception' do
          expect { result }.to raise_error(Interaction::AccessDenied)
        end
      end
    end
  end
end
