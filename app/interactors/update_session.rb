class UpdateSession < Interaction
  def call
    access_denied! unless can? :update, session

    session.update!(attributes)
  end

  delegate :session, :attributes, to: :context
end
