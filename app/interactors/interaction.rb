class Interaction
  include Interactor
  include AccessGranted::Rails::ControllerMethods

  delegate :current_user, to: :context

  class AccessDenied < StandardError; end

  private

  def access_denied!
    raise AccessDenied
  end
end
