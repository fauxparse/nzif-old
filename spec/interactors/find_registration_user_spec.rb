require 'rails_helper'
require 'support/example_groups/registration_context'

RSpec.describe FindRegistrationUser, type: :interactor do
  include_context 'registration'

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
          name: 'Updated name',
        }
      end

      it 'updates the user’s attributes' do
        expect { result }.to change { user.reload.name }.to 'Updated name'
      end
    end
  end
end
