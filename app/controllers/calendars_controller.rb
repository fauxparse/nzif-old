class CalendarsController < ApplicationController
  def show
    respond_to do |format|
      format.ics do
        render plain: calendar.to_ical
      end
    end
  end

  private

  def registration
    @registration ||= Registration.find(params[:id])
  end

  def itinerary
    @itinerary ||= Itinerary.new(registration)
  end

  def calendar
    @calendar ||=
      Calendar.generate do |calendar|
        itinerary.sessions.each do |session|
          calendar.event do |event|
            Calendar::Session.new(session).populate_event(event)
          end
        end
      end
  end
end
