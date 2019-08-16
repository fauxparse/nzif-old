class Session < ApplicationRecord
  include Hashid::Rails

  belongs_to :activity
  belongs_to :venue, optional: true
  has_many :preferences, dependent: :destroy

  validates :activity, presence: true
  validates :starts_at, :ends_at,
    presence: true,
    date: {
      on_or_after: ->(session) { session.activity.festival.start_date },
      on_or_before: ->(session) { session.activity.festival.end_date },
    }
  validates :ends_at, time: { after: :starts_at }

  after_update :update_preferences, if: :start_time_updated?

  scope :on_day, ->(date) { where(starts_at: date.midnight...date.succ.midnight) }

  private

  def update_preferences
    # Can't use update_all because we need the acts_as_list callbacks to run
    preferences.all.each do |preference|
      preference.update!(starts_at: starts_at)
    end
  end

  def start_time_updated?
    previous_changes.include?('starts_at')
  end
end
