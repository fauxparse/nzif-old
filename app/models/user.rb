class User < ApplicationRecord
  include Authorisable

  has_many :identities, dependent: :destroy, autosave: true

  validates :name, :email, presence: true
  validates :email, email: true, uniqueness: { case_sensitive: false }, if: :email?
  validates :identities, nested: true, on: :create

  def self.find_by_email(email)
    where('lower(email) = ?', email).first
  end
end
