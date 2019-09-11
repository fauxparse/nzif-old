class AddAllocationFinalizedAtToFestivals < ActiveRecord::Migration[6.0]
  def change
    add_column :festivals, :allocation_finalized_at, :timestamp
  end
end
