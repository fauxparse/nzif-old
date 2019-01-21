class Activity < ApplicationRecord
  include Sluggable

  belongs_to :festival
  has_many :sessions
  has_many :associated,
    -> (activity) { unscope(:where).associated_with(activity) },
    class_name: 'Activity'
  has_one_attached :image

  sluggable scope: %i(festival_id type)

  validate :not_a_vanilla_activity

  scope :of_type, -> (type) { where(type: type) }

  def self.to_param
    name.demodulize.pluralize.underscore.dasherize
  end

  def self.associated_with(activity)
    where(slug: activity.slug, festival_id: activity.festival_id).where.not(type: activity.type)
  end

  def url
    "/#{festival.year}/#{self.class.to_param}/#{slug}"
  end

  private

  def not_a_vanilla_activity
    errors.add(:type, 'must not be a vanilla Activity') if self.class == Activity
  end
end

require_dependency 'show'
require_dependency 'workshop'
