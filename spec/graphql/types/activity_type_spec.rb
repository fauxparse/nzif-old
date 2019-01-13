require 'rails_helper'

RSpec.describe Types::ActivityType do
  describe '.coerce_input' do
    subject(:result) { Types::ActivityType.coerce_input(input, {}) }

    context 'given a valid type' do
      let(:input) { 'workshop' }

      it { is_expected.to eq 'Workshop' }
    end

    context 'given a blank string' do
      let(:input) { '' }

      it { is_expected.to be_nil }
    end
  end

  describe '.coerce_result' do
    subject(:result) { Types::ActivityType.coerce_result(ruby_value, {}) }

    context 'given a valid type' do
      let(:ruby_value) { 'Workshop' }

      it { is_expected.to eq 'workshop' }
    end

    context 'given a blank value' do
      let(:ruby_value) { '' }

      it { is_expected.to be_nil }
    end
  end
end
