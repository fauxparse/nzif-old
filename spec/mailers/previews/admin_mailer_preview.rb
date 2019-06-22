class AdminMailerPreview < ActionMailer::Preview
  def pitch_notification
    user = OpenStruct.new(name: 'Test User')
    festival = Festival.new(start_date: Date.new(2019))
    info = OpenStruct.new(presenters: [user], activity_type: 'workshop')
    pitch = OpenStruct.new(
      festival: festival,
      user: user,
      name: 'Test pitch',
      info: info,
    )
    AdminMailer.pitch_notification(pitch)
  end
end
