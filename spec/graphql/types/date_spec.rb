require 'rails_helper'
require 'timecop'

RSpec.describe Types::Date do
  around do |example|
    Timecop.freeze do
      example.run
    end
  end

  describe '.coerce_input' do
    subject(:result) { Types::Date.coerce_input(input, {}) }

    context 'given a valid date' do
      let(:input) { Date.today.to_s }

      it { is_expected.to eq Date.today }
    end

    context 'given a blank string' do
      let(:input) { '' }

      it { is_expected.to be_nil }
    end

    context 'given an invalid date' do
      let(:input) { '2345-67-89' }

      it 'raises an exception' do
        expect { result }.to raise_error(GraphQL::CoercionError)
      end
    end
  end

  describe '.coerce_result' do
    subject(:result) { Types::Date.coerce_result(ruby_value, {}) }

    context 'given a time' do
      let(:ruby_value) { Time.zone.now }

      it { is_expected.to eq Date.today.iso8601 }
    end

    context 'given a date' do
      let(:ruby_value) { Date.today }

      it { is_expected.to eq Date.today.iso8601 }
    end

    context 'given a blank value' do
      let(:ruby_value) { nil }

      it { is_expected.to be_nil }
    end
  end
end
