module Mutations
  class CreateSession < BaseMutation
    description 'Create a session'
    payload_type Types::Session
    null false

    argument :activity_id, ID, required: true
    argument :starts_at, Types::Time, required: true
    argument :ends_at, Types::Time, required: true

    def resolve(activity_id:, starts_at:, ends_at:)
      ::CreateSession.call(
        current_user: current_user,
        activity: ::Activity.find(activity_id),
        starts_at: starts_at,
        ends_at: ends_at
      ).session
    end
  end
end
