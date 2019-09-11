require 'rails_helper'
require 'timecop'

RSpec.describe Registration, type: :model do
  subject(:registration) { build(:registration) }

  it { is_expected.to be_valid }

  describe '#update' do
    context 'without accepting the code of conduct' do
      before do
        registration.update(code_of_conduct_accepted: true)
        registration.code_of_conduct_accepted = nil
      end

      it { is_expected.not_to be_valid }
    end

    context 'having accepted the code of conduct' do
      before do
        registration.code_of_conduct_accepted = true
      end

      it { is_expected.to be_valid }
    end
  end

  describe '#complete!' do
    before do
      registration.update!(code_of_conduct_accepted: true)
    end

    it 'sets the completed_at timestamp' do
      Timecop.freeze do
        expect { registration.complete! }
          .to change(registration, :completed_at)
          .from(nil)
          .to(Time.now)
      end
    end

    it 'doesn’t update completed_at if it was already set' do
      Timecop.freeze do
        registration.update!(completed_at: 1.week.ago)
        expect { registration.complete! }.not_to change(registration, :completed_at)
      end
    end
  end
end
