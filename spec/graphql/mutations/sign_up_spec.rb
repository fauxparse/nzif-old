require 'rails_helper'

RSpec.describe Mutations::SignUp, type: :mutation do
  subject(:result) do
    execute_query(query, variables: variables, context: { environment: environment })
  end

  let(:name) { 'Test user' }
  let(:email) { 'test@example.com' }
  let(:password) { 'p4$$w0rd' }
  let(:query) do
    <<~QUERY
      mutation test(
        $name: String!,
        $email: String!,
        $password: String!,
        $password_confirmation: String!
      ) {
        signUp(
          name: $name,
          email: $email,
          password: $password,
          passwordConfirmation: $password_confirmation
        ) {
          name
          email
        }
      }
    QUERY
  end
  let(:variables) do
    {
      name: name,
      email: email,
      password: password,
      password_confirmation: password,
    }
  end
  let(:environment) { double(:environment) }
  let(:user) { double(:user, name: name, email: email) }

  it 'calls the AuthenticateUser service' do
    expect(CreateUser)
      .to receive(:call)
      .with(a_hash_including(variables))
      .and_return(Interactor::Context.build(user: user))
    expect(environment).to receive(:current_user=).with(user).and_return(user)
    expect(result.dig(:data, :sign_up)).to be_present
  end
end
