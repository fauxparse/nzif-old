class Content < ApplicationRecord
  include Sluggable

  has_paper_trail if: Proc.new { |t| t.saved_changes? }
  sluggable :title
end
