class UpdateSession
  include Interactor

  def call
    session.update!(starts_at: starts_at, ends_at: ends_at)
  end

  delegate :session, :starts_at, :ends_at, to: :context
end
