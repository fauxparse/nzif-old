class SendFeedbackRequests < Interaction
  def call
    sessions.each { |session| send_requests_for(session) }
  end

  def sessions
    @sessions =
      Session
        .includes(activity: { presenters: :user })
        .includes(placements: { registration: :user })
        .where('feedback_requested_at IS NULL AND ends_at < ?', Time.now)
  end

  private

  def send_requests_for(session)
    session.placements.each do |placement|
      UserMailer.feedback_request(session, placement.registration.user).deliver_now
    end
    session.update!(feedback_requested_at: Time.now)
  end
end
