RSpec.shared_context 'registration' do
  subject(:result) { described_class.call(**context) }

  let(:context) do
    {
      festival: festival,
      current_user: user,
      registration: registration,
      attributes: UpdateRegistration::Attributes.new(attributes),
      errors: ActiveModel::Errors.new(error_mock),
    }
  end

  let(:attributes) { {} }

  let(:registration) { nil }

  let(:user) { registration&.user }

  let(:error_mock) do
    double('Interactor')
  end

  let(:festival) { create(:festival) }

  let(:workshops) do
    create_list(:workshop, 12, festival: festival)
  end

  let(:sessions) do
    workshops.map.with_index do |workshop, i|
      starts_at = (festival.start_date + i / 3).midnight.change(hour: 10)
      ends_at = starts_at + 3.hours
      create(:session, activity: workshop, starts_at: starts_at, ends_at: ends_at)
    end
  end

  let(:all_in_show) { create(:show, festival: festival) }

  let(:shows) do
    (0...5).map do |i|
      starts_at = (festival.start_date + i).midnight.change(hour: 21)
      ends_at = starts_at + 1.hour
      create(:session, activity: all_in_show, starts_at: starts_at, ends_at: ends_at)
    end
  end
end
