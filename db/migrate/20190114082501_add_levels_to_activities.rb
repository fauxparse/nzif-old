class AddLevelsToActivities < ActiveRecord::Migration[5.2]
  def up
    add_column :activities, :experience_levels, :string, array: true, default: []
  end

  def down
    remove_column :activities, :experience_levels
  end
end
