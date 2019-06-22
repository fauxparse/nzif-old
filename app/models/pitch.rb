class Pitch < ApplicationRecord
  include Hashid::Rails

  belongs_to :festival
  belongs_to :user

  composed_of :info,
    class_name: 'Pitch::Info',
    mapping: %w(data to_json),
    constructor: ->(json) { Pitch::Info.new(JSON.parse(json)) },
    converter: ->(object) { Pitch::Info.new(object) }

  enum state: {
    draft: 'draft',
    submitted: 'submitted',
    shortlisted: 'shortlisted',
    accepted: 'accepted',
    declined: 'declined',
  }.freeze

  validates_associated :user
  validates :bio, presence: true
  validates :code_of_conduct, acceptance: true

  scope :newest_first, -> { order(created_at: :desc) }

  def self.for_user(user)
    user.blank? ? all : where(user: user)
  end

  def self.in_state(states)
    states.blank? ? all : where('state in (?)', Array(states))
  end

  def belongs_to?(user)
    user == self.user || info.presenters.any? { |presenter| presenter == user }
  end

  delegate :bio, :availability, :code_of_conduct, to: :info
end
