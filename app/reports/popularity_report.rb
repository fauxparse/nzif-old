class PopularityReport < Report::Base
  field(:workshop) { |row| row.activity.name }
  field(:presenter) { |row| row.activity.presenters.map(&:user).map(&:name).to_sentence }
  field(:first) { |row| count_ranked(row, 1) }
  field(:second) { |row| count_ranked(row, 2) }
  field(:third) { |row| count_ranked(row, 3) }
  field(:fourth) { |row| count_ranked(row, 4) }

  def scope
    Session
      .includes(:preferences, { activity: { presenters: :user } })
      .references(:activity)
      .where(activities: { type: 'Workshop', festival_id: festival.id })
  end

  def self.count_ranked(row, position)
    row.preferences.select { |p| p.position === position }.size
  end
end
