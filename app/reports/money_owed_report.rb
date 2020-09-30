class MoneyOwedReport < Report::Base
  field(:name) { |row| row.user.name }
  field(:email) { |row| row.user.email }
  field(:total) { |row| row.prices[row.placements_count] / 100 }
  field(:paid) { |row| row.payments.select(&:approved?).sum(&:amount).to_i }

  def scope
    festival
      .registrations
      .complete
      .includes(:user, :payments)
      .references(:users)
      .order('users.name ASC')
  end
end
