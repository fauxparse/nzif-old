module Types
  class MutationType
    field :create_session, SessionType, null: false, description: 'Create a session' do
      argument :activity_id, ID, required: true
      argument :starts_at, Types::Time, required: true
      argument :ends_at, Types::Time, required: true
    end

    def create_session(activity_id:, starts_at:, ends_at:)
      CreateSession.call(
        activity: Activity.find(activity_id),
        starts_at: starts_at,
        ends_at: ends_at
      ).session
    end
  end
end
