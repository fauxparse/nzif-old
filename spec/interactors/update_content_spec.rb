require 'rails_helper'

RSpec.describe UpdateContent, type: :interactor do
  subject(:result) do
    PaperTrail.request(whodunnit: user.id) do
      UpdateContent.call(current_user: user, content: content, attributes: attributes)
    end
  end

  let(:attributes) do
    {
      title: 'Updated title',
      slug: 'updated-slug',
      raw: 'Updated content',
    }
  end
  let(:content) { FactoryBot.create(:content) }
  let(:user) { create(:admin) }

  describe '.call' do
    context 'with valid attributes' do
      it 'updates the content' do
        expect { result }
          .to change(content, :raw).to('Updated content')
          .and change(content, :title).to('Updated title')
          .and change(content, :slug).to('updated-slug')
      end
    end
  end
end
