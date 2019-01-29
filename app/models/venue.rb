class Venue < ApplicationRecord
  acts_as_mappable(
    default_units: :kms,
    lat_column_name: :latitude,
    lng_column_name: :longitude
  )

  geocoded_by :full_address
  before_validation :geocode

  validates :latitude, :longitude, presence: true, numericality: true

  def to_s
    name
  end

  def full_address
    [address, city, country].compact.join(', ')
  end

  def city
    'Wellington'
  end

  def country
    'New Zealand'
  end

  # BATS, home to us all
  def self.origin
    @origin ||= Geokit::LatLng.new(-41.2935391, 174.784505).freeze
  end
end
