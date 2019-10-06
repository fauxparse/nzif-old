class AddFeedbackRequestedAtToSessions < ActiveRecord::Migration[6.0]
  def change
    change_table :sessions do |t|
      t.timestamp :feedback_requested_at
      t.index %i(feedback_requested_at)
    end
  end
end
