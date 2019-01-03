class DeleteSession
  include Interactor

  def call
    !!session.destroy
  end

  delegate :session, to: :context
end
