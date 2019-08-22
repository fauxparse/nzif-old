class UniqueRegistrationIndex < ActiveRecord::Migration[6.0]
  def up
    remove_index :registrations, column: %i(festival_id user_id)
    add_index :registrations, %i(festival_id user_id), unique: true
  end

  def down
    remove_index :registrations, column: %i(festival_id user_id)
    add_index :registrations, %i(festival_id user_id)
  end
end
