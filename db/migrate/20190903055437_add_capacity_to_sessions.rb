class AddCapacityToSessions < ActiveRecord::Migration[6.0]
  def up
    add_column :sessions, :capacity, :integer

    Workshop.includes(:sessions, :pitch).each do |workshop|
      capacity = workshop.pitch&.info&.participant_count
      workshop.sessions.update_all(capacity: capacity) if capacity.present?
    end
  end

  def down
    remove_column :sessions, :capacity, :integer
  end
end
