class OauthController < ApplicationController
  def callback
    self.current_user = AuthenticateOauthUser.call(auth: oauth_hash).user
    redirect_to(request.env['omniauth.origin'] || '/')
  end

  private

  def oauth_hash
    request.env['omniauth.auth']
  end
end
