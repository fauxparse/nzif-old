module Authentication
  extend ActiveSupport::Concern

  included do
    helper_method :current_user
    private :current_user_id
  end

  def current_user
    @current_user ||= current_user_id && User.find(current_user_id)
  end

  def current_user=(user)
    session[:current_user_id] = user&.id
  end

  def current_user_id
    session[:current_user_id]
  end
end
