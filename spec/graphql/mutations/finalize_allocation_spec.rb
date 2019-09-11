require 'rails_helper'

RSpec.describe Mutations::FinalizeAllocation, type: :mutation do
  subject(:result) do
    execute_query(query, variables: variables)
  end

  let(:festival) { create(:festival) }
  let(:query) do
    <<~QUERY
      mutation test($year: ID!, $lists: [AllocationList!]!) {
        finalizeAllocation(year: $year, lists: $lists)
      }
    QUERY
  end
  let(:variables) do
    {
      year: festival.year,
      lists: [{
        sessionId: Session.encode_id(1),
        registrationIds: [1, 2, 3].map { |id| Registration.encode_id(id) },
      }],
    }
  end

  it 'calls the CreateActivity service' do
    expect(FinalizeAllocation)
      .to receive(:call)
      .with(a_hash_including(festival: festival, lists: { 1 => [1, 2, 3] }))
      .and_return(Interactor::Context.build)
    expect(result.dig(:data, :finalize_allocation)).to be true
  end
end
