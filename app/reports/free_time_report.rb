class FreeTimeReport < Report::Base
  field(:name)
  field(:time) { |row| row.starts_at.in_time_zone }

  def scope
    Waitlist
      .joins('LEFT JOIN sessions s1 ON waitlists.session_id = s1.id')
      .joins('LEFT JOIN registrations ON waitlists.registration_id = registrations.id')
      .joins('LEFT JOIN users ON registrations.user_id = users.id')
      .joins('LEFT OUTER JOIN placements ON placements.registration_id = registrations.id')
      .joins(
        'LEFT OUTER JOIN sessions s2 ON placements.session_id = s2.id AND ' \
        's2.starts_at = s1.starts_at'
      )
      .group('s1.starts_at, users.id, users.name')
      .having('COUNT(s2.starts_at) = 0')
      .order('s1.starts_at ASC, name ASC')
      .select('users.name AS NAME, s1.starts_at AS starts_at')
      .distinct
  end
end
