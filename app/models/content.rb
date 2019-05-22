class Content < ApplicationRecord
  has_paper_trail

  validates :slug, presence: true, uniqueness: true

  def to_param
    slug
  end
end
