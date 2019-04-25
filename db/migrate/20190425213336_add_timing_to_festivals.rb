class AddTimingToFestivals < ActiveRecord::Migration[6.0]
  def change
    change_table :festivals do |t|
      t.timestamp :pitches_open_at
      t.timestamp :pitches_close_at
      t.timestamp :programme_launched_at
    end
  end
end
