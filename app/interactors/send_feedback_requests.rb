class SendFeedbackRequests < Interaction
  def call
    sessions.each { |session| send_requests_for(session) }
  end

  def since
    @since ||= context[:since] || 1.hour.ago
  end

  def sessions
    @sessions =
      Session
        .includes(activity: { presenters: :user })
        .includes(placements: { registration: :user })
        .where('ends_at >= ? AND ends_at < ?', since, Time.now)
  end

  private

  def send_requests_for(session)
    session.placements.each do |placement|
      UserMailer.feedback_request(session, placement.registration.user).deliver_later
    end
  end
end
