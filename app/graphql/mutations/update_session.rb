module Mutations
  class UpdateSession < BaseMutation
    description 'Update a session'
    payload_type Types::Session
    null false

    argument :id, ID, required: true
    argument :starts_at, Types::Time, required: true
    argument :ends_at, Types::Time, required: true

    def resolve(id:, starts_at:, ends_at:)
      ::UpdateSession.call(
        session: ::Session.find(id),
        starts_at: starts_at,
        ends_at: ends_at
      ).session
    end
  end
end
