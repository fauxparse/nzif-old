class Calendar
  class Event
    attr_reader :calendar

    def initialize(ical_event, calendar:)
      @ical_event = ical_event
      @calendar = calendar
      ical_event.organizer = 'mailto:registrations@improvfest.nz'
    end

    def name
      ical_event.summary
    end

    def name=(value)
      ical_event.summary = value
    end

    def starts_at
      ical_event.dtstart.to_time
    end

    def starts_at=(value)
      ical_event.dtstart = calendar_time(value)
    end

    def ends_at
      ical_event.dtend.to_time
    end

    def ends_at=(value)
      ical_event.dtend = calendar_time(value)
    end

    def alarm?
      ical_event.has_alarm?
    end

    def alarm!
      ical_event.alarm do |alarm|
        alarm.description = "#{name} is starting soon"
        alarm.trigger = '-PT15M'
      end
    end

    delegate :description, :description=, :location, :location=, :url, :url=, to: :ical_event

    private

    attr_reader :ical_event

    def calendar_time(value)
      Icalendar::Values::DateTime.new(value, 'tzid' => calendar.timezone.tzid.to_s)
    end
  end
end
