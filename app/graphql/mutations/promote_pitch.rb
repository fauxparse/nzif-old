module Mutations
  class PromotePitch < BaseMutation
    description 'Promote a pitch by creating one or more activities'
    payload_type [Types::Activity]
    null false

    argument :id, ID, required: true

    def resolve(id:)
      authorize! :create, Activity
      result = ::PromotePitch.call(pitch: Pitch.find_by_hashid(id))
      [result.workshop, result.show].compact
    end
  end
end
