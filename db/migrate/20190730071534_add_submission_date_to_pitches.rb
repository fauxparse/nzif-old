class AddSubmissionDateToPitches < ActiveRecord::Migration[6.0]
  def up
    add_column :pitches, :submitted_at, :timestamp
    add_index :pitches, 'coalesce(submitted_at, updated_at)', name: 'index_pitches_on_submission'

    Pitch.submitted.update_all('submitted_at = updated_at')
  end

  def down
    remove_index :pitches, name: :index_pitches_on_submission
    remove_column :pitches, :submitted_at
  end
end
