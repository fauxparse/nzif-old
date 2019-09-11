class FinalizeAllocation < Interaction
  include Transactional

  def call
    finalize_each_timeslot
    festival.finalize_allocation!
  end

  delegate :festival, :lists, to: :context

  private

  def sessions
    @sessions ||= festival.sessions.find(lists.keys)
  end

  def timeslots
    @timeslots ||= sessions.group_by { |s| s.starts_at }
  end

  def registration_scope
    festival.registrations.includes(:preferences).references(:preferences)
  end

  def finalize_each_timeslot
    timeslots.each_pair do |time, sessions|
      registrations =
        registration_scope.where('preferences.session_id IN (?)', sessions.map(&:id)).uniq
      finalize_timeslot(sessions, registrations, lists.slice(*sessions.map(&:id)))
    end
  end

  def finalize_timeslot(sessions, registrations, lists)
    sessions_by_id = sessions.index_by(&:id)
    registrations_by_id = registrations.index_by(&:id)
    waitlists = people_who_missed_out(registrations, lists)

    lists.each do |session_id, registration_ids|
      registration_ids.each do |registration_id|
        waitlists +=
          allocate_place(sessions_by_id[session_id], registrations_by_id[registration_id])
      end
    end

    # Add people who missed out completely first,
    # then people who only got their last choice,
    # then people who got their second-to-last choice, and so on
    waitlists.sort_by(&:last).each do |registration, session_id, _position|
      registration.waitlists.create!(session_id: session_id)
    end
  end

  def people_who_missed_out(registrations, lists)
    satisfied = Set.new(lists.values.flatten)

    registrations.each.with_object([]) do |registration, waitlists|
      next if satisfied.include?(registration.id)
      registration.preferences.each do |preference|
        if lists.include?(preference.session_id)
          waitlists << [registration, preference.session_id, -100]
        end
      end
    end
  end

  def allocate_place(session, registration)
    successful = registration.preferences.detect { |p| p.session_id == session.id }
    unsuccessful = registration.preferences.select do |p|
      p.starts_at == successful.starts_at && p.position < successful.position
    end
    registration.placements.create!(session: session)
    unsuccessful.map do |preference|
      [registration, preference.session_id, -successful.position]
    end
  end
end
