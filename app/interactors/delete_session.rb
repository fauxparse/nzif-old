class DeleteSession < Interaction
  def call
    access_denied! unless can? :destroy, session

    !!session.destroy
  end

  delegate :session, to: :context
end
