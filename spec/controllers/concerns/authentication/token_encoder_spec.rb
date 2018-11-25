require 'rails_helper'

RSpec.describe Authentication::TokenEncoder, type: :poro do
  let(:encoder) { Authentication::TokenEncoder.new }
  let(:plain) { 123 }
  let(:encoded) { encoder.encode(plain) }
  let(:decoded) { encoder.decode(encoded) }

  describe '#encode' do
    it 'is decodable' do
      expect(decoded).to eq plain
    end
  end

  describe '#decode' do
    it 'recovers from nonsense' do
      expect(encoder.decode('[nonsense]')).to be_nil
    end
  end
end
