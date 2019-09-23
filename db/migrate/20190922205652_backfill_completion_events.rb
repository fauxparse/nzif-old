class BackfillCompletionEvents < ActiveRecord::Migration[6.0]
  def up
    Registration
      .complete
      .includes(:festival, :user)
      .order(completed_at: :asc)
      .all
      .each do |registration|
        History.record(
          History::CompletedRegistration,
          user: registration.user,
          festival: registration.festival,
          created_at: registration.completed_at
        )
      end
  end

  def down
    History::CompletedRegistration.destroy_all
  end
end
