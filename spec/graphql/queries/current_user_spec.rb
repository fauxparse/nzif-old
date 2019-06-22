require 'rails_helper'

RSpec.describe Types::QueryType, type: :query do
  describe '#current_user' do
    subject(:result) do
      execute_query(query, context: context)
    end

    let(:context) { { environment: environment } }
    let(:environment) { double(:environment, current_user: current_user) }

    let(:query) do
      <<~QUERY
        {
          currentUser {
            id
          }
        }
      QUERY
    end

    context 'when nobody is logged in' do
      let(:current_user) { nil }

      it 'is blank' do
        expect(result[:data][:current_user]).to be_nil
      end
    end

    context 'when nobody is logged in' do
      let(:current_user) { build_stubbed(:user) }

      it 'is blank' do
        expect(result[:data][:current_user])
          .to match a_hash_including(id: current_user.id.to_s)
      end
    end
  end
end
