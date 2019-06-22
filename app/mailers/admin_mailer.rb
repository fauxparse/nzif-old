class AdminMailer < ApplicationMailer
  def pitch_notification(pitch)
    @pitch = pitch
    @festival = pitch.festival
    @url = front_end_url("admin/#{@festival.to_param}/pitches/#{pitch.to_param}")
    mail to: admin_recipients, subject: "New pitch from #{pitch.user.name}"
  end

  private

  def admin_recipients
    User.admin.map { |user| recipient(user) }
  end
end
