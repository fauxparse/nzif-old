class Message < ApplicationRecord
  belongs_to :messageable, polymorphic: true
  belongs_to :sender, class_name: 'User'

  validates :subject, :body, :sender, :messageable, presence: true

  scope :oldest_first, -> { order(created_at: :asc) }

  def recipients
    messageable.recipients
  end
end
