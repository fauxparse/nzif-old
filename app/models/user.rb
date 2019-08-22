class User < ApplicationRecord
  include Authorisable
  include Nationalisable

  has_many :identities, dependent: :destroy, autosave: true
  has_many :presenters, dependent: :destroy, autosave: true
  has_many :pitches, dependent: :destroy
  has_many :registrations, dependent: :destroy
  has_one_attached :image

  validates :name, :email, presence: true
  validates :email, email: true, uniqueness: { case_sensitive: false }, if: :email?
  validates :phone, phone_number: true, if: :phone?
  validates :identities, nested: true, on: :create

  def self.find_by_email(email)
    where('lower(email) = ?', email).first
  end

  def self.never_logged_in
    left_outer_joins(:identities).where(identities: { id: nil })
  end
end
