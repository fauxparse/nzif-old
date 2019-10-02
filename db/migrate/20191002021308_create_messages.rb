class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.belongs_to :messageable, polymorphic: true, null: false
      t.belongs_to :sender, null: false, foreign_key: { to_table: :users, on_delete: :restrict }
      t.string :subject
      t.text :body

      t.timestamps

      t.index %i(messageable_type messageable_id created_at), name: :messages_on_messageable
    end
  end
end
