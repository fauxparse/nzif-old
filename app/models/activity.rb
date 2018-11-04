class Activity < ApplicationRecord
  include Sluggable

  belongs_to :festival

  has_many :associated,
    -> (activity) { unscope(:where).associated_with(activity) },
    class_name: 'Activity'

  sluggable scope: %i(festival_id type)

  scope :of_type, -> (type) { where(type: type) }

  def self.to_param
    name.demodulize.pluralize.underscore.dasherize
  end

  def self.associated_with(activity)
    where(slug: activity.slug, festival_id: activity.festival_id).where.not(type: activity.type)
  end
end

require_dependency 'app/models/show'
require_dependency 'app/models/workshop'
