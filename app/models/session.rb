class Session < ApplicationRecord
  include Hashid::Rails

  belongs_to :activity

  validates :starts_at, :ends_at,
    presence: true,
    date: {
      on_or_after: ->(session) { session.activity.festival.start_date },
      on_or_before: ->(session) { session.activity.festival.end_date },
    }
  validates :ends_at, time: { after: :starts_at }
end
