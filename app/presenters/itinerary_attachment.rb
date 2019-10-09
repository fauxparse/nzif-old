class ItineraryAttachment
  attr_reader :registration

  def initialize(registration)
    @registration = registration
  end

  def name
    'itinerary.ics'
  end

  def calendar
    @calendar ||= Calendar.generate do |calendar|
      registration.sessions.each do |session|
        calendar.event do |event|
          Calendar::Session.new(session).populate_event(event)
        end
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
