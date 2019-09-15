require 'rails_helper'
require 'support/example_groups/registration_context'

RSpec.describe UpdateRegistration, type: :interactor do
  include_context 'registration'

  let(:attributes) do
    {
      name: 'Laura Mipsum',
      email: 'laura.mipsum@example.com',
      password: 'p4$$w0rd',
      password_confirmation: 'p4$$w0rd',
    }
  end

  describe '.call' do
    it { is_expected.to be_success }
  end
end
