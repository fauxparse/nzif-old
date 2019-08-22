class CreateRegistrations < ActiveRecord::Migration[6.0]
  def change
    create_table :registrations do |t|
      t.belongs_to :festival, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.string :state, null: false, default: 'pending'
      t.timestamp :code_of_conduct_accepted_at

      t.timestamps

      t.index %i(festival_id user_id)
      t.index %i(festival_id state)
    end
  end
end
