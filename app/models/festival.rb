class Festival < ApplicationRecord
  has_many :activities, dependent: :destroy
  has_many :sessions, through: :activities
  has_many :pitches, dependent: :destroy
  has_many :slots, dependent: :destroy

  validates :start_date, :end_date, presence: true
  validates :end_date, date: { on_or_after: :start_date }, if: %i(start_date end_date)

  scope :by_year, -> (year) { where('extract(year from start_date) = ?', year) }

  delegate :year, to: :start_date, allow_nil: true

  def to_param
    year&.to_s
  end

  def days
    (start_date..end_date).map { |date| Day.new(festival: self, date: date) }
  end

  def pitches_open?
    pitches_open_at.present? &&
      pitches_open_at <= Time.now &&
      (pitches_close_at.blank? || pitches_close_at > Time.now)
  end

  def programme_launched?
    programme_launched_at.present? &&
      programme_launched_at < Time.now
  end
end
