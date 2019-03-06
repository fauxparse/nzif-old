require 'rails_helper'

RSpec.describe WordCountValidator, type: :validator do
  def test_class(options = {}, &block)
    Class.new(Struct.new(:text)) do |klass|
      include ActiveModel::Validations

      validates :text, word_count: options

      def self.name
        'Test'
      end
    end
  end

  def test_instance(options = {}, &block)
    test_class(options, &block).new(text)
  end

  subject(:instance) do
    test_instance(options) do
      validates :text, word_count: { min: 5 }
    end
  end

  let(:errors) { instance.errors.full_messages_for(:text) }

  before { instance.validate }

  context 'validating minimum word length' do
    let(:options) { { min: 5 } }

    context 'with enough text' do
      let(:text) { 'Lorem ipsum dolor sit amet' }

      it { is_expected.to be_valid }
    end

    context 'with not enough text' do
      let(:text) { 'Qui adipisicing elit' }

      it { is_expected.not_to be_valid }

      it 'gives the correct error' do
        expect(errors).to include 'Text is too short (3/5 words)'
      end
    end

    context 'with no text' do
      let(:text) { nil }

      it { is_expected.not_to be_valid }

      it 'gives the correct error' do
        expect(errors).to include 'Text is too short (0/5 words)'
      end
    end
  end

  context 'with allow_blank: true' do
    let(:options) { { min: 5, allow_blank: true } }
    let(:text) { nil }

    it { is_expected.to be_valid }
  end

  context 'validating maximum word length' do
    let(:options) { { max: 3 } }

    context 'with short enough text' do
      let(:text) { 'Qui adipisicing elit' }

      it { is_expected.to be_valid }
    end

    context 'with too much text' do
      let(:text) { 'Lorem ipsum dolor sit amet' }

      it { is_expected.not_to be_valid }

      it 'gives the correct error' do
        expect(errors).to include 'Text is too long (5/3 words)'
      end
    end
  end

  context 'validating minimum and maximum word length' do
    let(:options) { { min: 3, max: 5 } }

    context 'with not enough text' do
      let(:text) { 'Quid nonummy' }

      it { is_expected.not_to be_valid }

      it 'gives the correct error' do
        expect(errors).to include 'Text is too short (2/3 words)'
      end
    end

    context 'with enough text' do
      let(:text) { 'Lorem ipsum dolor sit amet' }

      it { is_expected.to be_valid }
    end

    context 'with too much  text' do
      let(:text) { 'Lorem ipsum dolor sit amet, qui adipisicing elit' }

      it { is_expected.not_to be_valid }

      it 'gives the correct error' do
        expect(errors).to include 'Text is too long (8/5 words)'
      end
    end
  end
end
