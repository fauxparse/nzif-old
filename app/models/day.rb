class Day
  attr_reader :date

  def initialize(festival:, date:)
    @festival = festival
    @date = date
  end

  def activities
    @activities ||=
      festival.activities.includes(:sessions).where('DATE(sessions.starts_at) = ?', date)
  end

  private

  attr_reader :festival
end
