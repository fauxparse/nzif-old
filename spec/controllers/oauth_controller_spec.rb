require 'rails_helper'

RSpec.describe OauthController, type: :request do
  before do
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(:facebook, { info: { email: 'user@example.com' } })
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:facebook]
  end

  describe '#callback' do
    it 'calls the authentication service' do
      post omniauth_callback_path(provider: :facebook)
      expect(response).to redirect_to '/'
    end
  end
end
