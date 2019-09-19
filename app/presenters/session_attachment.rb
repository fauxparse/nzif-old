class SessionAttachment
  attr_reader :session

  def initialize(session)
    @session = session
  end

  def name
    "#{session.activity.type.underscore}_#{session.activity.to_param}.ics"
  end

  def calendar
    @calendar ||= Calendar.generate do |calendar|
      calendar.event do |event|
        Calendar::Session.new(session).populate_event(event)
      end
    end
  end

  def as_attachment
    {
      mime_type: 'text/calendar',
      content: to_ical,
    }
  end

  delegate :to_ical, to: :calendar
end
