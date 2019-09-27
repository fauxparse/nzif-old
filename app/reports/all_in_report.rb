class AllInReport < Report::Base
  field(:name) { |row| row.user.name }
  field(:email) { |row| row.user.email }
  (0...6).each do |i|
    field(:"show_#{i + 1}") { |row| available_on(row, i) }
  end
  field(:player) { |row| available_as(row, :player) }
  field(:director) { |row| available_as(row, :director) }
  field(:mc) { |row| available_as(row, :mc) }

  def scope
    festival
      .registrations
      .complete
      .joins(:availability)
      .includes(:user, availability: { session: { activity: :sessions } })
      .references(:availabilities)
      .having('COUNT(availabilities.id) > 0')
      .group('registrations.id')
  end

  def self.all_in_sessions(row)
    @all_in_sessions ||= row.availability.first.session.activity.sessions
  end

  def self.sorted_sessions(row)
    @sorted_sessions ||= {}
    @sorted_sessions[row] ||= all_in_sessions(row).sort_by(&:starts_at)
  end

  def self.available_on(row, i)
    return '' if row.availability.none?

    row.availability.map(&:session).include?(sorted_sessions(row)[i]) ? 'X' : ''
  end

  def self.available_as(row, role)
    row.availability.any? { |a| a.role.to_sym == role } ? role : ''
  end
end
