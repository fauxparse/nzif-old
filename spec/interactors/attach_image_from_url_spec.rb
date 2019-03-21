require 'rails_helper'

RSpec.describe AttachImageFromUrl, type: :interactor do
  subject(:result) do
    AttachImageFromUrl.call(subject: user, url: url)
  end

  let(:user) { create(:user) }
  let(:url) { 'http://example.com/image.jpg' }
  let(:image_path) { File.expand_path('../support/files/avatar.jpg', __dir__) }

  describe '.call' do
    context 'with a valid url' do
      before do
        stub_request(:get, url).to_return(status: 200, body: File.new(image_path))
      end

      it 'attaches the file' do
        expect(result).to be_a_success
        expect(user.image).to be_attached
      end
    end

    context 'with an invalid url' do
      before do
        stub_request(:get, url).to_return(status: 404)
      end

      it { is_expected.to be_a_failure }
    end
  end
end
