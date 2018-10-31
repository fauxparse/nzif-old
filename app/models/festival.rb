class Festival < ApplicationRecord
  validates :start_date, :end_date, presence: true
  validates :end_date, date: { on_or_after: :start_date }, if: %i(start_date end_date)

  scope :by_year, -> (year) { where('extract(year from start_date) = ?', year) }

  def to_param
    start_date.year.to_s
  end
end
