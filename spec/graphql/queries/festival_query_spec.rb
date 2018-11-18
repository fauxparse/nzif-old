require 'rails_helper'

RSpec.describe Types::QueryType, type: :query do
  describe '#festival' do
    subject(:result) do
      execute_query(query)
    end

    let(:query) do
      <<~QUERY
        {
          festival#{year && "(year: #{year})"} {
            startDate
            endDate
          }
        }
      QUERY
    end

    context 'with no args' do
      let(:year) { nil }

      context 'when there are no festivals' do
        it 'raises an error' do
          expect { result }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end

      context 'when there is a festival' do
        let!(:festival) { create(:festival) }

        it 'returns the festival' do
          expect(result[:data][:festival]).
            to match a_hash_including(start_date: '2018-10-20', end_date: '2018-10-27')
        end
      end
    end

    context 'with an existing year' do
      let(:year) { festival.year }
      let(:festival) { create(:festival) }

      it 'returns the festival' do
        expect(result[:data][:festival]).
          to match a_hash_including(start_date: '2018-10-20', end_date: '2018-10-27')
      end
    end

    context 'with a bad year' do
      let(:year) { 2017 }

      it 'raises an error' do
        expect { result }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
