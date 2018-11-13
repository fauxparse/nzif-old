require 'rails_helper'

RSpec.describe Types::QueryType, type: :mutation do
  describe '#log_in' do
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
    let(:activity) { double(:user, attributes_for(:user)) }
    let(:environment) { double(:environment) }

    it 'calls the AuthenticateUser service' do
      expect(AuthenticateUser).
        to receive(:call).
        with(a_hash_including(variables)).
        and_return(Interactor::Context.build(user: user))
      expect(environment).to receive(:current_user=).with(user).and_return(user)
      expect(result.dig(:data, :log_in)).to be_present
    end
  end
end
