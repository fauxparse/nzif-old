class FixPitchPresenters < ActiveRecord::Migration[6.0]
  def up
    return unless Pitch::Presenter.properties.include?(:id)

    Pitch.all.each do |pitch|
      pitch.update! info: fix_info(pitch)
    end
  end

  def down
  end

  private

  def fix_info(pitch)
    pitch.info.deep_dup.tap do |info|
      info.presenters.map! do |presenter|
        presenter.user_id ||= presenter.id
        presenter.except('id')
      end
    end
  end
end
