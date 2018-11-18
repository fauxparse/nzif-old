module Authentication
  extend ActiveSupport::Concern

  SESSION_KEY = :current_user_id

  included do
    helper_method :current_user
    private :current_user_id
  end

  def current_user
    @current_user ||= current_user_id && User.find_by(id: current_user_id)
  end

  def current_user=(user)
    session[SESSION_KEY] = user&.id
  end

  private

  def current_user_id
    session[SESSION_KEY]
  end
end
