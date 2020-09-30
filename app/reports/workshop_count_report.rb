class WorkshopCountReport < Report::Base
  field(:name) { |row| row.user.name }
  field(:count) { |row| count(row) }
  field(:total) { |row| row.prices[count(row)] / 100 }

  def scope
    festival
      .registrations
      .complete
      .includes(:user, :preferences)
  end

  def self.count(row)
    row.preferences.count { |p| p.position == 1 }
  end
end
