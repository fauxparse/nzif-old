class User < ApplicationRecord
  include Authorisable
  include Nationalisable

  has_many :identities, dependent: :destroy, autosave: true
  has_many :presenters, dependent: :destroy, autosave: true
  has_one_attached :image

  validates :name, :email, presence: true
  validates :email, email: true, uniqueness: { case_sensitive: false }, if: :email?
  validates :identities, nested: true, on: :create

  def self.find_by_email(email)
    where('lower(email) = ?', email).first
  end
end
