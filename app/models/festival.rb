class Festival < ApplicationRecord
  has_many :activities, dependent: :destroy
  has_many :workshops
  has_many :shows
  has_many :sessions, through: :activities
  has_many :pitches, dependent: :destroy
  has_many :slots, dependent: :destroy
  has_many :registrations, dependent: :destroy

  validates :start_date, :end_date, presence: true
  validates :end_date, date: { on_or_after: :start_date }, if: %i(start_date end_date)

  scope :by_year, -> (year) { where('extract(year from start_date) = ?', year) }

  delegate :year, to: :start_date, allow_nil: true

  def to_param
    year&.to_s
  end

  def to_s
    "NZIF #{year}"
  end

  def days
    (start_date..end_date).map { |date| Day.new(festival: self, date: date) }
  end

  def pitches_open?
    pitches_open_at.present? &&
      pitches_open_at <= Time.now &&
      (pitches_close_at.blank? || pitches_close_at > Time.now)
  end

  def registrations_open?
    registrations_open_at.present? && registrations_open_at < Time.now
  end

  def earlybird?
    registrations_open? && (earlybird_cutoff.blank? || earlybird_cutoff > Time.now)
  end

  def allocation_finalized?
    allocation_finalized_at.present?
  end

  def finalize_allocation!
    update!(allocation_finalized_at: Time.now)
  end

  def state
    @state ||=
      if pitches_open?
        'pitching'
      elsif earlybird?
        'earlybird'
      elsif end_date.past?
        'finished'
      else
        'programming'
      end
  end

  def deadline
    case state
    when 'pitching' then pitches_close_at
    when 'earlybird' then earlybird_cutoff
    else nil
    end
  end
end
