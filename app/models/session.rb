class Session < ApplicationRecord
  include Hashid::Rails

  belongs_to :activity
  belongs_to :venue, optional: true

  validates :activity, presence: true
  validates :starts_at, :ends_at,
    presence: true,
    date: {
      on_or_after: ->(session) { session.activity.festival.start_date },
      on_or_before: ->(session) { session.activity.festival.end_date },
    }
  validates :ends_at, time: { after: :starts_at }

  scope :on_day, ->(date) { where(starts_at: date.midnight...date.succ.midnight) }
end
