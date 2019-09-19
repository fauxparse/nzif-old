class Calendar
  class Session
    attr_reader :session

    def initialize(session)
      @session = session
    end

    def populate_event(event)
      event.name = session.activity.name
      event.description = description
      event.starts_at = session.starts_at
      event.ends_at = session.ends_at
      event.location = location if session.venue.present?
      event.alarm!
    end

    private

    def description
      "#{session.activity.type.humanize} with #{presenters}"
    end

    def presenters
      session.activity.presenters.map(&:user).map(&:name).to_sentence
    end

    def location
      [session.venue.name, session.venue.address, 'Wellington'].join(', ')
    end
  end
end
