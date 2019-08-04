class Presenter < ApplicationRecord
  belongs_to :activity
  belongs_to :user

  acts_as_list scope: :activity

  validates :user_id, :activity, presence: true
  validates :user_id, uniqueness: { scope: :activity_id }
end
