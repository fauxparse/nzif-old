require 'rails_helper'
require 'timecop'

RSpec.describe Types::Time do
  around do |example|
    Timecop.freeze do
      example.run
    end
  end

  describe '.coerce_input' do
    subject(:result) { Types::Time.coerce_input(input, {}) }

    context 'given a valid time' do
      let(:input) { Time.zone.now.iso8601 }

      it { is_expected.to eq Time.zone.now.change(usec: 0) }
    end

    context 'given a blank string' do
      let(:input) { '' }

      it { is_expected.to be_nil }
    end

    context 'given an invalid time' do
      let(:input) { '2345-67-89 01:23:45' }

      it 'raises an exception' do
        expect { result }.to raise_error(GraphQL::CoercionError)
      end
    end
  end

  describe '.coerce_result' do
    subject(:result) { Types::Time.coerce_result(ruby_value, {}) }

    context 'given a time' do
      let(:ruby_value) { Time.zone.now }

      it { is_expected.to eq Time.zone.now.iso8601 }
    end

    context 'given a date' do
      let(:ruby_value) { Time.zone.now.to_date }

      it { is_expected.to eq Time.zone.now.midnight.iso8601 }
    end

    context 'given a blank value' do
      let(:ruby_value) { nil }

      it { is_expected.to be_nil }
    end
  end
end
