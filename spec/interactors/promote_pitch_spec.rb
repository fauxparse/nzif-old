require 'rails_helper'

RSpec.describe PromotePitch, type: :interactor do
  subject(:result) { PromotePitch.call(pitch: pitch) }
  let!(:festival) { create(:festival) }
  let!(:user) { create(:user) }

  def create_and_submit_pitch(name, info = {})
    create(:pitch, festival: festival, user: user, name: name).tap do |pitch|
      pitch.update! info: pitch.info.merge(info)
      pitch.submitted!
    end
  end

  context 'for a workshop pitch' do
    let(:pitch) do
      create_and_submit_pitch(
        'Test workshop',
        activity_type: 'workshop',
        presenters: [
          user.attributes.slice('id', 'name', 'email', 'city', 'country'),
          {
            name: 'Co-presenter',
            email: 'another@example.com',
            city: 'Wellington',
            country: 'New Zealand',
          }
        ],
        workshop_description: 'Test workshop description',
        participant_count: 17,
        activity_levels: %w(beginner intermediate),
      )
    end

    let(:workshop) { result.workshop }

    it 'creates a new workshop' do
      expect { result }.to change(Workshop, :count).by(1)
    end

    it 'does not create a new show' do
      expect { result }.not_to change(Show, :count)
    end

    it 'has the correct name' do
      expect(workshop.name).to eq 'Test workshop'
    end

    it 'has the correct description' do
      expect(workshop.description).to eq 'Test workshop description'
    end

    it 'links the users to the workshop' do
      expect { result }.to change(User, :count).by(1)
      new_user = User.last
      expect(workshop.presenters.map(&:user_id)).to match_array [user.id, new_user.id]
    end

    it 'has the correct activity levels' do
      expect(workshop.levels).to eq Set.new(%w(beginner intermediate))
    end

    it 'links the workshop to the pitch' do
      expect(workshop.pitch_id).to eq pitch.id
    end
  end

  context 'for a show pitch' do
    let(:pitch) do
      create_and_submit_pitch(
        'Test show',
        activity_type: 'season',
        show_description: 'Test show description',
      )
    end

    let(:show) { result.show }

    it 'does not create a new workshop' do
      expect { result }.not_to change(Workshop, :count)
    end

    it 'creates a new show' do
      expect { result }.to change(Show, :count).by(1)
    end

    it 'has the correct name' do
      expect(show.name).to eq 'Test show'
    end

    it 'has the correct show description' do
      expect(show.description).to eq 'Test show description'
    end

    it 'links the users to the show' do
      expect(show.presenters.map(&:user_id)).to match_array [user.id]
    end

    it 'links the show to the pitch' do
      expect(show.pitch_id).to eq pitch.id
    end
  end

  context 'for a combo pitch' do
    let(:pitch) do
      create_and_submit_pitch(
        'Test combo',
        activity_type: 'directed',
        show_description: 'Test show description',
        workshop_description: 'Test workshop description',
        participant_count: 17,
        activity_levels: %w(beginner intermediate),
      )
    end

    let(:workshop) { result.workshop }
    let(:show) { result.show }

    it 'creates a new workshop' do
      expect { result }.to change(Workshop, :count).by(1)
    end

    it 'creates a new show' do
      expect { result }.to change(Show, :count).by(1)
    end

    it 'has the correct name' do
      expect(workshop.name).to eq 'Test combo'
      expect(show.name).to eq 'Test combo'
    end

    it 'has the correct workshop description' do
      expect(workshop.description).to eq 'Test workshop description'
    end

    it 'has the correct show description' do
      expect(show.description).to eq 'Test show description'
    end

    it 'links the users to the workshop' do
      expect(workshop.presenters.map(&:user_id)).to match_array [user.id]
    end

    it 'links the users to the show' do
      expect(show.presenters.map(&:user_id)).to match_array [user.id]
    end

    it 'has the correct activity levels' do
      expect(workshop.levels).to eq Set.new(%w(beginner intermediate))
    end

    it 'links the workshop to the pitch' do
      expect(workshop.pitch_id).to eq pitch.id
    end

    it 'links the show to the pitch' do
      expect(show.pitch_id).to eq pitch.id
    end
  end
end
