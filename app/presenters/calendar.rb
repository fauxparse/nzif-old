require 'icalendar/tzinfo'

class Calendar
  def self.generate(&block)
    new.tap(&block).tap(&:publish)
  end

  def timezone
    @timezone ||= Time.zone.tzinfo.ical_timezone(Time.now)
  end

  def event
    icalendar.event do |event|
      yield Calendar::Event.new(event, calendar: self)
    end
  end

  delegate :to_ical, :publish, to: :icalendar

  private

  def icalendar
    @icalendar ||= Icalendar::Calendar.new.tap do |calendar|
      calendar.add_timezone(timezone)
    end
  end
end

require_relative './calendar/event'
