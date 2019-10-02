class Session < ApplicationRecord
  include Hashid::Rails
  include Messageable

  belongs_to :activity
  has_one :festival, through: :activity
  belongs_to :venue, optional: true
  has_many :preferences, dependent: :destroy
  has_many :placements, dependent: :destroy, autosave: true
  has_many :waitlists, -> { order(position: :asc) }, dependent: :destroy, autosave: true

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
  scope :workshop, -> { joins(:activity).merge(Workshop.all) }
  scope :with_roll, -> { includes(placements: :registration, waitlists: :registration) }
  scope :presented_by,
    ->(user_id) { joins(activity: :presenters).where(presenters: { user_id: user_id }) }

  def self.silence_notifications(&block)
    @notifications_silenced = (@notifications_silenced || 0) + 1
    yield
    @notifications_silenced -= 1
  end

  def self.notifications_silenced?
    (@notifications_silenced ||= 0).positive?
  end

  def to_s
    "#{activity.name} (#{starts_at.strftime('%A %l:%M %p').gsub(/\s+/, ' ')})"
  end

  def full?
    return false unless capacity?
    placements_count >= capacity
  end

  def notify_change
    unless self.class.notifications_silenced?
      NzifSchema.subscriptions.trigger('sessionChanged', {}, self)
    end
  end

  def recipients
    placements.includes(registration: :user).map { |p| p.registration.user }
  end

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
