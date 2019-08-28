class AddRegistrationDatesToFestivals < ActiveRecord::Migration[6.0]
  def up
    add_column :festivals, :registrations_open_at, :timestamp
    add_column :festivals, :earlybird_cutoff, :timestamp

    Festival.all.each do |festival|
      festival.update(registrations_open_at: festival.programme_launched_at)
    end

    remove_column :festivals, :programme_launched_at
  end

  def down
    remove_column :festivals, :programme_launched_at

    Festival.all.each do |festival|
      festival.update(programme_launched_at: festival.registrations_open_at)
    end

    add_column :festivals, :earlybird_cutoff, :timestamp
    add_column :festivals, :registrations_open_at, :timestamp
  end
end
