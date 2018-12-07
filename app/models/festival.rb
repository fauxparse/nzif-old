class Festival < ApplicationRecord
  has_many :activities, dependent: :destroy
  has_many :sessions, through: :activities

  validates :start_date, :end_date, presence: true
  validates :end_date, date: { on_or_after: :start_date }, if: %i(start_date end_date)

  scope :by_year, -> (year) { where('extract(year from start_date) = ?', year) }

  delegate :year, to: :start_date, allow_nil: true

  def to_param
    year&.to_s
  end
end
