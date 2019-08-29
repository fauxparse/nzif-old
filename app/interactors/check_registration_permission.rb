class CheckRegistrationPermission < Interaction
  def call
    access_denied! unless can_update_registration?
  end

  private

  def can_update_registration?
    context.registration.nil? || can?(:update, context.registration)
  end
end
