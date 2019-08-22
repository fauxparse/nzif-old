class UniquePreferenceIndex < ActiveRecord::Migration[6.0]
  def change
    add_index :preferences, %i(registration_id session_id), unique: true
  end
end
