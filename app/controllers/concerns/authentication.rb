require 'jwt'

module Authentication
  extend ActiveSupport::Concern

  COOKIE = :current_user_id

  class TokenEncoder
    def encode(id)
      return nil if id.blank?
      JWT.encode({ id: id }, secret)
    end

    def decode(token)
      return nil if token.blank?
      JWT.decode(token, secret)[0]['id']
    rescue
      nil
    end

    private

    def secret
      Rails.application.credentials.secret_key_base
    end
  end

  included do
    helper_method :current_user
    private :current_user_id
  end

  def current_user
    @current_user ||= User.find_by(id: current_user_id)
  end

  def current_user=(user)
    @current_user = user
    cookies[COOKIE] = TokenEncoder.new.encode(user&.id)
  end

  private

  def current_user_id
    TokenEncoder.new.decode(cookies[COOKIE])
  end
end
