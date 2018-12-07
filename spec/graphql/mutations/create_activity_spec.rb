require 'rails_helper'

RSpec.describe Mutations::CreateActivity, type: :mutation do
  subject(:result) do
    execute_query(query, variables: variables)
  end

  let(:festival) { create(:festival) }
  let(:query) do
    <<~QUERY
      mutation test($year: Int!, $type: ActivityType!, $attributes: ActivityAttributes!) {
        createActivity(year: $year, type: $type, attributes: $attributes) {
          name
          slug
        }
      }
    QUERY
  end
  let(:variables) do
    {
      year: festival.year,
      type: 'workshop',
      attributes: attributes,
    }
  end
  let(:attributes) { { name: 'My Workshop' } }
  let(:activity) { double(:workshop, name: 'My Workshop', slug: 'my-workshop') }

  it 'calls the CreateActivity service' do
    expect(CreateActivity).
      to receive(:call).
      with(a_hash_including(festival: festival, attributes: attributes.merge(type: 'Workshop'))).
      and_return(Interactor::Context.build(activity: activity))
    expect(result.dig(:data, :create_activity)).to be_present
  end
end
