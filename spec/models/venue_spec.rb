require 'rails_helper'

RSpec.describe Venue, type: :model do
  subject(:venue) { build(:venue) }

  before do
    Geocoder.configure(lookup: :test)
    Geocoder::Lookup::Test.add_stub('1 Kent Terrace, Wellington, New Zealand', [{
      'latitude' => -41.2935382,
      'longitude' => 174.7845073,
    }])
  end

  it 'automatically geocodes the address' do
    venue = Venue.new(address: '1 Kent Terrace')
    expect(venue).to be_valid
    expect(venue.latitude).to be_within(1e-4).of Venue.origin.latitude
    expect(venue.longitude).to be_within(1e-4).of Venue.origin.longitude
  end
end
