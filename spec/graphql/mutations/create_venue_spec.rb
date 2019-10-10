require 'rails_helper'

RSpec.describe Mutations::CreateVenue, type: :mutation do
  subject(:result) do
    execute_query(query, variables: variables, as: admin)
  end

  let(:admin) { create(:admin) }

  let(:query) do
    <<~QUERY
      mutation test($name: String!, $address: String!, $latitude: Float!, $longitude: Float!) {
        createVenue(attributes: { name: $name, address: $address, latitude: $latitude, longitude: $longitude }) {
          id
        }
      }
    QUERY
  end

  let(:variables) { attributes_for(:venue) }

  it 'creates a venue' do
    expect { result }.to change(Venue, :count).by(1)
  end
end
