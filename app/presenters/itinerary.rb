class Itinerary
  attr_reader :registration

  def initialize(registration)
    @registration = registration
  end

  def workshops
    @workshops ||=
      registration
        .sessions
        .includes(activity: { presenters: :user })
        .references(:activities)
        .merge(Workshop.all)
        .order(starts_at: :asc)
  end

  def sessions
    [
      *workshops.all,
      *teaching.all,
      *free_events.all,
    ]
  end

  def preferences
    @preferences ||= registration.preferences.all
  end

  def waitlists
    @waitlists ||=
      registration
        .waitlists
        .includes(session: [:venue, { activity: { presenters: :user } }])
        .references(:sessions)
        .order('sessions.starts_at ASC')
  end

  def first_choices
    @first_choices ||=
      begin
        assigned_ids = Set.new(workshops.map(&:id))
        preferred_ids = preferences.select { |p| p.position == 1 }.map(&:session_id)
        preferred_ids.partition { |id| assigned_ids.include?(id) }.map(&:size)
      end
  end

  def days_to_go
    @days_to_go ||= (registration.festival.start_date - Time.zone.now.to_date).to_i
  end

  def teaching
    @teaching ||=
      festival
        .sessions
        .includes(:venue, activity: { presenters: :user })
        .references(:presenters)
        .where(presenters: { user_id: registration.user_id })
  end

  def free_events
    @free_events ||=
      festival
        .sessions
        .includes(:venue, activity: { presenters: :user })
        .references(:activities)
        .where.not(activities: { type: 'Workshop' })
  end

  delegate :festival, to: :registration
end
