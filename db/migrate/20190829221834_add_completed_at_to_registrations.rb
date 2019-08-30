class AddCompletedAtToRegistrations < ActiveRecord::Migration[6.0]
  def up
    add_column :registrations, :completed_at, :timestamp

    Registration.complete.all.each do |registration|
      registration.update! completed_at: registration.updated_at
    end
  end

  def down
    remove_column :registrations, :completed_at
  end
end
