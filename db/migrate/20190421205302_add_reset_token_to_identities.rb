class AddResetTokenToIdentities < ActiveRecord::Migration[6.0]
  def change
    change_table :identities do |t|
      t.string :reset_token, index: { unique: true }
    end
  end
end
