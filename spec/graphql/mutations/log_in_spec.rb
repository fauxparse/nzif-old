require 'rails_helper'

RSpec.describe Mutations::LogIn, type: :mutation do
  subject(:result) do
    execute_query(query, variables: variables, context: { environment: environment })
  end

  let(:user) { create(:user, :with_password) }
  let(:query) do
    <<~QUERY
      mutation test($email: String!, $password: String!) {
        logIn(email: $email, password: $password) {
          name
          email
        }
      }
    QUERY
  end
  let(:variables) do
    {
      email: user.email,
      password: attributes_for(:password)[:password],
    }
  end
  let(:environment) { double(:environment) }

  it 'calls the AuthenticateUser service' do
    expect(AuthenticateUser).
      to receive(:call).
      with(a_hash_including(variables)).
      and_return(Interactor::Context.build(user: user))
    expect(environment).to receive(:current_user=).with(user).and_return(user)
    expect(result.dig(:data, :log_in)).to be_present
  end

  context 'with an invalid password' do
    let(:failure) { double(:context, :success? => false) }

    it 'raises an error' do
      expect(AuthenticateUser).
        to receive(:call).
        with(a_hash_including(variables)).
        and_return(failure)
      expect(result[:data]).to eq({ log_in: nil })
      expect(result[:errors]).
        to include a_hash_including(message: 'Invalid email or password.')
    end
  end
end
