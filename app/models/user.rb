class User < ApplicationRecord
  has_many :identities, dependent: :destroy, autosave: true

  validates :name, presence: true
  validates :email, email: true, presence: true, uniqueness: { case_sensitive: false }
  validates :identities, nested: true, on: :create

  def self.find_by_email(email)
    where('lower(email) = ?', email).first
  end
end
